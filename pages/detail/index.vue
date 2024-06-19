<template>
    <section class="bg">
        <v-row justify="center" >
            <v-col cols="6">
                <v-row class="bg-content">
                    <v-col>
                        <div class="bg-box">
                            <h1>Apologize, product information was not found.
                                Please return to the home page.</h1>
                        </div>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </section>
</template>

<script setup lang="ts">
useHead({
  title: "SHEINN | Detail Not Found.",
})
</script>

<style lang="scss" scoped>
.bg{
    background-color: #f4f4f4;
    height: calc(100dvh - 72px);
    width: 100%;
}
.bg-content{
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    height: calc(100dvh - 72px);
}
.bg-box{
    display: grid;
    justify-content: center;
    align-items: center;
    text-align: center;
    background-color: white;
    height: 200px;
    margin: 40px;

}
</style>