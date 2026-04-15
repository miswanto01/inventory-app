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

function loadData() {

    const cacheKey = `${currentPageProduk}_${rowsPerPage}_${keyword}`;

    // 🔥 CACHE HIT
    if (PAGE_CACHE[cacheKey]) {

        const cached = PAGE_CACHE[cacheKey];

        DATA = cached.data;

        renderTable();
        renderPaginationProduk(cached.total);

        return;
    }

    if (currentScript) {
        currentScript.remove();
    }

    const script = document.createElement("script");
    currentScript = script;

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

function renderData(res) {

    console.log("📡 RENDER DATA:", res);

    if (!res || !res.data) {
        console.error("DATA KOSONG / INVALID", res);
        return;
    }

    const cacheKey = `${res.page}_${res.limit}_${keyword}`;

    PAGE_CACHE[cacheKey] = res;

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
