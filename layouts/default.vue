<template>
    <section>
        <LayoutNavBar/>
        <div>
            <slot></slot>
        </div>
        <LayoutFooter/>
    </section>
</template>
<script setup lang="ts">
import LayoutNavBar from '~/components/layouts/navbar/LayoutNavBar.vue'
import LayoutFooter from '~/components/layouts/footer/LayoutFooter.vue'
</script>