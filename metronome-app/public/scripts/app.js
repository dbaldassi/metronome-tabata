const metronome = {
    interval: null,
    tempo: 120, // Default tempo in beats per minute
    isPlaying: false,
    beatCount: 0, // Keeps track of the current beat in the measure
    beatsPerMeasure: 4, // Number of beats per measure

    start: function() {
        if (!this.isPlaying) {
            this.isPlaying = true;
            this.beatCount = 0; // Reset beat count when starting
            this.interval = setInterval(() => {
                this.playBeat();
            }, (60000 / this.tempo));
        }
    },

    stop: function() {
        if (this.isPlaying) {
            clearInterval(this.interval);
            this.isPlaying = false;
            this.beatCount = 0; // Reset beat count when stopping
        }
    },

    playBeat: function() {
        const soundFile = this.beatCount === 0 ? '/sounds/first.wav' : '/sounds/normal.wav';
        const audio = new Audio(soundFile);
        audio.play();

        this.updateUI();

        // Increment beat count and reset to 0 if it reaches the number of beats per measure
        this.beatCount = (this.beatCount + 1) % this.beatsPerMeasure;
    },

    updateUI: function() {
        // Update the UI to reflect the current state (e.g., change button text)
        const status = document.getElementById('status');
        status.textContent = this.isPlaying ? 'Playing' : 'Stopped';
    },

    setTempo: function(newTempo) {
        this.tempo = newTempo;
        if (this.isPlaying) {
            this.stop();
            this.start();
        }
    }
};

// Event listeners for UI controls
document.getElementById('start').addEventListener('click', () => metronome.start());
document.getElementById('stop').addEventListener('click', () => metronome.stop());
document.getElementById('bpm').addEventListener('change', (event) => {
    const newTempo = parseInt(event.target.value);
    if (!isNaN(newTempo)) {
        metronome.setTempo(newTempo);
    }
});