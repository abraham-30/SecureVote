<script setup>
    defineProps(['imgUrl', 'title', 'description'])
</script>

<template>
    <div class="w-full p-4 bg-neutral-200/20 backdrop-blur-sm rounded-lg border-1 border-neutral-400">
        <div class="flex flex-col gap-1">
            <div>
                <div class="h-10">
                    <img :src="imgUrl" alt="" class="h-full">
                </div>
            </div>
            <div class="text-2xl font-semibold">
                <span>
                    {{ title }}
                </span>
            </div>
            <div class="text-sm">
                <span>
                    {{ description }}
                </span>
            </div>
        </div>
    </div>
</template>

<style scoped></style>