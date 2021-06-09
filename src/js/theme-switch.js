const Theme = {
  LIGHT: 'light-theme',
  DARK: 'dark-theme',
};

const refs = {
  toolbar: document.querySelector('#theme-switch-toggle'),
  body: document.querySelector('body'),
};

feedbackLocalStorage();
lightTheme();

refs.toolbar.addEventListener('change', onToolbarClick);

function onToolbarClick(e) {
  localStorage.setItem('toolbar-status', refs.toolbar.checked);
  lightTheme();
  darkTheme();
}

function feedbackLocalStorage() {
  refs.toolbar.checked = JSON.parse(localStorage.getItem('toolbar-status'));
  lightTheme();
  darkTheme();
}

function lightTheme() {
  if (!refs.toolbar.checked) {
    refs.body.classList.add(Theme.LIGHT);
    refs.body.classList.remove(Theme.DARK);
  }
}

function darkTheme() {
  if (refs.toolbar.checked) {
    refs.body.classList.add(Theme.DARK);
    refs.body.classList.remove(Theme.LIGHT);
  }
}
