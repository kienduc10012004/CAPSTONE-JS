import { renderGioHang } from "./java/cart-flow.js";
import { el } from "./java/core.js";
import { bindFilterEvent } from "./java/filter-flow.js";
import { bindPopupEvents } from "./java/popup-flow.js";
import { layDanhSachSP } from "./java/product-flow.js";
//
// Phần 1: add tất cả những event cho thẻ input, select, button,...
bindFilterEvent();
bindPopupEvents();
// add event hiển thị giỏ hàng khi click vào nút giỏ hàng
el.btnGioHang.addEventListener("click", renderGioHang);

// Phần 2: gọi hàm hiển thị danh sách sản phẩm khi load trang
layDanhSachSP();
