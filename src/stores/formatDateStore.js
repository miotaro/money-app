import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useFormatDateStore = defineStore('formatDate', () => {
  const formatDate = (dateStr) => {
    const date = new Date(dateStr)
    const now = new Date()//今の日付
    const weekday = ['日', '月', '火', '水', '木', '金', '土']
    const month = date.getMonth() + 1 // 月は0始まりなので+1
    const day = date.getDate()
    const dayOfWeek = weekday[date.getDay()]
    const year = date.getFullYear()//recordsの年
    const currentYear = now.getFullYear()//今の年
    //今年以外の場合、年も表示
    if (year !== currentYear) {
      return `${year}年${month}月${day}日(${dayOfWeek})`
    } else {
      return `${month}月${day}日(${dayOfWeek})`
    }
  }

  const currentMonth = ref(new Date())
  const formatMonth = (date) => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    return `${year}年${month}月`
  }

  return {
    formatDate,
    currentMonth,
    formatMonth
  }
})