const refs = {
    openModalBtn: document.querySelector('[data-modal-open]'),
    closeModalBtn: document.querySelector('[data-modal-close]'),
    modal: document.querySelector('[data-modal]'),
    button_signin: document.querySelector('.btn-signin'),
    button_signup: document.querySelector('.btn-signup'),
    signin_active: document.querySelector('.signin-active'),
    signin_inactive: document.querySelector('.signin_inactive'),
    signup_active: document.querySelector('.signup-active'),
    signup_inactive: document.querySelector('.signup-inactive'),
    form_signin: document.querySelector('.modal-form__signin'),
    form_signup: document.querySelector('.modal-form__signup'),
}



function toggleModal() {
    refs.modal.classList.toggle('backdrop--hidden');
  }

function onSgnUpClck() {
    refs.form_signin.classList.add('visually-hidden');
    refs.form_signup.classList.remove('visually-hidden');
    refs.signin_active.classList.add('signin-inactive');
    refs.signup_inactive.classList.add('signup-active');
    
}

function onSgnInClck() {
    refs.form_signup.classList.add('visually-hidden');
    refs.form_signin.classList.remove('visually-hidden');
    refs.signup_inactive.classList.remove('signup-active');
    refs.signin_active.classList.remove('signin-inactive');
}
    
refs.button_signup.addEventListener('click', onSgnUpClck);
refs.button_signin.addEventListener('click', onSgnInClck);
refs.closeModalBtn.addEventListener('click', toggleModal);
refs.openModalBtn.addEventListener('click', toggleModal);
    
    
    
    
    
    
    
   