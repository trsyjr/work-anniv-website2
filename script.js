// ===== GLOBAL JS FOR FLOATING BALLOONS & IMAGES =====

const noreenImages = [
  "Assets/Pic1.jpeg","Assets/Pic2.jpg","Assets/Pic3.jpeg","Assets/Pic4.jpg",
  "Assets/Pic5.jpeg","Assets/Pic6.jpg","Assets/Pic7.jpeg","Assets/Pic8.jpg",
  "Assets/Pic9.jpeg","Assets/Pic10.jpg","Assets/Pic11.jpeg","Assets/Pic12.jpg",
  "Assets/Pic13.jpg","Assets/Pic14.jpg","Assets/Pic15.jpg","Assets/Pic16.jpg",
  "Assets/Pic17.jpg","Assets/Pic18.jpg","Assets/Pic19.jpg","Assets/Pic20.JPG",
  "Assets/Pic21.JPG","Assets/Pic22.jpg","Assets/Pic23.JPG","Assets/Pic24.JPG",
  "Assets/Pic25.JPG","Assets/Pic26.JPG","Assets/Pic27.JPG","Assets/Pic28.JPG"
];

const claImages = [
  "Assets/Kleng1.jpeg","Assets/Kleng2.jpeg","Assets/Kleng3.JPG","Assets/Kleng4.JPG",
  "Assets/Kleng5.jpeg","Assets/Kleng6.jpeg","Assets/Kleng7.jpeg","Assets/Kleng8.jpeg",
  "Assets/Kleng9.jpeg","Assets/Kleng10.jpeg","Assets/Kleng11.JPG","Assets/Kleng12.jpeg",
  "Assets/Kleng13.jpeg","Assets/Kleng14.JPG","Assets/Kleng15.JPG","Assets/Kleng16.JPG",
  "Assets/Kleng17.JPG","Assets/Kleng18.jpg","Assets/Kleng19.JPG","Assets/Kleng20.JPG"
];

// --- Initialize page ---
function initPage(type, balloonQty = 20, imageQty = 5) {
  const container = document.getElementById('floating-images');
  if (!container) return;

  let balloonColors = [];
  let confettiColors = [];
  let floatingImages = [];

  switch(type){
    case 'noreen':
      balloonColors = ["#FACC15", "#FDE047", "#EAB308"];
      confettiColors = ["#FACC15", "#FDE047", "#EAB308"];
      floatingImages = noreenImages;
      break;
    case 'clarissa':
      balloonColors = ["#C084FC","#A855F7","#7C3AED"];
      confettiColors = ["#C084FC","#A855F7","#7C3AED"];
      floatingImages = claImages;
      break;
    case 'landing':
      confettiColors = ["#EF4444","#F97316","#A855F7"];
      floatingImages = []; // NO floating images
      break;
  }

  // Play music
  const music = document.getElementById('bg-music');
  if(music) music.play();

  // Spawn balloons continuously
  if(balloonColors.length) spawnContinuousBalloons(container, balloonColors, balloonQty);

  // Spawn floating images continuously only for Noreen or Clarissa
  if(floatingImages.length) spawnContinuousImages(container, floatingImages, imageQty);

  // Launch confetti once
  launchConfetti(confettiColors);
}

// --- CONTINUOUS BALLOONS ---
function spawnContinuousBalloons(container, colors, quantity = 20){
  const containerWidth = container.offsetWidth;

  for(let i=0;i<quantity;i++){
    createBalloon(container, colors, containerWidth);
  }
}

function createBalloon(container, colors, containerWidth){
  const balloon = document.createElement("div");
  balloon.className = "floating-balloon opacity-0 absolute z-0";
  const size = Math.random() * 60 + 60;
  balloon.style.width = balloon.style.height = size + "px";
  balloon.style.left = Math.random()*(containerWidth-size) + "px";
  balloon.style.bottom = "-150px";
  balloon.style.backgroundColor = colors[Math.floor(Math.random()*colors.length)];
  balloon.style.borderRadius = "50%";
  const duration = Math.random()*2 + 3;
  balloon.style.animation = `floatUpBalloon ${duration}s linear forwards`;
  container.appendChild(balloon);

  // Fade in
  setTimeout(()=>balloon.style.opacity=1,50);

  // Respawn after animation ends
  balloon.addEventListener("animationend", ()=>{
    balloon.remove();
    setTimeout(()=>createBalloon(container, colors, containerWidth), Math.random()*500); // slightly delayed respawn
  });
}

// --- CONTINUOUS FLOATING IMAGES ---
function spawnContinuousImages(container, images, quantity = 5){
  const containerWidth = container.offsetWidth;
  const shuffled = shuffleArray(images);
  let index = 0;

  function createImage(){
    if(index >= shuffled.length) index = 0;

    const img = document.createElement("img");
    img.src = shuffled[index];
    img.className = "floating-balloon opacity-0 absolute z-0";
    const width = Math.random()*50 + 150;
    img.style.width = width + "px";
    img.style.left = Math.random()*(containerWidth-width) + "px";
    img.style.bottom = "-150px";
    const duration = Math.random()*2 + 3;
    img.style.animation = `floatUpBalloon ${duration}s linear forwards`;
    container.appendChild(img);

    setTimeout(()=>img.style.opacity=1,50);

    img.addEventListener("animationend", ()=>{
      img.remove();
      setTimeout(createImage, Math.random()*500); // respawn
    });

    index++;
  }

  for(let i=0;i<quantity;i++) createImage();
}

// --- CONFETTI ---
function launchConfetti(colors){
  for(let i=0;i<120;i++){
    const confetti = document.createElement("div");
    confetti.className = "confetti";
    confetti.style.left = Math.random()*100+"vw";
    confetti.style.backgroundColor = colors[Math.floor(Math.random()*colors.length)];
    confetti.style.width = confetti.style.height = (Math.random()*8 + 4) + "px";
    confetti.style.transform = `rotate(${Math.random()*360}deg)`;
    confetti.style.animationDuration = (Math.random()*2+2)+"s";
    document.body.appendChild(confetti);
    setTimeout(()=>confetti.remove(),3000);
  }
}

// --- SHUFFLE UTILITY ---
function shuffleArray(arr){
  const a = arr.slice();
  for(let i=a.length-1;i>0;i--){
    const j = Math.floor(Math.random()*(i+1));
    [a[i],a[j]] = [a[j],a[i]];
  }
  return a;
}

// --- DOM READY ---
document.addEventListener("DOMContentLoaded", ()=>{
  initPage('landing'); // landing page: balloons only
});
