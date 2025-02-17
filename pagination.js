
// calculate total count string
export function calcTotalCountLabel(page) {
    var totalCount = page.totalItems;
    var totalCountLabel = "";
    if (totalCount > 0) {
        totalCountLabel = "Showing " + (page.currentPage * page.itemsPerPage - page.itemsPerPage + 1)
        + " to " + (Math.min(page.currentPage * page.itemsPerPage, page.totalItems)) + " of " +totalCount;
    }
    return totalCountLabel;
}


export class Page {
    itemsPerPage = 10;
    currentPage = 1;
    totalItems = 0;
    search = "";

    constructor(itemsPerPage, currentPage, totalItems, search=""){
        this.currentPage = currentPage;
        this.itemsPerPage = itemsPerPage;
        this.totalItems = totalItems;
        this.search = search
    }

    set _ItemsPerPage(itemsPerPage){
        this.itemsPerPage = itemsPerPage;
    }

    set _CurrentPage(currentPage){
        this.currentPage = currentPage;
    }

    set _TotalItems(totalItems){
        this.totalItems = totalItems;
    }

    set _Search(search){
        this.search = search;
    }

    get itemsPerPage(){
        return this.itemsPerPage;
    }

    get currentPage(){
        return this.currentPage;
    }

    get totalItems(){
        return this.totalItems;
    }

    get search(){
        return this.search;
    }

    get TotalPages(){
        return Math.ceil(this.totalItems / this.itemsPerPage);
    }
}