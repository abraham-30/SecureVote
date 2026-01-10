<script setup>
    import iconUrl from '@/assets/icon-neutralgrey200.png'
    import CustomButton from './Button.vue';
    import { ref } from 'vue';
    const Username = ref('John Doe')
</script>

<template>
    <div class="bg-neutral-600/20 border-b-1 border-neutral-400 text-neutral-100 backdrop-blur-sm">
        <div class="w-dvw h-auto">
            <div class="w-full flex flex-row items-center justify-between px-32 py-4">
                <div class="flex flex-row items-center gap-8">
                    <div class="h-3.5">
                        <img :src="iconUrl" alt="" class="h-full">
                    </div>
                    <div class="hidden">
                        <nav class="flex gap-4">
                            <a href="">My Organizations</a>
                            <a href="">Lorem Ipsum</a>
                            <a href="">Lorem Ipsum</a>
                        </nav>
                    </div>
                </div>
                <div class="flex flex-row items-center gap-4">
                    <div class="font-semibold">
                        Hi, {{ Username }}
                    </div>
                    <div>
                        <CustomButton placeholder="Sign Out"></CustomButton>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>