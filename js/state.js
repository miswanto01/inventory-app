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