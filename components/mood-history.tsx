"use client"

interface MoodHistoryProps {
  moodHistory: string[]
}

const moodLabels: Record<string, string> = {
  "😴": "Tired",
  "😵": "Overwhelmed",
  "😌": "Chill",
  "😤": "Avoiding",
  "🫠": "Existential",
}

export function MoodHistory({ moodHistory }: MoodHistoryProps) {
  const moodCounts = moodHistory.reduce(
    (acc, mood) => {
      acc[mood] = (acc[mood] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  const recentMoods = moodHistory.slice(-5).reverse()

  return (
    <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 shadow-lg border-2 border-[#f5d5e3]/50">
      <h2 className="text-2xl md:text-3xl font-black text-[#c06c84] mb-6">Your Mood Patterns</h2>

      {moodHistory.length === 0 ? (
        <p className="text-center text-[#8b7ba8] py-8">No mood history yet. Start logging your moods!</p>
      ) : (
        <>
          {/* Mood Summary */}
          <div className="grid grid-cols-3 md:grid-cols-5 gap-3 mb-8">
            {["😴", "😵", "😌", "😤", "🫠"].map((mood) => (
              <div
                key={mood}
                className="bg-gradient-to-br from-[#fff5f7] to-[#ffe0ec] rounded-2xl p-4 text-center border border-[#ff8fab]/20 hover:border-[#ff8fab]/50 transition-colors"
              >
                <div className="text-3xl mb-2">{mood}</div>
                <p className="text-sm font-semibold text-[#8b7ba8]">{moodCounts[mood] || 0}</p>
                <p className="text-xs text-[#c06c84]">{moodLabels[mood]}</p>
              </div>
            ))}
          </div>

          {/* Recent Moods */}
          <div className="border-t border-[#f5d5e3]/50 pt-6">
            <h3 className="font-semibold text-[#c06c84] mb-4">Recent Mood Logs</h3>
            <div className="flex gap-2 flex-wrap">
              {recentMoods.map((mood, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-[#fff5f7] to-[#f0f4ff] rounded-full px-4 py-2 border border-[#ff8fab]/20 text-sm font-medium text-[#8b7ba8] flex items-center gap-2"
                >
                  <span className="text-xl">{mood}</span>
                  <span>{moodLabels[mood]}</span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
