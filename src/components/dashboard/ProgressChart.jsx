import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'react-chartjs-2'
import { useTheme } from '../../contexts/ThemeContext'

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend)

function ProgressChart({ toLearn, learning, mastered }) {
  const { darkMode } = useTheme()
  
  const data = {
    labels: ['To Learn', 'Learning', 'Mastered'],
    datasets: [
      {
        data: [toLearn, learning, mastered],
        backgroundColor: [
          darkMode ? 'rgba(14, 165, 233, 0.7)' : 'rgba(14, 165, 233, 0.7)',
          darkMode ? 'rgba(245, 158, 11, 0.7)' : 'rgba(245, 158, 11, 0.7)',
          darkMode ? 'rgba(16, 185, 129, 0.7)' : 'rgba(16, 185, 129, 0.7)',
        ],
        borderColor: [
          darkMode ? 'rgba(14, 165, 233, 1)' : 'rgba(14, 165, 233, 1)',
          darkMode ? 'rgba(245, 158, 11, 1)' : 'rgba(245, 158, 11, 1)',
          darkMode ? 'rgba(16, 185, 129, 1)' : 'rgba(16, 185, 129, 1)',
        ],
        borderWidth: 1,
      },
    ],
  }
  
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: darkMode ? '#D1D5DB' : '#4B5563',
          padding: 20,
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        backgroundColor: darkMode ? 'rgba(31, 41, 55, 0.9)' : 'rgba(255, 255, 255, 0.9)',
        titleColor: darkMode ? '#D1D5DB' : '#4B5563',
        bodyColor: darkMode ? '#D1D5DB' : '#4B5563',
        borderColor: darkMode ? 'rgba(75, 85, 99, 0.2)' : 'rgba(203, 213, 225, 0.8)',
        borderWidth: 1,
        padding: 12,
        boxPadding: 6,
        usePointStyle: true,
        callbacks: {
          label: function(context) {
            const total = context.dataset.data.reduce((a, b) => a + b, 0)
            const percentage = Math.round((context.raw / total) * 100)
            return `${context.label}: ${context.raw} (${percentage}%)`
          }
        }
      }
    },
  }
  
  return (
    <div className="h-full flex items-center justify-center">
      {toLearn === 0 && learning === 0 && mastered === 0 ? (
        <div className="text-center text-neutral-500">
          <p>No skills data to display</p>
        </div>
      ) : (
        <Pie data={data} options={options} />
      )}
    </div>
  )
}

export default ProgressChart