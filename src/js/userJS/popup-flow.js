import { el } from "./core.js";

//
const closePopupGioHang = () => {
  el.popupGioHang.classList.add("hidden");
};

const closePopupChiTiet = () => {
  el.popup.classList.add("hidden");
};

// hàm combine các event close popup
export const bindPopupEvents = () => {
  el.overlay.addEventListener("click", closePopupChiTiet);
  el.overlayGioHang.addEventListener("click", closePopupGioHang);
  el.btnClosePopup.addEventListener("click", closePopupChiTiet);
  el.btnCloseGioHang.addEventListener("click", closePopupGioHang);
};
// chuyển thành window cho el.overlay.addEventListener("click", closePopupChiTiet)
// window là object giúp cho function từ private -> toàn cục, có thể dùng được
// trong HTML
// thẻ overlay thì không dùng window
// element là nằm trong DOM
