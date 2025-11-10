function validateSignupForm() {
    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Name validation
    if (name.length < 3) {
        alert('Name must be at least 3 characters long');
        return false;
    }

    // Age validation
    if (age < 18 || age > 120) {
        alert('Age must be between 18 and 120');
        return false;
    }

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert('Please enter a valid email address');
        return false;
    }

    // Password validation
    if (password.length < 6) {
        alert('Password must be at least 6 characters long');
        return false;
    }

    // Confirm password validation
    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return false;
    }

    return true;
}

function validateLoginForm() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert('Please enter a valid email address');
        return false;
    }

    // Password validation
    if (password.length < 6) {
        alert('Password must be at least 6 characters long');
        return false;
    }

    return true;
}
