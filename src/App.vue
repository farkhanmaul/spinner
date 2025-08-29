<template>
  <div id="app" class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
    <!-- Background effects -->
    <div class="fixed inset-0 overflow-hidden pointer-events-none">
      <div class="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
    </div>

    <div class="relative z-10 p-4">
      <div class="max-w-6xl mx-auto">
        <!-- Header -->
        <header class="text-center mb-8">
          <div class="inline-flex items-center space-x-3 mb-4">
            <div class="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd" />
              </svg>
            </div>
            <h1 class="text-4xl font-bold text-gray-800">
              Spinner
            </h1>
          </div>
          <p class="text-lg text-gray-600">Random Name Selector</p>
        </header>

        <!-- Single screen layout -->
        <div class="grid md:grid-cols-2 gap-6">
          <!-- Controls Panel -->
          <div class="space-y-4">
            <!-- Add Participants -->
            <div class="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl p-6 shadow-lg">
              <h3 class="text-lg font-semibold mb-4 text-gray-800 flex items-center">
                <svg class="w-5 h-5 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"/>
                </svg>
                Add Participants
              </h3>
              <div class="space-y-3">
                <textarea
                  v-model="participantInput"
                  @keydown="handleKeyDown"
                  placeholder="Enter names (one per line or separated by commas)..."
                  rows="3"
                  class="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                ></textarea>
                <div class="flex gap-2">
                  <button
                    @click="addParticipants"
                    :disabled="!participantInput.trim()"
                    class="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <svg class="w-4 h-4 inline mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd"/>
                    </svg>
                    Add All
                  </button>
                  <button
                    @click="clearInput"
                    class="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition-all duration-200"
                  >
                    Clear
                  </button>
                </div>
              </div>
            </div>

            <!-- Settings & Participants -->
            <div class="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl p-6 shadow-lg">
              <div class="grid grid-cols-2 gap-6">
                <!-- Settings -->
                <div>
                  <h3 class="text-lg font-semibold mb-3 text-gray-800">Settings</h3>
                  <div class="space-y-4">
                    <div class="flex items-center justify-between">
                      <span class="text-sm text-gray-700">Sound</span>
                      <button
                        @click="toggleSound"
                        :class="[
                          soundEnabled ? 'bg-blue-500' : 'bg-gray-300',
                          'relative inline-flex h-5 w-9 items-center rounded-full transition-colors duration-200'
                        ]"
                      >
                        <span :class="[soundEnabled ? 'translate-x-5' : 'translate-x-1', 'inline-block h-3 w-3 transform rounded-full bg-white transition duration-200']" />
                      </button>
                    </div>
                    <div class="flex items-center justify-between">
                      <span class="text-sm text-gray-700">Confetti</span>
                      <button
                        @click="toggleConfetti"
                        :class="[
                          confettiEnabled ? 'bg-blue-500' : 'bg-gray-300',
                          'relative inline-flex h-5 w-9 items-center rounded-full transition-colors duration-200'
                        ]"
                      >
                        <span :class="[confettiEnabled ? 'translate-x-5' : 'translate-x-1', 'inline-block h-3 w-3 transform rounded-full bg-white transition duration-200']" />
                      </button>
                    </div>
                    <div>
                      <div class="flex items-center justify-between mb-2">
                        <span class="text-sm text-gray-700">Duration</span>
                        <span class="text-xs text-gray-500">{{ spinDuration }}s</span>
                      </div>
                      <input
                        v-model="spinDuration"
                        type="range"
                        min="2"
                        max="8"
                        step="0.5"
                        class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                      />
                    </div>
                  </div>
                </div>

                <!-- Participants -->
                <div>
                  <div class="flex items-center justify-between mb-3">
                    <h3 class="text-lg font-semibold text-gray-800">Participants</h3>
                    <span class="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                      {{ participants.length }}
                    </span>
                  </div>
                  
                  <div class="space-y-2 max-h-40 overflow-y-auto custom-scrollbar">
                    <div v-if="participants.length === 0" class="text-center text-gray-500 py-4 text-sm italic">
                      No participants yet
                    </div>
                    
                    <div
                      v-for="(participant, index) in participants"
                      :key="participant.id"
                      class="group flex items-center justify-between p-2 bg-gray-50 rounded border hover:border-blue-300 transition-all duration-200"
                    >
                      <div class="flex items-center space-x-2">
                        <div 
                          class="w-2 h-2 rounded-full"
                          :style="{ backgroundColor: participant.color }"
                        ></div>
                        <span class="text-gray-700 text-sm">{{ participant.name }}</span>
                      </div>
                      <button
                        @click="removeParticipant(index)"
                        class="opacity-0 group-hover:opacity-100 w-5 h-5 text-red-500 hover:text-red-700 rounded flex items-center justify-center transition-all duration-200"
                      >
                        <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                  
                  <button
                    v-if="participants.length > 0"
                    @click="clearAll"
                    class="w-full mt-3 px-3 py-1 text-red-600 border border-red-300 rounded text-sm hover:bg-red-50 transition-all duration-200"
                  >
                    Clear All
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Spinner -->
          <div>
            <div class="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl p-6 shadow-lg">
              <div class="flex flex-col items-center">
                <!-- Spinner Container -->
                <div class="relative mb-6">
                  <div class="spinner-container relative">
                    <svg
                      ref="spinnerRef"
                      class="spinner-wheel transition-transform duration-1000 ease-out"
                      width="350"
                      height="350"
                      viewBox="0 0 350 350"
                    >
                      <!-- Wheel segments -->
                      <g v-if="participants.length > 0">
                        <path
                          v-for="(segment, index) in wheelSegments"
                          :key="index"
                          :d="segment.path"
                          :fill="segment.color"
                          stroke="#ffffff"
                          stroke-width="2"
                          class="spinner-segment cursor-pointer transition-all duration-200 hover:brightness-110"
                          style="filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1))"
                          @click="highlightSegment(index)"
                        />
                        <text
                          v-for="(segment, index) in wheelSegments"
                          :key="`text-${index}`"
                          :x="segment.textX"
                          :y="segment.textY"
                          :transform="`rotate(${segment.textRotation}, ${segment.textX}, ${segment.textY})`"
                          fill="white"
                          text-anchor="middle"
                          dominant-baseline="middle"
                          class="text-sm font-bold pointer-events-none"
                          style="text-shadow: 1px 1px 2px rgba(0,0,0,0.7)"
                        >
                          {{ truncateName(participants[index].name) }}
                        </text>
                      </g>
                      
                      <!-- Empty state -->
                      <g v-else>
                        <circle cx="175" cy="175" r="150" fill="#f8fafc" stroke="#cbd5e1" stroke-width="3" />
                        <text x="175" y="175" text-anchor="middle" dominant-baseline="middle" class="text-lg font-medium fill-gray-500">
                          Add participants to spin
                        </text>
                      </g>
                      
                      <!-- Center arrow pointer -->
                      <g>
                        <!-- Arrow pointing up -->
                        <path
                          d="M175 160 L165 180 L185 180 Z"
                          fill="#1f2937"
                          stroke="#ffffff"
                          stroke-width="2"
                        />
                      </g>
                    </svg>
                  </div>
                </div>

                <!-- Spin Button -->
                <button
                  @click="spin"
                  :disabled="participants.length < 2 || isSpinning"
                  :class="[
                    'px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform shadow-lg',
                    participants.length < 2 || isSpinning
                      ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700 hover:scale-105 active:scale-95'
                  ]"
                >
                  <span class="flex items-center justify-center">
                    <svg v-if="isSpinning" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <svg v-else class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clip-rule="evenodd"/>
                    </svg>
                    {{ getSpinButtonText() }}
                  </span>
                </button>

                <!-- Winner Display -->
                <Transition name="winner" appear>
                  <div
                    v-if="winner"
                    class="mt-6 p-6 bg-gradient-to-r from-green-500 to-blue-600 rounded-xl shadow-lg"
                  >
                    <div class="text-center">
                      <div class="text-4xl mb-2">🎉</div>
                      <h2 class="text-xl font-bold text-white mb-1">Winner!</h2>
                      <p class="text-2xl font-bold text-white">{{ winner.name }}</p>
                    </div>
                  </div>
                </Transition>
              </div>
            </div>
          </div>
        </div>

        <!-- Credits -->
        <footer class="mt-8 text-center">
          <div class="bg-white/60 backdrop-blur-sm border border-gray-200 rounded-xl p-4 shadow-lg">
            <div class="flex flex-col md:flex-row items-center justify-between text-sm text-gray-600">
              <div class="flex items-center space-x-4 mb-2 md:mb-0">
                <span>Built with Vue.js 3 • Tailwind CSS • GSAP</span>
              </div>
              <div class="flex items-center space-x-4">
                <a href="https://github.com/farkhanmaul/spinner" target="_blank" class="hover:text-blue-600 transition-colors flex items-center">
                  <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clip-rule="evenodd"/>
                  </svg>
                  GitHub
                </a>
                <span>•</span>
                <span>farkhanmaul</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>

    <!-- Confetti Canvas -->
    <canvas ref="confettiCanvas" id="confetti-canvas" class="fixed inset-0 pointer-events-none z-50"></canvas>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { gsap } from 'gsap'
import { Howl } from 'howler'
import confetti from 'canvas-confetti'
import { useToast } from 'vue-toastification'

const toast = useToast()

// Reactive data
const participants = ref([])
const participantInput = ref('')
const isSpinning = ref(false)
const winner = ref(null)
const spinnerRef = ref(null)
const confettiCanvas = ref(null)

// Settings
const soundEnabled = ref(true)
const confettiEnabled = ref(true)
const spinDuration = ref(4)

// Sound effects with better quality
const spinSound = new Howl({
  src: ['data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmIYBzaN1fHQfyoEJHfH8N2QQAoUXrTp66hVFApGn+DyvmIYBzaN1fHQfyoEJHfH8N2QQAoUXrTp66hVFApGn+DyvmIYBzaN1fHQfyoEJHfH8N2QQAoUXrTp66hVFApGn+DyvmIYBzaN1fHQfyoEJHfH8N2QQAoUXrTp66hVFApGn+DyvmIYBzaN1fHQfyoEJHfH8N2QQAoUXrTp66hVFApGn+DyvmIYBzaN1fHQfyoE'],
  volume: 0.4
})

const tickSound = new Howl({
  src: ['data:audio/wav;base64,UklGRqYBAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YYIBAABMuWOhNJTzVKJrEZW6M5DkVKFwYfOkCZWVM5biU6JwJa61JXqiAJaZM5/gUKN3SXqbJX2dEJWPM5beT6RyDIHfJH+gCJWGM5LdT6VzNISMJIOZGJV8M47cUKZzM4HJJIW9NZVyMYraUKdzCIq/JYu8OpVrMYXXUKh3GY2MI47HOJVjMoHUUal3G5OQJ5HLGZVcMnzRUap4MZiZKJPQFZVUMnnOUKp5M5qJJpbUEZVKMnXLT6p6LJ2YKZrYDZVAMXHIT6x8H6eiKJ7cCZU3MG/FT6x9BKe1J6DgBZUuMGvCT61/E6zCJ6HkAZUkMGi/UK1/LbDMKKToAJUaMVy8UK1/Vrc='],
  volume: 0.15
})

// Enhanced winner sound
const winSound = new Howl({
  src: ['data:audio/wav;base64,UklGRvQDAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YdADAAC4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4'],
  volume: 0.6
})

// Celebration sound
const celebrationSound = new Howl({
  src: ['data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmIYBzaN1fHQfyoEJHfH8N2QQAoUXrTp66hVFApGn+DyvmIYBzaN1fHQfyoEJHfH8N2QQAoUXrTp66hVFApGn+DyvmIYBzaN1fHQfyoEJHfH8N2QQAoUXrTp66hVFApGn+DyvmIYBzaN1fHQfyoEJHfH8N2QQAoUXrTp66hVFApGn+DyvmIYBzaN1fHQfyoEJHfH8N2QQAoUXrTp66hVFApGn+DyvmIYBzaN1fHQfyoE'],
  volume: 0.5
})

// Modern neutral color palette
const colors = [
  '#3B82F6', '#6366F1', '#8B5CF6', '#A855F7', '#EC4899',
  '#EF4444', '#F97316', '#F59E0B', '#84CC16', '#22C55E',
  '#06B6D4', '#0891B2', '#1E40AF', '#7C3AED', '#DB2777',
  '#059669', '#DC2626', '#BE185D', '#047857', '#6D28D9'
]

// Computed properties
const wheelSegments = computed(() => {
  if (participants.value.length === 0) return []
  
  const segments = []
  const anglePerSegment = 360 / participants.value.length
  const radius = 150
  const centerX = 175
  const centerY = 175
  
  participants.value.forEach((participant, index) => {
    const startAngle = (index * anglePerSegment) - 90
    const endAngle = ((index + 1) * anglePerSegment) - 90
    
    const startAngleRad = (startAngle * Math.PI) / 180
    const endAngleRad = (endAngle * Math.PI) / 180
    
    const x1 = centerX + radius * Math.cos(startAngleRad)
    const y1 = centerY + radius * Math.sin(startAngleRad)
    const x2 = centerX + radius * Math.cos(endAngleRad)
    const y2 = centerY + radius * Math.sin(endAngleRad)
    
    const largeArcFlag = anglePerSegment > 180 ? 1 : 0
    
    const pathData = [
      `M ${centerX} ${centerY}`,
      `L ${x1} ${y1}`,
      `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
      'Z'
    ].join(' ')
    
    // Text position (midpoint of arc)
    const midAngle = (startAngle + endAngle) / 2
    const midAngleRad = (midAngle * Math.PI) / 180
    const textRadius = radius * 0.7
    const textX = centerX + textRadius * Math.cos(midAngleRad)
    const textY = centerY + textRadius * Math.sin(midAngleRad)
    
    segments.push({
      path: pathData,
      color: colors[index % colors.length],
      textX,
      textY,
      textRotation: midAngle + 90
    })
  })
  
  return segments
})

// Methods
const handleKeyDown = (event) => {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault()
    addParticipants()
  }
}

const addParticipants = () => {
  if (!participantInput.value.trim()) {
    toast.error('Please enter at least one name')
    return
  }

  // Parse input by lines and commas
  const names = participantInput.value
    .split(/\n|,/)
    .map(name => name.trim())
    .filter(name => name.length > 0)
    .filter(name => name.length <= 20)

  if (names.length === 0) {
    toast.error('No valid names found')
    return
  }

  let addedCount = 0
  let duplicateCount = 0
  let maxLimitReached = false

  names.forEach(name => {
    if (participants.value.length >= 20) {
      maxLimitReached = true
      return
    }

    if (participants.value.some(p => p.name.toLowerCase() === name.toLowerCase())) {
      duplicateCount++
      return
    }

    participants.value.push({
      name,
      id: Date.now() + addedCount,
      color: colors[participants.value.length % colors.length]
    })
    addedCount++
  })

  // Clear input after adding
  participantInput.value = ''

  // Show results
  if (addedCount > 0) {
    toast.success(`${addedCount} participant${addedCount > 1 ? 's' : ''} added!`)
  }
  if (duplicateCount > 0) {
    toast.warning(`${duplicateCount} duplicate name${duplicateCount > 1 ? 's' : ''} skipped`)
  }
  if (maxLimitReached) {
    toast.warning('Maximum 20 participants reached')
  }

  saveToLocalStorage()
}

const clearInput = () => {
  participantInput.value = ''
}

const removeParticipant = (index) => {
  const removed = participants.value.splice(index, 1)[0]
  toast.info(`${removed.name} removed`)
  saveToLocalStorage()
}

const clearAll = () => {
  if (confirm('Are you sure you want to remove all participants?')) {
    participants.value = []
    winner.value = null
    toast.info('All participants cleared')
    saveToLocalStorage()
  }
}

const spin = async () => {
  if (participants.value.length < 2 || isSpinning.value) return
  
  isSpinning.value = true
  winner.value = null
  
  if (soundEnabled.value) {
    spinSound.play()
  }
  
  // Calculate random rotation
  const minSpins = 8
  const maxSpins = 15
  const spins = Math.random() * (maxSpins - minSpins) + minSpins
  const segmentAngle = 360 / participants.value.length
  const randomSegment = Math.floor(Math.random() * participants.value.length)
  const finalAngle = (spins * 360) + (randomSegment * segmentAngle) + (segmentAngle / 2)
  
  // Animate spinner with enhanced easing
  await new Promise(resolve => {
    gsap.to(spinnerRef.value, {
      rotation: finalAngle,
      duration: spinDuration.value,
      ease: 'power4.out',
      onComplete: resolve
    })
  })
  
  // Determine winner (arrow points up, so we need to adjust calculation)
  const normalizedAngle = (finalAngle % 360 + 360) % 360
  const adjustedAngle = (450 - normalizedAngle) % 360  // Adjust for upward-pointing arrow
  const winnerIndex = Math.floor(adjustedAngle / segmentAngle) % participants.value.length
  winner.value = participants.value[winnerIndex]
  
  if (soundEnabled.value) {
    winSound.play()
    setTimeout(() => celebrationSound.play(), 500)
  }
  
  if (confettiEnabled.value) {
    showConfetti()
  }
  
  isSpinning.value = false
  toast.success(`🎉 ${winner.value.name} wins!`, {
    timeout: 5000
  })
}

const showConfetti = () => {
  const canvas = confettiCanvas.value
  const canvasConfetti = confetti.create(canvas, {
    resize: true,
    useWorker: true
  })
  
  // Enhanced confetti bursts
  const colors = ['#8B5CF6', '#EC4899', '#EF4444', '#F97316', '#F59E0B', '#84CC16']
  
  // Multiple bursts with different patterns
  for (let i = 0; i < 5; i++) {
    setTimeout(() => {
      canvasConfetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6, x: Math.random() * 0.6 + 0.2 },
        colors: colors,
        shapes: ['circle', 'square'],
        scalar: 1.2
      })
    }, i * 200)
  }
  
  // Star burst from center
  setTimeout(() => {
    canvasConfetti({
      particleCount: 200,
      spread: 360,
      origin: { y: 0.5, x: 0.5 },
      colors: colors,
      startVelocity: 45,
      scalar: 0.8
    })
  }, 1000)
}

const highlightSegment = (index) => {
  if (isSpinning.value) return
  
  if (soundEnabled.value) {
    tickSound.play()
  }
  
  toast.info(`Selected: ${participants.value[index].name}`)
}

const toggleSound = () => {
  soundEnabled.value = !soundEnabled.value
  toast.info(soundEnabled.value ? '🔊 Sound enabled' : '🔇 Sound disabled')
  saveToLocalStorage()
}

const toggleConfetti = () => {
  confettiEnabled.value = !confettiEnabled.value
  toast.info(confettiEnabled.value ? '🎊 Confetti enabled' : '🚫 Confetti disabled')
  saveToLocalStorage()
}

const getSpinButtonText = () => {
  if (participants.value.length < 2) return 'Add at least 2 participants'
  if (isSpinning.value) return 'Spinning...'
  return 'SPIN THE WHEEL!'
}

const truncateName = (name) => {
  return name.length > 10 ? name.substring(0, 10) + '...' : name
}

const saveToLocalStorage = () => {
  localStorage.setItem('spinner-data', JSON.stringify({
    participants: participants.value,
    soundEnabled: soundEnabled.value,
    confettiEnabled: confettiEnabled.value,
    spinDuration: spinDuration.value
  }))
}

const loadFromLocalStorage = () => {
  try {
    const saved = localStorage.getItem('spinner-data')
    if (saved) {
      const data = JSON.parse(saved)
      participants.value = data.participants || []
      soundEnabled.value = data.soundEnabled ?? true
      confettiEnabled.value = data.confettiEnabled ?? true
      spinDuration.value = data.spinDuration || 4
    }
  } catch (error) {
    console.error('Failed to load from localStorage:', error)
  }
}

// Lifecycle
onMounted(() => {
  loadFromLocalStorage()
})
</script>

<style scoped>
/* Custom scrollbar */
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: rgba(229, 231, 235, 0.5);
  border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: linear-gradient(45deg, #3B82F6, #6366F1);
  border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(45deg, #2563EB, #4F46E5);
}

/* Range slider styling */
.slider::-webkit-slider-thumb {
  appearance: none;
  height: 16px;
  width: 16px;
  border-radius: 50%;
  background: linear-gradient(45deg, #3B82F6, #6366F1);
  cursor: pointer;
  border: 2px solid #ffffff;
  box-shadow: 0 2px 4px rgba(59, 130, 246, 0.3);
}

.slider::-webkit-slider-track {
  height: 6px;
  border-radius: 3px;
  background: linear-gradient(90deg, #E5E7EB, #D1D5DB);
}

.slider::-moz-range-thumb {
  height: 16px;
  width: 16px;
  border-radius: 50%;
  background: linear-gradient(45deg, #3B82F6, #6366F1);
  cursor: pointer;
  border: 2px solid #ffffff;
  box-shadow: 0 2px 4px rgba(59, 130, 246, 0.3);
}

.slider::-moz-range-track {
  height: 6px;
  border-radius: 3px;
  background: linear-gradient(90deg, #E5E7EB, #D1D5DB);
}

/* Spinner animations */
.spinner-wheel {
  filter: drop-shadow(0 8px 16px rgba(59, 130, 246, 0.2));
  transition: transform 0.3s ease;
}

.spinner-segment {
  transition: all 0.2s ease;
  transform-origin: center;
}

.spinner-segment:hover {
  filter: brightness(1.1) drop-shadow(0 2px 8px rgba(0,0,0,0.2));
}

/* Winner animation */
.winner-enter-active {
  animation: winner-bounce 0.8s ease-out;
}

.winner-leave-active {
  animation: winner-fade 0.4s ease-in;
}

@keyframes winner-bounce {
  0% {
    opacity: 0;
    transform: scale(0.3) translateY(50px) rotate(-10deg);
  }
  50% {
    opacity: 1;
    transform: scale(1.1) translateY(-10px) rotate(5deg);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0) rotate(0deg);
  }
}

@keyframes winner-fade {
  0% {
    opacity: 1;
    transform: scale(1);
  }
  100% {
    opacity: 0;
    transform: scale(0.8);
  }
}

/* Button hover effects */
button {
  position: relative;
  overflow: hidden;
}

button:not(:disabled):hover::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
  animation: shine 0.6s ease-in-out;
}

@keyframes shine {
  0% { left: -100%; }
  100% { left: 100%; }
}

/* Glassmorphism enhancements */
.backdrop-blur-sm {
  backdrop-filter: blur(8px);
}

/* Mobile responsiveness */
@media (max-width: 768px) {
  .text-4xl {
    font-size: 2rem;
  }
  
  .spinner-wheel {
    width: 280px;
    height: 280px;
  }
  
  .px-8 {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
  
  .text-lg {
    font-size: 1rem;
  }
  
  .grid.md\:grid-cols-2 {
    grid-template-columns: 1fr;
  }
}
</style>