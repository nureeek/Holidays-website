
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
    <div class="p-3 card-content rounded-bottom">
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



$(document).ready(function() {
  console.log("jQuery is ready!");
});

document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("theme-toggle");

  // Проверяем сохранённую тему
  const savedTheme = localStorage.getItem("theme") || "light";
  document.body.classList.add(savedTheme === "dark" ? "dark-theme" : "light-theme");

  // Устанавливаем текст кнопки в зависимости от сохраненной темы
  toggleBtn.textContent =
    savedTheme === "dark" ? "Switch to Light Theme" : "Switch to Dark Theme";

  // Переключатель темы
  toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");
    document.body.classList.toggle("light-theme");

    const isDark = document.body.classList.contains("dark-theme");

    // Сохраняем текущую тему в localStorage
    localStorage.setItem("theme", isDark ? "dark" : "light");

    // Обновляем текст на кнопке после переключения темы
    toggleBtn.textContent = isDark
      ? "Switch to Light Theme"
      : "Switch to Dark Theme";
  });
});
