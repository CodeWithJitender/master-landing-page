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
