<template>
  <div id="app" class="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
    <!-- Background effects -->
    <div class="fixed inset-0 overflow-hidden pointer-events-none">
      <div class="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-pink-500/10 rounded-full blur-2xl animate-ping"></div>
    </div>

    <div class="relative z-10 p-6">
      <div class="max-w-7xl mx-auto">
        <!-- Header -->
        <header class="text-center mb-12">
          <div class="inline-flex items-center space-x-3 mb-6">
            <div class="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd" />
              </svg>
            </div>
            <h1 class="text-6xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
              Spinner
            </h1>
          </div>
          <p class="text-xl text-gray-300 font-light">Decentralized Random Name Selector</p>
          <div class="flex items-center justify-center space-x-2 mt-4">
            <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span class="text-sm text-green-400 font-mono">LIVE</span>
          </div>
        </header>

        <div class="grid lg:grid-cols-12 gap-8">
          <!-- Controls Panel -->
          <div class="lg:col-span-4 space-y-6">
            <!-- Add Participants -->
            <div class="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 shadow-2xl">
              <h3 class="text-xl font-semibold mb-4 text-white flex items-center">
                <svg class="w-5 h-5 mr-2 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"/>
                </svg>
                Add Participants
              </h3>
              <div class="space-y-4">
                <textarea
                  v-model="participantInput"
                  @keydown="handleKeyDown"
                  placeholder="Enter names (one per line or separated by commas)&#10;Press Enter to add all..."
                  rows="4"
                  class="w-full px-4 py-3 bg-black/20 border border-purple-500/30 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none backdrop-blur-sm"
                ></textarea>
                <div class="flex flex-col sm:flex-row gap-3">
                  <button
                    @click="addParticipants"
                    :disabled="!participantInput.trim()"
                    class="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-purple-500/25"
                  >
                    <svg class="w-5 h-5 inline mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd"/>
                    </svg>
                    Add All
                  </button>
                  <button
                    @click="clearInput"
                    class="px-4 py-3 bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 rounded-xl transition-all duration-200 border border-gray-600/50"
                  >
                    Clear
                  </button>
                </div>
              </div>
            </div>

            <!-- Settings -->
            <div class="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 shadow-2xl">
              <h3 class="text-xl font-semibold mb-4 text-white flex items-center">
                <svg class="w-5 h-5 mr-2 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd"/>
                </svg>
                Settings
              </h3>
              <div class="space-y-6">
                <div class="flex items-center justify-between">
                  <div class="flex items-center space-x-3">
                    <svg class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM15.657 6.343a1 1 0 011.414 0A9.972 9.972 0 0119 12a9.972 9.972 0 01-1.929 5.657 1 1 0 11-1.414-1.414A7.972 7.972 0 0017 12a7.972 7.972 0 00-1.343-4.243 1 1 0 010-1.414z" clip-rule="evenodd"/>
                    </svg>
                    <span class="text-white font-medium">Sound Effects</span>
                  </div>
                  <button
                    @click="toggleSound"
                    :class="[
                      soundEnabled ? 'bg-gradient-to-r from-green-500 to-emerald-500' : 'bg-gray-600',
                      'relative inline-flex h-6 w-12 items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900'
                    ]"
                  >
                    <span :class="[soundEnabled ? 'translate-x-7' : 'translate-x-1', 'inline-block h-4 w-4 transform rounded-full bg-white transition duration-200 ease-in-out']" />
                  </button>
                </div>
                
                <div>
                  <div class="flex items-center justify-between mb-3">
                    <div class="flex items-center space-x-3">
                      <svg class="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"/>
                      </svg>
                      <span class="text-white font-medium">Spin Duration</span>
                    </div>
                    <span class="text-purple-400 font-mono text-sm">{{ spinDuration }}s</span>
                  </div>
                  <input
                    v-model="spinDuration"
                    type="range"
                    min="2"
                    max="8"
                    step="0.5"
                    class="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                  />
                </div>
                
                <div class="flex items-center justify-between">
                  <div class="flex items-center space-x-3">
                    <svg class="w-5 h-5 text-pink-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03z" clip-rule="evenodd"/>
                    </svg>
                    <span class="text-white font-medium">Confetti</span>
                  </div>
                  <button
                    @click="toggleConfetti"
                    :class="[
                      confettiEnabled ? 'bg-gradient-to-r from-pink-500 to-rose-500' : 'bg-gray-600',
                      'relative inline-flex h-6 w-12 items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 focus:ring-offset-gray-900'
                    ]"
                  >
                    <span :class="[confettiEnabled ? 'translate-x-7' : 'translate-x-1', 'inline-block h-4 w-4 transform rounded-full bg-white transition duration-200 ease-in-out']" />
                  </button>
                </div>
              </div>
            </div>

            <!-- Participants List -->
            <div class="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 shadow-2xl">
              <div class="flex items-center justify-between mb-4">
                <h3 class="text-xl font-semibold text-white flex items-center">
                  <svg class="w-5 h-5 mr-2 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
                  </svg>
                  Participants
                </h3>
                <span class="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm font-mono border border-purple-500/30">
                  {{ participants.length }}
                </span>
              </div>
              
              <div class="space-y-2 max-h-64 overflow-y-auto custom-scrollbar">
                <div v-if="participants.length === 0" class="text-center text-gray-400 py-8 italic">
                  <svg class="w-12 h-12 mx-auto mb-3 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"/>
                  </svg>
                  No participants yet
                </div>
                
                <div
                  v-for="(participant, index) in participants"
                  :key="participant.id"
                  class="group flex items-center justify-between p-3 bg-black/20 rounded-lg border border-white/10 hover:border-purple-500/50 transition-all duration-200"
                >
                  <div class="flex items-center space-x-3">
                    <div 
                      class="w-3 h-3 rounded-full"
                      :style="{ backgroundColor: participant.color }"
                    ></div>
                    <span class="text-white font-medium">{{ participant.name }}</span>
                  </div>
                  <button
                    @click="removeParticipant(index)"
                    class="opacity-0 group-hover:opacity-100 w-6 h-6 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-full flex items-center justify-center transition-all duration-200"
                  >
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
                    </svg>
                  </button>
                </div>
              </div>
              
              <button
                v-if="participants.length > 0"
                @click="clearAll"
                class="w-full mt-4 px-4 py-2 text-red-400 border border-red-500/30 rounded-lg hover:bg-red-500/10 hover:border-red-500/50 transition-all duration-200 font-medium"
              >
                <svg class="w-4 h-4 inline mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"/>
                </svg>
                Clear All
              </button>
            </div>
          </div>

          <!-- Spinner -->
          <div class="lg:col-span-8">
            <div class="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl">
              <div class="flex flex-col items-center">
                <!-- Spinner Container -->
                <div class="relative mb-8">
                  <div class="spinner-container relative">
                    <!-- Glow effect -->
                    <div class="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse"></div>
                    
                    <svg
                      ref="spinnerRef"
                      :class="['spinner-wheel relative z-10 transition-transform duration-1000 ease-out', { 'animate-pulse': isSpinning }]"
                      width="400"
                      height="400"
                      viewBox="0 0 400 400"
                    >
                      <!-- Wheel segments -->
                      <g v-if="participants.length > 0">
                        <path
                          v-for="(segment, index) in wheelSegments"
                          :key="index"
                          :d="segment.path"
                          :fill="segment.color"
                          stroke="#ffffff"
                          stroke-width="3"
                          class="spinner-segment cursor-pointer transition-all duration-200 hover:brightness-110 hover:scale-105"
                          style="filter: drop-shadow(0 4px 8px rgba(0,0,0,0.3))"
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
                          style="text-shadow: 2px 2px 4px rgba(0,0,0,0.8); font-family: 'Inter', sans-serif;"
                        >
                          {{ truncateName(participants[index].name) }}
                        </text>
                      </g>
                      
                      <!-- Empty state -->
                      <g v-else>
                        <circle cx="200" cy="200" r="170" fill="url(#emptyGradient)" stroke="#4f46e5" stroke-width="4" />
                        <text x="200" y="200" text-anchor="middle" dominant-baseline="middle" class="text-lg font-medium fill-gray-300">
                          Add participants to spin
                        </text>
                      </g>
                      
                      <!-- Center circle -->
                      <circle cx="200" cy="200" r="20" fill="url(#centerGradient)" stroke="#ffffff" stroke-width="3" />
                      
                      <!-- Gradients -->
                      <defs>
                        <radialGradient id="emptyGradient" cx="50%" cy="50%" r="50%">
                          <stop offset="0%" stop-color="#1e293b" />
                          <stop offset="100%" stop-color="#0f172a" />
                        </radialGradient>
                        <radialGradient id="centerGradient" cx="50%" cy="50%" r="50%">
                          <stop offset="0%" stop-color="#8b5cf6" />
                          <stop offset="100%" stop-color="#6366f1" />
                        </radialGradient>
                      </defs>
                    </svg>
                    
                    <!-- Pointer -->
                    <div class="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-3 z-20">
                      <div class="w-0 h-0 border-l-6 border-r-6 border-b-12 border-l-transparent border-r-transparent border-b-gradient-to-r from-yellow-400 to-orange-500 filter drop-shadow-lg">
                        <div class="w-0 h-0 border-l-5 border-r-5 border-b-10 border-l-transparent border-r-transparent border-b-yellow-400"></div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Spin Button -->
                <button
                  @click="spin"
                  :disabled="participants.length < 2 || isSpinning"
                  :class="[
                    'px-16 py-6 rounded-2xl font-bold text-2xl transition-all duration-300 transform shadow-2xl',
                    participants.length < 2 || isSpinning
                      ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white hover:from-purple-700 hover:via-pink-700 hover:to-red-700 hover:scale-110 hover:shadow-purple-500/50 active:scale-95'
                  ]"
                >
                  <span class="flex items-center justify-center">
                    <svg v-if="isSpinning" class="animate-spin -ml-1 mr-3 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <svg v-else class="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clip-rule="evenodd"/>
                    </svg>
                    {{ getSpinButtonText() }}
                  </span>
                </button>

                <!-- Winner Display -->
                <Transition name="winner" appear>
                  <div
                    v-if="winner"
                    class="mt-8 p-8 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 rounded-3xl shadow-2xl animate-bounce-in backdrop-blur-xl border border-yellow-400/50"
                  >
                    <div class="text-center">
                      <div class="text-6xl mb-4">🎉</div>
                      <h2 class="text-3xl font-bold text-white mb-2">Winner!</h2>
                      <p class="text-4xl font-bold text-white">{{ winner.name }}</p>
                    </div>
                  </div>
                </Transition>
              </div>
            </div>
          </div>
        </div>

        <!-- Credits -->
        <footer class="mt-16 text-center">
          <div class="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 shadow-xl">
            <div class="flex flex-col md:flex-row items-center justify-between">
              <div class="flex items-center space-x-4 mb-4 md:mb-0">
                <div class="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"/>
                  </svg>
                </div>
                <div class="text-left">
                  <p class="text-white font-semibold">Built with modern web technologies</p>
                  <p class="text-gray-400 text-sm">Vue.js 3 • Tailwind CSS • GSAP • Web3 Design</p>
                </div>
              </div>
              <div class="flex items-center space-x-6 text-sm text-gray-400">
                <a href="https://github.com/farkhanmaul/spinner" target="_blank" class="hover:text-purple-400 transition-colors flex items-center">
                  <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clip-rule="evenodd"/>
                  </svg>
                  GitHub
                </a>
                <span class="text-gray-600">•</span>
                <span>Made with ❤️ by farkhanmaul</span>
                <span class="text-gray-600">•</span>
                <span>Powered by Claude Code</span>
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

// Enhanced color palette with Web3 gradients
const colors = [
  '#8B5CF6', '#EC4899', '#EF4444', '#F97316', '#F59E0B',
  '#84CC16', '#22C55E', '#06B6D4', '#3B82F6', '#6366F1',
  '#8B5A2B', '#DC2626', '#7C3AED', '#DB2777', '#059669',
  '#0891B2', '#6D28D9', '#BE185D', '#047857', '#1E40AF'
]

// Computed properties
const wheelSegments = computed(() => {
  if (participants.value.length === 0) return []
  
  const segments = []
  const anglePerSegment = 360 / participants.value.length
  const radius = 170
  const centerX = 200
  const centerY = 200
  
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
  
  // Determine winner
  const normalizedAngle = (finalAngle % 360 + 360) % 360
  const winnerIndex = Math.floor((360 - normalizedAngle) / segmentAngle) % participants.value.length
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
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: linear-gradient(45deg, #8B5CF6, #EC4899);
  border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(45deg, #7C3AED, #DB2777);
}

/* Range slider styling */
.slider::-webkit-slider-thumb {
  appearance: none;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background: linear-gradient(45deg, #8B5CF6, #EC4899);
  cursor: pointer;
  border: 2px solid #ffffff;
  box-shadow: 0 4px 8px rgba(139, 92, 246, 0.3);
}

.slider::-webkit-slider-track {
  height: 8px;
  border-radius: 4px;
  background: linear-gradient(90deg, #374151, #6B7280);
}

.slider::-moz-range-thumb {
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background: linear-gradient(45deg, #8B5CF6, #EC4899);
  cursor: pointer;
  border: 2px solid #ffffff;
  box-shadow: 0 4px 8px rgba(139, 92, 246, 0.3);
}

.slider::-moz-range-track {
  height: 8px;
  border-radius: 4px;
  background: linear-gradient(90deg, #374151, #6B7280);
}

/* Spinner animations */
.spinner-wheel {
  filter: drop-shadow(0 20px 40px rgba(139, 92, 246, 0.3));
  transition: transform 0.3s ease;
}

.spinner-segment {
  transition: all 0.2s ease;
  transform-origin: center;
}

.spinner-segment:hover {
  filter: brightness(1.2) drop-shadow(0 4px 12px rgba(0,0,0,0.4));
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
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
  animation: shine 0.6s ease-in-out;
}

@keyframes shine {
  0% { left: -100%; }
  100% { left: 100%; }
}

/* Loading animation for spinner */
@keyframes spin-glow {
  0%, 100% { 
    filter: drop-shadow(0 20px 40px rgba(139, 92, 246, 0.3)) hue-rotate(0deg);
  }
  50% { 
    filter: drop-shadow(0 20px 40px rgba(236, 72, 153, 0.5)) hue-rotate(90deg);
  }
}

.spinner-wheel.animate-pulse {
  animation: spin-glow 2s ease-in-out infinite;
}

/* Glassmorphism enhancements */
.backdrop-blur-xl {
  backdrop-filter: blur(16px);
}

/* Mobile responsiveness */
@media (max-width: 768px) {
  .text-6xl {
    font-size: 3rem;
  }
  
  .spinner-wheel {
    width: 300px;
    height: 300px;
  }
  
  .px-16 {
    padding-left: 2rem;
    padding-right: 2rem;
  }
  
  .text-2xl {
    font-size: 1.25rem;
  }
}
</style>