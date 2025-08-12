// Smooth reveals, lightbox and nav toggle
document.addEventListener('DOMContentLoaded', () => {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        if (entry.target.children.length > 1) {
          Array.from(entry.target.children).forEach((child, i) => {
            setTimeout(() => {
              child.classList.add('show');
            }, i * 100);
          });
        }
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  // Attach reveal to more elements with stagger effect
  const selectors = [
    '.reveal',
    '.section-title',
    '.service-card',
    '.thumb',
    '.media-card',
    '.about-text',
    '.contact-form',
    '.headline',
    '.sub',
    '.cta-row',
    '.footer-col',
    '.services-grid',
    '.portfolio-grid'
  ];
  
  selectors.forEach(sel => {
    document.querySelectorAll(sel).forEach(el => io.observe(el));
  });

  // Smooth scroll with header offset
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Add smooth transitions for nav toggle
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');
  
  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      nav.style.transition = 'all 0.3s ease-in-out';
      nav.classList.toggle('show');
    });
  }

  // Smooth header background transition on scroll
  const header = document.querySelector('.site-header');
  let lastScroll = 0;
  
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add scrolled class for header background
    if (currentScroll > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
  });

  // Add smooth image loading transitions
  document.querySelectorAll('img').forEach(img => {
    img.style.transition = 'opacity 0.3s ease-in-out';
    if (img.complete) {
      img.classList.add('loaded');
    } else {
      img.addEventListener('load', () => {
        img.classList.add('loaded');
      });
    }
  });
});


function sendWhatsApp(e) {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const phone = document.getElementById('phone').value;
  const message = document.getElementById('message').value;
  
  const whatsappMessage = `*New Project Enquiry*%0A%0A`
    + `*Name:* ${name}%0A`
    + `*Phone:* ${phone}%0A`
    + `*Message:* ${message}`;

  const whatsappUrl = `https://wa.me/27799592894?text=${whatsappMessage}`;

  window.open(whatsappUrl, '_blank');
  
  document.getElementById('whatsappForm').reset();
  
  return false;
}
