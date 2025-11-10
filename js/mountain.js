  const apiKey = "4841f3e36fd169953b5933f83494ee25";

  const mountainData = [
    {
      name: "Almaty Mountains",
      coords: { lat: 43.09, lon: 77.06 },
      height: 4973,
      description: "Part of the Trans-Ili Alatau range, known for its alpine meadows and ski resorts.",
      image: "../images/mountain1.jpg"
    },
    {
      name: "Tien Shan",
      coords: { lat: 42.3, lon: 79.0 }, 
      height: 7439,
      description: "Known as the 'Celestial Mountains', they stretch across Central Asia.",
      image: "../images/mountain2.jpg"
    },
    {
      name: "Altai Mountains",
      coords: { lat: 49.95, lon: 85.9 },
      height: 4506,
      description: "Rich in biodiversity and cultural history, located in East Kazakhstan.",
      image: "../images/mountain3.jpg"
    }
  ];
  const mountainInfo = {
    showHeights() {
      return mountainData.map(m => `${m.name}: ${m.height}m`).join("<br>");
    }
  };

  const mountainList = document.getElementById("mountain-list");
  mountainData.forEach((mountain, index) => {
    const card = document.createElement("div");
    card.classList.add("col-md-4", "mountain-card", "text-center", "shadow", "rounded");
    card.innerHTML = `
      <img src="${mountain.image}" alt="${mountain.name}" class="img-fluid rounded-top">
      <div class="p-3 card-content rounded-bottom">
        <h4>${mountain.name}</h4>
        <p id="weather-${index}" class="mountain-weather">Loading weather...</p>
        <p>${mountain.description}</p>
        <p><strong>Height:</strong> ${mountain.height}m</p>
      </div>
    `;
    mountainList.appendChild(card);
  });
  const sound = new Audio("../sounds/nature.mp3");
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
  const toggleBtn = document.querySelector("#theme-toggle");

  // если кнопка не найдена — просто выходим, чтобы не было ошибок
  if (!toggleBtn) {
    console.warn("⚠️ Theme toggle button not found on this page");
    return;
  }

  // применяем сохранённую тему
  const savedTheme = localStorage.getItem("theme") || "light";
  document.body.classList.toggle("dark-theme", savedTheme === "dark");
  document.body.classList.toggle("light-theme", savedTheme === "light");

  // устанавливаем правильный текст кнопки
  toggleBtn.textContent =
    savedTheme === "dark" ? "Switch to Light Theme" : "Switch to Dark Theme";

  // добавляем слушатель клика
  toggleBtn.addEventListener("click", () => {
    const isDark = document.body.classList.toggle("dark-theme");
    document.body.classList.toggle("light-theme", !isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
    toggleBtn.textContent = isDark
      ? "Switch to Light Theme"
      : "Switch to Dark Theme";
  });
});


  async function loadMountainWeather() {
    for (let i = 0; i < mountainData.length; i++) {
      const { lat, lon } = mountainData[i].coords;
      const block = document.getElementById(`weather-${i}`);

      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=en`
        );
        const data = await response.json();
        console.log(`Weather for ${mountainData[i].name}:`, data);

        if (data.cod === 200) {
          const temp = Math.round(data.main.temp);
          const feels = Math.round(data.main.feels_like);
          const desc = data.weather[0].description;
          const icon = data.weather[0].icon;

          block.innerHTML = `
            <img src="https://openweathermap.org/img/wn/${icon}.png" alt="${desc}">
            ${temp}°C (feels ${feels}°C), ${desc}
          `;
        } else {
          block.textContent = "Weather not found";
        }
      } catch (err) {
        console.error("Error loading weather:", err);
        block.textContent = "Error loading weather";
      }
    }
  }

  document.addEventListener("DOMContentLoaded", loadMountainWeather);

document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("theme-toggle");
  if (!toggleBtn) return; // Если кнопка реально отсутствует, ничего не делаем

  // Получаем сохранённую тему
  const savedTheme = localStorage.getItem("theme") || "light";

  // Применяем тему к body
  document.body.classList.add(savedTheme === "dark" ? "dark-theme" : "light-theme");

  // Обновляем текст кнопки
  toggleBtn.textContent = savedTheme === "dark"
    ? "Switch to Light Theme"
    : "Switch to Dark Theme";

  // Обработчик клика по кнопке
  toggleBtn.addEventListener("click", () => {
    const isDark = document.body.classList.toggle("dark-theme");
    document.body.classList.toggle("light-theme", !isDark);

    // Сохраняем выбор
    localStorage.setItem("theme", isDark ? "dark" : "light");

    // Обновляем текст кнопки
    toggleBtn.textContent = isDark
      ? "Switch to Light Theme"
      : "Switch to Dark Theme";
  });
});
