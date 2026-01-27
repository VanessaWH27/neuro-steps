// Auto-hide header on scroll down, show on scroll up

(function() {
  let lastScrollTop = 0;
  let scrollThreshold = 10; // Minimum scroll distance to trigger
  let ticking = false;

  function updateHeader(scrollTop) {
    const header = document.querySelector('.md-header');
    if (!header) return;

    if (scrollTop > lastScrollTop && scrollTop > 100) {
      // Scrolling DOWN and past 100px - shrink header
      header.classList.add('md-header--hidden');
    } else if (scrollTop < lastScrollTop || scrollTop <= 100) {
      // Scrolling UP or near top - expand header
      header.classList.remove('md-header--hidden');
    }

    lastScrollTop = scrollTop;
  }

  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // Only update if scroll distance exceeds threshold
        if (Math.abs(scrollTop - lastScrollTop) > scrollThreshold) {
          updateHeader(scrollTop);
        }

        ticking = false;
      });

      ticking = true;
    }
  }

  // Initialize on page load
  window.addEventListener('scroll', onScroll, { passive: true });

  // Reset on page show (back/forward navigation)
  window.addEventListener('pageshow', () => {
    lastScrollTop = 0;
    const header = document.querySelector('.md-header');
    if (header) {
      header.classList.remove('md-header--hidden');
    }
  });
})();
