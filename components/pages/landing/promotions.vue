<template>
    <div 
    v-if="!$vuetify.display.smAndDown"
    class="bg-promotion">      
        <NuxtImg
        src="images/promotion2.jpg"
        alt=""
        class="img-promotion"
        ></NuxtImg>    
    </div>
</template>

<style lang="scss" scoped>
.bg-promotion{
    height: auto;
    width: auto;
    margin-bottom: 30px;
    margin-top: 60px;

}
.img-promotion{
    width: 100%;
    height: 100%;
}
</style>