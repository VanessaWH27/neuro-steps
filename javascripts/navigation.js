// Multi-section collapsible navigation with persistent state
// Allows multiple navigation sections to stay open simultaneously

(function() {
  const STORAGE_KEY = 'mkdocs-nav-state';

  // Save current state of all toggles
  function saveState() {
    const state = {};
    document.querySelectorAll('.md-nav__toggle').forEach(toggle => {
      if (toggle.id) {
        state[toggle.id] = toggle.checked;
      }
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  // Restore saved state immediately
  function restoreState() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const state = JSON.parse(saved);

        // Try to restore immediately, even if elements aren't ready yet
        Object.keys(state).forEach(id => {
          const toggle = document.getElementById(id);
          if (toggle) {
            toggle.checked = state[id];
          }
        });
      }
    } catch (e) {
      console.error('Error restoring navigation state:', e);
    }
  }

  // Mark navigation as ready to display
  function markReady() {
    const sidebar = document.querySelector('.md-sidebar--primary');
    if (sidebar) {
      sidebar.classList.add('nav-ready');
    }
  }

  // Initialize event listeners
  function init() {
    // Save state whenever any toggle changes
    document.querySelectorAll('.md-nav__toggle').forEach(toggle => {
      toggle.addEventListener('change', saveState);
    });

    // Save state when clicking any link in the sidebar (before navigation)
    const sidebar = document.querySelector('.md-sidebar--primary');
    if (sidebar) {
      sidebar.addEventListener('click', function(e) {
        // If clicking a link, save state immediately before navigation
        if (e.target.tagName === 'A' || e.target.closest('a')) {
          saveState();
        }
      }, true);
    }

    // Final restore and mark as ready
    restoreState();
    markReady();
  }

  // Restore state IMMEDIATELY - runs as soon as this script loads
  restoreState();

  // Try to restore again very early, multiple times
  setTimeout(restoreState, 0);
  setTimeout(restoreState, 10);
  setTimeout(restoreState, 50);

  // Run full init on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      restoreState();
      setTimeout(init, 0);
    });
  } else {
    restoreState();
    init();
  }

  // Listen for instant navigation events (Material theme)
  document$.subscribe(function() {
    restoreState();
    init();
  });

  // Also restore on pageshow (back/forward navigation)
  window.addEventListener('pageshow', function() {
    restoreState();
    setTimeout(markReady, 0);
  });

  // Mark ready after a short delay as fallback
  setTimeout(markReady, 100);
})();
