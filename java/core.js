// core flow: endpoint API, el DOM
// state (data)
// trang thái hiện tại của ứng dụng, có thể thay đổi theo thời gian
// khi người dùng tương tác với ứng dụng
// VD: giỏ hàng(tăng, giảm, xóa sản phẩm), sản phẩm (thêm, xóa, xửa)...
// danhSachSP, gioHang, timeId,.....
// state: boolean, string, number, array, object,....

// dùng ES6: import, export
// default các biến, hàm, class => private, tức là trong nội bộ trong file.js dùng được, không thể truy cập từ file khác => export để biến , hàm , class có thể truy cập được

// // define endpoin API
export const API = "https://69d4a2b3d396bd74235d4f22.mockapi.io/api";

// document là thẻ con của window

export const el = {
  danhSachSP: document.getElementById("danhSachSP"),
  loading: document.getElementById("loading"),
  searchSP: document.getElementById("searchInput"),
  filterSP: document.getElementById("filterSelect"),
  // popup chi tiết sản phẩm
  popup: document.getElementById("popupChiTiet"),
  btnClosePopup: document.getElementById("btnClose"),
  contentPopup: document.getElementById("popupContent"),
  overlay: document.getElementById("overlay"),

  // giỏ hàng
  popupGioHang: document.getElementById("popupGioHang"),
  overlayGioHang: document.getElementById("overlayGioHang"),
  noiDungGioHang: document.getElementById("noiDungGioHang"),
  btnPopupGioHang: document.getElementById("btnPopupGioHang"),
  btnCloseGioHang: document.getElementById("btnCloseGioHang"),

  // header
  btnGioHang: document.getElementById("btnGioHang"),
  // dom tới thẻ hiển thị số lượng sản phẩm trong giỏ hàng (nếu có)
  badgeGioHang: document.getElementById("badgeGioHang"),
};

export const state = {
  danhSachSP: [],
  gioHang: [],
  timerId: null,
  // Thêm 2 dòng này
  currentPage: 1,
  itemsPerPage: 10,
};
