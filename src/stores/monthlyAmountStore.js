import { defineStore, storeToRefs } from 'pinia'
import { useFormatDateStore } from '@/stores/formatDateStore';

export const useMonthlyAmountStore = defineStore('amount', () => {
  const formatDateStore = useFormatDateStore()
  const { currentMonth } = storeToRefs(formatDateStore)

  const incomeAmount = (records) => {
    return records
      .filter(record => {
        const recordDate = new Date(record.date);
        return (
        !record.amountType && 
        recordDate.getMonth() === currentMonth.value.getMonth() &&
        recordDate.getFullYear() === currentMonth.value.getFullYear()
        );
      })
      .reduce((sum, record) => sum + Number(record.amount), 0)
  }
  const expenseAmount = (records) => {
    return records
      .filter(record => {
        const recordDate = new Date(record.date);
        return (
        record.amountType && 
        recordDate.getMonth() === currentMonth.value.getMonth() &&
        recordDate.getFullYear() === currentMonth.value.getFullYear()
        );
      })
      .reduce((sum, record) => sum + Number(record.amount), 0)
  }

  return {
    incomeAmount,
    expenseAmount
  }

})