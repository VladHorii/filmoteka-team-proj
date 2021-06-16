import { currentLinkNavClass, headerLibraryClass, headerHomeClass } from './constants';

const refs = {
  header: document.getElementById('page-header'),
  navMenu: document.getElementById('page-nav'),
  navLinks: document.querySelectorAll('.link-nav'),
};
refs.header.addEventListener('click', e => {
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
    } else {
      refs.header.classList.replace(headerHomeClass, headerLibraryClass);
    }
  }
});
