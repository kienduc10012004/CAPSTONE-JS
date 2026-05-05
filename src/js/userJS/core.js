export const API = "https://69f8c3e5f7044aa0103e73e0.mockapi.io/api/v1/phone";

export const el = {
  danhSachSP: document.getElementById("danhSachSP"),
  loading: document.getElementById("loading"),
  searchSP: document.getElementById("searchInput"),
  filterSP: document.getElementById("filterSelect"),
  sortSP: document.getElementById("sortSelect"),
  
  popup: document.getElementById("popupChiTiet"),
  btnClosePopup: document.getElementById("btnClose"),
  contentPopup: document.getElementById("popupContent"),
  overlay: document.getElementById("overlay"),

  popupGioHang: document.getElementById("popupGioHang"),
  overlayGioHang: document.getElementById("overlayGioHang"),
  noiDungGioHang: document.getElementById("noiDungGioHang"),
  btnCloseGioHang: document.getElementById("btnCloseGioHang"),

  btnGioHang: document.getElementById("btnGioHang"),
  badgeGioHang: document.getElementById("badgeGioHang"),
};

export const state = {
  danhSachSP: [],
  gioHang: JSON.parse(localStorage.getItem("GIO_HANG_USER")) || [],
  timerId: null,
  currentPage: 1,
  itemsPerPage: 8,
};