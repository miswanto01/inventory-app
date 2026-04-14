function renderPaginationProduk(total) {
    const totalPage = Math.ceil(total / STATE.produk.limit);

    let html = "";

    if (STATE.produk.page > 1) {
        html += `<button onclick="changePageProduk(${STATE.produk.page - 1})">⬅ Prev</button>`;
    }

    html += ` Halaman ${STATE.produk.page} / ${totalPage} `;

    if (STATE.produk.page < totalPage) {
        html += `<button onclick="changePageProduk(${STATE.produk.page + 1})">Next ➡</button>`;
    }

    document.getElementById("paginationProduk").innerHTML = html;
}

function changePageProduk(page) {
    STATE.produk.page = page;
    updateURL();
    loadProduk();
}