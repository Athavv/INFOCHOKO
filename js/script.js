const menuIcon = document.getElementById('menuIcon');
const overlay = document.getElementById('overlay');

// Toggle l'overlay et l'icône
menuIcon.addEventListener('click', () => {
    menuIcon.classList.toggle('active');
    overlay.classList.toggle('d-none');
});

// Clic sur l'overlay pour fermer
overlay.addEventListener('click', () => {
    overlay.classList.add('d-none');
    menuIcon.classList.remove('active');
});

document.addEventListener("DOMContentLoaded", () => {
    const audio = document.getElementById("audioPlayer");
    const playPauseBtn = document.getElementById("playPause");
    const back10Btn = document.getElementById("back10");
    const forward10Btn = document.getElementById("forward10");
    const speedControl = document.getElementById("speedControl");
    const volumeControl = document.getElementById("volumeControl");
    const progressBar = document.getElementById("progressBar");
    const currentTime = document.getElementById("currentTime");
    const duration = document.getElementById("duration");

    // Lecture et pause
    playPauseBtn.addEventListener("click", () => {
        if (audio.paused) {
            audio.play();
            playPauseBtn.innerHTML = '<i class="bi bi-pause-fill"></i>';
        } else {
            audio.pause();
            playPauseBtn.innerHTML = '<i class="bi bi-play-fill"></i>';
        }
    });

    // Reculer de 10 secondes
    back10Btn.addEventListener("click", () => {
        audio.currentTime = Math.max(0, audio.currentTime - 10);
    });

    // Avancer de 10 secondes
    forward10Btn.addEventListener("click", () => {
        audio.currentTime = Math.min(audio.duration, audio.currentTime + 10);
    });

    // Changer la vitesse
    speedControl.addEventListener("change", () => {
        audio.playbackRate = parseFloat(speedControl.value);
    });

    // Contrôle du volume
    volumeControl.addEventListener("input", () => {
        audio.volume = parseFloat(volumeControl.value);
    });

    // Mettre à jour la barre de progression
    audio.addEventListener("timeupdate", () => {
        const progress = (audio.currentTime / audio.duration) * 100;
        progressBar.value = progress || 0;
        currentTime.textContent = formatTime(audio.currentTime);
    });

    // Sauter à un moment précis via la barre de progression
    progressBar.addEventListener("input", () => {
        const seekTime = (progressBar.value / 100) * audio.duration;
        audio.currentTime = seekTime;
    });

    // Afficher la durée totale de l'audio
    audio.addEventListener("loadedmetadata", () => {
        duration.textContent = formatTime(audio.duration);
    });

    // Fonction pour formater le temps en mm:ss
    function formatTime(time) {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60).toString().padStart(2, "0");
        return `${minutes}:${seconds}`;
    }
});
