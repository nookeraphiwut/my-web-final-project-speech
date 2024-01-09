<template>
    <section class="bg-category-sub">   
        <div class="content-box">
            <div 
            v-for="(item, k) in 4"
            :key="k"
            class="list-box">
                <div class="img-box">
                    
                </div>
                <div class="text-box">
                    <p>เสื้อแขนยาว</p>
                </div>
            </div>
        </div>
        <div class="content-box">
            <div 
            v-for="(item, k) in 6"
            :key="k"
            class="list-box">
                <div class="img-box">
                    
                </div>
                <div class="text-box">
                    <p>กางเกงขาสั้น</p>
                </div>
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
.bg-category-sub{

    height: calc(30dvh - 72px);
    height: auto;
}
.content-box{
    display: flex;
    justify-content: center;
    align-items: center;
    height: auto;
    .list-box{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 200px;
        height: 85px;
        border-radius: 40px;
        background: #D9D9D9;
        margin: 10px;

        .img-box{
            width: 80px;
            height: 75px;
            background-color: #ffffff;
            border-radius: 50%;
            margin-left: 5px;
        }
        .text-box{
            margin-left: 10px;
            margin-right: 20px;
            p{
                font-family: 'Noto Sans Thai', sans-serif !important;
            }
        }
    }
}
</style>