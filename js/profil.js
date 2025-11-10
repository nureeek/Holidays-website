console.log("---- PROFILE.JS DEBUG START ----");

// Check localStorage contents
console.log("localStorage keys:", Object.keys(localStorage));
console.log("Raw user data:", localStorage.getItem("user"));
console.log("isLoggedIn:", localStorage.getItem("isLoggedIn"));

const user = JSON.parse(localStorage.getItem("user"));
const isLoggedIn = localStorage.getItem("isLoggedIn");

if (!user || !isLoggedIn) {
  console.error("User not found or not logged in. Redirecting to login.");
  window.location.href = "login.html";
} else {
  console.log("User object found:", user);

  // Display profile info
  document.getElementById("userName").textContent = user.name;
  document.getElementById("userAge").textContent = user.age;
  document.getElementById("userEmail").textContent = user.email;
  document.getElementById("userJoined").textContent = user.joinedOn;

  console.log("Profile info displayed.");
}

// Edit mode
const profileView = document.getElementById("profileView");
const editForm = document.getElementById("editForm");

document.getElementById("editBtn").onclick = () => {
  profileView.style.display = "none";
  editForm.style.display = "block";
  document.getElementById("editName").value = user.name;
  document.getElementById("editAge").value = user.age;
  document.getElementById("editEmail").value = user.email;
};

document.getElementById("cancelBtn").onclick = () => {
  editForm.style.display = "none";
  profileView.style.display = "block";
};

document.getElementById("saveBtn").onclick = () => {
  user.name = document.getElementById("editName").value;
  user.age = document.getElementById("editAge").value;
  user.email = document.getElementById("editEmail").value;

  localStorage.setItem("user", JSON.stringify(user));
  console.log("User updated:", user);
  location.reload();
};

// Logout
document.getElementById("logoutBtn").onclick = () => {
  localStorage.removeItem("isLoggedIn");
  console.log("User logged out");
  window.location.href = "login.html";
};

console.log("---- PROFILE.JS DEBUG END ----");
