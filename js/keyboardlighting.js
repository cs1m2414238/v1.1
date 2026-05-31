const keys = document.querySelectorAll(".key");

function runLightingWave() {
  keys.forEach((key, index) => {
    // Stagger the activation of each key
    setTimeout(() => {

        key.classList.add("is-lit");
        key.classList.add("is-pressed");
          
        // Release the key physically and turn off its light after a short delay
        setTimeout(() => {
            key.classList.remove("is-pressed");
        }, 250);
        setTimeout(() => {
            key.classList.remove("is-lit");
        }, 400);
    }, index * 60);
  });
}

// Map both night and dawn wave functions to the same high-performance sweep logic
const runLightingWaveDawn = runLightingWave;

// Trigger the wave automatically when the welcome preloader screen finishes
window.addEventListener("preloaderFinished", () => {
  setTimeout(runLightingWave, 600);
});

// Fallback: run the wave on load if the preloader isn't present
window.addEventListener("load", () => {
  if (!document.querySelector(".loading")) {
    setTimeout(runLightingWave, 600);
  }
});

window.addEventListener("click", (event) => {
  // Prevent running the wave when clicking on keycaps or inside keys
  if (event.target.closest(".key")) return;

  const currentTheme = document.body.dataset.theme;
  if (currentTheme === "night") {
    setTimeout(() => {
      runLightingWave();
    }, 1100);
  } else {
    setTimeout(() => {
      runLightingWaveDawn();
    }, 1100);
  }
});
