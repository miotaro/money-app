<script setup>
import { storeToRefs } from 'pinia';
import { useRecordStore } from '@/stores/recordStore';
import { useMonthlyAmountStore } from '@/stores/monthlyAmountStore';
import { useAmountStore } from '@/stores/amountStore';
import { computed, watch } from 'vue';
// import BarChart from '@/components/BarChart.vue'

const recordStore = useRecordStore()
const { records } = storeToRefs(recordStore)
const monthlyAmountStore = useMonthlyAmountStore()
const amountStore = useAmountStore()

// watch(records, (newRecords) => {
//   const result = amountStore.monthlyTotals(newRecords)
//   console.log('monthlyTotals result (watched):', result)
// })

// const months = ['6月', '7月', '8月', '9月', '10月', '11月', '12月', '1月', '2月', '3月', '4月', '5月'];
// const totals = computed(() => {
//   return amountStore.monthlyTotals(records.value)
// })
// const expenses = computed(() => totals.value.expenses ?? [])
// const incomes = computed(() => totals.value.incomes ?? [])
// const assets = computed(() => amountStore.monthlyAssets(records.value) ?? [])

//全ての収支
const totalIncomeAmount = (records) => {
  return records
    .filter(record => !record.amountType)
    .reduce((sum, record) => sum + Number(record.amount), 0)
}
const totalExpenseAmount = (records) => {
  return records
    .filter(record => record.amountType)
    .reduce((sum, record) => sum + Number(record.amount), 0)
}

const monthlyDate = computed(() => {
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth() + 1
  const lastDay = new Date(year, month, 0).getDate() //その月の最終日
  return `${month}月1日〜${month}月${lastDay}日`
})
</script>

<template>
  <div>
    <div class="home home-total">
      <h2 class="home-title">資産総額</h2>
      <div class="amount-list">
        ￥{{ (totalIncomeAmount(records) - totalExpenseAmount(records)).toLocaleString() }}
      </div>
    </div>
    <div class="home home-detail">
      <div class="home-summary-header home-total">
        <h3>今月の収支</h3>
        <p>{{ monthlyDate }}</p>
      </div>
      <div class="home-summary-details home-total">
        <div>
          <div class="income-item">
            <span class="label">収入</span>
            <span class="amount"> ￥{{ monthlyAmountStore.incomeAmount(records).toLocaleString() }}</span>
          </div>
          <div class="expense-item">
            <span class="label">支出</span>
            <span class="amount"> ￥{{ monthlyAmountStore.expenseAmount(records).toLocaleString() }}</span>
          </div>
        </div>
        <div class="home-balance">
          <span>
            ￥{{ (monthlyAmountStore.incomeAmount(records) - monthlyAmountStore.expenseAmount(records)).toLocaleString() }}
          </span>
        </div>
      </div>
    </div>

    <!-- <div class="mt-10">
      <BarChart
      :labels="months"
      dataset-label="総支出"
      :data="expenses.map(val => val ?? 0)"
      color="#f87171"
      />
      <BarChart
      :labels="months"
      dataset-label="収入"
      :data="incomes.map(val => val ?? 0)"
      color="#34d399"
      />
      <BarChart
        :labels="months"
        dataset-label="総資産"
        :data="assets.map(val => val ?? 0)"
        color="#60a5fa"
      />
    </div> -->
  </div>
</template>

<style>
.home {
  background-color: white;
  box-shadow: 10px 10px 15px -10px #FF82B2;
  border-radius: 5px;
  margin: 20px;
  padding: 10px 20px 10px 20px;
}
.home-total {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.home-summary-header p {
  color: gray;
  font-size: 12px;
}
.home-balance {
  font-size: 20px;
  font-weight: bold;
}
</style>