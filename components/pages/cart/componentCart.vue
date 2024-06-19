<template>
  <section class="bg">
    <div class="bg-content">
      <section  
        v-if="!$vuetify.display.xs"
        class="header-cart">
        <h1>ITEM IN CART</h1>
      </section>
      <section  
        v-else
        class="header-cart">
        <h1 style="font-size: 16px;">ITEM IN CART</h1>
      </section>
      <section 
      v-show="data != 0"
      v-if="!$vuetify.display.xs">
        <v-row>
          <!-- item -->
          <v-col cols="12" sm="10" md="10" lg="10">
            <v-row v-for="(item, k) in data" :key="k" class="section-content">
              <v-col cols="2" sm="2" md="2" class="d-flex justify-center">
                <div class="item-image">
                  <NuxtImg
                    :src="calUrl(item.url)"
                    height="150"
                    alt=""
                  ></NuxtImg>
                </div>
              </v-col>

              <v-col cols="3" sm="3" md="3">
                <div class="item-descript">
                  <div class="header-item">
                    <h1>{{ item.name }}</h1>
                  </div>
                  <div class="d-flex">
                    <p>{{ item.brand }}</p>
                    <div class="d-flex">
                      <p>{{ item.color }}</p>
                    </div>
                  </div>
                  <div class="item-count">
                    <p>{{ item.stock }} item(s) left</p>
                  </div>
                </div>
              </v-col>

              <v-col cols="2" sm="1" md="1" class="item-price">
                <div>
                  <h1 class="price-text">฿{{ formatCurrency(item.price) }}</h1>
                </div>
              </v-col>

              <v-col cols="2" sm="1" md="2" class="box-quantity">
                <div class="quantity-control">
                  <button
                    class="quantity-button decrease"
                    @click="decreaseItemQuantity(item.id)"
                  >
                    -
                  </button>
                  <span class="quantity">{{ item.quantity }}</span>
                  <button
                    class="quantity-button increase"
                    @click="increasedItemQuantity(item.id)"
                  >
                    +
                  </button>
                </div>
              </v-col>
              <v-col cols="2" sm="4" md="3" class="box-quantity">
                <div class="quantity-control">
                  <button style="color: #c6000f" class="style-delete">
                    <h1 @click="deleteItemFromCart(item.id)">Delete</h1>
                  </button>
                </div>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                  <div class="box-add-cart">
                    <button class="clear-button" @click="clearCart()">Clear</button>
                  </div>
              </v-col>
            </v-row>
          </v-col>

          <!-- Result -->
          <v-col cols="4" sm="2"  md="2" lg="2">
            <v-row class="result-content">
              <div class="header-result">
                <p>Order Summary</p>
              </div>
              <div class="result-sub-box">
                <p class="sub-result">Subtotal ({{ totalQuantity}} items) </p>
                <p class="result-value" v-for="(item,k) in total" :key="k">฿ {{ formatCurrency(item) }}</p>
              </div>
              <div class="result-sub-box">
                <p class="sub-result">Shipping Fee </p>
                <p class="result-value" >฿{{ ShippingFee }}</p>
              </div>
              <!-- total -->
              <div class="result-sub-box mt-12">
                <p class="total-text">Total</p>
                <p class="total-value">฿ {{ formatCurrency(total.total + ShippingFee) }}</p>
              </div>
              <button class="btn-proceed">PROCEED TO CHECKOUT</button>
            </v-row>
          </v-col>
        </v-row>
      </section>
      <section v-show="data == 0" class="section-content">
        <v-row v-if="$vuetify.display.mdAndUp" justify="center">
          <v-col cols="12" class="d-flex justify-center">
            <div>
              <div class="d-flex justify-center">
                <img
                src="/images/cart_empty2.jpg"
                height="250"
                alt=""
            />
              </div>
            <div class="d-flex justify-center">
              <h1 style="font-size: 30px">You cart is empty</h1>           
            </div>
            <p style="font-size: 24px" class="pl-12">Looks like you have not added anything to you cart. Go ahead & explore top categories.</p>
            <div class="d-flex justify-center">
              <button class="button-style" @click="logoclick()">Go to Shop</button>
            </div>
            </div>
          </v-col>
        </v-row>

      </section>
    </div>
  </section>
</template>

<script setup >
import "primeicons/primeicons.css";
import Swal from "sweetalert2";

const router = useRouter();
const localUrl = "http://localhost:1337";
const data = ref([]);
const total = ref(0);
const ShippingFee = 70;
const loaded = ref(false);

//formatCurrency
function formatCurrency(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function calUrl(rawUrl) {
  const base = localUrl + rawUrl;
  return base;
}

function loadLocalStorage() {
  const localStorageData = localStorage.getItem("cart");
  const localStorageDataTotal = localStorage.getItem("total_result")
  if (localStorageData) {
    data.value = JSON.parse(localStorageData);
    total.value = JSON.parse(localStorageDataTotal)
    loaded.value = true;
  }
}

onMounted(() => {
  loadLocalStorage();
  calculateAndUpdateCartTotal();
});

//เพิ่ม จำนวน
function increasedItemQuantity(id) {
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  for (const element of cart) {
    if (element.id === id) {
      element.quantity++;
      break;
    }
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  calculateAndUpdateCartTotal()
  showAlertaddSuccess()
  setTimeout(() => {
    window.location.reload();
  }, 1000);
}

//ลดจำนวน
function decreaseItemQuantity(id) {
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  for (let i = 0; i < cart.length; i++) {
    const element = cart[i];
    if (element.id === id) {
      if (element.quantity > 0) {
        element.quantity--;
        if (element.quantity === 0) {
          cart.splice(i, 1); // ลบรายการออกจากตะกร้า
        }
        break;
      }
    }
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  calculateAndUpdateCartTotal()
  showAlertremoveSuccess()
  setTimeout(() => {
    window.location.reload();
  }, 1000);
}

//ลบสินค้า
function deleteItemFromCart(id) {
  let cartData = JSON.parse(localStorage.getItem("cart") || "[]");
  const itemIndex = cartData.findIndex(
    (item) => item.id === id
  );
  if (itemIndex !== -1) {
    cartData.splice(itemIndex, 1);
    localStorage.setItem("cart", JSON.stringify(cartData));
    calculateAndUpdateCartTotal()
    showAlertDeleteSuccess()
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }
}

//คำนวนราคาทั้งหมดในตะกร้า
function calculateAndUpdateCartTotal() {
  let cartData = JSON.parse(localStorage.getItem("cart") || "[]");
    let total = 0;
    cartData.forEach(item => {
        const price = parseFloat(item.price); 
        const quantity = parseInt(item.quantity); 
        total += price * quantity; 
    });

    const totalResult = {
        total: total
    };
    localStorage.setItem("total_result", JSON.stringify(totalResult));
    return totalResult
}


//เครียตะกร้า
function clearCart() {
  localStorage.removeItem("cart");
  showAlertClearSuccess()
  setTimeout(() => {
    window.location.reload();
  }, 1000);
}


const totalQuantity = computed(() => {
  let total = 0;
  for (const item of data.value) {
    total += item.quantity;
  }
  return total;
});

function logoclick() {
      if (router.currentRoute.value.path !== "/") {
        router.push("/");
      }
    }

function showAlertClearSuccess() {
  Swal.fire({
    position: "center",
    icon: "success",
    title: "Clear successfully",
    showConfirmButton: false,
    timer: 1500,
  });
}
function showAlertaddSuccess() {
  Swal.fire({
    position: "center",
    icon: "success",
    title: "Add successfully",
    showConfirmButton: false,
    timer: 1500,
  });
}
function showAlertremoveSuccess() {
  Swal.fire({
    position: "center",
    icon: "success",
    title: "Remove successfully",
    showConfirmButton: false,
    timer: 1500,
  });
}
function showAlertDeleteSuccess() {
  Swal.fire({
    position: "center",
    icon: "success",
    title: "Delete successfully",
    showConfirmButton: false,
    timer: 1500,
  });
}
</script>

<style scoped lang="scss">
.bg {
  max-width: 100%;
  min-height: calc(80dvh - 72px);
  height: calc(100dvh - 72px);
  margin-top: 60px;
  width: auto;
  background: #f4f4f4;
  height: auto;
  padding-bottom: 60px;
}
.bg-content {
  margin-left: 240px;
  margin-right: 240px;
}
.header-cart {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  text-align: center;
  padding-top: 20px;
  padding-bottom: 20px;
  max-width: 100%;
  width: 250px;
  height: auto;
  font-size: 29px;
}

.section-content-empty{
  max-width: 100%;
  width: auto;
  margin-bottom: 20px;
  background: white;
}

.section-content {
  max-width: 100%;
  width: auto;
  height: auto;
  margin-bottom: 20px;
  background: white;
  .item-image {
    display: flex;
    justify-content: center;
    max-width: 100px;
    width: auto;
  }
  .item-descript {
    max-width: 400px;
    width: auto;
    .header-item {
      margin-top: 10px;
      margin-bottom: 5px;
    }
    p {
      padding-right: 4px;
    }
  }
  .item-price {
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 400px;
    width: auto;
    height: auto;
    .price-text {
      font-size: 26px;
      color: #f9421a;
    }
  }
  .item-count {
    max-width: 400px;
    padding-top: 40px;
    width: auto;
    height: auto;
    color: red;
  }
}
@media screen and (min-width: 961px) and (max-width: 1279px){
  .bg-content{
    margin-left: 100px;
  }
  
  .section-content{
    .item-price{
    .price-text{
    font-size: 14px;
  }
  }
  }
  img{
    width: 100px;
    height: 100px;
  }
  h1{
    font-size: 14px;
  }
}
@media screen and (min-width: 601px) and (max-width: 960px){
  .bg-content{
    margin-left: 40px;
  }

  .section-content{
    .item-price{
    .price-text{
    font-size: 14px;
  }
  }
  }
  img{
    width: 70px;
    height: 70px;
  }
  h1,p{
    font-size: 13px;
  }

  .box-quantity{
    .quantity-control{
      width: 30px;
      margin-left: 0px;
      
      .style-delete{
        font-size: 16px;
    }
    }
    
  }
}
@media screen and (min-width: 300px) and (max-width: 600px){
  .section-content-empty{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .bg-content{
    margin-left: 140px;
  margin-right: 140px;
  .header-cart{
    width: auto;
  }
  }
}
.box-add-cart {
  padding-right: 10px;
  .clear-button {
    display: flex;
    justify-content: flex-end;
    background-color: #c6000f;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 30px;
    cursor: pointer;
    font-size: 16px;
    transition: all 0.3s ease;
    margin-left: auto;
  }
}
.box-quantity {
  display: flex;
  justify-content: center;
  align-items: center;
  .quantity-control {
    display: flex;
    margin-left: 20px;
    align-items: center;
    .style-delete{
    font-size: 16px;
  }
  }
  

  .quantity-button {
    background-color: #eff0f5;
    color: #9e9e9e;
    border: none;
    border-radius: 3px;
    cursor: pointer;
    font-size: 16px;
    padding: 10px;
    margin: 5px;
    width: 35px;
  }

  .quantity {
    padding: 5px 10px;
  }
}
.result-content {
  display: grid;
  padding: 16px 12px 0;
  min-width: 300px;
  height: auto;
  background: white;
  .header-result {
    color: black;
    p {
      font-size: 18px;
      margin-bottom: 14px;
      font-weight: 500;
    }
  }
  .sub-result {
    color: #757575;
    p {
      font-size: 14px;
    }
  }
}
.result-sub-box {
  display: flex;
  justify-content: space-between;
  .result-value {
    p {
      font-size: 16px;
    }
  }

  .total-value {
    color: #f57224;
    font-size: 18px;
  }
  .total-text {
    color: #202020;
    font-size: 16px;
  }
}
.btn-proceed {
  background-color: #f57224;
  color: white;
  width: auto;
  height: 40px;
  margin: 16px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-align: center;
  line-height: 40px;
  font-size: 16px;
}
.button-style {
    background-color: #f57224; 
    color: #fff; 
    border: none; 
    margin: 20px 0;
    padding: 10px 20px; 
    border-radius: 40px;
    cursor: pointer; 
}

.button-style:hover {
    background-color: #f36716; 
}
</style>
