<script setup lang="ts">
import { useChatStore } from '@/stores/chat-store';

const chatStore = useChatStore();
</script>

<template>
    <input type="text" class="input" placeholder="Message" v-model="chatStore.message" @keyup.enter="chatStore.sendMessage"/>
</template>