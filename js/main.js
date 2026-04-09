// Initialize simple reveal-on-scroll animations
function reveal() {
  var reveals = document.querySelectorAll(".has-animation");

  for (var i = 0; i < reveals.length; i++) {
    var windowHeight = window.innerHeight;
    var elementTop = reveals[i].getBoundingClientRect().top;
    var elementVisible = 150; // Adjust this value to trigger earlier/later

    if (elementTop < windowHeight - elementVisible) {
      reveals[i].classList.add("animate-in");
    } else {
      reveals[i].classList.remove("animate-in");
    }
  }
}

window.addEventListener("scroll", reveal);

// Trigger initial reveal on page load
document.addEventListener('DOMContentLoaded', reveal);

// --- Form Validation and EmailJS Submission Logic ---
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const btnText = document.getElementById('btnText');
    const btnSpinner = document.getElementById('btnSpinner');
    const formAlert = document.getElementById('formAlert');

    if (form) {
        form.addEventListener('submit', function (event) {
            event.preventDefault();
            event.stopPropagation();
            
            // Reset alerts
            formAlert.classList.add('d-none');
            formAlert.classList.remove('alert-success', 'alert-danger');

            // 1. Bot Protection: Honeypot Check
            const honeypot = document.getElementById('honeypot').value;
            if (honeypot !== "") {
                // If bot fills the hidden field, silently reject or mock success
                console.warn("Bot detected.");
                return false;
            }

            // 2. HTML5 & Bootstrap Validation
            if (!form.checkValidity()) {
                form.classList.add('was-validated');
                return;
            }

            // Set dynamic time parameter for email template
            document.getElementById('formTime').value = new Date().toLocaleString();

            // 3. UI Loading State
            submitBtn.setAttribute('disabled', 'true');
            btnText.textContent = "Sending...";
            btnSpinner.classList.remove('d-none');

            // 4. Send via EmailJS
            // serviceID: 'service_5ukbpwr', templateID: 'template_vyyx7og'
            emailjs.sendForm('service_5ukbpwr', 'template_vyyx7og', form)
                .then(function() {
                    formAlert.innerHTML = "Request sent successfully! Redirecting...";
                    formAlert.classList.add('alert-success');
                    formAlert.classList.remove('d-none');
                    form.reset();
                    form.classList.remove('was-validated');
                    
                    // Redirect to Thank You page
                    setTimeout(function() {
                        window.location.href = "https://www.glocalrpo.com/thankyou.php";
                    }, 500);
                }, function(error) {
                    // Restore UI State on failure
                    submitBtn.removeAttribute('disabled');
                    btnText.textContent = "Request Call";
                    btnSpinner.classList.add('d-none');
                    
                    formAlert.innerHTML = "Oops! Something went wrong. Please try again.";
                    formAlert.classList.add('alert-danger');
                    formAlert.classList.remove('d-none');
                    console.error('EmailJS Error:', error);
                });
        });
    }
});
