
document.addEventListener('DOMContentLoaded', () => {
  
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('show');
        io.unobserve(e.target); 
      }
    });
  }, {threshold: 0.12});

  // Attach reveal to selectors
  const selectors = ['.reveal','.section-title','.service-card','.thumb','.media-card','.about-text','.contact-form','.headline'];
  selectors.forEach(sel => document.querySelectorAll(sel).forEach(el => io.observe(el)));

  // Smooth anchor scroll with header offset
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (!href || href === '#') return;
      const el = document.querySelector(href);
      if (!el) return;
      e.preventDefault();
      const offset = 84;
      const top = el.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({top, behavior: 'smooth'});
    });
  });

  // Lightbox for portfolio
  document.querySelectorAll('.thumb img').forEach(img => {
    img.addEventListener('click', () => {
      const overlay = document.createElement('div');
      overlay.style.cssText = 'position:fixed;inset:0;display:flex;align-items:center;justify-content:center;background:rgba(2,6,10,0.9);z-index:13000;padding:24px;';
      const wrapper = document.createElement('div');
      wrapper.style.cssText = 'max-width:1200px;max-height:85vh;border-radius:12px;overflow:hidden;display:flex;align-items:center;justify-content:center;';
      const big = document.createElement('img');
      big.src = img.src;
      big.style.cssText = 'max-width:100%;max-height:100%;object-fit:contain;display:block;';
      wrapper.appendChild(big);
      overlay.appendChild(wrapper);
      overlay.addEventListener('click', (ev) => { if (ev.target === overlay) overlay.remove(); });
      document.body.appendChild(overlay);
    });
  });

  // Nav toggle for mobile
  const navToggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('main-nav');
  navToggle?.addEventListener('click', () => {
    if (!nav) return;
    if (nav.style.display === 'flex') {
      nav.style.display = 'none';
    } else {
      nav.style.display = 'flex';
      nav.style.flexDirection = 'column';
      nav.style.gap = '12px';
      nav.style.background = 'rgba(0,0,0,0.45)';
      nav.style.padding = '12px';
      nav.style.position = 'absolute';
      nav.style.right = '24px';
      nav.style.top = '74px';
      nav.style.borderRadius = '8px';
    }
  });
});

const navToggle = document.querySelector('.nav-toggle');
    const nav = document.querySelector('.nav');
    
    navToggle.addEventListener('click', () => {
        nav.classList.toggle('show');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && !navToggle.contains(e.target)) {
            nav.classList.remove('show');
        }
    });

// Header scroll effect
const header = document.querySelector('.site-header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// Image loading
document.querySelectorAll('img').forEach(img => {
  img.addEventListener('load', () => img.classList.add('loaded'));
});

// Form submission handling
const form = document.querySelector('.contact-form');
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const button = form.querySelector('button');
    button.classList.add('loading');
    
    try {
      // Replace with your form handling logic
      await new Promise(resolve => setTimeout(resolve, 1000));
      form.reset();
      alert('Message sent successfully!');
    } catch (err) {
      alert('Error sending message. Please try again.');
    } finally {
      button.classList.remove('loading');
    }
  });
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  const nav = document.querySelector('.nav');
  const toggle = document.querySelector('.nav-toggle');
  if (!nav.contains(e.target) && !toggle.contains(e.target)) {
    nav.classList.remove('show');
  }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});
