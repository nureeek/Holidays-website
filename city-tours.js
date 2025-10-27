// === City Tours Page Script ===
document.addEventListener("DOMContentLoaded", function () {

  // 🕒 FOOTER TIME BUTTON
  const timeBtn = document.getElementById("showTimeBtn");
  const timeDisplay = document.getElementById("currentDateTime");

  if (timeBtn && timeDisplay) {
    timeBtn.addEventListener("click", function () {
      if (timeDisplay.style.display === "none" || timeDisplay.style.display === "") {
        timeDisplay.style.display = "inline";
        updateDateTime();
        setInterval(updateDateTime, 1000);
        timeBtn.textContent = "Hide Time ⏳";
      } else {
        timeDisplay.style.display = "none";
        timeBtn.textContent = "Show Time ⏰";
      }
    });
  }

  function updateDateTime() {
    const now = new Date();
    timeDisplay.textContent = now.toLocaleString();
  }

  // 🟢 TASK 8: COPY TO CLIPBOARD (CLEAN DESIGN)
  const cityCards = document.querySelectorAll(".city-tours .card-body");

  cityCards.forEach((card) => {
    const textPara = card.querySelector(".card-text");
    if (textPara) {
      const copyBtn = document.createElement("button");
      copyBtn.className = "btn btn-outline-primary btn-sm ms-2 copy-btn";
      copyBtn.innerHTML = `<i class="bi bi-clipboard"></i> Copy`;

      // Tooltip
      copyBtn.setAttribute("data-bs-toggle", "tooltip");
      copyBtn.setAttribute("data-bs-title", "Copy to clipboard");

      textPara.insertAdjacentElement("afterend", copyBtn);

      const tooltip = new bootstrap.Tooltip(copyBtn);

      copyBtn.addEventListener("click", () => {
        const text = `${card.querySelector(".card-title").textContent} — ${textPara.textContent}`;
        navigator.clipboard.writeText(text).then(() => {
          copyBtn.innerHTML = `<i class="bi bi-check-lg"></i> Copied!`;
          copyBtn.classList.remove("btn-outline-primary");
          copyBtn.classList.add("btn-success");

          tooltip.dispose();
          copyBtn.setAttribute("data-bs-title", "Copied!");
          new bootstrap.Tooltip(copyBtn);

          setTimeout(() => {
            copyBtn.innerHTML = `<i class="bi bi-clipboard"></i> Copy`;
            copyBtn.classList.remove("btn-success");
            copyBtn.classList.add("btn-outline-primary");
            tooltip.dispose();
            copyBtn.setAttribute("data-bs-title", "Copy to clipboard");
            new bootstrap.Tooltip(copyBtn);
          }, 1500);
        });
      });
    }
  });


// 🟣 TASK 9: IMAGE LAZY LOADING (with fade-in + green glow + console logs)
const $ = window.jQuery;

function initLazyLoad() {
  console.log("✅ Lazy loading initialized");

  // Step 1: Replace real src with data-src and set placeholder
  $("img.card-img-top").each(function () {
    const img = $(this);
    const realSrc = img.attr("src");
    img.attr("data-src", realSrc);
    img.attr("src", "placeholder.jpg"); // must exist!
    img.css("opacity", "0"); // ensure fade-in starts from invisible
  });

  // Step 2: Function to load visible images
  function lazyLoadImages() {
    const scrollTop = $(window).scrollTop();
    const windowHeight = $(window).height();

    $("img[data-src]").each(function () {
      const img = $(this);
      const imgTop = img.offset().top;

      if (imgTop < scrollTop + windowHeight + 100) {
        const realSrc = img.attr("data-src");
        console.log("🖼️ Loading:", realSrc);
        img.attr("src", realSrc);
        img.removeAttr("data-src");

        img.on("load", function () {
          console.log("✅ Image loaded:", realSrc);

          // Trigger fade-in
          img.css("transition", "opacity 3.5s ease-in-out");
          img.css("opacity", "1");

          // Add class for green glow animation
          img.addClass("loaded");
        });
      }
    });
  }

  // Step 3: Run on scroll, resize, and load
  $(window).on("scroll", lazyLoadImages);
  $(window).on("resize", lazyLoadImages);
  $(window).on("load", lazyLoadImages);

  // Run once initially
  lazyLoadImages();
}

initLazyLoad();

});
