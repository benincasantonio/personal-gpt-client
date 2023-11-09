<script lang="ts" setup>
import { useChatStore } from '@/stores/chat-store';

const chatStore = useChatStore();
</script>

<template>
    <button class="button is-primary" @click="chatStore.sendMessage()">
        <i class="material-icons">send</i>
    </button>
</template>