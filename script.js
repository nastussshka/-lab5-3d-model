// Handles loading the events for <model-viewer>'s slotted progress bar
const onProgress = (event) => {
  const progressBar = event.target.querySelector('.progress-bar');
  const updatingBar = event.target.querySelector('.update-bar');
  updatingBar.style.width = `${event.detail.totalProgress * 100}%`;
  if (event.detail.totalProgress === 1) {
    progressBar.classList.add('hide');
    event.target.removeEventListener('progress', onProgress);
  } else {
    progressBar.classList.remove('hide');
  }
};
document.querySelector('model-viewer').addEventListener('progress', onProgress);

(() => {
  const bunny = document.getElementById("bunny");

  function startAnimations() {
    const clips = bunny.availableAnimations;

    if (!clips.includes("Jump") || !clips.includes("Rotate")) {
      console.warn("Не найдены анимации Jump и Rotate");
      return;
    }

    const animations = ["Jump", "Rotate"];
    let current = 0;

    bunny.animationCrossfadeDuration = 600;
    bunny.animationName = animations[current];
    bunny.play();

    setInterval(() => {
      current = (current + 1) % animations.length;
      bunny.animationName = animations[current];
    }, 3000);
  }

  if (bunny.loaded) {
    startAnimations();
  } else {
    bunny.addEventListener("load", startAnimations, { once: true });
  }
})();
