document.getElementById("discoverBtn").addEventListener("click", function () {
    const images = [
        "./ressources/logo-croc2.png",
        "./ressources/logo-croc3.png",
        "./ressources/logo-croc4.png",
        "./ressources/logo-croc5.png",
        "./ressources/logo-croc6.png"
    ];
    const chocoImage = document.getElementById("chocoImage");
    let currentIndex = 0;

    function changeImageDuringShake() {
        if (currentIndex < images.length) {
            chocoImage.classList.add("shake");
            setTimeout(() => {
                chocoImage.src = images[currentIndex];
                currentIndex++;
                setTimeout(() => {
                    chocoImage.classList.remove("shake");
                    changeImageDuringShake();
                }, 150);
            }, 150);
        } else {
            chocoImage.classList.add("zoom");
            setTimeout(() => {
                window.location.href = "./Immersion.html";
            }, 500);
        }
    }

    changeImageDuringShake();
});

