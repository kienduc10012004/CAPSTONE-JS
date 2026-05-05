export const API_URL = "https://69f8c3e5f7044aa0103e73e0.mockapi.io/api/v1/phone";

export const dom = {
    productForm: document.getElementById("productForm"),
    name: document.getElementById("name"),
    price: document.getElementById("price"),
    img: document.getElementById("img"),
    screen: document.getElementById("screen"),
    backCamera: document.getElementById("backCamera"),
    frontCamera: document.getElementById("frontCamera"),
    desc: document.getElementById("desc"),
    type: document.getElementById("type"),
    btnSave: document.getElementById("btnSave"),
    btnUpdate: document.getElementById("btnUpdate"),
    btnReset: document.getElementById("btnReset"),
    inputKeyword: document.getElementById("keyword"),
    btnSearch: document.getElementById("btnSearch"),
    productTableBody: document.getElementById("productTableBody"),
    paginationContainer: document.getElementById("pagination"),
};

export const state = {
    danhSachSP: [],
    editingProduct: null,
    currentPage: 1,
    itemsPerPage: 10
};