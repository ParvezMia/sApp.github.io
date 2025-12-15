// TIL-EMS Custom JavaScript
(function($) {
  "use strict";

  // Initialize when document is ready
  $(document).ready(function() {
    initializeTILEMS();
  });

  function initializeTILEMS() {
    initPreloader();
    initSmoothScrolling();
    initScrollAnimations();
    initClientsCarousel();
    initFormValidation();
    initMobileNavigation();
    initCounters();
    initActiveNavigation();
  }

  // Preloader (using existing pattern)
  function initPreloader() {
    $(window).on('load', function() {
      if ($('#preloader').length) {
        $('#preloader').delay(100).fadeOut('slow', function() {
          $(this).remove();
        });
      }
    });
  }

  // Enhanced smooth scrolling for navigation
  function initSmoothScrolling() {
    $('.main-nav a, .mobile-nav a, .scrollto').on('click', function(e) {
      if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        if (target.length) {
          e.preventDefault();
          var target_offset = target.offset();
          var target_top = target_offset.top - 80;
          $('html, body').animate({
            scrollTop: target_top
          }, 1500, 'easeInOutExpo');
          return false;
        }
      }
    });

    // Hero CTA buttons smooth scrolling
    $('.hero-cta a[href^="#"]').on('click', function(e) {
      e.preventDefault();
      var target = $(this.getAttribute('href'));
      if (target.length) {
        var target_offset = target.offset();
        var target_top = target_offset.top - 80;
        $('html, body').animate({
          scrollTop: target_top
        }, 1500, 'easeInOutExpo');
      }
    });
  }

  // Scroll animations for sections
  function initScrollAnimations() {
    // Animate sections on scroll
    function animateOnScroll() {
      $('.about-section, .security-section, .features-section, .clients-section, .partnership-section, .contact-section').each(function() {
        var elementTop = $(this).offset().top;
        var elementBottom = elementTop + $(this).outerHeight();
        var viewportTop = $(window).scrollTop();
        var viewportBottom = viewportTop + $(window).height();

        if (elementBottom > viewportTop && elementTop < viewportBottom) {
          $(this).addClass('animate-in');
        }
      });

      // Animate feature cards
      $('.security-feature, .feature-card').each(function(index) {
        var elementTop = $(this).offset().top;
        var elementBottom = elementTop + $(this).outerHeight();
        var viewportTop = $(window).scrollTop();
        var viewportBottom = viewportTop + $(window).height();

        if (elementBottom > viewportTop && elementTop < viewportBottom) {
          setTimeout(() => {
            $(this).addClass('animate-in');
          }, index * 100);
        }
      });
    }

    // Initial check
    animateOnScroll();

    // Check on scroll
    $(window).scroll(function() {
      animateOnScroll();
    });
  }

  // Clients carousel
  function initClientsCarousel() {
    if ($('.clients-carousel').length) {
      $('.clients-carousel').owlCarousel({
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,
        loop: true,
        margin: 30,
        nav: true,
        dots: true,
        responsive: {
          0: {
            items: 1
          },
          600: {
            items: 2
          },
          1000: {
            items: 3
          },
          1200: {
            items: 4
          }
        },
        navText: [
          '<i class="ion-chevron-left"></i>',
          '<i class="ion-chevron-right"></i>'
        ]
      });
    }
  }

  // Form validation and submission
  function initFormValidation() {
    $('.php-email-form').on('submit', function(e) {
      e.preventDefault();
      
      var form = $(this);
      var name = form.find('input[name="name"]').val();
      var email = form.find('input[name="email"]').val();
      var institution = form.find('input[name="institution"]').val();
      var phone = form.find('input[name="phone"]').val();
      var institutionType = form.find('select[name="institution_type"]').val();
      var message = form.find('textarea[name="message"]').val();

      // Basic validation
      if (!name || !email || !institution || !institutionType || !message) {
        showNotification('Please fill in all required fields.', 'error');
        return false;
      }

      if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address.', 'error');
        return false;
      }

      // Show loading state
      var submitBtn = form.find('button[type="submit"]');
      var originalText = submitBtn.text();
      submitBtn.text('Sending...').prop('disabled', true);

      // Simulate form submission (replace with actual form handling)
      setTimeout(function() {
        showNotification('Thank you for your message. We will contact you soon!', 'success');
        form[0].reset();
        submitBtn.text(originalText).prop('disabled', false);
      }, 2000);
    });
  }

  // Email validation helper
  function isValidEmail(email) {
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Notification system
  function showNotification(message, type) {
    // Remove existing notifications
    $('.notification').remove();

    var notification = $('<div class="notification notification-' + type + '">' + message + '</div>');
    
    // Style the notification
    notification.css({
      position: 'fixed',
      top: '20px',
      right: '20px',
      padding: '15px 20px',
      borderRadius: '8px',
      color: 'white',
      fontWeight: '600',
      zIndex: 9999,
      maxWidth: '300px',
      boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
      transform: 'translateX(100%)',
      transition: 'transform 0.3s ease'
    });

    if (type === 'success') {
      notification.css('background-color', '#28a745');
    } else if (type === 'error') {
      notification.css('background-color', '#dc3545');
    }

    $('body').append(notification);

    // Animate in
    setTimeout(function() {
      notification.css('transform', 'translateX(0)');
    }, 100);

    // Remove after 5 seconds
    setTimeout(function() {
      notification.css('transform', 'translateX(100%)');
      setTimeout(function() {
        notification.remove();
      }, 300);
    }, 5000);
  }

  // Mobile navigation
  function initMobileNavigation() {
    $('.mobile-nav-toggle').on('click', function(e) {
      e.preventDefault();
      $('body').toggleClass('nav-open');
      $(this).find('i').toggleClass('fa-bars fa-times');
    });

    // Close mobile nav when clicking outside
    $(document).on('click', function(e) {
      if (!$(e.target).closest('.main-nav, .mobile-nav-toggle').length) {
        $('body').removeClass('nav-open');
        $('.mobile-nav-toggle i').removeClass('fa-times').addClass('fa-bars');
      }
    });

    // Close mobile nav when clicking on nav links
    $('.main-nav a').on('click', function() {
      $('body').removeClass('nav-open');
      $('.mobile-nav-toggle i').removeClass('fa-times').addClass('fa-bars');
    });
  }

  // Animated counters
  function initCounters() {
    $('.counter').each(function() {
      var $this = $(this);
      var countTo = parseInt($this.attr('data-count')) || 0;

      $({ countNum: 0 }).animate({
        countNum: countTo
      }, {
        duration: 2000,
        easing: 'linear',
        step: function() {
          $this.text(Math.floor(this.countNum));
        },
        complete: function() {
          $this.text(this.countNum);
        }
      });
    });
  }

  // Active navigation highlighting
  function initActiveNavigation() {
    $(window).scroll(function() {
      var scrollPos = $(window).scrollTop() + 100;
      
      $('.main-nav a').each(function() {
        var currLink = $(this);
        var refElement = $(currLink.attr('href'));
        
        if (refElement.length && refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
          $('.main-nav a').removeClass('active');
          currLink.addClass('active');
        }
      });
    });
  }

  // Enhanced header scroll effect
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('#header').addClass('header-scrolled');
    } else {
      $('#header').removeClass('header-scrolled');
    }
  });

  // Back to top button (enhanced)
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
    } else {
      $('.back-to-top').fadeOut('slow');
    }
  });

  $('.back-to-top').click(function() {
    $('html, body').animate({
      scrollTop: 0
    }, 1500, 'easeInOutExpo');
    return false;
  });

  // Hero section parallax effect
  $(window).scroll(function() {
    var scrolled = $(this).scrollTop();
    var rate = scrolled * -0.5;
    
    if ($('#hero').length) {
      $('.hero-bg').css('transform', 'translateY(' + rate + 'px)');
    }
  });

  // Add hover effects for cards
  $(document).on('mouseenter', '.client-card, .feature-card', function() {
    $(this).addClass('hover-effect');
  });

  $(document).on('mouseleave', '.client-card, .feature-card', function() {
    $(this).removeClass('hover-effect');
  });

  // Lazy loading for images
  function initLazyLoading() {
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
          }
        });
      });

      document.querySelectorAll('img[data-src]').forEach(function(img) {
        imageObserver.observe(img);
      });
    }
  }

  // Initialize lazy loading
  initLazyLoading();

  // Intersection Observer for animations
  if ('IntersectionObserver' in window) {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-visible');
        }
      });
    }, observerOptions);

    // Observe all animated elements
    document.querySelectorAll('.security-feature, .feature-card, .client-card, .partnership-item').forEach(function(el) {
      observer.observe(el);
    });
  }

  // Contact form field animations
  $('.form-control').on('focus', function() {
    $(this).closest('.form-group').addClass('focused');
  });

  $('.form-control').on('blur', function() {
    if (!$(this).val()) {
      $(this).closest('.form-group').removeClass('focused');
    }
  });

  // Initialize tooltips (if needed)
  $('[data-toggle="tooltip"]').tooltip();

  // Window resize handler
  $(window).resize(function() {
    // Recalculate carousel on resize
    if ($('.clients-carousel').length) {
      $('.clients-carousel').trigger('refresh.owl.carousel');
    }
  });

  // Add CSS for animations and notifications
  var additionalCSS = `
    <style>
    .animate-in {
      animation: fadeInUp 0.8s ease-out forwards;
    }

    .animate-visible {
      animation: fadeInUp 0.6s ease-out forwards;
    }

    .notification {
      font-family: 'Inter', sans-serif;
    }

    .form-group.focused .form-control {
      border-color: var(--muted-gold);
      box-shadow: 0 0 0 0.2rem rgba(201, 169, 97, 0.25);
    }

    .client-card.hover-effect,
    .feature-card.hover-effect {
      transform: translateY(-8px);
      box-shadow: 0 15px 35px rgba(45, 80, 22, 0.15);
    }

    .nav-open .main-nav {
      transform: translateX(0);
    }

    @media (max-width: 991px) {
      .main-nav {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100vh;
        background: rgba(45, 80, 22, 0.95);
        backdrop-filter: blur(10px);
        transform: translateX(-100%);
        transition: transform 0.3s ease;
        z-index: 1000;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .main-nav ul {
        flex-direction: column;
        text-align: center;
      }

      .main-nav ul li {
        margin: 1rem 0;
      }

      .main-nav ul li a {
        color: white;
        font-size: 1.5rem;
        font-weight: 600;
      }
    }

    .lazy {
      opacity: 0;
      transition: opacity 0.3s;
    }

    .lazy.loaded {
      opacity: 1;
    }

    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    </style>
  `;

  $('head').append(additionalCSS);

})(jQuery);