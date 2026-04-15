function getURLState() {
    const params = new URLSearchParams(location.search);

    return {
        page: Number(params.get("page") || 1),
        search: params.get("search") || ""
    };
}

function updateURL() {
    const url = new URL(window.location);

    url.searchParams.set("page", STATE.produk.page);
    url.searchParams.set("search", STATE.produk.search);

    history.pushState({}, "", url);
}

function initFromURL() {
    const url = getURLState();

    STATE.produk.page = url.page;
    STATE.produk.search = url.search;

    document.getElementById("search").value = url.search;

    loadData();
}

initFromURL();