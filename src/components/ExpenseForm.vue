<script setup>
import { ref, computed, onMounted, defineEmits, nextTick } from 'vue'
import { storeToRefs } from 'pinia'
import { useRecordStore } from '@/stores/recordStore'
import { useErrorMessageStore } from '@/stores/errorMessageStore'
import { getAuth } from 'firebase/auth'

const emit = defineEmits(['close'])

const recordStore = useRecordStore()
const { date } = storeToRefs(recordStore)
const errorMessageStore = useErrorMessageStore()
const { errors } = storeToRefs(errorMessageStore)

const auth = getAuth()
const uid = auth.currentUser?.uid

const toggleAmountType = () => {
  newAmountType.value = !newAmountType.value
  nextTick(() => {inputRef.value?.focus()})
}

const amountTypeText = computed(() => newAmountType.value ? '支出' : '収入')

const newAmount = ref('')
const newDate = ref(date.value)
const newCategory = ref('')
const newMemo = ref('')
const newAmountType = ref(true)

const handleSubmit = () => {
  if (!validateForm()) return

  const newRecord = {
    amount: Number(newAmount.value),
    date: newDate.value,
    category: newCategory.value,
    memo: newMemo.value.trim(),
    amountType: newAmountType.value,
  }
  recordStore.addRecord(newRecord)
  emit('close')

  //入力のリセット
  newAmount.value = ''
  newDate.value = date.value
  newCategory.value = ''
  newMemo.value= ''
  newAmountType.value = true
}

const inputRef = ref(null)
onMounted(() => {
  if (inputRef.value) {
    inputRef.value.focus()
  }
})

const validateForm = () => {
    let valid = true
    errors.value.amount = ''
    errors.value.date = ''
    errors.value.category = ''
    errors.value.memo = ''

    const amountNum = Number(newAmount.value)
    if (!newAmount.value || isNaN(amountNum) || Number(newAmount.value) <= 0 || Number(newAmount.value) >= 100000000) {
      errorMessageStore.errorAmount()
    }
  
    if (!newDate.value) {
      errorMessageStore.errorDate()
    }
  
    if (!newCategory.value) {
      errorMessageStore.errorCategory()
    }

    if (String(newMemo.value).length >= 30) {
      errorMessageStore.errorMemo()
    } 
  
    return valid
}
</script>

<template>
  <form class="form" @submit.prevent="handleSubmit()">
    <h2>
      <button type="button" @click="toggleAmountType()" class="toggle-button">{{ amountTypeText }}</button>
      を入力
    </h2>
    <div class="money-input">
      <label>
        <div class="error">{{ errors.amount }}</div>
        <input type="number" placeholder="¥" v-model="newAmount" class="money" ref="inputRef"/>
      </label>
      
      <label>
        日付
        <div class="error">{{ errors.date }}</div>
        <input v-model="newDate" type="date" />
      </label>
      <label>
        カテゴリ
        <div class="error">{{ errors.category }}</div>
        <select v-model="newCategory">
          <option value="食費">食費</option>
          <option value="交通費">交通費</option>
          <option value="家賃">家賃</option>
          <option value="光熱費">光熱費</option>
          <option value="交際費">交際費</option>
          <option value="その他">その他</option>
          <option value="給与">給与</option>
        </select>
      </label>
      <label>
        メモ
        <div class="error">{{ errors.memo }}</div>
        <input type="text" placeholder="メモ" v-model="newMemo" />
      </label>
    </div>
    <button type="submit" class="submit-button">保存する</button>
  </form>
</template>

<style>
.toggle-button {
  background-color: white;
  color: #FF97C2;
  font-weight: bold;
  font-size: 25px;
  cursor: pointer;
}
.submit-button {
  margin-top: 30px;
}
button {
  border: 1px solid #FF97C2;
  border-radius: 5px;
  padding: 5px 10px;
  margin-right: 10px;
  background-color: #FF97C2;
  box-shadow: 5px 5px 10px -5px #FF97C2;
  color: white;
  cursor: pointer;
}
button:active {
  box-shadow: none;
  position: relative;
  top: 3px;
  left: 3px;
}
label {
  display: flex;
  flex-direction: column;
  margin: 20px 0;
}
input,select {
  padding: 10px;
  border: 1px solid #FF97C2;
  border-radius: 5px;
}
input::placeholder {
  color: #BBBBBB;
}
.money {
  border: none;
  border-bottom: 3px solid #FF97C2;
  font-size: 30px;
}
.error {
  color: red;
  font-size: 0.8rem;
  margin-top: 2px;
}
</style>