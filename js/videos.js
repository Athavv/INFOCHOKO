// Variables globales
let player; // L'instance du lecteur YouTube
let isSeeking = false; // Indique si l'utilisateur interagit avec la barre
let isPausedByUser = false; // Indique si la pause a été déclenchée intentionnellement

// Charge l'API YouTube iframe
function onYouTubeIframeAPIReady() {
  player = new YT.Player('video', {
    events: {
      onReady: onPlayerReady, // Appelé lorsque le lecteur est prêt
      onStateChange: onPlayerStateChange, // Appelé lorsqu'il y a un changement d'état
    }
  });
}

// Quand le lecteur est prêt
function onPlayerReady(event) {
  const playButton = document.getElementById('play-button');
  const overlay = document.getElementById('overlay');

  // Quand le bouton Play est cliqué
  playButton.addEventListener('click', () => {
    player.playVideo(); // Démarre la vidéo via l'API
    overlay.classList.add('hidden'); // Cache l'overlay
    isPausedByUser = false; // Réinitialise l'état
  });
}

// Quand l'état du lecteur change
function onPlayerStateChange(event) {
  const overlay = document.getElementById('overlay');

  switch (event.data) {
    case YT.PlayerState.PLAYING: // La vidéo est en cours de lecture
      overlay.classList.remove('paused');
      overlay.classList.add('hidden');
      isPausedByUser = false;
      break;

    case YT.PlayerState.PAUSED: // La vidéo est en pause
      if (!isSeeking) {
        isPausedByUser = true; // Marque que la pause vient de l'utilisateur
        overlay.classList.remove('hidden');
        overlay.classList.add('paused'); // Ajoute le fond noir
      }
      break;

    case YT.PlayerState.ENDED: // La vidéo est terminée
      overlay.classList.remove('hidden'); // Réaffiche les textes et boutons
      overlay.classList.remove('paused'); // Enlève le fond noir
      break;
  }
}
