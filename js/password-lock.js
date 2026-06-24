// Change this password whenever you want to share the website with selected clients.
// Example: const WEBSITE_PASSWORD = 'MyNewPassword123';
const WEBSITE_PASSWORD = 'Sarthak@12345';

const SESSION_ACCESS_KEY = 'sarthak_site_unlocked_session';
const REMEMBER_ACCESS_KEY = 'sarthak_site_unlocked_remembered';

(function protectWebsite() {
  const root = document.documentElement;

  function hasAccess() {
    return sessionStorage.getItem(SESSION_ACCESS_KEY) === 'yes' || localStorage.getItem(REMEMBER_ACCESS_KEY) === 'yes';
  }

  function showLockedScreen() {
    root.classList.add('site-locked');
  }

  function unlockWebsite(rememberAccess) {
    if (rememberAccess) {
      localStorage.setItem(REMEMBER_ACCESS_KEY, 'yes');
    } else {
      sessionStorage.setItem(SESSION_ACCESS_KEY, 'yes');
    }
    root.classList.remove('site-locked');
  }

  if (hasAccess()) {
    root.classList.remove('site-locked');
  } else {
    showLockedScreen();
  }

  document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('passwordForm');
    const passwordInput = document.getElementById('sitePassword');
    const rememberInput = document.getElementById('rememberAccess');
    const errorText = document.getElementById('passwordError');

    if (!form || !passwordInput || !rememberInput || !errorText) return;

    if (!hasAccess()) {
      setTimeout(() => passwordInput.focus(), 80);
    }

    form.addEventListener('submit', (event) => {
      event.preventDefault();

      if (passwordInput.value === WEBSITE_PASSWORD) {
        errorText.textContent = '';
        passwordInput.value = '';
        unlockWebsite(rememberInput.checked);
        return;
      }

      errorText.textContent = 'Incorrect password. Please try again.';
      passwordInput.value = '';
      passwordInput.focus();
    });
  });
})();
