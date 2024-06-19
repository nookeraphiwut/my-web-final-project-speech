<template>
  <section class="bg-navbar d-flex">
    <div class="box-logo" @click="logoclick()">
      <h1>SHEINN</h1>
    </div>
    <div class="content-search-bar">
      <div class="cart-bg-number">
        <div class="cart-icon-container">
          <span class="cart-icon">
            <i
              class="pi pi-shopping-cart ml-5"
              style="font-size: 2.3rem; color: white; cursor: pointer"
              @click="cartclick()"
            ></i>
            <span v-if="totalQuantity != 0" class="cart-counter">{{
              totalQuantity
            }}</span>
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import "primeicons/primeicons.css";
import { useSpeechRecognition } from "@vueuse/core";
import { ref } from "vue";
const router = useRouter();

function logoclick() {
  if (router.currentRoute.value.path !== "/") {
    router.push("/");
  }
}

function cartclick() {
  if (router.currentRoute.value.path !== "/cart") {
    router.push("/cart");
  }
}

const cartData = ref([]);

function loadLocalStorage() {
  const localStorageData = localStorage.getItem("cart");
  if (localStorageData) {
    cartData.value = JSON.parse(localStorageData);
  }
}

onMounted(() => {
  loadLocalStorage();
});

const totalQuantity = computed(() => {
  let total = 0;
  for (const item of cartData.value) {
    total += item.quantity;
  }
  return total;
});


</script>

<style lang="scss" scoped>
.bg-navbar {
  background: black;
  min-height: 72px;
  height: auto;
  position: fixed;
  top: 0; 
  left: 0; 
  right: 0; 
  z-index: 9999;
}

.content-search-bar {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-right: 70px;
  width: 100%;
}

.search-bar {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background: #ffffff;
  width: auto;
  min-height: 45px;


  .btn-search {
    background-color: #2d2d2e;
    color: white;
    padding: 10px;
    min-height: 45px;
  }

  .text-search {
    display: flex;
    text-align: center;
    padding-right: 40px;
  }
}

.search-bar input[type="text"] {
  padding: 8px;
  border: none;
  border-radius: 4px;
  margin-right: 5px;
}

.cart-icon-container {
  position: relative;
}

.cart-icon {
  position: relative;
  display: inline-block;
}

.cart-counter {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: -10px;
  right: -10px;
  background-color: red;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  font-size: 15px;
}
.box-logo {
  display: flex;
  justify-content: center;
  padding-top: 10px;
  padding-bottom: 10px;
  font-size: 29px;
  width: 200px;
  margin-left: 30px;
  color: white;
  cursor: pointer;
}

@media screen and (min-width: 300px) and (max-width: 600px){
  .content-search-bar{
    margin-right: 30px;
  }
}
</style>
