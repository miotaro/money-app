<script setup>
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useRecordStore } from '@/stores/recordStore'
import { useFormatDateStore } from '@/stores/formatDateStore'
import { useCategoryColorsStore } from '@/stores/categoryColorsStore'

const recordStore = useRecordStore()
const { records } = storeToRefs(recordStore)
const { currentMonth } = storeToRefs(useFormatDateStore())
const categoryColorStore = useCategoryColorsStore()

const groupedExpensesWithItems = computed(() => {
  const map = {}
  records.value.forEach(record => {
    const date = new Date(record.date)
    const isCurrentMonth =
      date.getMonth() === currentMonth.value.getMonth() &&
      date.getFullYear() === currentMonth.value.getFullYear()
    if (record.amountType && isCurrentMonth) {
      const category = record.category || '未分類'
      if (!map[category]) {
        map[category] = {
          total: 0,
          items: []
        }
      }
      map[category].total += Number(record.amount)
      map[category].items.push({
        date: record.date,
        memo: record.memo || '',
        amount: Number(record.amount)
      })
    }
  })
  return map
})
</script>

<template>
  <div class="category-list">
    <div
      v-for="(data, category) in groupedExpensesWithItems"
      :key="category"
      class="category-group"
    >
      <div class="category-header">
        <span class="categories">{{ category }}</span>
        <span class="amount">￥{{ data.total.toLocaleString() }}</span>
      </div>
      <ul class="expense-items">
        <li 
          v-for="(record, index) in data.items"
          :key="index"
          :style="{ borderLeft: `12px solid ${categoryColorStore.categoryColors[category] || '#CCCCCC'}`}"
        >
          <div class="expense-item">￥{{ record.amount.toLocaleString() }}</div>
          <div class="meta">
            {{ new Date(record.date).toLocaleDateString() }}
            <span v-if="record.memo" class="memo">
              <font-awesome-icon :icon="['fas', 'note-sticky']" />
              {{ record.memo }}
            </span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style>
.category-list {
  text-align: left;
}
</style>