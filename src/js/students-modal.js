import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

const refs = {
  openStudentsModal: document.querySelector('[data-students-modal-open]'),
  closeStudentsModal: document.querySelector('[data-students-modal-close]'),
  studentsModal: document.querySelector('[data-students-modal]'),
};

refs.openStudentsModal.addEventListener('click', onClickStudentsModal);
refs.closeStudentsModal.addEventListener('click', onClickStudentsModal);

function onClickStudentsModal() {
  refs.studentsModal.classList.toggle('visually-hidden');
  toggleScrollTopBtn();

  if (!refs.studentsModal.classList.contains('visually-hidden')) {
    disableBodyScroll(refs.closeStudentsModal);
  }
  if (refs.studentsModal.classList.contains('visually-hidden')) {
    enableBodyScroll(refs.closeStudentsModal);
  }
}

refs.studentsModal.addEventListener('click', onBackdropClick);

function onBackdropClick(event) {
  if (event.currentTarget === event.target) {
    refs.studentsModal.classList.add('visually-hidden');
    toggleScrollTopBtn();
    enableBodyScroll(refs.closeStudentsModal);
  }
}

function toggleScrollTopBtn() {
  mybutton.classList.toggle('visually-hidden');
}
