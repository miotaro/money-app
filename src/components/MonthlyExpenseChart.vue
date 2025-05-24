<script setup>
import PieChart from '@/components/PieChart.vue';
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useRecordStore } from '@/stores/recordStore'
import { useFormatDateStore } from '@/stores/formatDateStore'
import { useCategoryColorsStore } from '@/stores/categoryColorsStore';

const { records } = storeToRefs(useRecordStore())
const { currentMonth } = storeToRefs(useFormatDateStore())
const categoryColorStore = useCategoryColorsStore()

const categoryData = computed(() => {
  const filtered = records.value.filter(record => {
    const date = new Date(record.date)
    return record.amountType &&
    date.getMonth() === currentMonth.value.getMonth() &&
    date.getFullYear() === currentMonth.value.getFullYear()
  })
  const map = {}
  filtered.forEach(r => {
    const cat = r.category || '未分類'
    map[cat] = (map[cat] || 0) + Number(r.amount)
  })
  return map
})

const chartData = computed(() => {
  const hasData = Object.keys(categoryData.value).length > 0
  const labels = hasData ? Object.keys(categoryData.value) : ['未分類']
  const data = hasData ? Object.values(categoryData.value) : [1] 
  const originalAmounts = hasData ? data : [0]
  const backgroundColor = labels.map(label => categoryColorStore.categoryColors[label] || '#CCCCCC')

  return {
    labels,
    datasets: [
      {
        data,
        backgroundColor,
        borderWidth: 1,
        originalAmounts
      }
    ]
  }
})

const chartOptions = {
  responsive: true,
  plugins: {
    legend: { position: 'bottom' },
    tooltip: {
      callbacks: {
        label: context => {
          const total = context.dataset.data.reduce((s, v) => s + v, 0)
          const val = context.raw
          const pct = ((val / total) * 100).toFixed(1)
          return `${context.label}: ￥${val} (${pct}%)`
        }
      }
    }
  }
}
</script>

<template>
  <PieChart :chartData="chartData" :chartOptions="chartOptions" class="pie-chart"/>
</template>

<style>
.pie-chart {
  margin: 80px;
}

@media (max-width: 425px) {
  .pie-chart {
  margin: 30px;
}
}
</style>