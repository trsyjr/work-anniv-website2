// ===== GLOBAL JS FOR FLOATING BALLOONS & IMAGES =====

const noreenImages = [
  "Assets/Noreen1.jpeg","Assets/Noreen2.jpeg","Assets/Noreen3.jpeg","Assets/Noreen4.jpeg",
  "Assets/Noreen5.jpeg","Assets/Noreen6.jpeg","Assets/Noreen7.jpeg","Assets/Noreen8.jpeg",
  "Assets/Noreen9.jpeg","Assets/Noreen10.jpeg","Assets/Noreen11.jpeg","Assets/Noreen12.jpeg",
  "Assets/Noreen13.jpeg","Assets/Noreen14.jpeg","Assets/Noreen15.jpeg","Assets/Noreen16.jpeg",
  "Assets/Purple.png","Assets/2P.png","Assets/Violet.png"
];

const claImages = [
  "Assets/Cla1.jpeg","Assets/Cla2.jpeg","Assets/Cla3.jpeg","Assets/Cla4.jpeg",
  "Assets/Cla5.jpg","Assets/Cla6.jpeg","Assets/Cla7.jpg","Assets/Cla8.jpeg",
  "Assets/Cla9.JPG","Assets/Cla10.jpeg","Assets/Cla11.JPG","Assets/Cla12.jpeg",
  "Assets/Cla13.png","Assets/Cla14.jpg","Assets/Orange.png","Assets/2B.png",
  "Assets/Gold.png"
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
      balloonColors = ["#C084FC","#A855F7","#7C3AED"];
      confettiColors = ["#C084FC","#A855F7","#7C3AED"];
      floatingImages = noreenImages;
      break;
    case 'clarissa':
      balloonColors = ["#EAD7C3","#D6B89C","#B8977E"];
      confettiColors = ["#EAD7C3","#D6B89C","#B8977E"];
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
