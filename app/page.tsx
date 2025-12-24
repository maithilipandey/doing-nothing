"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { IdlePraiseButton } from "@/components/idle-praise-button"
import { MoodExcuseGenerator } from "@/components/mood-excuse-generator"
import { FakeStatsDashboard } from "@/components/fake-stats-dashboard"
import { ProfileManager } from "@/components/profile-manager"
import { MoodHistory } from "@/components/mood-history"
import { Confetti } from "@/components/confetti"

interface Profile {
  id: string
  name: string
  moodHistory: string[]
  createdAt: number
}

export default function Home() {
  const [praiseCount, setPraiseCount] = useState(0)
  const [showConfetti, setShowConfetti] = useState(false)
  const [currentProfile, setCurrentProfile] = useState<Profile | null>(null)
  const [allProfiles, setAllProfiles] = useState<Profile[]>([])

  // Load profiles on mount
  useEffect(() => {
    const saved = localStorage.getItem("doingNothing_profiles")
    if (saved) {
      const profiles = JSON.parse(saved)
      setAllProfiles(profiles)
      // Auto-select first profile if any exist
      if (profiles.length > 0) {
        setCurrentProfile(profiles[0])
      }
    }
  }, [])

  const handlePraise = () => {
    setPraiseCount((p) => p + 1)
    setShowConfetti(true)
    setTimeout(() => setShowConfetti(false), 2000)
  }

  const handleMoodSelected = (mood: string) => {
    if (currentProfile) {
      const updated = allProfiles.map((p) =>
        p.id === currentProfile.id ? { ...p, moodHistory: [...p.moodHistory, mood] } : p,
      )
      setAllProfiles(updated)
      localStorage.setItem("doingNothing_profiles", JSON.stringify(updated))
      setCurrentProfile({ ...currentProfile, moodHistory: [...currentProfile.moodHistory, mood] })
    }
  }

  const handleProfileSelect = (profile: Profile) => {
    setCurrentProfile(profile)
    setPraiseCount(0)
  }

  const handleCreateProfile = (name: string) => {
    setPraiseCount(0)
  }

  const handleDeleteProfile = (id: string) => {
    if (currentProfile?.id === id) {
      const remaining = allProfiles.filter((p) => p.id !== id)
      setCurrentProfile(remaining.length > 0 ? remaining[0] : null)
      setPraiseCount(0)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#fff5f7] via-[#f8f0ff] to-[#f0f4ff] font-sans">
      {showConfetti && <Confetti />}

      <Header />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Profile Management Section */}
        <div className="mb-12">
          <ProfileManager
            currentProfile={currentProfile}
            onProfileSelect={handleProfileSelect}
            onCreateProfile={handleCreateProfile}
            onDeleteProfile={handleDeleteProfile}
          />
        </div>

        {/* Main App Content (only show if profile selected) */}
        {currentProfile ? (
          <>
            {/* Welcome Message with Current Profile */}
            <div className="text-center mb-8">
              <p className="text-2xl md:text-3xl font-bold text-[#c06c84]">
                Welcome, <span className="text-[#ff8fab]">{currentProfile.name}</span>! 👋
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              {/* Main Praise Section */}
              <div className="flex flex-col items-center justify-center">
                <IdlePraiseButton onPraise={handlePraise} />
              </div>

              {/* Mood-Based Excuse Generator */}
              <div className="flex flex-col justify-center">
                <MoodExcuseGenerator onMoodSelected={handleMoodSelected} />
              </div>
            </div>

            {/* Stats Dashboard */}
            <div className="mb-12">
              <FakeStatsDashboard praiseCount={praiseCount} />
            </div>

            {/* Mood History */}
            <MoodHistory moodHistory={currentProfile.moodHistory} />
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-[#8b7ba8] font-medium">Create a profile above to get started! 🎉</p>
          </div>
        )}
      </div>
    </main>
  )
}
