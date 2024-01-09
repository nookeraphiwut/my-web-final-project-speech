<template>
    <div class="bg-category">
        <section class="section-category">
            <p class="text-category">หมวดหมู่ > </p>
            <ul class="d-flex">
                <li 
                v-for="(i, k) in 16"
                :key="k"
                class="text-category">
                    <nuxt-link>มาใหม่</nuxt-link>
                </li>                           
            </ul>
        </section>
    </div>
</template>

<style lang="scss" scoped>
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
    background: #E8E8E8;
    justify-content: center;
    align-items: center; 
    border-radius: 50px;
}
.text-category {
    text-align: center;
    list-style: none;
    font-size: 20px;
    font-family: 'Noto Sans Thai', sans-serif !important;
    padding-right: 20px;
    color: black;
    cursor: pointer;
  }

</style>