
$(document).ready(function () {

  const colors = [
    '#b3b7b3ff', '#ed0808ff', '#3297d5ff', '#81c784',
    '#5a65deff', '#f4f4f4ff', '#a07b43ff', '#388e3c', '#deda11ff', '#adac87ff'
  ];
  let currentColorIndex = 0;
  const bgColorBtn = document.getElementById('bgColorBtn');

  if (bgColorBtn) {
    bgColorBtn.style.backgroundColor = '#1e6f5c';
    bgColorBtn.style.border = 'none';
    bgColorBtn.style.color = 'white';
    bgColorBtn.style.borderRadius = '8px';
    bgColorBtn.style.fontWeight = 'bold';
    bgColorBtn.style.padding = '12px 25px';
    bgColorBtn.style.transition = 'background-color 0.3s ease, transform 0.2s ease';

    bgColorBtn.addEventListener('mouseenter', () => {
      bgColorBtn.style.backgroundColor = '#155d4c';
    });
    bgColorBtn.addEventListener('mouseleave', () => {
      bgColorBtn.style.backgroundColor = '#1e6f5c';
    });

    bgColorBtn.addEventListener('click', function () {
      currentColorIndex = (currentColorIndex + 1) % colors.length;
      document.body.style.backgroundColor = colors[currentColorIndex];
    });
  }

  // === FORM VALIDATION + SPINNER + TOAST ===
  const form = document.getElementById('lakeBookingForm');
  const successMsg = document.getElementById('successMsg');

  if (form) {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const dateInput = document.getElementById('date');
    const submitBtn = form.querySelector('button[type="submit"]');

    submitBtn.addEventListener('pointerdown', playClockSound);

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      let isValid = true;
      $('.error').text('');

      // === Validation Checks ===
      if (nameInput.value.length < 3 || !/^[A-Za-z\s]+$/.test(nameInput.value)) {
        $('#nameError').text('Name must contain only letters (min 3 chars)');
        isValid = false;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailInput.value)) {
        $('#emailError').text('Enter a valid email');
        isValid = false;
      }

      const phoneRegex = /^\+?[\d\s-]{10,}$/;
      if (!phoneRegex.test(phoneInput.value)) {
        $('#phoneError').text('Enter a valid phone number');
        isValid = false;
      }

      const today = new Date();
      const selectedDate = new Date(dateInput.value);
      if (selectedDate < today) {
        $('#dateError').text('Date must be in the future');
        isValid = false;
      }

      // === If Valid ===
      if (isValid) {
        
        // 🟢 TASK 6: Loading spinner on Submit
        submitBtn.disabled = true;
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = `
          <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Please wait...
        `;

        // Simulate server delay
        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;

          // TASK 7: Notification / Toast system
          showToast('✅ Form submitted successfully!');
          form.reset();
          successMsg.style.display = 'block';

          setTimeout(() => {
            successMsg.style.display = 'none';
          }, 3000);
        }, 2000);
      }
    });
  }

  // === CLOCK SOUND ===
  // ✅ Load your local sound file (place "click.mp3" in the same folder as this JS)
  const audioUrl = './click.mp3'; 
  const preloadedAudio = new Audio(audioUrl);
  preloadedAudio.preload = 'auto';

  function playClockSound() {
    try {
      const clickSound = preloadedAudio.cloneNode();
      clickSound.volume = 1.0;
      clickSound.play()
        .then(() => console.log("✅ Local click sound played"))
        .catch(err => console.log("❌ Audio play failed:", err));
    } catch (error) {
      console.log('Error playing sound:', error);
    }
  }

  // === TOAST / NOTIFICATION ===
  function showToast(message) {
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.style.position = 'fixed';
    toast.style.bottom = '30px';
    toast.style.right = '30px';
    toast.style.backgroundColor = '#1e6f5c';
    toast.style.color = '#fff';
    toast.style.padding = '15px 25px';
    toast.style.borderRadius = '8px';
    toast.style.boxShadow = '0 4px 10px rgba(0,0,0,0.2)';
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.5s ease';
    toast.style.zIndex = '9999';

    document.body.appendChild(toast);
    setTimeout(() => (toast.style.opacity = '1'), 100);
    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 500);
    }, 3000);
  }

});
