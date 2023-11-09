import { ChatRepository } from '@/repositories/chat-repository'
import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'
import { useRouter } from 'vue-router';

export const useChatStore = defineStore('chat', () => {
  const chat: Ref<any> = ref(undefined);
  const isHistoryVisible: Ref<boolean> = ref(false);
  const chatRepository = new ChatRepository()

  const message = ref('')

  const router = useRouter();

  async function sendMessage() {
    if (!message.value) return;
    const messageText = message.value;
    message.value = '';
    if (!chat.value) {
        const result = await chatRepository.createChat(messageText);

        if(result.id) {
          chat.value = result;
          router.push({ name: 'chat', params: { id: result.id } });
        }
    } else {
        await chatRepository.sendMessage(chat.value.id, messageText);
    }
  }

  async function addInstruction() {
    if (!message.value) return;
    const messageText = message.value;
    message.value = '';
    if (!chat.value) {
        await chatRepository.addInstruction(messageText);
    } else {
        await chatRepository.addInstructionById(chat.value.id, messageText);
    }
  }

  return {
    isHistoryVisible,
    chat,
    message,
    sendMessage,
    addInstruction,
  }
})
