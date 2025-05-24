<script setup>
import { storeToRefs } from 'pinia';
import { useFormatDateStore } from '@/stores/formatDateStore';
import { useRecordStore } from '@/stores/recordStore';
import { useMonthlyAmountStore } from '@/stores/monthlyAmountStore';
import MonthlyExpenseChart from '@/components/MonthlyExpenseChart.vue';
import ExpenseItem from '@/components/ExpenseItem.vue';

const formatDateStore = useFormatDateStore()
const { currentMonth } = storeToRefs(formatDateStore)
const recordStore = useRecordStore()
const { records } = storeToRefs(recordStore)
const monthlyAmountStore = useMonthlyAmountStore()

const prevMonth = () => {
  currentMonth.value = new Date(
    currentMonth.value.getFullYear(),
    currentMonth.value.getMonth() - 1
  )
}
const nextMonth = () => {
  currentMonth.value = new Date(
    currentMonth.value.getFullYear(),
    currentMonth.value.getMonth() + 1
  )
}

</script>

<template>
  <div class="monthly-record">
    <div class="monthly-button">
      <button @click="prevMonth"><</button>
      <span class="monthly-date">{{ formatDateStore.formatMonth(currentMonth) }}</span>
      <button @click="nextMonth">></button>
    </div>
    <div class="summaries">
      <div class="summary-row">
        <div class="summary-item income-item">
          <span class="label">収入</span>
          <span class="amount">￥{{ monthlyAmountStore.incomeAmount(records).toLocaleString() }}</span>
        </div>
        <div class="summary-item expense-item">
          <span class="label">支出</span>
          <span class="amount">￥{{ monthlyAmountStore.expenseAmount(records).toLocaleString() }}</span>
        </div>
      </div>
      <div class="deference">
        ￥{{ (monthlyAmountStore.incomeAmount(records) - monthlyAmountStore.expenseAmount(records)).toLocaleString() }}
      </div>
    </div>
    <MonthlyExpenseChart />
    <div class="categories">
      <div class="summary-item categories-title">
        <span class="label">支出</span>
        <span class="amount">￥{{ monthlyAmountStore.expenseAmount(records).toLocaleString() }}</span>
      </div>
      <ExpenseItem />
    </div>
  </div>
</template>

<style>
.monthly-record {
  text-align: center;
}
.monthly-button {
  padding: 30px 0;
}
.monthly-date {
  margin: 0 50px;
}
.summaries {
  background-color: white;
  box-shadow: 10px 10px 15px -10px #FF82B2;
  border-radius: 5px;
  padding: 10px 30px;
}
.summary-row {
  display: flex;
  justify-content: space-around;
  margin-bottom: 10px;
}
.summary-item {
  display: flex;
  align-items: center;
  min-width: 100px;
}
.label {
  width: 50px; /* ラベルの幅を固定して揃える */
  text-align: left;
}
.amount {
  flex: 1;
  text-align: right;
  font-family: monospace; /* 数字が揃いやすくなる */
  font-size: 15px;
}
.income-item {
  font-family: monospace;
  color: #4A90E2;
}
.expense-item {
  font-family: monospace;
  color: #FF97C2;
}
.deference {
  font-size: 30px;
  font-weight: bold;
}
.categories {
  width: 100%;
  margin-right: 10px;
}
.categories-title {
  padding: 5px 30px;
  margin-bottom: 30px;
  border-bottom: 2px solid gray;
}
</style>