import Authorization from './auth';
import { disableBodyScroll } from 'body-scroll-lock';
import { enableBodyScroll } from 'body-scroll-lock';

const auth = new Authorization();
auth.init();

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
      enableBodyScroll(refs.modal);
      document.querySelector('.modal-form__status').textContent = '';
    } else {
      // Действие при неправильном пароле
      document.querySelector('.modal-form__status').textContent =
        'Неверно введены данные. Повторите попытку';
    }
  });
});

document.querySelector('.modal-form__signup').addEventListener('submit', e => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const data = {
    email: formData.get('user-email'),
    pass: formData.get('user-password'),
    passConfirm: formData.get('user-confirm-password'),
    name: formData.get('user-name'),
  };
  document.querySelector('.modal-form__status').textContent = '';

  if (data.pass !== data.passConfirm) {
    return (document.querySelector('.modal-form__status').textContent = 'Пароли не совпадают');
  }
  if (data.pass.length < 5) {
    return (document.querySelector('.modal-form__status').textContent =
      'Пароль должен содержать более 5-и символов');
  }
  if (data.name.length < 3) {
    return (document.querySelector('.modal-form__status').textContent =
      'Имя содержит менее 3-х символов');
  }

  auth.register(data.email, data.name, data.pass).then(response => {
    if (response === data.email) {
      toggleModal();
      enableBodyScroll(refs.modal);
      document.querySelector('.modal-form__status').textContent = '';
    } else {
      // Действие при неправильном пароле
      document.querySelector('.modal-form__status').textContent =
        'Произошла ошибка при создании аккаунта';
    }
  });
});

document.querySelector('.js-logout-btn').addEventListener('click', auth.logout);

const refs = {
  openModalBtn: document.querySelector('[data-modal-open]'),
  closeModalBtn: document.querySelector('[data-modal-close]'),
  modal: document.querySelector('[data-modal]'),

  formSwitcher: document.querySelector('.form-switcher'),

  form_signin: document.querySelector('.modal-form__signin'),
  form_signup: document.querySelector('.modal-form__signup'),

  logout: document.querySelector('.js-logout-btn'),
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

refs.closeModalBtn.addEventListener('click', function () {
  toggleModal();
  enableBodyScroll(refs.modal);
});
refs.openModalBtn.addEventListener('click', function () {
  toggleModal();
  disableBodyScroll(refs.modal);
});
