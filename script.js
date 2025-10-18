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

function updateDateTime() {
  const element = document.getElementById("currentDateTime");
  if (!element) return; 
  const now = new Date();
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  };

  element.textContent = now.toLocaleString("en-US", options);
}

setInterval(updateDateTime, 1000);
updateDateTime();
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('.star').forEach(star => {
    star.addEventListener('click', function() {
      const rating = this.getAttribute('data-value');
      const destination = this.closest('.rating').getAttribute('data-destination');

      document.querySelectorAll(`.rating[data-destination="${destination}"] .star`).forEach(star => {
        if (star.getAttribute('data-value') <= rating) {
          star.classList.add('selected');
        } else {
          star.classList.remove('selected');
        }
      });

      this.closest('.rating').setAttribute('data-selected', rating);
    });
  });

  const submitBtn = document.getElementById('submitRating');
  if (submitBtn) {
    submitBtn.addEventListener('click', () => {
      const ratingContainer = document.querySelector('.rating');
      const rating = ratingContainer.getAttribute('data-selected');

      if (!rating) {
        alert('PLease choose rating');
      } else {
        alert(`Thanks! You graded "${ratingContainer.getAttribute('data-destination')}" на ${rating} ⭐`);
      }
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const themeButton = document.getElementById("theme-toggle");

  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    document.body.classList.add(savedTheme);
  } else {
    document.body.classList.add("light-theme"); 
  }

  themeButton.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");
    document.body.classList.toggle("light-theme");

    if (document.body.classList.contains("dark-theme")) {
      localStorage.setItem("theme", "dark-theme");
    } else {
      localStorage.setItem("theme", "light-theme");
    }
  });
});
const destinations = [
  { name: "Paris", desc: "City of Lights and Love" },
  { name: "Kyoto", desc: "Ancient temples and cherry blossoms" },
  { name: "Istanbul", desc: "Where East meets West" }
];

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


document.addEventListener("DOMContentLoaded", () => {
  const langSelect = document.getElementById("languageSelect");
  const greeting = document.getElementById("greetingText");

  if (langSelect && greeting) {
    langSelect.addEventListener("change", () => {
      const selectedLang = langSelect.value;

      switch (selectedLang) {
        case "en":
          greeting.textContent = "Welcome to Travel & Culture Hub!";
          break;
        case "ru":
          greeting.textContent = "Добро пожаловать в Travel & Culture Hub!";
          break;
        case "kz":
          greeting.textContent = "Travel & Culture Hub сайтына қош келдіңіз!";
          break;
        default:
          greeting.textContent = "Welcome!";
      }
    });
  }
});
