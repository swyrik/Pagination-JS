import { constructPaginationToolbar, createProductCard } from "./product-card.js";
import { calcTotalCountLabel } from "./pagination.js";
export var fetchProducts = (urlParams, itemsHtml, productItemsContainer, page, itemsCountLabel, paginationToolElement) => {

    let url = "https://dummyjson.com/products";
    if(page.search.trim().length > 0) {
        url += "/search"
    }
    url +="?";
    productItemsContainer.innerHTML = "Loading products";
    fetch(url + urlParams)
        .then((res) => res.json())
        .then((res) => {
            res.products.forEach((product) => {
                itemsHtml += createProductCard(product);
            });
            page.totalItems = res.total; 
            itemsCountLabel.innerHTML = calcTotalCountLabel(page);
            constructPaginationToolbar(page, paginationToolElement);

            // error case scenario
            //   itemsHtml = "";
            //   throw new Error("no products found");
        })
        .catch((error) => {
            itemsHtml += "<h2>" + error.message + " </h2>";
        })
        .finally(() => {
            if (itemsHtml.trim().length == 0) {
                productItemsContainer.innerHTML = "<h4 class='noproducts'> No products found for your search " + page.search+ " </h4>";
                return;
            }
            productItemsContainer.innerHTML = itemsHtml;
        });
};