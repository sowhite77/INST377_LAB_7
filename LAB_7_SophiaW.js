function searchBooks(bookName) {
    const url = "https://openlibrary.org/search.json?title=" + bookName.trim().replace(/ /g, "+");
    return fetch(url).then(res => res.json());
}
async function handleSearch(event) {
    event.preventDefault();

    const loading = document.getElementById("loading");
    const table = document.getElementById("bookTable");
    const input = document.getElementById("bookInput");

    loading.style.display = "block";
    table.style.display = "none";

    while (table.rows.length > 1) {
        table.deleteRow(1);
    }
    const data = await searchBooks(input.value);

    data.docs.slice(0, 10).forEach(book => {
        const row = document.createElement("tr");
        const titleCell = document.createElement("td");
        const authorCell = document.createElement("td");
        
        titleCell.textContent = book.title || "No Title";
        authorCell.textContent = book.author_name ? book.author_name.join(", ") : "No Author";
        row.appendChild(titleCell);
        row.appendChild(authorCell);
        table.appendChild(row);
    });

    table.style.display = "table";
    loading.style.display = "none";
}
window.onload = function() {
    document.getElementById("searchForm").addEventListener("submit", handleSearch);
};
