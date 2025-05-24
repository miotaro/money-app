<script setup>
import { ref } from 'vue'
import EditDailyRecord from './EditDailyRecord.vue'
import { storeToRefs } from 'pinia'
import { useRecordStore } from '@/stores/recordStore'
import { useFormatDateStore } from '@/stores/formatDateStore'
import { useCategoryColorsStore } from '@/stores/categoryColorsStore'

const recordStore = useRecordStore()
const { recordsByDateSorted } = storeToRefs(recordStore)
const formatDateStore = useFormatDateStore()
const categoryColorStore = useCategoryColorsStore()

const getDailyExpenseTotal = (records) => {
  return records
    .filter(record => record.amountType)
    .reduce((sum, record) => sum + Number(record.amount), 0)
}

const editRecord = ref(null)
const editAmount = ref('')
const editDate = ref('')
const editCategory = ref('')
const editMemo = ref('')
const editAmountType = ref(null)

const startEdit = (record) => {
  editRecord.value = record.id
  editAmount.value = record.amount
  editDate.value = record.date
  editCategory.value = record.category
  editMemo.value = record.memo || ''
  editAmountType.value = record.amountType
}
const cancelEdit = () => {
  editRecord.value = null
  editAmount.value = ''
  editDate.value = ''
  editCategory.value = ''
  editMemo.value = ''
  editAmountType.value = null
}
</script>

<template>
  <div>
    <div 
      v-for="(records, date) in recordsByDateSorted"
      :key="date"
    >
      <h3>{{ formatDateStore.formatDate(date) }}</h3>
      <p v-if="getDailyExpenseTotal(records) > 0" class="daily-total">今日の支出： -￥{{  getDailyExpenseTotal(records).toLocaleString() }}</p>
      <ul>
        <li
          v-for="(record, index) in records"
          :key="record.id"
          @click="startEdit(record)"
        >
          <EditDailyRecord
            v-if="editRecord === record.id"
            :editRecord = "editRecord"
            v-model:editAmount = "editAmount"
            v-model:editDate = "editDate"
            v-model:editCategory = "editCategory"
            v-model:editMemo = "editMemo"
            v-model:editAmountType = "editAmountType"
            @cancel-edit = "cancelEdit"
            :index = "index"
          />
          <div v-else>
            <div class="amount-delete">
              <div class="amount-list" :class="{ income: !record.amountType, expense: record.amountType }">
                {{ record.amountType ? '-' : '+' }}￥{{ record.amount.toLocaleString() }}
              </div>
              <font-awesome-icon 
                :icon="['fas', 'circle-xmark']"
                class="delete-button"
                @click="recordStore.deleteRecord(record.id)"
              />
            </div>
            <div class="meta">
              <span class="category" :style="{ color: `${categoryColorStore.categoryColors[record.category] || '#CCCCCC'}`}">
                {{ record.category }}
              </span>
              <span v-if="record.memo" class="memo">
                <font-awesome-icon :icon="['fas', 'note-sticky']" />
                {{ record.memo }}
              </span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style>
.daily-total {
  font-size: 15px;
  color: gray;
}
li {
  list-style: none;
  background-color: white;
  box-shadow: 10px 10px 15px -10px #FF82B2;
  border-radius: 5px;
  margin: 20px;
  padding: 10px 20px 10px 20px;
}
.amount-delete {
  display: flex;
  justify-content: space-between;
} 
.delete-button {
  color: gray;
  opacity: 0.4;
  transition: opacity 0.3s ease;
  cursor: pointer;
}
.delete-button:hover {
  opacity: 1;
}
.amount-list {
  font-weight: bold;
  font-size: 24px;
}
.amount-list.expense {
  color: #FF97C2;
}
.amount-list.income {
  color: #4A90E2;
}
.meta {
  margin-top: 10px;
  padding-left: 10px;
  display: flex;
  flex-direction: column;
  color: gray;
  font-size: 12px;
}
.memo {
  background-color: #EEEEEE;
  padding: 5px;
  margin-top: 5px;
  border-radius: 3px;
}
.edit-form {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.edit-button {
  font-size: 9px;
  height: 40px;
}
</style>