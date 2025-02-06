"use client"

import { Pie, PieChart, ResponsiveContainer, Tooltip, Cell } from "recharts"

interface BookingStatsProps {
  completedBookings: number
  failedBookings: number
  totalBookings: number
}

export function BookingStats({ completedBookings, failedBookings, totalBookings }: BookingStatsProps) {
  const data = [
    { name: "Completed", value: completedBookings },
    { name: "Failed", value: failedBookings },
  ]

  const COLORS = ["#0088FE", "#FF8042"]

  const formatNumber = (num: number) => num.toLocaleString()

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Booking Statistics</h2>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} cx="50%" cy="50%" labelLine={false} outerRadius={80} fill="#8884d8" dataKey="value">
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4">
        <p className="text-sm text-gray-600">
          Total Bookings: <span className="font-semibold text-gray-900">{formatNumber(totalBookings)}</span>
        </p>
        <p className="text-sm text-gray-600">
          Completed Bookings: <span className="font-semibold text-gray-900">{formatNumber(completedBookings)}</span>
        </p>
        <p className="text-sm text-gray-600">
          Failed Bookings: <span className="font-semibold text-gray-900">{formatNumber(failedBookings)}</span>
        </p>
      </div>
    </div>
  )
}

