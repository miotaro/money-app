import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useModalStore = defineStore('modal', () => {
  const isModalOpen = ref(false)
  const toggleModal = () => {
    isModalOpen.value = !isModalOpen.value
  }

  return {
    isModalOpen,
    toggleModal
  }
})