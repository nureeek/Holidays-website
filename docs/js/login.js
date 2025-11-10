console.log("---- LOGIN.JS DEBUG START ----");

// --- SIGN UP ---
const signupForm = document.getElementById("signupForm");

if (signupForm) {
  const signupBtn = document.getElementById("signupBtn");
  const messageBox = document.getElementById("messageBox");

  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();

    signupBtn.disabled = true;
    signupBtn.textContent = "Please wait...";

    const name = document.getElementById("name").value.trim();
    const age = document.getElementById("age").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {
      showMessage("❌ Passwords do not match!", "error");
      signupBtn.disabled = false;
      signupBtn.textContent = "Sign Up";
      return;
    }

    const user = {
      name,
      age,
      email,
      password,
      joinedOn: new Date().toLocaleDateString()
    };

    localStorage.setItem("user", JSON.stringify(user));
    console.log("User saved on signup:", user);
    console.log("localStorage after signup:", localStorage);

    showMessage("✅ Account created successfully! Redirecting to login...", "success");

    setTimeout(() => {
      window.location.href = "login.html";
    }, 1500);
  });

  function showMessage(msg, type) {
    messageBox.textContent = msg;
    messageBox.className = type;
    messageBox.style.display = "block";
  }
}

// --- LOGIN ---
const loginForm = document.getElementById("loginForm");

if (loginForm) {
  const loginBtn = document.getElementById("loginBtn");
  const loginMessage = document.getElementById("loginMessage");

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    loginBtn.disabled = true;
    loginBtn.textContent = "Please wait...";

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value;
    const storedUser = JSON.parse(localStorage.getItem("user"));

    console.log("Stored user from localStorage:", storedUser);

    if (storedUser && storedUser.email === email && storedUser.password === password) {
      localStorage.setItem("user", JSON.stringify(storedUser));
      localStorage.setItem("isLoggedIn", "true");

      console.log("User saved on login:", storedUser);
      console.log("localStorage after login:", localStorage);

      loginMessage.textContent = "✅ Login successful! Redirecting...";
      loginMessage.className = "success";
      loginMessage.style.display = "block";

      setTimeout(() => {
        window.location.href = "profile.html";
      }, 1000);
    } else {
      loginMessage.textContent = "❌ Invalid email or password.";
      loginMessage.className = "error";
      loginMessage.style.display = "block";
      loginBtn.disabled = false;
      loginBtn.textContent = "Log In";
    }
  });
}

console.log("---- LOGIN.JS DEBUG END ----");
