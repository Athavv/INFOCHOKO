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
