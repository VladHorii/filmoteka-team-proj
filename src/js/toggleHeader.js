import { currentLinkNavClass, headerLibraryClass, headerHomeClass } from './constants';

import { setWatchedAndQueueMarkup, setMarkup } from './components/my-library';
// import { markupMovies } from './markup/hero-markup';

const refs = {
  header: document.getElementById('page-header'),
  navMenu: document.getElementById('page-nav'),
  navLinks: document.querySelectorAll('.link-nav'),
};
refs.header.addEventListener('click', async e => {
  const target = e.target;
  const targetParent = target.closest('.logo');

  if (target.dataset.link === '' || targetParent) {
    e.preventDefault();

    const link = targetParent || target;
    const path = link.href.split('#')[1];

    refs.navLinks.forEach(link => link.classList.remove(currentLinkNavClass));

    refs.navMenu.querySelector(`[href='#${path}']`).classList.add(currentLinkNavClass);

    if (path === 'home') {
      refs.header.classList.replace(headerLibraryClass, headerHomeClass);
      markupMovies();
    } else {
      refs.header.classList.replace(headerHomeClass, headerLibraryClass);
      setWatchedAndQueueMarkup();
    }
  }
});
document.querySelector('.js-get-watched').addEventListener('click', e => {
  setMarkup('watched');
});
document.querySelector('.js-get-queue').addEventListener('click', e => {
  setMarkup('queue');
});
