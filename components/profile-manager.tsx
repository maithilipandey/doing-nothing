"use client"

import { useState, useEffect } from "react"
import { Plus, Trash2 } from "lucide-react"

interface Profile {
  id: string
  name: string
  moodHistory: string[]
  createdAt: number
}

interface ProfileManagerProps {
  currentProfile: Profile | null
  onProfileSelect: (profile: Profile) => void
  onCreateProfile: (name: string) => void
  onDeleteProfile: (id: string) => void
}

export function ProfileManager({
  currentProfile,
  onProfileSelect,
  onCreateProfile,
  onDeleteProfile,
}: ProfileManagerProps) {
  const [profiles, setProfiles] = useState<Profile[]>([])
  const [newProfileName, setNewProfileName] = useState("")
  const [showCreateForm, setShowCreateForm] = useState(false)

  // Load profiles from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("doingNothing_profiles")
    if (saved) {
      setProfiles(JSON.parse(saved))
    }
  }, [])

  const handleCreateProfile = () => {
    if (newProfileName.trim()) {
      const newProfile: Profile = {
        id: Date.now().toString(),
        name: newProfileName,
        moodHistory: [],
        createdAt: Date.now(),
      }
      const updated = [...profiles, newProfile]
      setProfiles(updated)
      localStorage.setItem("doingNothing_profiles", JSON.stringify(updated))
      onCreateProfile(newProfileName)
      onProfileSelect(newProfile)
      setNewProfileName("")
      setShowCreateForm(false)
    }
  }

  const handleDeleteProfile = (id: string) => {
    const updated = profiles.filter((p) => p.id !== id)
    setProfiles(updated)
    localStorage.setItem("doingNothing_profiles", JSON.stringify(updated))
    onDeleteProfile(id)
  }

  return (
    <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 shadow-lg border-2 border-[#f5d5e3]/50">
      <h2 className="text-2xl md:text-3xl font-black text-[#c06c84] mb-6">Your Profiles</h2>

      {/* Profile List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {profiles.map((profile) => (
          <button
            key={profile.id}
            onClick={() => onProfileSelect(profile)}
            className={`p-4 rounded-2xl border-2 transition-all duration-200 text-left ${
              currentProfile?.id === profile.id
                ? "bg-[#ff8fab] border-[#ff8fab] text-white shadow-lg scale-105"
                : "bg-gradient-to-br from-[#fff5f7] to-[#ffe0ec] border-[#f5d5e3]/50 text-[#c06c84] hover:border-[#ff8fab]/50 hover:shadow-md"
            }`}
          >
            <div className="flex justify-between items-start mb-2">
              <p className="font-bold text-lg">{profile.name}</p>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  handleDeleteProfile(profile.id)
                }}
                className="text-red-500 hover:text-red-700 transition-colors"
                title="Delete profile"
              >
                <Trash2 size={18} />
              </button>
            </div>
            <p className="text-sm opacity-75">Moods logged: {profile.moodHistory.length}</p>
          </button>
        ))}
      </div>

      {/* Create New Profile Form */}
      {showCreateForm ? (
        <div className="bg-gradient-to-br from-[#fff5f7] to-[#f0f4ff] rounded-2xl p-6 border border-[#ff8fab]/20 mb-4">
          <input
            type="text"
            value={newProfileName}
            onChange={(e) => setNewProfileName(e.target.value)}
            placeholder="Enter your name..."
            className="w-full px-4 py-2 rounded-lg border border-[#f5d5e3] focus:outline-none focus:border-[#ff8fab] mb-3"
            onKeyPress={(e) => e.key === "Enter" && handleCreateProfile()}
          />
          <div className="flex gap-2">
            <button
              onClick={handleCreateProfile}
              className="flex-1 bg-[#ff8fab] text-white font-bold py-2 rounded-lg hover:bg-[#ff6b9d] transition-colors"
            >
              Create Profile
            </button>
            <button
              onClick={() => setShowCreateForm(false)}
              className="flex-1 bg-[#d4a5d4] text-white font-bold py-2 rounded-lg hover:bg-[#c093c3] transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setShowCreateForm(true)}
          className="w-full bg-gradient-to-r from-[#ff8fab] to-[#ff6b9d] text-white font-bold py-3 rounded-xl hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
        >
          <Plus size={20} />
          Create New Profile
        </button>
      )}
    </div>
  )
}
