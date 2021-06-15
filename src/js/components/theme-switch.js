const Theme = {
  LIGHT: 'light-theme',
  DARK: 'dark-theme',
};

const refs = {
  toolbar: document.querySelector('#theme-switch-toggle'),
  body: document.querySelector('body'),
  studentModal: document.querySelector('.js-modal-bg-theme-switch'),
  movieModal: document.querySelector('.js-modal-movie'),
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

    refs.studentModal.classList.add(Theme.LIGHT);
    refs.studentModal.classList.remove(Theme.DARK);

    refs.movieModal.classList.add(Theme.LIGHT);
    refs.movieModal.classList.remove(Theme.DARK);
  }
}

function darkTheme() {
  if (refs.toolbar.checked) {
    refs.body.classList.add(Theme.DARK);
    refs.body.classList.remove(Theme.LIGHT);

    refs.studentModal.classList.add(Theme.DARK);
    refs.studentModal.classList.remove(Theme.LIGHT);

    refs.movieModal.classList.add(Theme.DARK);
    refs.movieModal.classList.remove(Theme.LIGHT);
  }
}
