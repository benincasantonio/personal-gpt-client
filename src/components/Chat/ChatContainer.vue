<script lang="ts" setup>
import { useRoute } from 'vue-router'
import MessageInput from './MessageInput.vue'
import SendMessage from './SendMessage.vue'
import { ref, watch, type Ref, nextTick, onUpdated } from 'vue'
import { useChatStore } from '@/stores/chat-store'
import type { Unsubscribe } from 'firebase/auth'
import { doc, getFirestore, onSnapshot } from 'firebase/firestore'
import markdownIt from 'markdown-it';
import Dialog from '@/components/UI/Dialog.vue'
import ChatHeader from './ChatHeader.vue'

let markdown = markdownIt();

const route = useRoute()

const instructionDialogVisible = ref(false);

const chatStore = useChatStore()

const firestore = getFirestore();

const messagesRef: Ref<HTMLDivElement | null>  = ref(null);

let snapshotSubscription: Unsubscribe | null = null

onUpdated(() => {
  nextTick(() => {
    if(messagesRef.value) {
      messagesRef.value?.scrollTo(0, messagesRef.value.scrollHeight);
    }
  })
})

watch(
  route,
  (value, oldValue) => {
    if (value.params.id != oldValue.params.id) {
      if (snapshotSubscription) snapshotSubscription()
      if (!value.params) chatStore.chat = null
    
      const chatRef = doc(firestore, `chats/${value.params.id}`);
        console.log(snapshotSubscription);
      snapshotSubscription = onSnapshot(chatRef, (snapshot) => {
        chatStore.chat = {
          id: snapshot.id,
          ...snapshot.data()
        }
      })
    }
  },
  {
    deep: true
  }
)
</script>

<template>
  <div class="chat">
    <Dialog v-model:visible="instructionDialogVisible">
      <input class="input" v-model="chatStore.message"/>
      <button class="button is-primary" @click="chatStore.addInstruction()">Send</button>
    </Dialog>
    <div class="chat-header">
      <ChatHeader />
      <button class="button" @click="instructionDialogVisible = true">Instructions</button>
    </div>
    <div class="messages" ref="messagesRef">
        <template v-if="chatStore.chat">
            <div  v-for="message in chatStore.chat.messages" :key="message.id">
                <b>{{ message.role }}:</b> &nbsp;
                <span v-html="markdown.render(message.message)"></span>
            </div>
        </template>
    </div>
    <div class="send-message">
      <MessageInput />
      <SendMessage />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.chat {
  flex: 1;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  overflow: auto;
  max-height: 100vh;

  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: .25rem 0;
    box-shadow: 0 0 1px rgba(0, 0, 0, .25);
  }

  .messages {
    flex: 1;
    background-color: #f5f5f5;
    overflow: auto;
  }

  .send-message {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: .25rem 0;
    column-gap: .5rem;
  }
}
</style>
