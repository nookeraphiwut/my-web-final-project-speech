<template>
  <v-row justify="center">
    <v-col cols="6" xs="12">
      <!-- <v-row v-if="!$vuetify.display.xs"> -->
        <v-row>
        <v-col class="bg" xs="12" v-for="(item, k) in data" :key="k">
          <h1 class="header-text">{{ item.attributes.name }}</h1>
          <h6 class="header-text-sub">{{ item.attributes.title }}</h6>
          <div class="box-content">
            <div 
            class="box-image">
              <NuxtImg
                :src="calUrl(item.attributes?.image?.data?.attributes?.url)"
                height="500"
                alt=""
              ></NuxtImg>
            </div>

            <div class="box-detail">
              <div class="price">
                <h1 class="price-text">฿{{ formatCurrency(item.attributes.price) }}</h1>
              </div>
              <divider class="line-divider" />
              <div class="descript">
                <div class="header-des">
                  <h4>PID</h4>
                  <h4>Brand</h4>
                  <h4>Color</h4>
                  <h4>Type</h4>
                  <h4>Unit</h4>
                </div>
                <div class="result-des">
                  <h4>{{ item.id }}</h4>
                  <h4>{{ item.attributes.brand }}</h4>
                  <h4>{{ item.attributes.color }}</h4>
                  <h4>{{ item.attributes.type }}</h4>
                  <h4>EACH</h4>
                </div>
              </div>
              <divider class="line-divider" />
              <div class="long-descript">
                <div>
                  <h4>
                    {{ item.attributes.description }}
                  </h4>
                </div>
              </div>
              <div class="btn-zone">
                <div class="content">
                  <div class="box-add-cart">
                    <button
                      class="add-to-cart-button"
                      @click="
                        addCart(
                          item.id,
                          item.attributes.name,
                          item.attributes.price,
                          item.attributes.brand,
                          item.attributes.color,
                          item.attributes.stock,
                          item.attributes?.image?.data?.attributes?.url
                        )
                      "
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </v-col>
      </v-row>
      <!-- <v-row v-if="$vuetify.display.xs">
        <div class="bg-mb mb-12" v-for="(item, k) in data" :key="k">
          <h1 class="header-text-mb">{{ item.attributes.name }}</h1>
          <h6 class="header-text-sub-mb">{{ item.attributes.title }}</h6>
          <div class="box-content">
            <div 
            class="box-image">
              <NuxtImg
                :src="calUrl(item.attributes?.image?.data?.attributes?.url)"
                height="140"
                alt=""
              ></NuxtImg>
            </div>

            <div class="box-detail-mb ">
              <div class="price">
                <h1 class="price-text " style="font-size: 20px;">฿{{ formatCurrency(item.attributes.price) }}</h1>
              </div>
              <div class="descript mt-3">
                <div class="header-des" style="font-size: 12px;">
                  <h4>PID</h4>
                  <h4>Brand</h4>
                  <h4>Color</h4>
                  <h4>Type</h4>
                  <h4>Unit</h4>
                </div>
                <div class="result-des" style="font-size: 12px;">
                  <h4>{{ item.id }}</h4>
                  <h4>{{ item.attributes.brand }}</h4>
                  <h4>{{ item.attributes.color }}</h4>
                  <h4>{{ item.attributes.type }}</h4>
                </div>
              </div>
              <div class="btn-zone">
                <div class="content">
                  <div class="box-add-cart">
                    <button
                      class="add-to-cart-button"
                      style="font-size: 12px;"
                      @click="
                        addCart(
                          item.id,
                          item.attributes.name,
                          item.attributes.price,
                          item.attributes.brand,
                          item.attributes.color,
                          item.attributes.stock,
                          item.attributes?.image?.data?.attributes?.url
                        )
                      "
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </v-row> -->
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import divider from "~/components/pages/landing/divider.vue";
import Swal from "sweetalert2";
const config = useRuntimeConfig();
const route = useRoute();
const router = useRouter();
const getroute = route.params.id;

const localUrl: string = "http://localhost:1337";

const { data } = await $fetch<{
  data: [
    {
      id: number;
      attributes: {
        name: string;
        title: string;
        description: string;
        brand: string;
        price: number;
        type: string;
        color: string;
        Slug: string;
        stock: number;
        image: {
          data: {
            attributes: {
              url: string;
            };
          };
        };
      };
    },
  ];
}>(
  `http://localhost:1337/api/products?populate=*&filters[Slug][$eq]=${getroute}`,
  {
    baseURL: config.public.cms.proxy,
    method: "GET",
  }
);

function calUrl(rawUrl: string) {
  const base = localUrl + rawUrl;
  return base;
}


function addCart(
  id: number,
  name: string,
  price: number,
  brand: string,
  color: string,
  stock: number,
  url: string
) {
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  const existingItemIndex = cart.findIndex((item: any) => item.id === id);

  if (existingItemIndex !== -1) {
    cart[existingItemIndex].quantity += 1;
  } else {
    const add_cart = { id, name, price, brand, color, stock, url, quantity: 1 };
    cart.push(add_cart);
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  calculateAndUpdateCartTotal()
  showAlertSuccess();

  setTimeout(() => {
    window.location.reload();
  }, 1500);
}

//formatCurrency
function formatCurrency(number: number): string {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

//คำนวนราคาทั้งหมดในตะกร้า
function calculateAndUpdateCartTotal() {
  let cartData = JSON.parse(localStorage.getItem("cart") || "[]");
    let total = 0;
    cartData.forEach((item: { price: string; quantity: string; }) => {
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

function showAlertSuccess() {
  Swal.fire({
    position: "center",
    icon: "success",
    title: "Product added successfully",
    showConfirmButton: false,
    timer: 1500,
  });

}


</script>

<style lang="scss" scoped>
.bg {
  justify-content: center;
  align-items: center;
  padding-top: 30px;
  max-width: 100%;
  width: auto;
  min-height: 800px;
  margin-top: 60px;
  font-family: "Noto Sans Thai", sans-serif !important;
}
.bg-mb {
  justify-content: center;
  align-items: center;
  padding-top: 30px;
  max-width: 100%;
  width: auto;
  min-height: 500px;
  margin-top: 150px;
  font-family: "Noto Sans Thai", sans-serif !important;
}
.line-divider {
  border: 1px solid #706f6f;
  display: flex;
  justify-content: center;
  width: 500px;
  margin-top: 30px;
  margin-bottom: 20px;
  margin-left: 0px;
}
.price {
  height: 30px;
  width: 100%;
  padding-bottom: 30px;
}

.descript {
  display: flex;
  height: auto;
  width: 100%;
  color: #797979;
  .header-des {
    width: 100px;
  }
  .result-des {
    max-width: 400px;
    width: auto;
    color: black;
  }
}
.long-descript {
  max-width: 400px;
  width: auto;
  height: auto;
}
.btn-zone {
  max-width: 100%;
  width: auto;
  height: auto;
  margin-top: 20px;
  margin-bottom: 10px;
  .content {
    width: auto;
    .box-add-cart {
      .add-to-cart-button {
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
      justify-content: flex-start;
      align-items: center;
      .quantity-control {
        display: flex;
        margin-left: 20px;
        align-items: center;
      }

      .quantity-button {
        background-color: #eff0f5;
        color: #9e9e9e;
        border: none;
        border-radius: 3px;
        cursor: pointer;
        font-size: 16px;
        padding: 10px;
        width: 35px;
        margin: 5px;
      }

      .quantity {
        padding: 5px 10px;
      }
    }
  }
}
.box-content {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  .image-detail {
    width: auto;
  }
}

.box-detail {
  justify-content: center;
  text-align: start;
  max-width: 100%;
  width: 580px;
  height: auto;
  padding-left: 50px;
}
.box-detail-mb {
  justify-content: center;
  text-align: start;
  max-width: 100%;
  width: auto;
  height: auto;
  min-height: 300px;
  padding-left: 20px;
}
.box-image {
  width: auto;
}
.header-text {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 20px;
  font-size: 30px;
}
.header-text-mb {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 20px;
  font-size: 16px;
}
.header-text-sub {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 10px;
  font-size: 19px;
}
.header-text-sub-mb {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 10px;
  font-size: 12px;
}
.price-text {
  color: #f9421a;
}

</style>
