<template>
  <div id="app" class="min-h-screen p-4">
    <div class="max-w-4xl mx-auto">
      <!-- Header -->
      <header class="text-center mb-8">
        <h1 class="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
          🎯 8 Spinner
        </h1>
        <p class="text-gray-600 text-lg">Random name picker with advanced customization</p>
      </header>

      <div class="grid lg:grid-cols-3 gap-8">
        <!-- Controls Panel -->
        <div class="lg:col-span-1 space-y-6">
          <!-- Add Participant -->
          <div class="glass rounded-2xl p-6 shadow-xl">
            <h3 class="text-xl font-semibold mb-4 text-gray-800">Add Participant</h3>
            <div class="flex gap-2">
              <input
                v-model="newParticipant"
                @keypress.enter="addParticipant"
                type="text"
                placeholder="Enter name..."
                maxlength="20"
                class="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
              <button
                @click="addParticipant"
                :disabled="!newParticipant.trim()"
                class="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                Add
              </button>
            </div>
          </div>

          <!-- Settings -->
          <div class="glass rounded-2xl p-6 shadow-xl">
            <h3 class="text-xl font-semibold mb-4 text-gray-800">Settings</h3>
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Sound Effects</label>
                <button
                  @click="toggleSound"
                  :class="[soundEnabled ? 'bg-green-500' : 'bg-gray-400', 'relative inline-flex h-6 w-11 items-center rounded-full transition-colors']"
                >
                  <span :class="[soundEnabled ? 'translate-x-6' : 'translate-x-1', 'inline-block h-4 w-4 transform rounded-full bg-white transition']" />
                </button>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Spin Duration</label>
                <input
                  v-model="spinDuration"
                  type="range"
                  min="2"
                  max="8"
                  step="0.5"
                  class="w-full accent-blue-500"
                />
                <div class="text-sm text-gray-500 text-center">{{ spinDuration }}s</div>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Confetti</label>
                <button
                  @click="toggleConfetti"
                  :class="[confettiEnabled ? 'bg-green-500' : 'bg-gray-400', 'relative inline-flex h-6 w-11 items-center rounded-full transition-colors']"
                >
                  <span :class="[confettiEnabled ? 'translate-x-6' : 'translate-x-1', 'inline-block h-4 w-4 transform rounded-full bg-white transition']" />
                </button>
              </div>
            </div>
          </div>

          <!-- Participants List -->
          <div class="glass rounded-2xl p-6 shadow-xl">
            <h3 class="text-xl font-semibold mb-4 text-gray-800">
              Participants ({{ participants.length }})
            </h3>
            <div class="space-y-2 max-h-60 overflow-y-auto">
              <div
                v-if="participants.length === 0"
                class="text-center text-gray-500 py-8 italic"
              >
                No participants yet. Add some names to get started!
              </div>
              <div
                v-for="(participant, index) in participants"
                :key="index"
                class="flex items-center justify-between p-3 bg-white/50 rounded-lg border border-white/30"
              >
                <span class="font-medium text-gray-800">{{ participant.name }}</span>
                <button
                  @click="removeParticipant(index)"
                  class="w-6 h-6 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full flex items-center justify-center transition-colors"
                >
                  ✕
                </button>
              </div>
            </div>
            <button
              v-if="participants.length > 0"
              @click="clearAll"
              class="w-full mt-4 px-4 py-2 text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
            >
              Clear All
            </button>
          </div>
        </div>

        <!-- Spinner -->
        <div class="lg:col-span-2">
          <div class="glass rounded-3xl p-8 shadow-2xl">
            <div class="flex flex-col items-center">
              <!-- Spinner Container -->
              <div class="relative mb-8">
                <div class="spinner-container relative">
                  <svg
                    ref="spinnerRef"
                    :class="['spinner-wheel transition-transform duration-1000 ease-out', { 'animate-pulse-glow': isSpinning }]"
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
                        class="spinner-segment cursor-pointer transition-all hover:brightness-110"
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
                        {{ participants[index].name.length > 8 ? participants[index].name.substring(0, 8) + '...' : participants[index].name }}
                      </text>
                    </g>
                    
                    <!-- Empty state -->
                    <circle v-else cx="175" cy="175" r="150" fill="#f3f4f6" stroke="#d1d5db" stroke-width="3" />
                    <text v-if="participants.length === 0" x="175" y="175" text-anchor="middle" dominant-baseline="middle" class="text-lg font-medium fill-gray-500">
                      Add participants to start
                    </text>
                    
                    <!-- Center circle -->
                    <circle cx="175" cy="175" r="15" fill="#1f2937" />
                  </svg>
                  
                  <!-- Pointer -->
                  <div class="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2">
                    <div class="w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-red-500 drop-shadow-lg"></div>
                  </div>
                </div>
              </div>

              <!-- Spin Button -->
              <button
                @click="spin"
                :disabled="participants.length < 2 || isSpinning"
                :class="[
                  'px-12 py-4 rounded-2xl font-bold text-xl transition-all duration-300 transform',
                  participants.length < 2 || isSpinning
                    ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                    : 'bg-gradient-to-r from-red-500 to-pink-600 text-white hover:from-red-600 hover:to-pink-700 hover:scale-105 hover:shadow-2xl active:scale-95'
                ]"
              >
                {{ getSpinButtonText() }}
              </button>

              <!-- Winner Display -->
              <Transition name="bounce" appear>
                <div
                  v-if="winner"
                  class="mt-8 p-6 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 rounded-2xl shadow-2xl animate-bounce-in"
                >
                  <div class="text-center">
                    <h2 class="text-2xl font-bold text-white mb-2">🎉 Winner! 🎉</h2>
                    <p class="text-3xl font-bold text-white">{{ winner.name }}</p>
                  </div>
                </div>
              </Transition>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Confetti Canvas -->
    <canvas
      ref="confettiCanvas"
      id="confetti-canvas"
    ></canvas>
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
const newParticipant = ref('')
const isSpinning = ref(false)
const winner = ref(null)
const spinnerRef = ref(null)
const confettiCanvas = ref(null)

// Settings
const soundEnabled = ref(true)
const confettiEnabled = ref(true)
const spinDuration = ref(4)

// Sound effects
const spinSound = new Howl({
  src: ['data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmIYBzaN1fHQfyoEJHfH8N2QQAoUXrTp66hVFApGn+DyvmIYBzaN1fHQfyoEJHfH8N2QQAoUXrTp66hVFApGn+DyvmIYBzaN1fHQfyoEJHfH8N2QQAoUXrTp66hVFApGn+DyvmIYBzaN1fHQfyoEJHfH8N2QQAoUXrTp66hVFApGn+DyvmIYBzaN1fHQfyoEJHfH8N2QQAoUXrTp66hVFApGn+DyvmIYBzaN1fHQfyoE'],
  volume: 0.3
})

const tickSound = new Howl({
  src: ['data:audio/wav;base64,UklGRqYBAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YYIBAABMuWOhNJTzVKJrEZW6M5DkVKFwYfOkCZWVM5biU6JwJa61JXqiAJaZM5/gUKN3SXqbJX2dEJWPM5beT6RyDIHfJH+gCJWGM5LdT6VzNISMJIOZGJV8M47cUKZzM4HJJIW9NZVyMYraUKdzCIq/JYu8OpVrMYXXUKh3GY2MI47HOJVjMoHUUal3G5OQJ5HLGZVcMnzRUap4MZiZKJPQFZVUMnnOUKp5M5qJJpbUEZVKMnXLT6p6LJ2YKZrYDZVAMXHIT6x8H6eiKJ7cCZU3MG/FT6x9BKe1J6DgBZUuMGvCT61/E6zCJ6HkAZUkMGi/UK1/LbDMKKToAJUaMVy8UK1/Vrc='],
  volume: 0.1
})

const winSound = new Howl({
  src: ['data:audio/wav;base64,UklGRvQDAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YdADAAC4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4'],
  volume: 0.5
})

// Color palette for wheel segments
const colors = [
  '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57',
  '#ff9ff3', '#54a0ff', '#5f27cd', '#00d2d3', '#ff9f43',
  '#ee5a24', '#009432', '#0652dd', '#9c88ff', '#fda7df',
  '#fed330', '#fd9644', '#fc7b03', '#fdcb6e', '#6c5ce7'
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
const addParticipant = () => {
  const name = newParticipant.value.trim()
  
  if (!name) {
    toast.error('Please enter a name')
    return
  }
  
  if (participants.value.some(p => p.name.toLowerCase() === name.toLowerCase())) {
    toast.error('This name is already in the list')
    return
  }
  
  if (participants.value.length >= 20) {
    toast.error('Maximum 20 participants allowed')
    return
  }
  
  participants.value.push({
    name,
    id: Date.now(),
    color: colors[participants.value.length % colors.length]
  })
  
  newParticipant.value = ''
  toast.success(`${name} added!`)
  saveToLocalStorage()
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
  const minSpins = 5
  const maxSpins = 10
  const spins = Math.random() * (maxSpins - minSpins) + minSpins
  const segmentAngle = 360 / participants.value.length
  const randomSegment = Math.floor(Math.random() * participants.value.length)
  const finalAngle = (spins * 360) + (randomSegment * segmentAngle) + (segmentAngle / 2)
  
  // Animate spinner
  await new Promise(resolve => {
    gsap.to(spinnerRef.value, {
      rotation: finalAngle,
      duration: spinDuration.value,
      ease: 'power3.out',
      onComplete: resolve
    })
  })
  
  // Determine winner
  const normalizedAngle = (finalAngle % 360 + 360) % 360
  const winnerIndex = Math.floor((360 - normalizedAngle) / segmentAngle) % participants.value.length
  winner.value = participants.value[winnerIndex]
  
  if (soundEnabled.value) {
    winSound.play()
  }
  
  if (confettiEnabled.value) {
    showConfetti()
  }
  
  isSpinning.value = false
  toast.success(`🎉 ${winner.value.name} wins!`)
}

const showConfetti = () => {
  const canvas = confettiCanvas.value
  const canvasConfetti = confetti.create(canvas, {
    resize: true,
    useWorker: true
  })
  
  // Multiple bursts for better effect
  for (let i = 0; i < 3; i++) {
    setTimeout(() => {
      canvasConfetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#feca57', '#ff9ff3']
      })
    }, i * 300)
  }
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
  toast.info(soundEnabled.value ? 'Sound enabled' : 'Sound disabled')
  saveToLocalStorage()
}

const toggleConfetti = () => {
  confettiEnabled.value = !confettiEnabled.value
  toast.info(confettiEnabled.value ? 'Confetti enabled' : 'Confetti disabled')
  saveToLocalStorage()
}

const getSpinButtonText = () => {
  if (participants.value.length < 2) return 'Add at least 2 participants'
  if (isSpinning.value) return 'Spinning...'
  return '🎲 SPIN THE WHEEL!'
}

const saveToLocalStorage = () => {
  localStorage.setItem('8spinner-data', JSON.stringify({
    participants: participants.value,
    soundEnabled: soundEnabled.value,
    confettiEnabled: confettiEnabled.value,
    spinDuration: spinDuration.value
  }))
}

const loadFromLocalStorage = () => {
  try {
    const saved = localStorage.getItem('8spinner-data')
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
.bounce-enter-active {
  animation: bounce-in 0.5s ease-out;
}

.bounce-leave-active {
  animation: bounce-out 0.3s ease-in;
}

@keyframes bounce-in {
  0% {
    opacity: 0;
    transform: scale(0.8) translateY(20px);
  }
  60% {
    opacity: 1;
    transform: scale(1.05) translateY(-5px);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

@keyframes bounce-out {
  0% {
    opacity: 1;
    transform: scale(1);
  }
  100% {
    opacity: 0;
    transform: scale(0.8);
  }
}

.spinner-wheel {
  filter: drop-shadow(0 10px 25px rgba(0, 0, 0, 0.15));
}
</style>