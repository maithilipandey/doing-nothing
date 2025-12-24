"use client"

import { useEffect, useState } from "react"

export function Confetti() {
  const [confetti, setConfetti] = useState<Array<{ id: number; left: number; delay: number }>>([])

  useEffect(() => {
    const pieces = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 0.2,
    }))
    setConfetti(pieces)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {confetti.map((piece) => (
        <div
          key={piece.id}
          className="absolute w-2 h-2 animate-pulse"
          style={{
            left: `${piece.left}%`,
            top: "-10px",
            animation: `fall 2s linear forwards`,
            animationDelay: `${piece.delay}s`,
            backgroundColor: ["#ff6b9d", "#d4a5d4", "#ff8fab", "#c06c84"][Math.floor(Math.random() * 4)],
            borderRadius: "50%",
          }}
        />
      ))}
      <style>{`
        @keyframes fall {
          to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}
