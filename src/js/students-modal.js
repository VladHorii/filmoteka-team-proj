refs = {
  openStudentsModal: document.querySelector('[data-students-modal-open]'),
  closeStudentsModal: document.querySelector('[data-students-modal-close]'),
  studentsModal: document.querySelector('[data-students-modal]'),
};

console.log(refs.openStudentsModal);
console.log(refs.closeStudentsModal);

refs.openStudentsModal.addEventListener('click', onClickStudentsModal);
refs.closeStudentsModal.addEventListener('click', onClickStudentsModal);

function onClickStudentsModal() {
  refs.studentsModal.classList.toggle('visually-hidden');
}

refs.studentsModal.addEventListener('click', onBackdropClick);

function onBackdropClick(event) {
  console.log(event.currentTarget);
  console.log(event.target);
  if (event.currentTarget === event.target) {
    refs.studentsModal.classList.add('visually-hidden');
  }
}
