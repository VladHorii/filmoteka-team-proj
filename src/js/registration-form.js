import Authorization from './auth';

const auth = new Authorization();

document.querySelector('.modal-form__signin').addEventListener('submit', e => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const data = {
    email: formData.get('user-email'),
    pass: formData.get('user-password'),
  };

  auth.auth(data.email, data.pass).then(response => {
    if (response === data.email) {
      toggleModal();
      document.querySelector('.modal-form__status').textContent = '';
    } else {
      // Действие при неправильном пароле
      document.querySelector('.modal-form__status').textContent =
        'Неверно введены данные. Повторите попытку';
    }
  });
});

document.querySelector('.js-auth-submit-logout').addEventListener('click', auth.logout);

const refs = {
  openModalBtn: document.querySelector('[data-modal-open]'),
  closeModalBtn: document.querySelector('[data-modal-close]'),
  modal: document.querySelector('[data-modal]'),

  formSwitcher: document.querySelector('.form-switcher'),

  form_signin: document.querySelector('.modal-form__signin'),
  form_signup: document.querySelector('.modal-form__signup'),
};

function toggleModal() {
  refs.modal.classList.toggle('backdrop--hidden');
}

function onSgnUpClck() {
  refs.form_signin.classList.add('visually-hidden');
  refs.form_signup.classList.remove('visually-hidden');
}

function onSgnInClck() {
  refs.form_signup.classList.add('visually-hidden');
  refs.form_signin.classList.remove('visually-hidden');
}

refs.formSwitcher.addEventListener('click', e => {
  document
    .querySelector('.form-switcher__link--active')
    .classList.remove('form-switcher__link--active');

  e.target.classList.add('form-switcher__link--active');
  if (e.target.classList.contains('btn-signin')) {
    onSgnInClck();
  } else if (e.target.classList.contains('btn-signup')) {
    onSgnUpClck();
  }
});

refs.closeModalBtn.addEventListener('click', toggleModal);
refs.openModalBtn.addEventListener('click', toggleModal);
