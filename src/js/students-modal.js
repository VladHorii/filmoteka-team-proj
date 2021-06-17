import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

const refs = {
  openStudentsModal: document.querySelector('[data-students-modal-open]'),
  closeStudentsModal: document.querySelector('[data-students-modal-close]'),
  studentsModal: document.querySelector('[data-students-modal]'),
};

refs.openStudentsModal.addEventListener('click', function () {
  onClickStudentsModal();
  disableBodyScroll(refs.studentsModal);
});
refs.closeStudentsModal.addEventListener('click', function () {
  onClickStudentsModal();
  enableBodyScroll(refs.studentsModal);
});

function onClickStudentsModal() {
  refs.studentsModal.classList.toggle('visually-hidden');
}

refs.studentsModal.addEventListener('click', onBackdropClick);

function onBackdropClick(event) {
  if (event.currentTarget === event.target) {
    refs.studentsModal.classList.add('visually-hidden');
    enableBodyScroll(refs.studentsModal);
  }
}
