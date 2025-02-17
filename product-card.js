export function createProductCard(product) {
    return `
            <div class="product-card">
                <img class="product-image" src="${product.images[0]}" alt="${product.name}">
                <div class="product-info">
                    <h2 class="product-name">${product.title}</h2>
                    <p class="product-description">${product.description}</p>
                    <div class="product-price">$${product.price}</div>
                </div>
            </div>
        `;
}

/**
   * 
   * @param {Page} page 
   * @param {HTMLDivElement} paginationToolElement
   */
export function constructPaginationToolbar(page, paginationToolElement) {

    if(!paginationToolElement) {
        paginationToolElement = document.querySelector("div.pagination-tool")
    }
    let numberOfPages = Math.floor(page.totalItems/page.itemsPerPage);

    let pageReminder = page.totalItems%page.itemsPerPage;
    let toolbar = "";

    numberOfPages = pageReminder > 0 ? numberOfPages+1 : numberOfPages;
    let activePage = Number(page.currentPage);
    if(numberOfPages  < 5)
    {
      toolbar = "";
      for (let index = 1; index <= numberOfPages; index++)
      {
            toolbar = toolbar + `<a class="pageNum" data-index=${index}>${index}</a>`;

      }
    }
    else {
      toolbar = "";
      // get current active page
      // if active page is first two numbers 1,2,3...lastNumber
      // if active page is last two numbers 1.....lastNumber-2, lastNumber-1, lastNumber
      // any other number 1... active-1, active, active + 1....lastNumber.
      // need to wrap these numbers inside a prev and next page.
      // if active number is one disable previous, if active number is last disable next.
      
      if([1,2].indexOf(activePage) > -1){
        toolbar += `<a class="pageNum" data-index=${1}>${1}</a>`;
        toolbar += `<a class="pageNum" data-index=${2}>${2}</a>`;
        toolbar += `<a class="pageNum" data-index=${3}>${3}</a>`;
        toolbar += `<a class="pageNum" data-index='...'>...</a>`;
        toolbar += `<a class="pageNum" data-index=${numberOfPages}>${numberOfPages}</a>`;

      } else if([numberOfPages-1, numberOfPages].indexOf(activePage) > -1) {

        toolbar += `<a class="pageNum" data-index=${1}>${1}</a>`;
        toolbar += `<a class="pageNum" data-index='...'>...</a>`;
        toolbar += `<a class="pageNum" data-index=${numberOfPages-2}>${numberOfPages-2}</a>`;
        toolbar += `<a class="pageNum" data-index=${numberOfPages-1}>${numberOfPages-1}</a>`;
        toolbar += `<a class="pageNum" data-index=${numberOfPages}>${numberOfPages}</a>`;

      } else {

        toolbar += `<a class="pageNum" data-index=${1}>${1}</a>`;
        toolbar += `<a class="pageNum" data-index='...'>...</a>`;
        toolbar += `<a class="pageNum" data-index=${activePage-1}>${activePage-1}</a>`;
        toolbar += `<a class="pageNum" data-index=${activePage}>${activePage}</a>`;
        toolbar += `<a class="pageNum" data-index=${activePage+1}>${activePage+1}</a>`;
        toolbar += `<a class="pageNum" data-index='...'>...</a>`;
        toolbar += `<a class="pageNum" data-index=${numberOfPages}>${numberOfPages}</a>`;

      }

      let previous = `<a class="pageNum" data-index="previous" title="Previous"><</a>`;
      let next = `<a class="pageNum" data-index="next" title="Next">></a>`;
      toolbar = previous + toolbar + next;

    }

    paginationToolElement.innerHTML = toolbar;
    document.querySelector(`[data-index="${activePage}"]`)?.classList.add("active");
    if(activePage == 1) {
        document.querySelector('[data-index="previous"]')?.classList.add("disabled");
    }

    if(activePage == numberOfPages){
        document.querySelector('[data-index="next"]')?.classList.add("disabled");
    }

}