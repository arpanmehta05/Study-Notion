import React from 'react'
import { useState } from "react"
import { Chart, registerables } from "chart.js"
import { Pie } from "react-chartjs-2"

Chart.register(...registerables)

export default function InstructorChart({ courses }) {
  const [currChart, setCurrChart] = useState("students")

  const generateRandomColors = (numColors) => {
    const colors = []
    for (let i = 0; i < numColors; i++) {
      const color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
        Math.random() * 256
      )}, ${Math.floor(Math.random() * 256)})`
      colors.push(color)
    }
    return colors
  }

  const chartDataStudents = {
    labels: courses.map((course) => course.courseName),
    datasets: [
      {
        data: courses.map((course) => course.totalStudentsEnrolled),
        backgroundColor: generateRandomColors(courses.length),
      },
    ],
  }

  const chartIncomeData = {
    labels: courses.map((course) => course.courseName),
    datasets: [
      {
        data: courses.map((course) => course.totalAmountGenerated),
        backgroundColor: generateRandomColors(courses.length),
      },
    ],
  }

  const options = {
    maintainAspectRatio: false,
  }

  return (
    <div className="flex flex-1 flex-col gap-y-4 rounded-md p-6" style={{ backgroundColor: "#161D29" }}>
      <p className="text-lg font-bold" style={{ color: "#F1F2FF" }}>Visualize</p>
      <div className="space-x-4 font-semibold">
        <button
          onClick={() => setCurrChart("students")}
          className={`rounded-sm p-1 px-3 transition-all duration-200`}
          style={{ 
            backgroundColor: currChart === "students" ? "#2C333F" : "transparent",
            color: currChart === "students" ? "#FFD60A" : "#9E8006" 
          }}
        >
          Students
        </button>
        <button
          onClick={() => setCurrChart("income")}
          className={`rounded-sm p-1 px-3 transition-all duration-200`}
          style={{ 
            backgroundColor: currChart === "income" ? "#2C333F" : "transparent",
            color: currChart === "income" ? "#FFD60A" : "#9E8006" 
          }}
        >
          Income
        </button>
      </div>
      <div className="relative mx-auto h-[250px] w-full max-w-full overflow-hidden">
        <Pie
          data={currChart === "students" ? chartDataStudents : chartIncomeData}
          options={{
            maintainAspectRatio: false,
            responsive: true,
            layout: {
              padding: {
                bottom: 20
              }
            },
            plugins: {
              legend: {
                position: 'bottom',
                display: true,
                labels: {
                  boxWidth: 10,
                  padding: 10,
                  color: '#F1F2FF',
                  font: {
                    size: 10
                  }
                }
              },
              tooltip: {
                enabled: true,
                callbacks: {
                  label: function(context) {
                    const label = context.label || '';
                    const value = context.formattedValue;
                    return `${label}: ${currChart === "income" ? "₹" : ""}${value}`;
                  }
                }
              }
            }
          }}
        />
      </div>
    </div>
  )
}
