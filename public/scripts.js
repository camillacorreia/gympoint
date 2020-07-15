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