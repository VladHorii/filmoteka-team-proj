const refs = {
  openStudentsModal: document.querySelector('[data-students-modal-open]'),
  closeStudentsModal: document.querySelector('[data-students-modal-close]'),
  studentsModal: document.querySelector('[data-students-modal]'),
};

refs.openStudentsModal.addEventListener('click', onClickStudentsModal);
refs.closeStudentsModal.addEventListener('click', onClickStudentsModal);

function onClickStudentsModal() {
  refs.studentsModal.classList.toggle('visually-hidden');
}

refs.studentsModal.addEventListener('click', onBackdropClick);

function onBackdropClick(event) {
  if (event.currentTarget === event.target) {
    refs.studentsModal.classList.add('visually-hidden');
  }
}
