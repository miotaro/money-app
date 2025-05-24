import { defineStore } from 'pinia'
// import { format, parseISO } from 'date-fns'

export const useAmountStore = defineStore('amount', () => {
  const monthlyTotals = (records) => {
    const expenseTotals = Array(12).fill(0)
    const incomeTotals = Array(12).fill(0)

    if (!records || !Array.isArray(records)) {
      return { expenses: expenseTotals, incomes: incomeTotals }
    } 

    records.forEach((record) => {
      const monthIndex = new Date(record.date).getMonth() // 0〜11
      if (record.amountType === true) {
        expenseTotals[monthIndex] += Number(record.amount)
      } else if (record.amountType === false) {
        incomeTotals[monthIndex] += Number(record.amount)
      }
    })

    return {
      expenses: expenseTotals,
      incomes: incomeTotals
    }
  }

  const monthlyAssets = (records) => {
    const totals = monthlyTotals(records)
    return totals.incomes.map((income, i) => income - totals.expenses[i])
  }
  
  return {
    monthlyTotals,
    monthlyAssets
  }
})
