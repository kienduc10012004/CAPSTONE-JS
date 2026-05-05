import { el } from "./userJS/core.js";
import { bindFilterEvent } from "./userJS/filter-flow.js";
import { bindPopupEvents } from "./userJS/popup-flow.js";
import { layDanhSachSP } from "./userJS/product-flow.js";
import { renderGioHang } from "./userJS/cart-flow.js";

// Gắn sự kiện lọc và popup
bindFilterEvent();
bindPopupEvents();

// Mở giỏ hàng
el.btnGioHang.addEventListener("click", renderGioHang);

// Khởi tạo ứng dụng
layDanhSachSP();