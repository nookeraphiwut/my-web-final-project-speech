<template>
    <footer id="contact" class="footer-wrap pa-0">
      <v-row class="ma-0">
        <v-col
          cols="12"
          md="10"
          class="superdev-footer"
          :style="$vuetify.display.xs ? 'position: absolute;' : ''"
        >
          <!-- Company's Logo -->
          <section class="superdev-footer--item logo mb-8 mt-0">           
            <h1 class="footer-headline">NOOKER CO., LTD.</h1>
          </section>
  
          <!-- Phone and Enquires -->
          <v-row class="superdev-footer--item" no-gutters>
            <v-col cols="12" sm="6" lg="5" class="pr-16">
              <h1>contact</h1>
              <a  class="text-content"
                >+999-9999-9999 ,</a
              >
              <a  class="text-content">+999-9999-9999</a>
            </v-col>
            <v-col cols="12" sm="6" lg="7">
              <h1>test</h1>
              <a
                
                rel="noreferrer"
                class="text-content"
                >contact@nookerdev.tech</a
              >
            </v-col>
          </v-row>
  
          <!-- Address and Contact -->
          <v-row class="superdev-footer--item" no-gutters>
            <v-col
              cols="12"
              sm="6"
              lg="5"
              :class="{ 'pr-16': !$vuetify.display.smAndDown }"
            >
              <h1>Name</h1>
              <a
               
                rel="noopener"
                target="_blank"
                class="text-content"
              >
              Mr. Aphiwut Hitchumnong<br v-if="!$vuetify.display.mdAndDown" />
              Mr. Piyathida Jaengprayoon</a
              >
            </v-col>
  
            <v-col cols="12" sm="6" lg="7">
              <h1>Media</h1>
              <a
                href="https://www.facebook.com/nukerr.hitjamnong"
                rel="noopener"
                target="_blank"
                class="text-content mr-3"
                >Facebook</a
              >
               
              <a
                href="https://github.com/nookeraphiwut"
                rel="noopener"
                target="_blank"
                class="text-content mr-3"
                >Github</a
              >
            </v-col>
          </v-row>
  
         
  
          <!-- Copyright -->
          <v-row justify="end" class="flex-grow-0">
            <v-col cols="12" class="d-flex">
              <p
                v-if="$vuetify.display.mdAndUp"
                class="copyright my-12"
                style="text-align: right"
              >
                Copyright © {{ new Date().getFullYear() }} FINAL PROJECT 
              </p>
              <p
                v-if="$vuetify.display.smAndDown"
                class="copyright"
                style="text-align: center"
              >
                Copyright © {{ new Date().getFullYear() }} FINAL PROJECT 
              </p>
            </v-col>
            <v-col cols="12" class="d-flex justify-center">
              <button
                v-if="$vuetify.display.smAndDown"
                class="to-top-btn d-flex flex-column justify-center align-center"
                style="color: white"
                @click.prevent="scrollTop"
              >
                <svg
                  width="20"
                  height="21"
                  viewBox="0 0 20 21"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.25 20.4001H8.75V5.4001L1.875 12.2751L0.0999985 10.5001L10 0.600098L19.9 10.5001L18.125 12.2751L11.25 5.4001V20.4001Z"
                    fill="white"
                  />
                </svg>
                <span> To top</span>
              </button>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="0" md="2" class="footer-space pa-0">
          <v-row class="footer-space--item ma-0" style="background: transparent;"></v-row>
          <v-row class="footer-space--item ma-0" style="background: rgb(45, 45, 46)">
            <button
              v-if="$vuetify.display.mdAndUp"
              class="to-top-btn btn-md-up d-flex flex-column justify-center align-center"
              @click.prevent="scrollTop"
            >
              <svg
                width="20"
                height="21"
                viewBox="0 0 20 21"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.25 20.4001H8.75V5.4001L1.875 12.2751L0.0999985 10.5001L10 0.600098L19.9 10.5001L18.125 12.2751L11.25 5.4001V20.4001Z"
                  fill="white"
                />
              </svg>
              <span style="color: white"> To top </span>
            </button>
          </v-row>
        </v-col>
      </v-row>
    </footer>
  </template>
  
  <script setup lang="ts">
 
  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }
  </script>
  
  <style lang="scss" scoped>
  $color__background:  #f4f4f4;
  $page-font-english: 'Noto Sans Thai';
  $page-font-thai: 'Prompt';
  .footer-wrap {
    position: relative;
    height: 100%;
    font-family: $page-font-english, $page-font-thai;
  
    .btn-md-up {
      &:hover,
      &:hover svg path {
        color: white;
        fill: white;
      }
      &:hover svg {
        animation: bounce 0.75s alternate infinite;
        -webkit-animation: bounce 0.75s alternate infinite;
      }
    }
  
    .to-top-btn {
      row-gap: 1rem;
      font-weight: 600;
      font-size: 0.9rem;
      padding: 35px;
      color: #555;
  
      svg,
      path {
        display: block;
        z-index: 25;
      }
  
      @keyframes bounce {
        0% {
          -webkit-transform: translateY(0);
        }
        50%,
        100% {
          -webkit-transform: translateY(-10px);
        }
      }
  
      @-webkit-keyframes bounce {
        0% {
          -webkit-transform: translateY(0);
        }
        50%,
        100% {
          -webkit-transform: translateY(-10px);
        }
      }
    }
  }
  .superdev-footer {
    background: rgb(45, 45, 46);
    display: flex;
    padding: 3.5rem 3.75rem;
    flex-flow: column nowrap;
    justify-content: space-between;
    align-content: flex-start;
  
    &--item {
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      flex-flow: row wrap;
      width: 100%;
      text-transform: capitalize;
  
      &.logo {
        flex-flow: row;
      }
  
      .text-content {
        font-weight: 500;
      }
  
      h1:not(.footer-headline) {
        color: #ffffffa6 !important;
        margin-bottom: 0.75rem;
      }
  
      a,
      h1 {
        color: #fff;
        font-style: normal;
        font-weight: normal;
        font-size: 15px;
        text-decoration: none;
      }
  
      a:hover {
        text-decoration: underline;
      }
  
      &:nth-child(n) {
        margin: 1rem 0;
      }
  
      .footer-headline {
        align-self: center;
        font-size: 2rem;
        font-weight: 500;
        line-height: 45.36px;
      }
    }
  }
  .copyright {
    width: 100%;
    align-self: flex-end;
    font-size: 0.875rem;
    line-height: 17px;
  
    color: white;
  }
  .footer-space {
    &--item {
      height: 50%;
      background: $color__background;
      display: flex;
      justify-content: center;
      color: white;
    }
  }
  @media only screen and (max-width: 599.98px) {
    .superdev-footer {
      padding: 2.5rem 1.5rem;
  
      &--item {
        row-gap: 2.7rem;
        flex-flow: column;
  
        &:nth-child(n) {
          margin: 1.5rem 0;
        }
  
        &.logo {
          justify-content: center;
        }
  
        .footer-headline {
          font-size: 5vw;
        }
      }
    }
  }
  </style>
  