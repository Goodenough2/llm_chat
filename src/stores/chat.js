// conversations: 所有对话列表，每个对话包含 id、title、messages 和 createdAt。
// currentConversationId: 当前选中的对话 ID。
// currentConversation: 当前选中的对话。
// currentMessages: 当前对话的消息列表。
// isLoading: 加载状态。
// createConversation: 创建新对话。
// switchConversation: 切换对话。
// addMessage: 添加消息到当前对话。
// setIsLoading: 设置加载状态。
// updateLastMessage: 更新最后一条消息的内容。
// getLastMessage: 获取当前对话的最后一条消息。
// updateConversationTitle: 更新对话标题。
// deleteConversation: 删除对话。

import { ref, computed} from 'vue'
import { defineStore } from 'pinia'


export const useChatStore = defineStore(
  'llm-chat',
  () => {
    // 所有对话列表
    const conversations = ref([
      // {
      //   id: '1',
      //   title: '日常问候',
      //   messages: [],
      //   createdAt: Date.now(),
      // },
    ])

    // 当前选中的对话 ID
    const currentConversationId = ref(null)

    // const STORAGE_KEY = 'llm-chat-conversations'

    // const loadConversations = async () => {
    //   // 从本地存储加载对话
    //   const storedConversations = localStorage.getItem(STORAGE_KEY )
    //   if (storedConversations) {
    //     conversations.value = JSON.parse(storedConversations)
    //   }
    // }
    // const saveConversations = async () => {
    //   // 将对话保存到本地存储
    //   localStorage.setItem(STORAGE_KEY , JSON.stringify(conversations.value))
    // }

    // // 初始化时加载对话
    // loadConversations()


    // 加载状态
    const isLoading = ref(false)

    // 获取当前对话
    const currentConversation = computed(() => {
      return conversations.value.find((conv) => conv.id === currentConversationId.value)
    })

    // 获取当前对话的消息
    const currentMessages = computed(() => currentConversation.value?.messages || [])

    // 创建新对话
    const createConversation = (conversationId) => {
      const newConversation = {
        id: conversationId,
        title: '日常问候',
        messages: [],
        createdAt: Date.now(),
      }
      conversations.value.unshift(newConversation)
      currentConversationId.value = newConversation.id
      // saveConversations()
    }

    // 切换对话
    const switchConversation = (conversationId) => {
      currentConversationId.value = conversationId
    }

    // 添加消息到当前对话
    const addMessage = (message, chatId) => {
      const target = conversations.value.find(c => c.id === chatId)
      if (target) {
        target.messages.push({
          id: Date.now(),
          timestamp: new Date().toISOString(),
          ...message,
        })
      }
      // saveConversations()
    }

    const setIsLoading = (value) => {
      isLoading.value = value
    }

    const updateLastMessage = (content, reasoning_content, completion_tokens, speed, chatId) => {
      const target = conversations.value.find(c => c.id === chatId)

      if (target?.messages.length > 0) {
        const lastMessage =
        target.messages[target.messages.length - 1]
        lastMessage.content = content
        lastMessage.reasoning_content = reasoning_content
        lastMessage.completion_tokens = completion_tokens
        lastMessage.speed = speed
      }
    }

    const getLastMessage = (chatId) => {
      const target = conversations.value.find(c => c.id === chatId)

      if (target?.messages.length > 0) {
        return target.messages[target.messages.length - 1]
      }
      // if (currentConversation.value?.messages.length > 0) {
      //   return currentConversation.value.messages[currentConversation.value.messages.length - 1]
      // }
      return null
    }

    // 更新对话标题
    const updateConversationTitle = (conversationId, newTitle) => {
      const conversation = conversations.value.find((c) => c.id === conversationId)
      if (conversation) {
        conversation.title = newTitle
      }
      // saveConversations()
    }

    // 删除对话
    const deleteConversation = async (conversationId) => {
      console.log(conversations.value)
      const index = conversations.value.findIndex((c) => c.id === conversationId)
      
      if (index !== -1) {
        conversations.value.splice(index, 1)
        // 如果删除的是当前对话，切换到第一个对话
        if (conversationId === currentConversationId.value) {
          currentConversationId.value = conversations.value[0].id
        }
      }
      // saveConversations()
    }



    return {
      conversations,
      currentConversationId,
      currentConversation,
      currentMessages,
      isLoading,
      addMessage,
      setIsLoading,
      updateLastMessage,
      getLastMessage,
      createConversation,
      switchConversation,
      updateConversationTitle,
      deleteConversation,
    }
  },
  {
    persist: true,
  },
)