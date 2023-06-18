$(document).ready(function() {
  // Set the interval duration (in milliseconds)
  var intervalDuration = 5000;

  // Find all testimonials and hide them
  var testimonials = $('.testimonial');
  testimonials.hide();

  // Show the first testimonial
  var currentTestimonial = 0;
  testimonials.eq(currentTestimonial).fadeIn();

  // Start the interval for auto-sliding
  setInterval(function() {
    testimonials.eq(currentTestimonial).fadeOut(function() {
      currentTestimonial++;
      if (currentTestimonial >= testimonials.length) {
        currentTestimonial = 0;
      }
      testimonials.eq(currentTestimonial).fadeIn();
    });
  }, intervalDuration);

  const slider = document.querySelector(".slider");
  const cards = document.querySelectorAll(".card");
  const dotsContainer = document.querySelector(".slider-dots");
  let currentIndex = 0;
  let autoSlideInterval;

  // Set the current card as active
  function setCurrentCard(index) {
    if (index < 0 || index >= cards.length) {
      return;
    }

    currentIndex = index;
    slider.style.transform = `translateX(-${currentIndex * 100}%)`;

    // Update active dot
    const dots = dotsContainer.querySelectorAll(".dot");
    for (let i = 0; i < dots.length; i++) {
      dots[i].classList.remove("active");
    }
    dots[currentIndex].classList.add("active");

    // Update z-index of clicked card
    cards.forEach((c, i) => {
      if (i === index) {
        c.style.zIndex = cards.length;
      } else {
        c.style.zIndex = cards.length - i;
      }
    });
  }

  // Handle dot click events using event delegation
  dotsContainer.addEventListener("click", function(event) {
    const dot = event.target;
    if (dot.classList.contains("dot")) {
      const dotIndex = Array.from(dot.parentNode.children).indexOf(dot);
      setCurrentCard(dotIndex);
      clearInterval(autoSlideInterval); // Clear the auto slide interval
    }
  });

  // Automatically move to the next card every 3 seconds
  function autoSlide() {
    setCurrentCard((currentIndex + 1) % cards.length);
  }

  autoSlideInterval = setInterval(autoSlide, 3000);

  // Stop auto slide on user interaction
  slider.addEventListener("mouseenter", function() {
    clearInterval(autoSlideInterval);
  });

  // Resume auto slide when user is not interacting
  slider.addEventListener("mouseleave", function() {
    autoSlideInterval = setInterval(autoSlide, 3000);
  });
});


