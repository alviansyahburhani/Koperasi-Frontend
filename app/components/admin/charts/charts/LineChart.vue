<script setup lang="ts">
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

interface Props {
  labels: string[]
  data: number[]
  label: string
  borderColor?: string
  backgroundColor?: string
}

const props = withDefaults(defineProps<Props>(), {
  borderColor: '#b91c1c',
  backgroundColor: 'rgba(185, 28, 28, 0.1)',
})

const chartData = computed(() => ({
  labels: props.labels,
  datasets: [
    {
      label: props.label,
      data: props.data,
      borderColor: props.borderColor,
      backgroundColor: props.backgroundColor,
      tension: 0.4,
      fill: true,
      pointBackgroundColor: props.borderColor,
      pointBorderColor: '#fff',
      pointBorderWidth: 2,
      pointRadius: 4,
      pointHoverRadius: 6,
    },
  ],
}))

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      position: 'top' as const,
      labels: {
        usePointStyle: true,
        padding: 15,
        font: {
          size: 12,
          family: 'Inter, sans-serif',
        },
      },
    },
    tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      padding: 12,
      titleFont: {
        size: 13,
        family: 'Inter, sans-serif',
      },
      bodyFont: {
        size: 14,
        family: 'Inter, sans-serif',
      },
      cornerRadius: 8,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        font: {
          size: 11,
        },
        color: '#6b7280',
      },
      grid: {
        color: 'rgba(0, 0, 0, 0.05)',
      },
    },
    x: {
      ticks: {
        font: {
          size: 11,
        },
        color: '#6b7280',
      },
      grid: {
        display: false,
      },
    },
  },
}
</script>

<template>
  <Line :data="chartData" :options="chartOptions" />
</template>
