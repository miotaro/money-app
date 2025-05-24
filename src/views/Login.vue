<script setup>
import { ref } from 'vue'
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'vue-router' 
import { useErrorMessageStore } from '@/stores/errorMessageStore'
import { storeToRefs } from 'pinia'

const errorMessageStore = useErrorMessageStore()
const { errors } = storeToRefs(errorMessageStore)

const email = ref('')
const password = ref('')
const showPassword = ref(false)
const router = useRouter()
const isLoginMode = ref(true) //trueはログイン、falseは新規登録

const toggleMode = () => {
  isLoginMode.value = !isLoginMode.value
}

const handleSubmit = async () => {
  if (!validateForm()) return

  const auth = getAuth()
  try {
    if (isLoginMode.value) {
      await signInWithEmailAndPassword(auth, email.value, password.value)
    } else {
      await createUserWithEmailAndPassword(auth, email.value, password.value)
    }
    router.push('/')
  } catch {
    alert('失敗:' + error.message)
  }
}

const validateForm = () => {
    let valid = true
    errors.value.email = ''
    errors.value.password = ''

    if (!email.value || !email.value.includes('@')) {
      errorMessageStore.errorEmail()
    }
    if (!password.value || password.value.length <= 3 || password.value.length >= 13) {
      errorMessageStore.errorPassword()
    }
    return valid
}

</script>

<template>
  <div>
    <h2>{{ isLoginMode ? 'ログイン' : '新規登録' }}</h2>
    <label>
      メールアドレス
      <div class="error">{{ errors.email }}</div>
      <input v-model="email" />
    </label>
    <label>
      パスワード
      <div class="error">{{ errors.password }}</div>
      <input :type="showPassword ? 'text' : 'password'" v-model="password" />
    </label>
    <input type="checkbox" v-model="showPassword" class="check-box"/>
    <label>パスワードを表示</label>
    <button @click="handleSubmit">{{ isLoginMode ? 'ログイン' : '新規登録' }}</button>
    <a href="#" @click.prevent="toggleMode">
      {{ isLoginMode ? '新規登録はこちら ＞' : 'ログインはこちら ＞' }}
    </a>
  </div>
</template>

<style>
.check-box {
  float: left;
  margin-right: 10px;
}
</style>