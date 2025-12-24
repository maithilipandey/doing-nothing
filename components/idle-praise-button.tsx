"use client"

import { useState } from "react"

const praiseMessages = [
  "Outstanding. You resisted capitalism today.",
  "10/10 productivity. Zero tasks harmed.",
  "Rest is resistance. You're a hero.",
  "Your inaction speaks volumes.",
  "Procrastination: the art of doing nothing.",
  "You didn't fail. You just deferred success.",
  "Excellent work on that nap.",
  "Your couch has never been more impressed.",
  "You're not lazy, you're energy-efficient.",
  "This is what self-care looks like.",
  "Doing nothing? More like EVERYTHING right.",
  "Your motivation called... nah, just kidding.",
]

export function IdlePraiseButton({ onPraise }: { onPraise: () => void }) {
  const [currentPraise, setCurrentPraise] = useState(praiseMessages[0])
  const [isAnimating, setIsAnimating] = useState(false)

  const handleClick = () => {
    onPraise()
    const randomPraise = praiseMessages[Math.floor(Math.random() * praiseMessages.length)]
    setCurrentPraise(randomPraise)
    setIsAnimating(true)
    setTimeout(() => setIsAnimating(false), 600)
  }

  return (
    <div className="flex flex-col items-center gap-8">
      <button
        onClick={handleClick}
        className="group relative h-40 w-40 md:h-48 md:w-48 rounded-full bg-gradient-to-br from-[#ff8fab] to-[#ff6b9d] text-white font-black text-2xl md:text-3xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center text-center p-4 overflow-hidden"
      >
        <div className="absolute inset-0 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <span className="relative">I did nothing today</span>
      </button>

      {/* Praise Display */}
      <div
        className={`text-center max-w-md transition-all duration-500 ${
          isAnimating ? "opacity-100 scale-100" : "opacity-75 scale-95"
        }`}
      >
        <p className="text-2xl md:text-3xl font-bold text-[#c06c84] italic">"{currentPraise}"</p>
      </div>
    </div>
  )
}
