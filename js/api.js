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
    const old = document.querySelector("script[data-trx]");
    if (old) old.remove();

    const script = document.createElement("script");
    script.dataset.trx = "true";

    script.src =
        CONFIG.API_URL +
        "?type=transaksi" +
        "&callback=renderTransaksi" +
        "&page=" + STATE.transaksi.page +
        "&limit=" + rowsPerPage +
        "&_=" + Date.now();

    document.body.appendChild(script);
}
setTimeout(loadTransaksi, 1000);

function loadData() {

    const page = STATE.produk.page;
    const search = STATE.produk.search;
    const limit = STATE.produk.limit;

    const cacheKey = `${page}_${limit}_${search}`;

    if (PAGE_CACHE[cacheKey]) {
        const cached = PAGE_CACHE[cacheKey];

        DATA = cached.data;
        renderTable();
        renderPaginationProduk(cached.total);
        return;
    }

    if (currentScript) currentScript.remove();

    const script = document.createElement("script");
    currentScript = script;

    script.src =
        CONFIG.API_URL +
        "?type=produk" +
        "&callback=renderData" +
        "&page=" + page +
        "&limit=" + STATE.produk.limit +
        "&search=" + search +
        "&_=" + Date.now();

    document.body.appendChild(script);
}

function renderData(res) {

    if (!res || !res.data) return;

    // 🔥 sync state dari server (penting!)
    STATE.produk.page = res.page;
    STATE.produk.limit = res.limit;

    const key = `${res.page}_${res.limit}_${STATE.produk.search}`;

    PAGE_CACHE[key] = res;

    DATA = res.data;

    renderTable();
    renderPaginationProduk(res.total);
}

const script = document.createElement("script");
script.src =
    CONFIG.API_URL +
    "?type=produk" +
    "&callback=renderData" +
    "&page=1" +
    "&limit=" + rowsPerPage +
    "&search=" + keyword;
document.body.appendChild(script);


