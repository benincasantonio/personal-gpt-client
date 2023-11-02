<script lang="ts" setup>
import ChatHistory from '@/components/Chat/ChatHistory.vue';
import { useChatStore } from '@/stores/chat-store';
import { getFirestore, doc, onSnapshot } from 'firebase/firestore';
import { useRoute } from 'vue-router';
import Chat from '@/components/Chat/Chat.vue';

const chatStore = useChatStore();

const route = useRoute();

const id = route.params.id;

if(id) {
    const firestore = getFirestore();
    const chatDocRef = doc(firestore, 'chats/' + id);

    onSnapshot(chatDocRef, (snapshot) => {
        chatStore.chat = {
            id: snapshot.id,
            ...snapshot.data()
        };
    });
    
    

} else {
    chatStore.chat = null;
}
</script>

<template>
    <div class="chat-container">
        <ChatHistory />
        <Chat/>
    </div>
</template>

<style lang="scss" scoped>
.chat-container {
    display: flex;
    min-height: 100vh;
    width: 100%;
    background-color: #f5f5f5;

    :deep(.chat-history) {
        height: 100vh;
        width: 25%;
        background-color: #2c3e50;
    }

    :deep(.chat) {
        flex: 1;
        padding: 1rem;
    }
}


</style>