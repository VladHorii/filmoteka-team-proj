const headerEl = document.getElementById('page-header');
const navMenuEl = headerEl.querySelector(`.nav`);

const REFS = {
  HEADER: document.getElementById('page-header'),
  NAV_MENU: document.getElementById('page-nav'),
  NAV_LINKS: document.querySelectorAll('.header-navigation-page'),
};

REFS.HEADER.addEventListener('click', e => {
  const target = e.target;
  const targetParent = target.closest('.header-logo-link');

  if (target.dataset.link === '' || targetParent) {
    e.preventDefault();

    const link = targetParent || target;
    const path = link.href.split('#')[1];

    REFS.NAV_LINKS.forEach(link => link.classList.remove('is-current'));

    REFS.NAV_MENU.querySelector(`[href='#${path}']`).classList.add(`is-current`);

    if (path === 'home') {
      e.currentTarget.classList.remove(`header-library`);
      e.currentTarget.classList.add(`header-${path}`);
    } else if (path === 'library') {
      e.currentTarget.classList.remove(`header-home`);
      e.currentTarget.classList.add(`header-${path}`);
    }
  }
});
