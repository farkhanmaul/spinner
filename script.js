class SpinnerApp {
    constructor() {
        this.participants = [];
        this.isSpinning = false;
        this.colors = [
            '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57',
            '#ff9ff3', '#54a0ff', '#5f27cd', '#00d2d3', '#ff9f43'
        ];
        
        this.initializeElements();
        this.bindEvents();
        this.loadFromLocalStorage();
        this.updateDisplay();
    }

    initializeElements() {
        this.nameInput = document.getElementById('nameInput');
        this.addBtn = document.getElementById('addBtn');
        this.spinBtn = document.getElementById('spinBtn');
        this.clearBtn = document.getElementById('clearBtn');
        this.spinner = document.getElementById('spinner');
        this.result = document.getElementById('result');
        this.participantsList = document.getElementById('participantsList');
        this.participantCount = document.getElementById('participantCount');
    }

    bindEvents() {
        this.addBtn.addEventListener('click', () => this.addParticipant());
        this.nameInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.addParticipant();
            }
        });
        this.spinBtn.addEventListener('click', () => this.spin());
        this.clearBtn.addEventListener('click', () => this.clearAll());
    }

    addParticipant() {
        const name = this.nameInput.value.trim();
        
        if (!name) {
            this.nameInput.focus();
            return;
        }

        if (this.participants.includes(name)) {
            alert('Nama sudah ada dalam daftar!');
            this.nameInput.focus();
            return;
        }

        if (this.participants.length >= 20) {
            alert('Maksimal 20 peserta!');
            return;
        }

        this.participants.push(name);
        this.nameInput.value = '';
        this.nameInput.focus();
        
        this.updateDisplay();
        this.saveToLocalStorage();
    }

    removeParticipant(name) {
        this.participants = this.participants.filter(p => p !== name);
        this.updateDisplay();
        this.saveToLocalStorage();
    }

    updateDisplay() {
        this.updateParticipantsList();
        this.updateSpinner();
        this.updateSpinButton();
        this.participantCount.textContent = this.participants.length;
    }

    updateParticipantsList() {
        if (this.participants.length === 0) {
            this.participantsList.innerHTML = '<div class="empty-state">Belum ada peserta. Tambahkan nama untuk mulai!</div>';
            return;
        }

        this.participantsList.innerHTML = this.participants
            .map(name => `
                <div class="participant-tag">
                    <span>${this.escapeHtml(name)}</span>
                    <button class="remove-btn" onclick="app.removeParticipant('${this.escapeHtml(name)}')">&times;</button>
                </div>
            `).join('');
    }

    updateSpinner() {
        if (this.participants.length === 0) {
            this.spinner.innerHTML = '<div class="spinner-center"></div>';
            return;
        }

        const segmentAngle = 360 / this.participants.length;
        const segments = this.participants.map((name, index) => {
            const rotation = index * segmentAngle;
            const color = this.colors[index % this.colors.length];
            
            return `
                <div class="spinner-segment" style="
                    transform: rotate(${rotation}deg);
                    background: ${color};
                    clip-path: polygon(0 0, ${Math.cos(Math.PI * segmentAngle / 180) * 100}% ${Math.sin(Math.PI * segmentAngle / 180) * 100}%, 0 100%);
                ">
                    <span style="
                        transform: rotate(${segmentAngle / 2}deg);
                        transform-origin: center;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        max-width: 80px;
                    ">${this.escapeHtml(name)}</span>
                </div>
            `;
        }).join('');

        this.spinner.innerHTML = segments + '<div class="spinner-center"></div>';
    }

    updateSpinButton() {
        this.spinBtn.disabled = this.participants.length < 2 || this.isSpinning;
        
        if (this.participants.length < 2) {
            this.spinBtn.textContent = 'Minimal 2 Peserta';
        } else if (this.isSpinning) {
            this.spinBtn.textContent = 'BERPUTAR...';
        } else {
            this.spinBtn.textContent = 'PUTAR!';
        }
    }

    spin() {
        if (this.participants.length < 2 || this.isSpinning) return;

        this.isSpinning = true;
        this.updateSpinButton();
        this.result.classList.remove('show');

        // Calculate random rotation
        const minSpins = 3;
        const maxSpins = 6;
        const spins = Math.random() * (maxSpins - minSpins) + minSpins;
        const segmentAngle = 360 / this.participants.length;
        const randomSegment = Math.floor(Math.random() * this.participants.length);
        const finalAngle = (spins * 360) + (randomSegment * segmentAngle) + (segmentAngle / 2);

        this.spinner.style.transform = `rotate(${finalAngle}deg)`;

        // Show result after spin animation
        setTimeout(() => {
            const winnerIndex = (this.participants.length - Math.floor((finalAngle % 360) / segmentAngle)) % this.participants.length;
            const winner = this.participants[winnerIndex];
            
            this.showResult(winner);
            this.isSpinning = false;
            this.updateSpinButton();
        }, 4000);
    }

    showResult(winner) {
        this.result.innerHTML = `🎉 Pemenang: <strong>${this.escapeHtml(winner)}</strong> 🎉`;
        this.result.classList.add('show');
    }

    clearAll() {
        if (this.participants.length === 0) return;
        
        if (confirm('Hapus semua peserta?')) {
            this.participants = [];
            this.updateDisplay();
            this.saveToLocalStorage();
            this.result.classList.remove('show');
            this.spinner.style.transform = 'rotate(0deg)';
        }
    }

    saveToLocalStorage() {
        localStorage.setItem('spinnerParticipants', JSON.stringify(this.participants));
    }

    loadFromLocalStorage() {
        const saved = localStorage.getItem('spinnerParticipants');
        if (saved) {
            try {
                this.participants = JSON.parse(saved);
            } catch (e) {
                this.participants = [];
            }
        }
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new SpinnerApp();
});