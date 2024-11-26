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
            playPauseBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-pause-circle-fill" viewBox="0 0 16 16"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M6.25 5C5.56 5 5 5.56 5 6.25v3.5a1.25 1.25 0 1 0 2.5 0v-3.5C7.5 5.56 6.94 5 6.25 5m3.5 0c-.69 0-1.25.56-1.25 1.25v3.5a1.25 1.25 0 1 0 2.5 0v-3.5C11 5.56 10.44 5 9.75 5"/></svg>';
        } else {
            audio.pause();
            playPauseBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16"> <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393"/> </svg>';
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

    const volumeIcon = document.querySelector(".volume-icon");
    
    // Affiche ou masque le slider quand on clique sur l'icône
    volumeIcon.addEventListener("click", () => {
        volumeControl.classList.toggle("hidden");
    });
    
    // Met à jour le volume de l'audio
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
