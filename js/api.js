function loadProduk() {
    const { page, search, limit } = STATE.produk;

    const cacheKey = `${page}_${limit}_${search}`;

    if (CACHE[cacheKey]) {
        DATA = CACHE[cacheKey].data;
        renderTable();
        renderPaginationProduk(CACHE[cacheKey].total);
        return;
    }

    if (currentScript) currentScript.remove();

    const script = document.createElement("script");
    currentScript = script;

    script.src =
        CONFIG.API_URL +
        "?type=produk" +
        "&callback=renderProduk" +
        "&page=" + page +
        "&limit=" + limit +
        "&search=" + search +
        "&_=" + Date.now();

    document.body.appendChild(script);
}

function loadTransaksi() {
    if (currentScript) currentScript.remove();

    const script = document.createElement("script");
    script.dataset.trx = "true";

    script.src =
        CONFIG.API_URL +
        "?type=transaksi" +
        "&callback=renderTransaksi" +
        "&page=" + STATE.transaksi.page +
        "&limit=" + STATE.transaksi.limit +
        "&_=" + Date.now();

    document.body.appendChild(script);
}