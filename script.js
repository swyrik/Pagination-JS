import { createProductCard } from "./product-card.js";
import { calcTotalCountLabel, Page } from "./pagination.js";
import { fetchProducts } from "./product-api.js";

var page;
var itemsCountLabel;
var itemsPerPageSelect;
var productItemsContainer;
var paginationToolElement;
var searchElement;
document.addEventListener("DOMContentLoaded", () => {
    console.log("Pagination start");
  
    productItemsContainer = document.querySelector("div.items");
    itemsCountLabel = document.querySelector(".items-count");
    itemsPerPageSelect = document.querySelector("select[name='itemsPerPage']");
    paginationToolElement = document.querySelector("div.pagination-tool");
    searchElement = document.querySelector("input#search-product");

    itemsPerPageSelect.addEventListener("change", handleItemsPerPageSelect);
    paginationToolElement.addEventListener("click", handlePaginationClick);
    searchElement.addEventListener("keyup", handleSearch);
    page  = new Page(10,1,0);
    let urlParamsString = prepareUrlParams(page);
    fetchProducts(urlParamsString, "", productItemsContainer, page, itemsCountLabel, paginationToolElement);

  });


  /**
   * 
   * @param {Page} page 
   * @returns 
   */
  function prepareUrlParams(page) {
    let urlParams = "";
    if (page.currentPage) {
      urlParams += `skip=${page.itemsPerPage * (page.currentPage - 1)}&`;
    }

    if(page.itemsPerPage)
    {
      urlParams += `limit=${page.itemsPerPage}&`;
    }

    if(page.search)
    {
      urlParams += `q=${page.search}`;
    }

    // console.log(urlParams);

    return urlParams;
  }
  

  function handleItemsPerPageSelect(e) {
    page._ItemsPerPage = e.target.value;
    // make the fetch call again
    fetchProducts(prepareUrlParams(page), "", productItemsContainer, page, itemsCountLabel);
  }

  function handleSearch(e){

    if (e.key === 'Enter' || e.keyCode === 13) {
      page._Search = e.target.value;
      // make the fetch call again
      fetchProducts(prepareUrlParams(page), "", productItemsContainer, page, itemsCountLabel);
    }
  }

  function handlePaginationClick(e){
    let pageNum = e.target.dataset['index'];
    if(pageNum == "...") return;
    if(pageNum == "previous") {
      if(page.currentPage == 1) return;
      page._CurrentPage = page.currentPage - 1;
    } 
    else if( pageNum == "next"){
      if(page.currentPage == page.TotalPages) return;
      page._CurrentPage = page.currentPage + 1;
    }
    else if(page._CurrentPage != pageNum)
    {
      page._CurrentPage = pageNum;
      
    }
    fetchProducts(prepareUrlParams(page), "", productItemsContainer, page, itemsCountLabel);
  }

  