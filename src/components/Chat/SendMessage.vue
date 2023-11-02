<script lang="ts" setup>
import { ChatRepository } from '@/repositories/chat-repository';
import { useChatStore } from '@/stores/chat-store';

const chatRepository = new ChatRepository();

const chatStore = useChatStore();
</script>

<template>
    <button class="button is-primary" @click="chatStore.sendMessage()">Send Message</button>
</template>