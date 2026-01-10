<script setup>
    defineProps(['imageUrl', 'placeholder'])
</script>

<template>
    <button class="rounded-lg bg-neutral-100 py-2 px-4 text-black font-semibold">
        {{ placeholder }}
    </button>
</template>

<style scoped></style>