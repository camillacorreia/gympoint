const currentPage = location.pathname;
const menuItens = document.querySelectorAll("header .header-content a");

for (item of menuItens) {
    if (currentPage.includes(item.getAttribute("href"))) {
        item.classList.add("active");
    }
}

const formDelete = document.querySelector("#form-delete");
formDelete.addEventListener("submit", function(event) {
    const confirmation = confirm("Deseja deletar?")
    if(!confirmation) {
        event.preventDefault()
    }
});

//Paginação
let totalPages = 20,
    selectedPage = 15,
    pages = [],
    oldPage

for(let currentPage = 1; currentPage <= totalPages; currentPage++) {

    const firstAndLastPage = currentPage == 1 || currentPage == totalPages;
    const pagesAfterSelectedPage = currentPage <= selectedPage + 2;
    const pagesBeforeSelectedPage = currentPage >= selectedPage - 2;

    if(firstAndLastPage || pagesAfterSelectedPage && pagesBeforeSelectedPage) {
        if (oldPage && currentPage - oldPage > 2) {
            pages.push("...");
        }

        if (oldPage && currentPage - oldPage == 2) {
            pages.push(oldPage + 1);
        }

        pages.push(currentPage);

        oldPage = currentPage;
    }
}

console.log(pages)