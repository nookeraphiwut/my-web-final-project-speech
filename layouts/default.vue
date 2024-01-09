<template>
    <section>
        <LayoutNavBar/>
        <div>
            <slot></slot>
        </div>
    </section>
</template>
<script setup lang="ts">
import LayoutNavBar from '~/components/layouts/navbar/LayoutNavBar.vue'
</script>