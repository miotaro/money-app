<script setup>
import { onMounted } from 'vue';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import HeaderBar from './components/HeaderBar.vue';
import { storeToRefs } from 'pinia'
import ExpenseForm from './components/ExpenseForm.vue'
import { useModalStore } from './stores/modalOpenStore';
import { useAuthStore } from './stores/authStore';

const modalStore = useModalStore()
const { isModalOpen } = storeToRefs(modalStore)
const authStore = useAuthStore()
const { isLoggedIn } = storeToRefs(authStore)

onAuthStateChanged(auth, user => {
  console.log('ログイン状態', user)
})

onMounted(() => {
  authStore.fetchUser()
})
</script>

<template>
  <div>
    <HeaderBar />
    <router-view class="router-view"/>
    <div v-if="!isModalOpen && isLoggedIn" @click="modalStore.toggleModal()" class="add-form">
      <font-awesome-icon :icon="['fas', 'plus']" />
    </div>
    <div v-if="isModalOpen" @click.self="modalStore.toggleModal()" class="modal-overlay" >
      <ExpenseForm
        class="expense-form"
        @close="modalStore.toggleModal"
      />
    </div>
  </div>
</template>

<style>
html, body {
  margin: 0;
  padding: 0;
}
body {
  background-color: #FFD5EC;
  font-family: '07にくまるフォント';
}
.router-view {
  padding-top: 100px;
  max-width: 500px;
  margin: auto;
}
.add-form {
  background-color: #FF367F;
  opacity: 0.4;
  transition: opacity 0.3s ease;
  color: white;
  font-size: 35px;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  bottom: 50px;
  right: 20px;
  position: fixed;
  z-index: 1000;
}
.add-form:hover {
  opacity: 1;
}
.expense-form {
  max-width: 400px;
  height: 500px;
  padding: 50px;
  margin: auto;
  border-radius: 10px;
  background-color: white;
}
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3); /* 半透明の背景 */
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}

@media (max-width: 1024px) {
  .expense-form {
    margin-top: 100px;
    padding: 30px 50px;
  }
}
@media (max-width: 425px) {
  .expense-form {
    padding: 20px 20px 0 20px;
  }
  .router-view {
    padding-top: 100px;
    max-width: 320px;
  }

}
</style>
