<script lang="ts" setup>
import { useChatStore } from '@/stores/chat-store';

const chatStore = useChatStore();
</script>

<template>
    <div class="chat-bar">
        <div class="chat-bar__menu-icon">
            <i class="material-icons" @click="chatStore.isHistoryVisible = !chatStore.isHistoryVisible">menu</i>
        </div>
        <h1>{{ chatStore?.chat?.name }}</h1>
        <div class="chat-bar__bottom-line"></div>
    </div>
</template>

<style lang="scss" scoped>
.chat-bar {
    display: flex;
    width: 100%;
    position: relative;

    &__menu-icon i {
        cursor: pointer;
        
        @media (width >= 768px) {
            display: none;
        }
    }

    &__bottom-line {
        height: 1px;
        width: 100%;
        background-color: #f5f5f5;
        position: absolute;
        bottom: 0;
    }
}
</style>

