
/* NAVIGATION */

function openScreen(screenId) {
  document.querySelectorAll(".screen").forEach(function(screen) {
    screen.classList.remove("active");
  });

  const selectedScreen = document.getElementById(screenId);

  if (selectedScreen) {
    selectedScreen.classList.add("active");
  }

  // Reset bubble game when entering
  if (screenId === "bubbleGame") {
    resetBubbles();
  }

  // Reset star game when entering
  if (screenId === "starGame") {
    resetStars();
  }

  // Reset rainbow when entering
  if (screenId === "rainbowGame") {
    resetRainbow();
  }

  // Reset calm corner
  if (screenId === "break") {
    resetBreathing();
  }

  window.speechSynthesis.cancel();
}

function goHome() {
  openScreen("home");
}


/* VOICE */

function speak(message) {
  if (!("speechSynthesis" in window)) {
    alert("Speech is not supported in this browser.");
    return;
  }

  window.speechSynthesis.cancel();

  const speech = new SpeechSynthesisUtterance(message);

  speech.lang = "en-US";
  speech.rate = 0.85;
  speech.pitch = 1;
  speech.volume = 1;

  window.speechSynthesis.speak(speech);
}


/* RAINBOW MAGIC */

const rainbowColors = [
  "#fff0f7",
  "#fff5d9",
  "#e4f8e8",
  "#e1f3ff",
  "#eee5ff",
  "#ffe4e8"
];

let rainbowIndex = 0;

function makeRainbow() {
  const box = document.getElementById("rainbowBox");

  rainbowIndex++;

  const color = rainbowColors[
    rainbowIndex % rainbowColors.length
  ];

  box.style.background = color;

  box.classList.remove("rainbow-animation");

  void box.offsetWidth;

  box.classList.add("rainbow-animation");

  speak("Wow! Rainbow magic!");
}

function resetRainbow() {
  const box = document.getElementById("rainbowBox");

  if (box) {
    box.style.background = "white";
    box.classList.remove("rainbow-animation");
  }

  rainbowIndex = 0;
}


/* ANIMAL SOUNDS */

function animalSound(message) {
  speak(message);
}


/* BUBBLE POP */

function popBubble(button) {
  if (button.classList.contains("pop")) {
    return;
  }

  button.classList.add("pop");

  speak("Pop!");

  setTimeout(function() {
    button.innerHTML = "✨";
  }, 150);

  setTimeout(function() {
    button.classList.remove("pop");
    button.innerHTML = "🫧";
  }, 900);
}

function resetBubbles() {
  const bubbles = document.querySelectorAll(".bubble");

  bubbles.forEach(function(bubble) {
    bubble.classList.remove("pop");
    bubble.innerHTML = "🫧";
  });
}


/* MAGIC STARS */

function collectStar(button) {
  if (button.classList.contains("collected")) {
    return;
  }

  button.classList.add("collected");

  speak("Amazing! You found a star!");

  setTimeout(function() {
    button.style.visibility = "hidden";
  }, 400);
}

function resetStars() {
  const stars = document.querySelectorAll(".magic-star");

  stars.forEach(function(star) {
    star.classList.remove("collected");
    star.style.visibility = "visible";
  });

  const message = document.getElementById("starMessage");

  if (message) {
    message.textContent = "You are amazing! 💛";
  }
}


/* CALM CORNER */

let breathingTimer = null;

function breathe() {
  const emoji = document.getElementById("calmEmoji");
  const text = document.getElementById("breathingText");

  if (breathingTimer) {
    clearInterval(breathingTimer);
  }

  emoji.classList.remove("breathing");

  void emoji.offsetWidth;

  emoji.classList.add("breathing");

  speak("Breathe in slowly. Breathe out slowly.");

  text.textContent = "Breathe in... and breathe out...";

  breathingTimer = setTimeout(function() {
    emoji.classList.remove("breathing");
    text.textContent = "Good job! 💛";
  }, 8000);
}

function resetBreathing() {
  if (breathingTimer) {
    clearTimeout(breathingTimer);
    breathingTimer = null;
  }

  const emoji = document.getElementById("calmEmoji");
  const text = document.getElementById("breathingText");

  if (emoji) {
    emoji.classList.remove("breathing");
  }

  if (text) {
    text.textContent = "Let's breathe slowly.";
  }
}
