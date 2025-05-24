import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useErrorMessageStore = defineStore('error-message', () => {
  const errors = ref({
    amount: '',
    date: '',
    category: '',
    memo: '',
    email: '',
    password: ''
  })

  const errorAmount = () => {
    errors.value.amount = '金額は1円以上1億円未満の数字を入力してください'
    valid = false
  }

  const errorDate = () => {
    errors.value.date = '日付を選択してください'
    valid = false
  }

  const errorCategory = () => {
    errors.value.category = 'カテゴリを選択してください'
    valid = false
  }

  const errorMemo = () => {
    errors.value.memo = 'メモは30文字以下で入力してください'
    valid = false
  }

  const errorEmail = () => {
    errors.value.email = '@を含んだメールアドレスの形式で入力してください'
  }

  const errorPassword = () => {
    errors.value.password = '4文字以上12文字以下で入力してください'
  }
  
  return {
    errors,
    errorAmount,
    errorDate,
    errorCategory,
    errorMemo,
    errorEmail,
    errorPassword
  }
})