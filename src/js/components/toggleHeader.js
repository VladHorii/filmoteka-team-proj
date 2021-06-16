const refs = {
  onHomeBtn: document.getElementById('btn-home'),
  onLibraryBtn: document.getElementById('btn-library'),
  inputContainer: document.getElementById('search-form'),
  libraryBtnContainer: document.getElementById('library-container'),
  userInput: document.getElementById('serch-input'),
  onWatchedBtn: document.getElementById('watched'),
  onQueueBtn: document.getElementById('queue'),
  header: document.getElementById('page-header'),
};

refs.onHomeBtn.classList.add('is-current');
refs.libraryBtnContainer.classList.add('display-none');
refs.onWatchedBtn.classList.add('current-btn');

class CurrentPage {
  homeBtn() {
    onHomeBtnClassList();
    if (refs.onHomeBtn.classList.contains('is-current')) {
      return;
    } else {
      refs.onHomeBtn.classList.add('is-current');
    }
  }
  libraryBtn() {
    onLibraryBtnClassList();
  }
}
const currentPage = new CurrentPage();

function onHomeBtnClassList() {
  refs.onLibraryBtn.classList.remove('is-current');
  refs.inputContainer.classList.remove('is-hidden');
  refs.libraryBtnContainer.classList.add('is-hidden');
  refs.libraryBtnContainer.classList.remove('btn-flex');
  refs.header.classList.remove('header-library');
}
function onLibraryBtnClassList() {
  refs.onLibraryBtn.classList.add('is-current');
  refs.inputContainer.classList.add('is-hidden');
  refs.libraryBtnContainer.classList.remove('is-hidden');
  refs.libraryBtnContainer.classList.add('btn-flex');
  refs.onHomeBtn.classList.remove('is-current');
  refs.header.classList.add('header-library');
  queueBtnClick();
}
refs.onHomeBtn.addEventListener('click', currentPage.homeBtn);
refs.onLibraryBtn.addEventListener('click', currentPage.libraryBtn);

function WatchedBtnClick() {
  refs.onQueueBtn.classList.remove('current-btn');
  if (refs.onWatchedBtn.classList.contains('current-btn')) {
    return;
  } else {
    refs.onWatchedBtn.classList.add('current-btn');
  }
}
function queueBtnClick() {
  refs.onQueueBtn.classList.add('current-btn');
  refs.onWatchedBtn.classList.remove('current-btn');
}
refs.onWatchedBtn.addEventListener('click', WatchedBtnClick);
refs.onQueueBtn.addEventListener('click', queueBtnClick);
