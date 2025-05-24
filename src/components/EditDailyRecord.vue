<script setup>
import { ref, watch, computed, defineProps, defineEmits } from 'vue'
import { storeToRefs } from 'pinia'
import { useRecordStore } from '@/stores/recordStore'
import { useErrorMessageStore } from '@/stores/errorMessageStore'
import { updateRecordInFirestore } from "@/composables/useFirestore";

const recordStore = useRecordStore()
const { records } = storeToRefs(recordStore)
const errorMessageStore = useErrorMessageStore()
const { errors } = storeToRefs(errorMessageStore)

const props = defineProps({
  editRecord: String,
  editAmount: Number,
  editDate: String,
  editCategory: String,
  editMemo: String,
  editAmountType: Boolean,
  index: Number
})
const emit = defineEmits([
  'update:editAmount',
  'update:editDate',
  'update:editCategory',
  'update:editMemo',
  'update:editAmountType',
  'cancel-edit'
])

const localAmount = ref(props.editAmount)
const localDate = ref(props.editDate)
const localCategory = ref(props.editCategory)
const localMemo = ref(props.editMemo)
const localAmountType = ref(props.editAmountType)

watch(localAmount, val => emit('update:editAmount', val))
watch(localDate, val => emit('update:editDate', val))
watch(localCategory, val => emit('update:editCategory', val))
watch(localMemo, val => emit('update:editMemo', val))
watch(localAmountType, val => emit('update:editAmountType', val))

watch(() => props.editRecord, () => {
  localAmount.value = props.editAmount
  localDate.value = props.editDate
  localCategory.value = props.editCategory
  localMemo.value = props.editMemo
  localAmountType.value = props.editAmountType
})

const saveEdit = async (id) => {
  if (!validateForm()) return

  const index = records.value.findIndex(r => r.id === id)
  if (index !== -1) {
    records.value[index] = {
      ...records.value[index],
      amount: Number(localAmount.value),
      date: localDate.value,
      category: localCategory.value,
      memo: localMemo.value,
      amountType: Boolean(localAmountType.value),
    }
    emit('cancel-edit')
    await updateRecordInFirestore(records.value[index]);
  }
}

const handleCancel = () => {
  emit('cancel-edit')
}

const toggleAmountType = () => {
  localAmountType.value = !localAmountType.value
}
const amountTypeText = computed(() => localAmountType.value ? '支出' : '収入')

// const inputRef = ref([])
// watch(() => props.editRecord, (newVal) => {
//   if (newVal !== null) {
//     nextTick(() => { inputRef.value[props.index]?.focus() })
//   }
// })
// watch(() => localAmountType.value, () => {
//   nextTick(() => { inputRef.value[props.index]?.focus() })
// })
const validateForm = () => {
    let valid = true
    errors.value.amount = ''
    errors.value.date = ''
    errors.value.category = ''
    errors.value.memo = ''

    const amountNum = Number(localAmount.value)
    if (!localAmount.value || isNaN(amountNum) || Number(localAmount.value) <= 0 || Number(localAmount.value) >= 100000000) {
      errorMessageStore.errorAmount()
    }
  
    if (!localDate.value) {
      errorMessageStore.errorDate()
    }
  
    if (!localCategory.value) {
      errorMessageStore.errorCategory()
    }

    if (String(localMemo.value).length >= 30) {
      errorMessageStore.errorMemo()
    } 
  
    return valid
  }

</script>

<template>
  <div>
    <form ref="formRef" class="form" @submit.prevent="saveEdit(props.editRecord)">
      <div class="error">{{ errors.amount }}</div>
      <div class="edit-form">
        <input type="number" placeholder="￥" v-model="localAmount" class="money"/>
        <button type="button" @click="toggleAmountType()" class="edit-button toggle-button">{{ amountTypeText }}</button>
      </div>
      <div class="meta">
        <div class="error">{{ errors.date }}</div>
        <input type="date" v-model="localDate"/>
        <div class="error">{{ errors.category }}</div>
        <select v-model="localCategory">
          <option value="食費">食費</option>
          <option value="交通費">交通費</option>
          <option value="家賃">家賃</option>
          <option value="光熱費">光熱費</option>
          <option value="交際費">交際費</option>
          <option value="その他">その他</option>
          <option value="給与">給与</option>
        </select>
        <div class="error">{{ errors.memo }}</div>
        <input type="text" placeholder="メモ" v-model="localMemo"/>
      </div>
      <button type="submit" class="submit-button">保存する</button>
      <button class="edit-cancel submit-button" @click.stop="handleCancel()">キャンセル</button>
    </form>
  </div>
</template>

<style>
.edit-cancel {
  background-color: white;
  color: #FF97C2;
}
</style>