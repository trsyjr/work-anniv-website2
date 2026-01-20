function revealCelebrants() {
  const landing = document.getElementById('landing');
  const celebrants = document.getElementById('celebrants');
  const appreciationNoreen = document.getElementById('appreciation-noreen');
  const appreciationCla = document.getElementById('appreciation-cla');
  const floating = document.getElementById('floating-images');

  landing.classList.add('hidden');
  celebrants.classList.remove('hidden');
  appreciationNoreen.classList.remove('hidden');
  appreciationCla.classList.remove('hidden');
  floating.classList.remove('hidden');

  const music = document.getElementById('bg-music');
  music.play();

  launchConfetti();
  showFloatingImagesTurn();
  spawnBalloons(15);
}

// CONFETTI
function launchConfetti() {
  const colors = ['#A855F7', '#EF4444', '#F97316'];
  for (let i = 0; i < 120; i++) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    confetti.style.left = Math.random() * 100 + 'vw';
    confetti.style.top = Math.random() * 100 + 'vh';
    const size = Math.random() * 8 + 4;
    confetti.style.width = size + 'px';
    confetti.style.height = size + 'px';
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
    confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
    document.body.appendChild(confetti);
    setTimeout(() => confetti.remove(), 3000);
  }
}

// BALLOONS
function spawnBalloons(quantity = 5) {
  const container = document.getElementById("floating-images");
  const containerWidth = container.offsetWidth;
  const containerHeight = container.offsetHeight;
  const images = ["Assets/Purple.png","Assets/Red.png","Assets/Orange.png"];

  for (let i = 0; i < quantity; i++) {
    const balloon = document.createElement("img");
    const randomImage = images[Math.floor(Math.random() * images.length)];
    balloon.src = randomImage;
    balloon.alt = "Decoration";
    balloon.className = "floating-balloon opacity-0 absolute";
    const size = Math.random() * (120 - 60) + 60;
    balloon.style.width = size + "px";
    balloon.style.left = Math.random() * (containerWidth - size) + "px";
    balloon.style.top = Math.random() * (containerHeight - size) + "px";
    const duration = Math.random() * 3 + 5;
    balloon.style.animation = `floatUpBalloon ${duration}s linear forwards`;
    container.appendChild(balloon);
    setTimeout(() => {
      balloon.classList.remove("opacity-0");
      balloon.classList.add("transition-opacity", "duration-500", "opacity-100");
    }, 50);
    balloon.addEventListener("animationend", () => {
      balloon.remove();
      setTimeout(() => spawnBalloons(1), Math.random() * 2000 + 500);
    });
  }
}

// IMAGE ARRAYS
const claImages = [
  "Assets/Cla1.jpeg","Assets/Cla2.jpeg","Assets/Cla3.jpeg","Assets/Cla4.jpeg",
  "Assets/Cla5.jpg","Assets/Cla6.jpeg","Assets/Cla7.jpg","Assets/Cla8.jpeg",
  "Assets/Cla9.JPG","Assets/Cla10.jpeg","Assets/Cla11.JPG","Assets/Cla12.jpeg",
  "Assets/Cla13.png","Assets/Cla14.jpg"
];

const noreenImages = [
  "Assets/Noreen1.jpeg","Assets/Noreen2.jpeg","Assets/Noreen3.jpeg","Assets/Noreen4.jpeg",
  "Assets/Noreen5.jpeg","Assets/Noreen6.jpeg","Assets/Noreen7.jpeg","Assets/Noreen8.jpeg",
  "Assets/Noreen9.jpeg","Assets/Noreen10.jpeg","Assets/Noreen11.jpeg","Assets/Noreen12.jpeg",
  "Assets/Noreen13.jpeg","Assets/Noreen14.jpeg"
];

// SHUFFLE FUNCTION
function shuffleArray(array) {
  let shuffled = array.slice();
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// FLOATING IMAGES FUNCTION (fully shuffled Noreen + Cla)
function showFloatingImagesTurn() {
  const container = document.getElementById("floating-images");
  const containerWidth = container.offsetWidth;

  const combinedImages = noreenImages.concat(claImages);
  const allImages = shuffleArray(combinedImages);

  let index = 0;

  function spawnNextImage() {
    if (index >= allImages.length) {
      setTimeout(showFloatingImagesTurn, 1500);
      return;
    }

    const src = allImages[index];
    const img = document.createElement("img");
    img.src = src;
    img.alt = "Celebration";
    img.className = "floating-balloon opacity-0 absolute";
    const width = Math.random() * (480 - 320) + 320;
    img.style.width = width + "px";
    const maxLeft = containerWidth - width;
    img.style.left = Math.random() * maxLeft + "px";
    const duration = Math.random() * 2 + 6;
    img.style.animation = `floatUpBalloon ${duration}s linear forwards`;
    container.appendChild(img);

    setTimeout(() => {
      img.classList.remove("opacity-0");
      img.classList.add("transition-opacity", "duration-500", "opacity-100");
    }, 50);

    index++;
    setTimeout(spawnNextImage, Math.random() * 200 + 800);
    img.addEventListener("animationend", () => img.remove());
  }

  spawnNextImage();
}
