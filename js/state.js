const STATE = {
    produk: {
        page: 1,
        search: "",
        limit: 10
    },
    transaksi: {
        page: 1,
        limit: 10
    }
};

const CACHE = {};
let DATA = [];
let CART = [];
let currentScript = null;
let timeout = null;
let requestId = 0;
let sellKode = "";
let sellHarga = 0;
let currentPageProduk = 1;
let currentPageTransaksi = 1;
let rowsPerPage = 10;
let keyword = "";
let totalData = 0;
let currentScript = null;
let timeout = null;
let requestId = 0;
