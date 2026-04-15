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

function renderPaginationTransaksi(totalData) {

    const totalPage = Math.ceil(totalData / rowsPerPage);

    let html = "";

    if (currentPageTransaksi > 1) {
        html += `<button onclick="changePageTransaksi(${currentPageTransaksi - 1})">⬅ Prev</button>`;
    }

    html += ` Halaman ${currentPageTransaksi} / ${totalPage} `;

    if (currentPageTransaksi < totalPage) {
        html += `<button onclick="changePageTransaksi(${currentPageTransaksi + 1})">Next ➡</button>`;
    }

    document.getElementById("paginationTransaksi").innerHTML = html;
}


function changePageProduk(page) {
    STATE.produk.page = page;
    updateURL();
    loadProduk();
}

function changePageTransaksi(page) {
    currentPageTransaksi = page;
    loadTransaksi();
}

function changeRows(val) {
    rowsPerPage = Number(val);
    currentPageProduk = 1;
    currentPageTransaksi = 1;

    loadTransaksi();
}