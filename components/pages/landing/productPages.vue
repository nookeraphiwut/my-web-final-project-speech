<template>
  <section class="bg-product">
    <v-row>
      <v-col>
        <div class="bg-category">
        <section class="section-category ">
            <p class="text-category">Brand > </p>
            <ul class="d-flex">
                <li 
                v-for="(item,k) in categoryList.categoryItem"
                :key="k"
                class="text-category"
                >               
                    <div v-if="item.number == 1" >
                        <p class="text-style" @click="getBrand(item.type)">{{ item.type }} </p>
                    </div>
                    <div v-else class="d-flex">
                         <h4>| </h4>
                         <p class="text-style" @click="getBrand(item.type)"> {{ item.type }}</p>
                    </div>
                </li>                           
            </ul>
        </section>
    </div>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="5">
        <div class="content-search-bar">
          <div class="search-bar">
            <input class="input" type="text" v-model="result" />
            <i
              v-if="!isListening"
              class="pi pi-microphone pr-2"
              style="font-size: 1.6rem; cursor: pointer"
              @click="start"
            ></i>
            <i
              v-else
              class="pi pi-microphone pr-2"
              style="font-size: 1.6rem; cursor: pointer; color: green"
              @click="stop"
            ></i>
          </div>
          <!-- upload file -->
          <div 
          v-if="$vuetify.display.mdAndUp"
          
          style="position: relative">
            <input
              class="file-input"
              type="file"
              name="file"
              id="fileInput"
              style="display: none"
            />
            <label for="fileInput" @click="uploadFileInput()">
              <i
                class="pi pi-camera pl-2"
                style="font-size: 2.5rem; color: black; cursor: pointer"
              ></i>
            </label>
          </div>
        </div>
      </v-col>
    </v-row>
    <div class="content-product">
      <p>BAGS</p>
      <divider />
    </div>
    <section
      v-if="result"
      class="section-product d-flex justify-center align-center mt-10"
    >
      <v-row class="d-flex justify-center">
        <v-col cols="8">
          <v-row class="justify-center">
            <v-col
            xs="12"
              sm="8"
              md="6"
              lg="4"
              xl="3"
              v-for="item in state.product_filter"
              :key="item.id"
              style="display: flex; justify-content: center;"
            >
              <v-card class="style-card-bag">
                <nuxt-link
                  :to="`/detail/${item.attributes.Slug}`"
                  style="text-decoration: none"
                >
                  <NuxtImg
                    :src="calUrl(item.attributes?.image?.data?.attributes?.url)"
                    width="260"
                    height="260"
                    alt=""
                    class="card-image"
                  ></NuxtImg>
                  <v-card-title class="header-text">
                    <p style="color: red">
                      {{ reBrandStr(item.attributes.brand) }}
                    </p>
                    <p>{{ item.attributes.name }}</p>
                  </v-card-title>
                  <p class="description-text">{{ item.attributes.type }}</p>
                  <v-card-title>
                    <p class="price-text">
                      ฿{{ formatCurrency(item.attributes.price) }}
                    </p>
                  </v-card-title>
                </nuxt-link>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </section>
    <section
      v-else
      class="section-product d-flex justify-center align-center mt-10"
    >
      <v-row class="d-flex justify-center">
        <v-col cols="8">
          <v-row class="justify-center">
            <v-col
              xs="12"
              sm="8"
              md="6"
              lg="4"
              xl="3"
              v-for="item in state.product?.data"
              :key="item.id"
              style="display: flex; justify-content: center;"
            >
              <v-card class="style-card-bag">
                <nuxt-link
                  :to="`/detail/${item.attributes.Slug}`"
                  style="text-decoration: none"
                >
                  <NuxtImg
                    :src="calUrl(item.attributes?.image?.data?.attributes?.url)"
                    width="260"
                    height="260"
                    alt=""
                    class="card-image"
                  ></NuxtImg>
                  <v-card-title class="header-text">
                    <p>{{ reBrandStr(item.attributes.brand) }}</p>
                    <p>{{ item.attributes.name }}</p>
                  </v-card-title>
                  <p class="description-text">{{ item.attributes.type }}</p>
                  <v-card-title>
                    <p class="price-text">
                      ฿{{ formatCurrency(item.attributes.price) }}
                    </p>
                  </v-card-title>
                </nuxt-link>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </section>
  </section>
</template>

<script setup lang="ts">
// import modules for object detection
import "@tensorflow/tfjs-backend-cpu";
import "@tensorflow/tfjs-backend-webgl";

import divider from "~/components/pages/landing/divider.vue";

import { useSpeechRecognition } from "@vueuse/core";
//call api
import {
  getProduct,
  type ProductResponse,
} from "~/composables/api/useProductApi";


const localUrl: string = "http://localhost:1337";

interface State {
  product: null | ProductResponse;
  product_filter: [];
}

const state = reactive<State>({
  product: null,
  product_filter: [],
});

const onGetProduct = async () => {
  const res = await getProduct();

  if (res.error.value === null) {
    if (res.data.value) {
      state.product = res.data.value;
    }
  }
};

await onGetProduct();
onMounted(() => {
  onGetProduct();
  
});

function calUrl(rawUrl: string) {
  const base = localUrl + rawUrl;
  return base;
}

//Upper case brand
function reBrandStr(str: string) {
  if (str === "") {
    return "";
  }
  const capitalizedStr = str.charAt(0).toUpperCase() + str.slice(1);
  return capitalizedStr;
}

//formatCurrency
function formatCurrency(number: number): string {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

//feature voice
const lang = ref("th-TH");
const speech = useSpeechRecognition({
  lang,
  continuous: false,
});

const brands = [
  "coach",
  "gucci",
  "celine",
  "balenciaga",
  "prada",
  "chanel",
  "hermes",
  "burberry",
  "dior",
  "fendi",
];
const colors = [
  "black",
  "yellow",
  "orange",
  "pink",
  "white",
  "green",
  "gray",
  "purple",
  "red",
  "blue",
  "brown",
  "silver",
  "nude",
  "mint",
];
function start() {
  speech.result.value = "";
  speech.start();
}

const { isListening, stop, result } = speech;

watch(isListening, (isListening) => isListening);

watch(speech.result, (newResult: string) => {
  const spokenWords: string[] = newResult.toLowerCase().split(" ").reverse();
  speechSpokenWords(spokenWords);
});

let foundBrand = ref(false);
let foundColor = ref(false);
const brand = ref("");
const color = ref("");

//New
function speechSpokenWords(spokenWords: string[]) {
  for (const word of spokenWords) {
    if (brands.includes(word.toLowerCase())) {
      search_product(word, true);
      foundBrand.value = true;
    } else if (colors.includes(word.toLowerCase())) {
      search_product(word, false);
      foundColor.value = true;
    } else {
      search_product("error", false);
      foundBrand.value = false;
      foundColor.value = false;
    }
  }

  if (!foundBrand) {
    search_product("error", false);
  }
  if (!foundColor) {
    search_product("error", false);
  }
}

function getBrand(value: string) {
  const lowerValue = value.toLowerCase();
  for (const brand of brands) {
    if (brand.toLowerCase() === lowerValue) {
      search_product(lowerValue, true)
      foundBrand.value = true;
      result.value = lowerValue
      break;
    }
  }

}

//New
function search_product(value: string, isBrand: boolean): void {
  if (state.product) {
    const filteredProducts = state.product.data.filter((product) => {
      if (isBrand) {
        return product.attributes.brand === value;
      } else {
        return product.attributes.color === value;
      }
    });
    if (value !== "error") {
      state.product_filter = filteredProducts || [];
    } else {
      state.product_filter = [];
    }
  }
}

function uploadFileInput() {
  const fileInput = document.getElementById("fileInput") as HTMLInputElement;
  fileInput.addEventListener("change", (event) => {
    const file = (event.target as HTMLInputElement).files?.[0];

    if (file) {
      console.log("ชื่อไฟล์:", file.name);
      console.log("ขนาดไฟล์:", file.size, "byte");

      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const imageUrl = event.target?.result as string;
          const imgElement = document.createElement("img");
          imgElement.src = imageUrl;
          document.body.appendChild(imgElement);
        };
        reader.readAsDataURL(file);
      } else {
        console.log("ไฟล์ไม่ใช่รูปภาพ");
      }
    }
    console.log(file);
  });
}

const categoryList = {
    categoryItem:[
        {
            type: 'Coach',
            number: 1
        },
        {
            type: 'Gucci',
            number: 2
        },
        {
            type: 'Celine',
            number: 3
        },
        {
            type: 'Balenciaga',
            number: 4
        },
        {
            type: 'Prada',
            number: 5
        },
        {
            type: 'Chanel',
            number: 6
        },
        {
            type: 'Hermes',
            number: 7
        },
        {
            type: 'Burberry',
            number: 8
        },
        {
            type: 'Dior',
            number: 9
        },
        {
            type: 'Fendi',
            number: 10
        },
    ]
}
</script>
<style lang="scss" scoped>
.bg-product {
  max-height: auto;
  background-color: #ffffff;
}
.content-product {
  text-align: center;
  font-size: 48px;
  margin-top: 30px;
  font-family: "Noto Sans Thai", sans-serif !important;
}
.line-container {
  display: flex;
  width: 1900px;
  max-width: 600px;
  overflow: hidden;
}
.line {
  flex-grow: 1;
  border-bottom: 2px solid #000;
  margin: 0 5px;
}
.sub-category {
  height: calc(15dvh - 72px);
  margin-bottom: 30px;
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  .category-box {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 150px;
    height: 50px;
    margin-right: 55px;
    background-color: #d9d9d9;
    border-radius: 50px;
    p {
      font-size: 18px;
      font-weight: bold;
      font-family: "Noto Sans Thai", sans-serif !important;
    }
  }
}
.section-product {
  background-color: #ffffff;
  width: auto;
  height: auto;
  margin-bottom: 50px;
  cursor: pointer;
  .style-card-bag {
    text-align: center;
    height: 450px;
    max-width: 260px;
    min-width: 260px;
    width: auto;
    background: #ffffff;
    border-radius: 0px;
    margin: 20px;
    word-wrap: break-word;
    overflow-wrap: break-word;
  }

  .style-card-bag:hover {
    transform: scale(1);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  }
}
::v-deep(.v-card-title) {
  white-space: normal;
}
.header-text {
  color: black;
  font-weight: bold;
  font-size: 14px;
  width: auto;
  height: 70px;
  font-family: "Noto Sans Thai", sans-serif !important;
}
.description-text {
  color: black;
  height: 30px;
  font-size: 13px;
  font-family: "Noto Sans Thai", sans-serif !important;
  overflow: hidden;
}
.price-text {
  color: #f9421a;
}
.content-search-bar {
  display: flex;
  justify-content: center;
  align-items: center;
  width: auto;
}
.search-bar {
  display: flex;
  justify-content: center;
  align-items: center;
  background: #ffffff;
  border: 3px solid #ccc;
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
.bg-category{
    display: flex;
    justify-content: center;
    align-items: center;
    height: calc(18dvh - 72px);
    width: auto;
    background-color: #ffffff;
}
.section-category{
    display: flex;
    height: 40px;
    padding: 10px;
    text-align: start;
    justify-content: flex-start;
    border-radius: 50px;
    overflow-x: auto;
    overflow-y: hidden;
}
.text-category {
    text-align: start;
    list-style: none;
    font-size: 20px;
    font-family: 'Noto Sans Thai', sans-serif !important;
    padding-right: 20px;
    color: black;
    p:hover{
            color: red;
            cursor: pointer;     
        }  
}

@media screen and (min-width: 961px) and (max-width: 1280px){
    .section-category{
        margin-left: 60px;
    }

}
@media screen and (min-width: 601px) and (max-width: 960px){
    .section-category{
        margin-top: 30px;
        margin-left: 60px;
        margin-right: 50px;

    }
}
</style>
