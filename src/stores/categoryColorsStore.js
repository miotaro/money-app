import { defineStore } from 'pinia'

export const useCategoryColorsStore = defineStore('categoryColors', () => {
  const categoryColors = {
    食費: '#00FF00',
    交通費: '#00FFFF',
    家賃: '#FFFF00',
    光熱費: '#FF0000',
    交際費: '#FF00FF',
    その他: '#808000',
    給与: '#800080',
    未分類: '#CCCCCC' // デフォルト
  }

  return {
    categoryColors
  }
})