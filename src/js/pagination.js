import ApiService from './api';
import cardMarkupTpl from '../templates/movie-list.hbs';
const ulTag = document.querySelector('.pagination__list');
const btnPrev = document.querySelector('.btn-prev');
const btnNext = document.querySelector('.btn-next');
const galleryWrapper = document.querySelector('.gallery__list');
const apiServiceP = new ApiService();

function makeMarkupP(movie) {
  galleryWrapper.insertAdjacentHTML('beforeend', cardMarkupTpl(movie));
}

async function markupMoviesP() {
  const newMovieData = await apiServiceP.fetchItems().then(data => data.results);
  makeMarkupP(newMovieData);
}

apiServiceP.fetchItems().then(data => {
  let totalPages = data.total_pages;
  let page = data.page;
  window.totalPages = totalPages;

  ulTag.addEventListener('click', onPages);

  function onPages(e) {
    let pageN = +e.target.dataset.number;

    if (e.target.classList.contains('btn-next')) {
      apiServiceP.nextPage();
      apiServiceP.page = pageN;
      galleryWrapper.innerHTML = '';
      markupMoviesP();
    } else if (e.target.classList.contains('btn-prev')) {
      apiServiceP.previousPage();
      galleryWrapper.innerHTML = '';
      markupMoviesP();
    } else if (e.target.classList.contains('number')) {
      apiServiceP.page = pageN;
      galleryWrapper.innerHTML = '';
      markupMoviesP();
    }
  }

  if (window.matchMedia('(max-width: 367px)').matches) {
    paginationMobile(totalPages, page);
  } else {
    paginationTabDesk(totalPages, page);
  }

  function onPagination() {
    if (window.matchMedia('(max-width: 367px)').matches) {
      paginationMobile(totalPages, page);
    } else {
      paginationTabDesk(totalPages, page);
    }
  }

  window.addEventListener('resize', onPagination);
});

function paginationMobile(totalPages, page) {
  let liTag = '';
  let activeLi;
  let beforePages = page - 2;
  let afterPages = page + 2;

  if (page < 1) {
    liTag += `<li class="number" data-number="1" onclick="paginationMobile(totalPages, 1)">1</li>`;
  }

  if (page > 1) {
    //show the next button if the page value is greater than 1
    liTag += `<li class="btn-arrow btn-prev" data-number="${
      page - 1
    }" onclick="paginationMobile(totalPages, ${page - 1})">&#10094;</li>`;
  }

  // how many li show before the current li
  if (page === totalPages) {
    beforePages = beforePages - 2;
  } else if (page === totalPages - 1) {
    beforePages = beforePages - 1;
  } else if (page === totalPages - 2) {
    beforePages = beforePages;
  }

  if (totalPages === 3) {
    beforePages = beforePages + 1;
  } else if (totalPages === 2) {
    beforePages = beforePages + 2;
  } else if (totalPages === 1) {
    beforePages = beforePages + 3;
  }

  // how many li show after the current li
  if (page === 1) {
    afterPages = afterPages + 2;
    beforePages = beforePages + 1;
  } else if (page === 2) {
    afterPages = afterPages + 1;
  } else if (page === 3) {
    afterPages = afterPages;
  }

  for (let pageLength = beforePages; pageLength <= afterPages; pageLength += 1) {
    //if plength is greater than totalPage length then continue
    if (pageLength > totalPages) {
      continue;
    }

    //if plength is 0 than add +1 in plength value
    if (pageLength == 0) {
      pageLength = pageLength + 1;
    }

    //if page is equal to plength than assign active string in the active variable
    if (page == pageLength) {
      activeLi = 'active';
    } else {
      //else leave empty to the active variable
      activeLi = '';
    }

    liTag += `<li class="number ${activeLi}" data-number="${pageLength}" onclick="paginationMobile(totalPages, ${pageLength})">${pageLength}</li>`;
  }

  //show the next button if the page value is less than totalPage(20)
  if (page < totalPages) {
    liTag += `<li class="btn-arrow btn-next" data-number="${
      page + 1
    }" onclick="paginationMobile(totalPages, ${page + 1})">&#10095;</li>`;
  }

  ulTag.innerHTML = liTag;
}

function paginationTabDesk(totalPages, page) {
  let liTag = '';
  let activeLi;
  let beforePages = page - 2;
  let afterPages = page + 2;

  //show the next button if the page value is greater than 1
  if (page > 1) {
    liTag += `<li class="btn-arrow btn-prev" data-number="${
      page - 1
    }" onclick="paginationTabDesk(totalPages, ${page - 1})">	
    	&#10094;</li>`;
  }

  //if page value is less than 2 then add 1 after the previous button
  if (page > 3 && totalPages > 7) {
    liTag += `<li class="number" data-number="1" onclick="paginationTabDesk(totalPages, 1)">1</li>`;
  }

  //if page value is greater than 4 then add this (...) after the first li or page
  if (page > 4 && totalPages > 8) {
    liTag += `<li class="dots">...</li>`;
  }

  // how many li show before the current li
  if (page === totalPages) {
    beforePages = beforePages - 4;
  } else if (page === totalPages - 1) {
    beforePages = beforePages - 3;
  } else if (page === totalPages - 2) {
    beforePages = beforePages - 2;
  } else if (page === totalPages - 3) {
    beforePages = beforePages - 1;
  }

  if (totalPages === 7) {
    beforePages = beforePages;
  } else if (totalPages === 6) {
    beforePages = beforePages;
  } else if (totalPages === 5) {
    beforePages = beforePages + 1;
  } else if (totalPages === 4) {
    beforePages = beforePages + 2;
  } else if (totalPages === 3) {
    beforePages = beforePages + 3;
  } else if (totalPages === 2) {
    beforePages = beforePages + 4;
  } else if (totalPages === 1) {
    beforePages = beforePages + 5;
  }

  // how many li show after the current li
  if (page === 1) {
    afterPages = afterPages + 4;
    beforePages = beforePages + 1;
  } else if (page === 2) {
    afterPages = afterPages + 3;
  } else if (page === 3) {
    afterPages = afterPages + 2;
  } else if (page === 4) {
    afterPages = afterPages + 1;
  }

  for (let pageLength = beforePages; pageLength <= afterPages; pageLength++) {
    //if plength is greater than totalPage length then continue
    if (pageLength > totalPages) {
      continue;
    }

    //if plength is 0 than add +1 in plength value
    if (pageLength == 0) {
      pageLength = pageLength + 1;
    }

    //if page is equal to plength than assign active string in the active variable
    if (page == pageLength) {
      activeLi = 'active';
    } else {
      //else leave empty to the active variable
      activeLi = '';
    }

    liTag += `<li class="number ${activeLi}" data-number="${pageLength}" onclick="paginationTabDesk(totalPages, ${pageLength})">${pageLength}</li>`;
  }

  if (page < totalPages - 2 && totalPages > 7) {
    //if page value is less than totalPage value by -1 then show the last li or page
    if (page < totalPages - 3 && totalPages > 8) {
      //if page value is less than totalPage value by -2 then add this (...) before the last li or page
      liTag += `<li class="dots">...</li>`;
    }
    liTag += `<li class="number" data-number="${totalPages}" onclick="paginationTabDesk(totalPages, ${totalPages})">${totalPages}</li>`;
  }

  //show the next button if the page value is less than totalPage(20)
  if (page < totalPages) {
    liTag += `<li class="btn-arrow btn-next" data-number="${
      page + 1
    }" onclick="paginationTabDesk(totalPages, ${page + 1})">	
    &#10095;</li>`;
  }

  ulTag.innerHTML = liTag;
}

window.paginationMobile = paginationMobile;
window.paginationTabDesk = paginationTabDesk;

/* if (window.matchMedia('(max-width: 367px)').matches) {
  paginationMobile(totalPages, 3);
} else {
  paginationTabDesk(totalPages, 3);
}

function onPagination() {
  if (window.matchMedia('(max-width: 367px)').matches) {
    paginationMobile(totalPages, 3);
  } else {
    paginationTabDesk(totalPages, 3);
  }
}

window.addEventListener('resize', onPagination); */
