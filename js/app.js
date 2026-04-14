initFromURL();
loadProduk();
setTimeout(loadTransaksi, 1000);

document.getElementById("search").addEventListener("keyup", function () {
    STATE.produk.search = this.value;
    STATE.produk.page = 1;

    updateURL();

    clearTimeout(window.searchTimer);
    window.searchTimer = setTimeout(loadProduk, 300);
});