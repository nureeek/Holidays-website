function setupAccordion() {
  const items = document.querySelectorAll(".accordion-item h3");

  items.forEach((item) => {
    item.addEventListener("click", () => {
      const answer = item.nextElementSibling;
      answer.classList.toggle("show");
    });
  });
}

document.addEventListener("DOMContentLoaded", setupAccordion);

function openPopup() {
  document.getElementById("popup").style.display = "flex";
}

function closePopup() {
  document.getElementById("popup").style.display = "none";
}

function submitSubscription() {
  const email = document.getElementById("subEmail").value.trim();
  if (email === "") {
    alert("Please enter your email.");
  } else if (!email.includes("@") || !email.includes(".")) {
    alert("Please enter a valid email address.");
  } else {
    alert("Thank you for subscribing!");
    document.getElementById("popup").style.display = "none";
    document.getElementById("subEmail").value = "";
  }
}

// === UNIVERSAL FOOTER TIME FEATURE ===
document.addEventListener("DOMContentLoaded", () => {
  const timeElement = document.getElementById("currentDateTime");
  const showTimeBtn = document.getElementById("showTimeBtn");

  if (!timeElement || !showTimeBtn) return; // If not on page, skip

  // Function to update time
  function updateDateTime() {
    const now = new Date();
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false
    };
    timeElement.textContent = now.toLocaleString("en-US", options);
  }

  // Timer reference
  let timer = null;
  let isVisible = false;

  // Button behavior
  showTimeBtn.addEventListener("click", () => {
    isVisible = !isVisible;

    if (isVisible) {
      timeElement.style.display = "inline";
      showTimeBtn.textContent = "Hide Time 🕓";
      updateDateTime();
      timer = setInterval(updateDateTime, 1000);
    } else {
      timeElement.style.display = "none";
      showTimeBtn.textContent = "Show Time ⏰";
      clearInterval(timer);
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".rating").forEach(ratingContainer => {
    const stars = ratingContainer.querySelectorAll(".star");

    stars.forEach(star => {
      star.addEventListener("click", () => {
        const selectedValue = parseInt(star.getAttribute("data-value"));

        stars.forEach(s => s.classList.remove("selected"));

        stars.forEach(s => {
          if (parseInt(s.getAttribute("data-value")) <= selectedValue) {
            s.classList.add("selected");
          }
        });

        ratingContainer.setAttribute("data-selected", selectedValue);
      });
    });
  });

  const submitBtn = document.getElementById("submitAllRatings");
  if (submitBtn) {
    submitBtn.addEventListener("click", () => {
      const ratings = {};
      let hasRating = false;

      document.querySelectorAll(".rating").forEach(ratingContainer => {
        const destination = ratingContainer.getAttribute("data-destination");
        const selected = ratingContainer.getAttribute("data-selected");

        if (selected) {
          ratings[destination] = selected;
          hasRating = true;
        }
      });

      const lang = localStorage.getItem("language") || "en";
      const messages = {
        en: {
          noRating: "Please rate at least one destination before submitting.",
          thanks: "Thank you for your ratings!",
          stars: "⭐"
        },
        ru: {
          noRating: "Пожалуйста, оцените хотя бы одно направление перед отправкой.",
          thanks: "Спасибо за ваши оценки!",
          stars: "⭐"
        },
        kz: {
          noRating: "Жібермес бұрын кемінде бір бағытты бағалаңыз.",
          thanks: "Бағаларыңыз үшін рахмет!",
          stars: "⭐"
        }
      };

      if (!hasRating) {
        alert(messages[lang].noRating);
        return;
      }

      let result = `${messages[lang].thanks}\n\n`;
      for (const [dest, score] of Object.entries(ratings)) {
        result += `${dest}: ${messages[lang].stars.repeat(score)} (${score}/5)\n`;
      }

      alert(result);

      document.querySelectorAll(".rating").forEach(ratingContainer => {
        ratingContainer.removeAttribute("data-selected");
        ratingContainer.querySelectorAll(".star").forEach(star => {
          star.classList.remove("selected");
        });
      });
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const themeButton = document.getElementById("theme-toggle");
  if (!themeButton) return;

  // Применяем сохранённую тему
  const savedTheme = localStorage.getItem("theme") || "light";
  document.body.classList.add(savedTheme === "dark" ? "dark-theme" : "light-theme");

  // Меняем текст на кнопке в зависимости от темы
  themeButton.textContent =
    savedTheme === "dark" ? "Switch to Light Theme" : "Switch to Dark Theme";

  // Переключатель темы
  themeButton.addEventListener("click", () => {
    const isDark = document.body.classList.toggle("dark-theme");
    document.body.classList.toggle("light-theme", !isDark);

    // Сохраняем выбор в localStorage
    localStorage.setItem("theme", isDark ? "dark" : "light");

    // Обновляем текст на кнопке
    themeButton.textContent = isDark
      ? "Switch to Light Theme"
      : "Switch to Dark Theme";
  });
});

const listContainer = document.getElementById("destinationList");
if (listContainer) {
  destinations.forEach(dest => {
    const div = document.createElement("div");
    div.className = "col-md-4";
    div.innerHTML = `
      <div class="card h-100 shadow-sm">
        <div class="card-body text-center">
          <h5>${dest.name}</h5>
          <p>${dest.desc}</p>
        </div>
      </div>`;
    listContainer.appendChild(div);
  });
}
const readMoreBtn = document.getElementById("readMoreBtn");
const moreText = document.getElementById("moreText");

if (readMoreBtn) {
  readMoreBtn.addEventListener("click", () => {
    const isHidden = moreText.style.display === "none" || !moreText.style.display;
    moreText.style.display = isHidden ? "block" : "none";
    readMoreBtn.textContent = isHidden ? "Read Less" : "Read More";
  });
}

const clickSound = document.getElementById("clickSound");
document.querySelectorAll("button").forEach(btn => {
  btn.addEventListener("click", () => {
    clickSound.play();
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const clickSound = document.getElementById("clickSound");

  if (clickSound) {
    document.querySelectorAll("button, a").forEach(el => {
      el.addEventListener("click", () => {
        clickSound.currentTime = 0; 
        clickSound.play();
      });
    });
  }
});
const musicBtn = document.getElementById("musicToggle");
const bgMusic = document.getElementById("bgMusic");

if (musicBtn && bgMusic) {
  musicBtn.addEventListener("click", () => {
    if (bgMusic.paused) {
      bgMusic.play();
      musicBtn.textContent = "Pause Music ⏸️";
      musicBtn.classList.remove("btn-success");
      musicBtn.classList.add("btn-danger");
    } else {
      bgMusic.pause();
      musicBtn.textContent = "Play Music 🎵";
      musicBtn.classList.remove("btn-danger");
      musicBtn.classList.add("btn-success");
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

  if (navLinks.length > 0) {
    let currentIndex = 0;

    navLinks[currentIndex].focus();

    document.addEventListener("keydown", (event) => {
      if (event.key === "ArrowRight") {
        currentIndex = (currentIndex + 1) % navLinks.length;
        navLinks[currentIndex].focus();
      } else if (event.key === "ArrowLeft") {
        currentIndex = (currentIndex - 1 + navLinks.length) % navLinks.length;
        navLinks[currentIndex].focus();
      }
    });
  }
});
const translations = {
  en: {
    title: "Travel & Culture Hub",
    greeting: "Welcome to Travel & Culture Hub!",
    chooseLanguage: "Choose Language",
    switchTheme: "Switch Theme",
    playMusic: "Play Music 🎵", 
    
    brand: "Travel & Culture Hub",
    toggleNav: "Toggle navigation",
    home: "Home",
    about: "About",
    mountains: "Mountains",
    lakes: "Lakes",
    cityTours: "City Tours",
    gallery: "Gallery",
    
    heroTitle: "Explore the World. Discover Cultures.",
    heroDesc: "Join us on a journey to learn about traditions, people, and places around the globe.",
    learnMore: "Learn More",
    
    
    searchPlaceholder: "Search destinations...",
    
    popularDestinations: "Popular Destinations",
    mountainsDesc: "Snowy peaks and breathtaking trails for adventurers.",
    lakesDesc: "Peaceful blue lakes surrounded by nature's beauty.",
    cityToursDesc: "Walk through vibrant cities filled with culture and history.",
    galleryDesc: "See beautiful photos from our previous adventures.",
    explore: "Explore",
    visit: "Visit",
    joinTour: "Join Tour",
    view: "View",
    
    mountainsAlt: "Mountains",
    lakesAlt: "Lakes",
    cityToursAlt: "City Tours",
    galleryAlt: "Gallery",
    
    
    testimonialsTitle: "What Our Travelers Say",
    testimonial1: "\"Amazing experience! Would recommend 100%.\"",
    testimonial2: "\"Affordable and unforgettable trip!\"",
    
    rateDestination: "Rate Your Favorite Destinations",
    sendRate: "Submit Ratings",
    notRatedYet:"Not rated yet",
    copyright: "© 2025 Your Travel Project. All rights reserved.",
    facebook: "Facebook",
    instagram: "Instagram",
    telegram: "Telegram",
    teamMembers: "Travel & Culture Hub, Team Members: Adilov Nurkeldi, Akbar Khalili"
  },
  
  ru: {
    title: "Центр Путешествий и Культуры",
    greeting: "Добро пожаловать в Центр Путешествий и Культуры!",
    chooseLanguage: "Выберите язык",
    switchTheme: "Сменить тему",
    playMusic: "Включить музыку 🎵",
    
    brand: "Центр Путешествий и Культуры",
    toggleNav: "Переключить навигацию",
    home: "Главная",
    about: "О нас",
    mountains: "Горы",
    lakes: "Озера",
    cityTours: "Городские туры",
    gallery: "Галерея",
    
    heroTitle: "Исследуйте мир. Открывайте культуры.",
    heroDesc: "Присоединяйтесь к нашему путешествию, чтобы узнать о традициях, людях и местах по всему миру.",
    learnMore: "Узнать больше",
    
    searchPlaceholder: "Поиск направлений...",
    
    popularDestinations: "Популярные направления",
    mountainsDesc: "Снежные вершины и захватывающие дух тропы для искателей приключений.",
    lakesDesc: "Спокойные голубые озера, окруженные красотой природы.",
    cityToursDesc: "Прогуляйтесь по ярким городам, наполненным культурой и историей.",
    galleryDesc: "Посмотрите красивые фотографии с наших предыдущих приключений.",
    explore: "Исследовать",
    visit: "Посетить",
    joinTour: "Присоединиться",
    view: "Смотреть",
    
    mountainsAlt: "Горы",
    lakesAlt: "Озера",
    cityToursAlt: "Городские туры",
    galleryAlt: "Галерея",
    
    testimonialsTitle: "Что говорят наши путешественники",
    testimonial1: "\"Потрясающий опыт! Рекомендую на 100%.\"",
    testimonial2: "\"Доступная и незабываемая поездка!\"",
    
    rateDestination: "Оцените ваше любимое направление",
    sendRate: "Отправить оценку",
    notRatedYet:"Еще не оценили",
    
    copyright: "© 2025 Ваш туристический проект. Все права защищены.",
    facebook: "Фейсбук",
    instagram: "Инстаграм",
    telegram: "Телеграм",
    teamMembers: "Центр Путешествий и Культуры, Участники команды: Адилов Нуркелди, Акбар Халили"
  },
  
  kz: {
    title: "Саяхат және Мәдениет Орталығы",
    greeting: "Саяхат және Мәдениет Орталығына қош келдіңіз!",
    chooseLanguage: "Тілді таңдаңыз",
    switchTheme: "Теманы ауыстыру",
    playMusic: "Музыканы қосу 🎵",
    
    brand: "Саяхат және Мәдениет Орталығы",
    toggleNav: "Навигацияны ауыстыру",
    home: "Басты бет",
    about: "Біз туралы",
    mountains: "Таулар",
    lakes: "Көлдер",
    cityTours: "Қала турлары",
    gallery: "Галерея",
    
    heroTitle: "Әлемді зерттеңіз. Мәдениеттерді ашыңыз.",
    heroDesc: "Бүкіл әлем бойынша салт-дәстүрлер, адамдар және орындар туралы білу үшін біздің саяхатымызға қосылыңыз.",
    learnMore: "Толығырақ білу",
    
    searchPlaceholder: "Бағыттарды іздеу...",
    
    popularDestinations: "Танымал бағыттар",
    mountainsDesc: "Батырлар үшін қарлы шыңдар және тылсым жолдар.",
    lakesDesc: "Табиғат сұлулығымен қоршалған тыныш көк көлдер.",
    cityToursDesc: "Мәдениет пен тарихқа толқан жарқын қалалар арқылы серуендеңіз.",
    galleryDesc: "Біздің алдыңғы бапталымдардан әдемі фотосуреттерді қараңыз.",
    explore: "Зерттеу",
    visit: "Бару",
    joinTour: "Қосылу",
    view: "Қарау",
    
    mountainsAlt: "Таулар",
    lakesAlt: "Көлдер",
    cityToursAlt: "Қала турлары",
    galleryAlt: "Галерея",
    
    testimonialsTitle: "Біздің саяхатшылардың пікірлері",
    testimonial1: "\"Керемет тәжірибе! 100% ұсынамын.\"",
    testimonial2: "\"Қолжетімді және есіңізден шықпайтын саяхат!\"",
    
    rateDestination: "Сүйікті бағыттарыңызды бағалаңыз",
    sendRate: "Бағаны жіберу",
    notRatedYet:"Әзур бағаланбады",
    
    copyright: "© 2025 Сіздің саяхат жобаңыз. Барлық құқықтар қорғалған.",
    teamMembers: "Саяхат және Мәдениет Орталығы, Команда мүшелері: Әділов Нүркелді, Ақбар Халили"
  }
};
function updateText(language) {
  const elements = document.querySelectorAll('[data-translate]');
  elements.forEach(element => {
    const key = element.getAttribute('data-translate');
    if (translations[language] && translations[language][key]) {
      element.textContent = translations[language][key];
    }
  });
}



document.addEventListener('DOMContentLoaded', () => {
  const languageSelect = document.getElementById('languageSelect');
  
  const savedLanguage = localStorage.getItem('language') || 'en';
  updateText(savedLanguage);  

  languageSelect.value = savedLanguage;

  languageSelect.addEventListener('change', (event) => {
    const selectedLanguage = event.target.value;
    localStorage.setItem('language', selectedLanguage);  
    updateText(selectedLanguage);  
  });
});

$(document).ready(function() {
  console.log("jQuery is ready!");
});

$(document).ready(function() {
  $('#searchBar').on('keyup', function() {
    const searchTerm = $(this).val().trim().toLowerCase();

    $('.card').each(function() {
      const title = $(this).find('.card-title').text().toLowerCase();
      const desc = $(this).find('.card-text').text().toLowerCase();

      if (title.includes(searchTerm) || desc.includes(searchTerm)) {
        $(this).parent().show();  
      } else {
        $(this).parent().hide(); 
      }
    });
  });
});


$(document).ready(function() {
  $(window).on('scroll', function() {
    var scrollTop = $(window).scrollTop(); 
    var docHeight = $(document).height(); 
    var winHeight = $(window).height(); 
    var scrollPercent = (scrollTop / (docHeight - winHeight)) * 100; 

    $('#progress-bar').css('width', scrollPercent + '%');
  });
});
$(document).ready(function() {
  var targetNumber = 1000;
  
  $('#number').prop('Counter', 0).animate({
    Counter: targetNumber
  }, {
    duration: 2000, 
    easing: 'swing', 
    step: function (now) {
      $(this).text(Math.ceil(now));
    }
  });
});


