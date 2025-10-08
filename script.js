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
