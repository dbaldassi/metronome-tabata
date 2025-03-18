const metronome = {
    interval: null,
    tempo: 120, // Default tempo in beats per minute
    isPlaying: false,
    beatCount: 0, // Keeps track of the current beat in the measure
    beatsPerMeasure: 4, // Number of beats per measure
    volume: 0.5, // Default volume (50%)

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
        audio.volume = this.volume; // Set the volume of the audio
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
    },

    setVolume: function(newVolume) {
        this.volume = newVolume;
    }
};

// Tabata Timer Logic
const tabata = {
    phases: [],
    currentPhaseIndex: 0,
    timer: null,

    addPhase: function(name, exerciseTime, restTime, bpm) {
        this.phases.push({ name, exerciseTime, restTime, bpm });
        this.updatePhaseList();
    },

    updatePhaseList: function() {
        const phaseList = document.getElementById('phaseList');
        phaseList.innerHTML = '';
        this.phases.forEach((phase, index) => {
            const li = document.createElement('li');
            li.textContent = `${phase.name} : Exercice ${phase.exerciseTime}s, Repos ${phase.restTime}s, BPM ${phase.bpm}`;
            phaseList.appendChild(li);
        });
    },

    start: function() {
        if (this.phases.length === 0) {
            alert('Ajoutez au moins une phase avant de démarrer.');
            return;
        }
        this.currentPhaseIndex = 0;
        this.runPhase();
    },

    runPhase: function() {
        if (this.currentPhaseIndex >= this.phases.length) {
            alert('Tabata terminé !');
            metronome.stop();
            return;
        }

        const currentPhase = this.phases[this.currentPhaseIndex];
        const { name, exerciseTime, restTime, bpm } = currentPhase;

        // Phase d'exercice
        metronome.setTempo(bpm);
        metronome.start();
        console.log(`${name} : - Exercice ${exerciseTime}s à ${bpm} BPM`);
        this.timer = setTimeout(() => {
            metronome.stop();

            // Phase de repos
            console.log(`Repos ${restTime}s`);
            this.timer = setTimeout(() => {
                this.currentPhaseIndex++;
                this.runPhase();
            }, restTime * 1000);
        }, exerciseTime * 1000);
    },

    stop: function() {
        clearTimeout(this.timer);
        metronome.stop();
        this.currentPhaseIndex = 0;
    }
};

// Event listeners for Tabata controls
document.getElementById('addPhase').addEventListener('click', () => {
    const name = document.getElementById('phaseName').value || `Phase ${tabata.phases.length + 1}`;
    const exerciseTime = parseInt(document.getElementById('exerciseTime').value);
    const restTime = parseInt(document.getElementById('restTime').value);
    const bpm = parseInt(document.getElementById('phaseBpm').value);

    if (!isNaN(exerciseTime) && !isNaN(restTime) && !isNaN(bpm)) {
        tabata.addPhase(name, exerciseTime, restTime, bpm);
    }
});

document.getElementById('startTabata').addEventListener('click', () => tabata.start());
document.getElementById('start').addEventListener('click', () => metronome.start());
document.getElementById('stop').addEventListener('click', () => {
    metronome.stop();
    tabata.stop();
});
document.getElementById('bpm').addEventListener('change', (event) => {
    const newTempo = parseInt(event.target.value);
    if (!isNaN(newTempo)) {
        metronome.setTempo(newTempo);
    }
});
document.getElementById('volume').addEventListener('input', (event) => {
    const newVolume = parseFloat(event.target.value);
    metronome.setVolume(newVolume);
});