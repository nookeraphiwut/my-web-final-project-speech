<template>
    <v-container>
      <promotions/>
    <productPages/>
    </v-container>
</template>
<script setup lang="ts">
import productPages from '~/components/pages/landing/productPages.vue'
import promotions from '~/components/pages/landing/promotions.vue'


useHead({
  title: "SHEINN | Homepage",
})
</script>
<style lang="scss" scoped>
.box{
    margin: 0;
}
</style>