
const mountainData = [
  {
    name: "Almaty Mountains",
    height: 4973,
    description: "Part of the Trans-Ili Alatau range, known for its alpine meadows and ski resorts.",
    image: "mountain1.jpg"
  },
  {
    name: "Tien Shan",
    height: 7439,
    description: "Known as the 'Celestial Mountains', they stretch across Central Asia.",
    image: "mountain2.jpg"
  },
  {
    name: "Altai Mountains",
    height: 4506,
    description: "Rich in biodiversity and cultural history, located in East Kazakhstan.",
    image: "mountain3.jpg"
  }
];
const mountainInfo = {
  showHeights() {
    return mountainData.map(m => `${m.name}: ${m.height}m`).join("<br>");
  }
};


const mountainList = document.getElementById("mountain-list");
mountainData.forEach(mountain => {
  const card = document.createElement("div");
  card.classList.add("col-md-4", "mountain-card", "text-center", "shadow", "rounded");
  card.innerHTML = `
    <img src="${mountain.image}" alt="${mountain.name}" class="img-fluid rounded-top">
    <div class="p-3 bg-light rounded-bottom">
      <h4>${mountain.name}</h4>
      <p>${mountain.description}</p>
      <p><strong>Height:</strong> ${mountain.height}m</p>
    </div>
  `;
  mountainList.appendChild(card);
});

const sound = new Audio("nature.mp3");
const soundBtn = document.getElementById("sound-btn");
const stopSoundBtn = document.getElementById("stop-sound-btn");

soundBtn.addEventListener("click", () => {
  sound.play();
  sound.loop = true; 
  soundBtn.disabled = true;
  stopSoundBtn.disabled = false;
  soundBtn.textContent = "Playing Nature Sound 🌿";
});

stopSoundBtn.addEventListener("click", () => {
  sound.pause();
  sound.currentTime = 0; 
  soundBtn.disabled = false;
  stopSoundBtn.disabled = true;
  soundBtn.textContent = "Play Nature Sound";
});


stopSoundBtn.disabled = true;

window.addEventListener("beforeunload", () => {
  sound.pause();
  sound.currentTime = 0;
});

const hero = document.querySelector(".mountain-hero");
hero.addEventListener("mousemove", (e) => {
  hero.style.backgroundPosition = `${e.offsetX / 10}px ${e.offsetY / 10}px`;
});

const toggleBtn = document.getElementById("theme-toggle");
toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  toggleBtn.textContent = document.body.classList.contains("dark-mode") 
    ? "Switch to Light Theme" 
    : "Switch to Dark Theme";
});

function updateDateTime() {
  const now = new Date();
  document.getElementById("currentDateTime").textContent = now.toLocaleString();
}

updateDateTime();
setInterval(updateDateTime, 1000);

$(document).ready(function() {
  console.log("jQuery is ready!");
});
