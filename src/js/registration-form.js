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
    
    
    
    
    
    
    
    
    // const refs = {
    //     button: document.querySelector('.btn'),
    //     form_signin: document.querySelector('.form-signin'),
    //     form_signup: document.querySelector('.form-signup'),
    //     frame: document.querySelector('.frame'),
    //     signin_active: document.querySelector('.signin-active'),
    //     signup_inactive: document.querySelector('.signup-inactive'),
    //     forgot: document.querySelector('.forgot'),

    //     btn_signup: document.querySelector('.btn-signup'),
    //     nav: document.querySelector('.nav'),
    //     form_signup_left: document.querySelector('.form-signup-left'),
    //     success: document.querySelector('.success'),

    //     btn_signin: document.querySelector('.btn-signin'),
    //     btn_animate: document.querySelector('.btn-animate'),
    //     welcome: document.querySelector('.welcome'),
    //     cover_photo: document.querySelector('.cover-photo'),
    //     profile_photo: document.querySelector('.profile-photo'),
    //     btn_goback: document.querySelector('.btn-goback'),
    // };

    // refs.button.addEventListener('click', onBtnClick);

    // function onBtnClick() {
    //     // refs.form_signin.classList.toggle('form-signin-left');
    //     // refs.form_signup.classList.toggle('form-signup-left');
    //     refs.frame.classList.toggle('frame-long');
    //     refs.signup_inactive.classList.toggle('signup-active');
    //     refs.signin_active.classList.toggle('signin-inactive');
    //     refs.forgot.classList.toggle('forgot-left');
    
    // }

// refs.btn_signup.addEventListener('click', onBtnSgnUpClick);

// function onBtnSgnUpClick() {
//     refs.nav.classList.toggle('nav-up');
//     refs.form_signup_left.classList.toggle('form-signup-down');
//     refs.success.classList.toggle('success-left');
//     refs.frame.classList.toggle('frame-short');
// }

// refs.btn_signin.addEventListener('click', onBtnSgnInClick);

// function onBtnSgnInClick() {
//     refs.btn_animate.classList.toggle('btn-animate-grow');
//     refs.welcome.classList.toggle('welcome-left');
//     refs.cover_photo.classList.toggle('cover-photo-down');
//     refs.frame.classList.toggle('frame-short');
//     refs.profile_photo.classList.toggle('profile-photo-down');
//     refs.btn_goback.classList.toggle('btn-goback-up');
//     refs.forgot.classList.toggle('forgot-fade');
// }