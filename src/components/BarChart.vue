<script setup>
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const props = defineProps({
  labels: Array, //月名
  datasetLabel: String, //収入、支出、資産など
  data: Array, //数値でーた
  color: String //棒の色
})

const chartData = {
  labels: props.labels,
  datasets: [
    {
      label: props.datasetLabel,
      data: props.data,
      backgroundColor: props.color,
    }
  ]
}

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: true,
    },
  },
};
</script>

<template>
  <Bar :data="chartData" :options="chartOptions" />
</template>