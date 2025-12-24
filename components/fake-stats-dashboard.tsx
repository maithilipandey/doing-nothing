"use client"

import { useState, useEffect } from "react"

interface Stat {
  label: string
  value: string | number
  emoji: string
}

export function FakeStatsDashboard({ praiseCount }: { praiseCount: number }) {
  const [stats, setStats] = useState<Stat[]>([
    { label: "Hours Wasted Successfully", value: "∞", emoji: "⏰" },
    { label: "Tasks Avoided", value: 0, emoji: "📋" },
    { label: "Productivity Level", value: "0%", emoji: "📊" },
    { label: "Naps Taken", value: 0, emoji: "😴" },
  ])

  useEffect(() => {
    setStats((prevStats) =>
      prevStats.map((stat) => {
        if (stat.label === "Tasks Avoided") {
          return { ...stat, value: praiseCount * 42 }
        }
        if (stat.label === "Naps Taken") {
          return { ...stat, value: praiseCount * 3 }
        }
        return stat
      }),
    )
  }, [praiseCount])

  return (
    <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-lg border-2 border-[#f5d5e3]/50">
      <h2 className="text-3xl md:text-4xl font-black text-[#c06c84] mb-8 text-center">Your Impressive Stats</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="group bg-gradient-to-br from-[#fff5f7] to-[#f0f4ff] rounded-2xl p-6 md:p-8 border-2 border-[#d4a5d4]/30 hover:border-[#ff8fab]/50 transition-all duration-300 hover:shadow-lg hover:scale-105 text-center"
          >
            <div className="text-4xl md:text-5xl mb-3 group-hover:scale-125 transition-transform duration-300">
              {stat.emoji}
            </div>
            <p className="text-sm md:text-base font-semibold text-[#8b7ba8] mb-2">{stat.label}</p>
            <p className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#ff6b9d] to-[#d4a5d4]">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Footer Message */}
      <div className="mt-8 text-center">
        <p className="text-[#8b7ba8] font-medium">✨ You're doing an excellent job at doing nothing! ✨</p>
      </div>
    </div>
  )
}
