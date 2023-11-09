<script lang="ts" setup>
import { ChatRepository } from '@/repositories/chat-repository'
import { useChatStore } from '@/stores/chat-store'
import { onSnapshot } from 'firebase/firestore'
import { ref, type Ref } from 'vue'
import { useRouter } from 'vue-router'

const chatRepository: ChatRepository = new ChatRepository()

const chats: Ref<any[]> = ref([])

const router = useRouter()

const chatStore = useChatStore()

chatRepository.getChats().then((chatsRef) => {
  onSnapshot(chatsRef, (snapshot) => {
    chats.value = snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data()
      }
    })
  })
})

const selectChat = (chat: any) => {
  chatStore.chat = chat

  router.push('/chat/' + chat.id)
}

function newChat() {
  router.push({ name: 'chat' })
  chatStore.chat = null
}

function overlayClick(e: MouseEvent) {
  e.stopPropagation()

  chatStore.isHistoryVisible = false
}
</script>

<template>
  <div
    class="chat-history-overlay"
    :class="{ 'chat-history-overlay__visible': chatStore.isHistoryVisible }"
    @click="overlayClick"
  ></div>
  <div
    class="chat-history has-text-light"
    :class="{
      'chat-history__visible': chatStore.isHistoryVisible,
      'chat-history__hidden': !chatStore.isHistoryVisible
    }"
  >
    <div class="chat-history-item chat-history-item--new-chat" @click="newChat">
      <i class="material-icons">add</i>
      <span>New Chat</span>
    </div>
    <div v-for="chat in chats" :key="chat.id" class="chat-history-item" @click="selectChat(chat)">
      {{ chat.name ?? chat.messages[0].text }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
.chat-history-overlay {
  position: fixed;
  z-index: 1;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  display: none;
  background-color: rgba(0, 0, 0, 0.5);

  &__visible {
    position: fixed;
    display: block;
  }

  @media (width >= 768px) {
    display: none;
  }
}
.chat-history {
  position: fixed;
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  overflow: hidden;
  width: 55%;
  transition: transform 0.2s ease-in-out;
  height: 100vh;
  max-height: 100vh;
  background-color: #2c3e50;
  overflow-y: scroll;

  &__visible {
    transform: translateX(0);
  }

  &__hidden {
    transform: translateX(-100%);
  }

  @media (width >= 768px) {
    width: 30%;
    height: 100vh;
    position: relative;

    &__visible,
    &__hidden {
      transform: translateY(0);
    }
  }

  h1 {
    margin: 1rem;
  }

  .chat-history-item {
    width: 100%;
    max-width: 100%;
    padding: 1rem;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;
    user-select: none;
    border-radius: 0.5rem;
    white-space: pre-wrap;

    &--new-chat {
      border: 1px solid #f5f5f5;
      padding: .5rem;
      display: flex;
      align-items: center;
      margin: 1rem;
      width: calc(100% - 2rem);

      span {
        margin-left: .25rem;
      }
    }

    &:hover {
      background-color: #34495e;
    }
  }
}
</style>
