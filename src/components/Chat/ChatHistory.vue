<script lang="ts" setup>
import { ChatRepository } from '@/repositories/chat-repository';
import { useChatStore } from '@/stores/chat-store';
import { onSnapshot } from 'firebase/firestore';
import { ref, type Ref } from 'vue';
import { useRouter } from 'vue-router';

const chatRepository: ChatRepository = new ChatRepository();

const chats: Ref<any[]> = ref([]);

const router = useRouter();

const chatStore = useChatStore();

chatRepository.getChats().then((chatsRef) => {
  onSnapshot(chatsRef, (snapshot) => {
    chats.value = snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data()
      }
    })
  })
});


const selectChat = (chat: any) => {
  chatStore.chat = chat;

  router.push('/chat/' + chat.id);
}

const newChat = () => {
  chatStore.chat = null;
  router.push('/chat/new');
}

</script>

<template>
  <div class="chat-history has-text-light">
    <h1 class="subtitle has-text-light" @click="newChat">Chat History</h1>
    <div class="chat-history-item">New Chat</div>
    <div v-for="chat in chats" :key="chat.id" class="chat-history-item" @click="selectChat(chat)">
      {{ chat.name ?? chat.messages[0].text }}
    </div>
  </div>
</template>

<style lang="scss" scoped>

.chat-history {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  overflow: hidden;

  h1 {
    margin: 1rem;
  }
  

  .chat-history-item {
    width: 100%;
    margin: .5rem;
    padding: .5rem;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;
    user-select: none;
    border-radius: 0.5rem;
    white-space: pre-wrap;

    &:hover {
      background-color: #34495e;
    }
  }
}
</style>