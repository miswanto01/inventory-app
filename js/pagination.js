function renderPaginationProduk(totalData) {

    const totalPage = Math.ceil(totalData / STATE.produk.limit);

    let html = "";

    // Prev
    if (STATE.produk.page > 1) {
        html += `<button onclick="changePageProduk(${STATE.produk.page - 1})">⬅ Prev</button>`;
    }

    // Info halaman
    html += ` <b>Halaman ${STATE.produk.page} / ${totalPage}</b> `;

    // Next
    if (STATE.produk.page < totalPage) {
        html += `<button onclick="changePageProduk(${STATE.produk.page + 1})">Next ➡</button>`;
    }

    document.getElementById("paginationProduk").innerHTML = html;
}

function changePageProduk(page) {

    STATE.produk.page = page;

    updateURL();
    loadData();
}

function reloadProduk(page = 1) {

    currentPageProduk = page;

    const script = document.createElement("script");

    script.src =
        CONFIG.API_URL +
        "?type=produk" +
        "&callback=renderData" +
        "&page=" + currentPageProduk +
        "&limit=" + rowsPerPage +
        "&search=" + keyword +
        "&_=" + Date.now();

    document.body.appendChild(script);
}

function renderPaginationTransaksi(totalData) {

    const totalPage = Math.ceil(totalData / rowsPerPage);

    let html = "";

    if (STATE.transaksi.page > 1) {
        html += `<button onclick="changePageTransaksi(${STATE.transaksi.page - 1})">⬅ Prev</button>`;
    }

    html += ` Halaman ${STATE.transaksi.page} / ${totalPage} `;

    if (STATE.transaksi.page < totalPage) {
        html += `<button onclick="changePageTransaksi(${STATE.transaksi.page + 1})">Next ➡</button>`;
    }

    document.getElementById("paginationTransaksi").innerHTML = html;
}

function changePageTransaksi(page) {
    STATE.transaksi.page = page;
    loadTransaksi();
}


function changeRows(val) {
    rowsPerPage = Number(val);

    STATE.produk.page = 1;
    STATE.transaksi.page = 1;

    loadData();
    loadTransaksi();
}
