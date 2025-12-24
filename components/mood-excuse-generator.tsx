"use client"

import { useState } from "react"

const excusesMap: Record<string, string[]> = {
  "😴": [
    "I didn't procrastinate. I was strategically resting my brain.",
    "Naps are a form of productivity... for dreams.",
    "I was charging my mental battery.",
    "Sleep is the best feature of productivity.",
  ],
  "😵": [
    "I'm not overwhelmed, I'm just adequately loaded.",
    "My to-do list has a to-do list.",
    "I would do it, but my brain is currently at maximum capacity.",
    "Paralysis by analysis is just thorough planning.",
  ],
  "😌": [
    "Good vibes only, tasks later.",
    "I'm conserving energy for the apocalypse.",
    "Living my best unbothered life.",
    "Chill is a lifestyle, not a mood.",
  ],
  "😤": [
    "I'm not avoiding responsibilities, I'm building suspense.",
    "The deadline is still optional, right?",
    "Who decided that tasks are mandatory anyway?",
    "Rebellion looks a lot like procrastination.",
  ],
  "🫠": [
    "If nothing matters, why do anything?",
    "We're all just cosmic dust pretending to work.",
    "In 100 years, none of this will matter.",
    "Existential dread is my productivity strategy.",
  ],
}

const moods = ["😴", "😵", "😌", "😤", "🫠"] as const

interface MoodExcuseGeneratorProps {
  onMoodSelected?: (mood: string) => void
}

export function MoodExcuseGenerator({ onMoodSelected }: MoodExcuseGeneratorProps) {
  const [selectedMood, setSelectedMood] = useState<(typeof moods)[number]>("😌")
  const [currentExcuse, setCurrentExcuse] = useState(excusesMap["😌"][0])

  const handleMoodSelect = (mood: (typeof moods)[number]) => {
    setSelectedMood(mood)
    const excuses = excusesMap[mood]
    setCurrentExcuse(excuses[Math.floor(Math.random() * excuses.length)])
    onMoodSelected?.(mood)
  }

  return (
    <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 shadow-lg border-2 border-[#f5d5e3]/50 hover:border-[#ff8fab]/30 transition-colors">
      <h2 className="text-2xl md:text-3xl font-black text-[#c06c84] mb-6">How are you procrastinating today?</h2>

      {/* Mood Selector */}
      <div className="flex gap-4 mb-8 justify-center flex-wrap">
        {moods.map((mood) => (
          <button
            key={mood}
            onClick={() => handleMoodSelect(mood)}
            className={`text-4xl p-3 rounded-2xl transition-all duration-200 ${
              selectedMood === mood
                ? "bg-[#ff8fab] shadow-lg scale-110"
                : "bg-[#f0f4ff] hover:bg-[#ffe0ec] hover:scale-105"
            }`}
            title={
              {
                "😴": "Tired",
                "😵": "Overwhelmed",
                "😌": "Chill",
                "😤": "Avoiding Responsibility",
                "🫠": "Existential",
              }[mood]
            }
          >
            {mood}
          </button>
        ))}
      </div>

      {/* Excuse Display */}
      <div className="bg-gradient-to-br from-[#fff5f7] to-[#ffe0ec] rounded-2xl p-6 border border-[#ff8fab]/20">
        <p className="text-lg md:text-xl font-semibold text-[#8b7ba8] leading-relaxed text-center italic">
          "{currentExcuse}"
        </p>
      </div>
    </div>
  )
}
