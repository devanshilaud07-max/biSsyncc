/**
 * BISync Mobile & Desktop Responsive Runtime Enhancements
 * Enhances touch navigation, virtual keyboard viewport handling,
 * keyboard accessibility, and swipe gestures without changing core app logic.
 */

(() => {
  // Wait for DOM to be ready
  function initEnhancements() {
    // 1. Mobile Virtual Viewport Handling for Mobile Keyboards
    if (window.visualViewport) {
      const handleResize = () => {
        const vh = window.visualViewport?.height || window.innerHeight;
        document.documentElement.style.setProperty('--visual-vh', `${vh}px`);
      };
      window.visualViewport.addEventListener('resize', handleResize);
      window.visualViewport.addEventListener('scroll', handleResize);
      handleResize();
    }

    // 2. Keyboard Accessibility (ESC to close modals or mobile drawer)
    window.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        // If mobile features drawer is open, close it
        const page = document.getElementById('bisync-root-page');
        if (page && !page.classList.contains('page--sidebar-closed')) {
          const closeBtn = document.getElementById('features-panel-close-btn') as HTMLButtonElement | null;
          if (closeBtn) {
            closeBtn.click();
            return;
          }
        }

        // Close any floating prompt
        const prompt = document.getElementById('floating-login-prompt');
        if (prompt) {
          prompt.style.display = 'none';
        }
      }
    });

    // 3. Auto-scroll chat preview window on new messages
    const chatObserver = new MutationObserver(() => {
      const chatWindows = document.querySelectorAll('.chat-preview__window');
      chatWindows.forEach((win) => {
        win.scrollTo({ top: win.scrollHeight, behavior: 'smooth' });
      });
    });

    const targetNode = document.getElementById('root');
    if (targetNode) {
      chatObserver.observe(targetNode, { childList: true, subtree: true });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initEnhancements);
  } else {
    initEnhancements();
  }
})();

export {};
