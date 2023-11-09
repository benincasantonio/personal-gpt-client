import { useUserStore } from '@/stores/user-store'
import {
  getFirestore,
  collection,
  query,
  where,
  type DocumentData,
  Query,
  orderBy
} from 'firebase/firestore'

export class ChatRepository {
  private readonly baseUrl = import.meta.env.VITE_CHAT_BASE_URL

  private readonly userStore = useUserStore()
  private readonly firestore = getFirestore()

  public async getChats(): Promise<Query<DocumentData>> {
    if (!this.userStore.isLoggerIn) {
      throw new Error('User is not logged in')
    }
    const chatRefs = collection(this.firestore, 'chats')

    const q = query(
      chatRefs,
      where('participants', 'array-contains', this.userStore.user!.uid),
      orderBy('lastMessageAt', 'desc'),
      orderBy('createdAt', 'desc')
    )

    return q
  }

  public createChat(message: string) {
    const idToken = this.userStore.token
    return fetch(`${this.baseUrl}/chat`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${idToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message })
    }).then((response) => response.json())
  }

  public addInstructionById(chatId: string, message: string) {
    const idToken = this.userStore.token
    return fetch(`${this.baseUrl}chat/${chatId}/instruction`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${idToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message })
    }).then((response) => response.json())
  }

  public addInstruction(message: string) {
    const idToken = this.userStore.token
    return fetch(`${this.baseUrl}chat/instruction`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${idToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message })
    }).then((response) => response.json())
  }

  public sendMessage(chatId: string, message: string) {
    const idToken = this.userStore.token
    console.log(chatId)
    return fetch(`${this.baseUrl}/chat/${chatId}/message`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${idToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message })
    }).then((response) => response.json())
  }
}
