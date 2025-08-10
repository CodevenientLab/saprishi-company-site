// Smooth reveals, lightbox and nav toggle
document.addEventListener('DOMContentLoaded', () => {
  // IntersectionObserver for bounded reveals
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('show');
        io.unobserve(e.target); // unobserve to prevent cross-section reflows
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
      const offset = 84; // header height buffer
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
