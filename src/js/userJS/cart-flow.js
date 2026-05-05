import { el, state } from "./core.js";
import { capNhatSoLuongGioHang } from "./product-flow.js";

export const luuLocalStorage = () => {
  localStorage.setItem("GIO_HANG_USER", JSON.stringify(state.gioHang));
};

window.tangSoLuong = (phoneId) => {
  const item = state.gioHang.find(p => p.id == phoneId);
  if (item) {
    item.soLuong += 1;
    luuLocalStorage();
    capNhatSoLuongGioHang();
    renderGioHang();
  }
};

window.giamSoLuong = (phoneId) => {
  const item = state.gioHang.find(p => p.id == phoneId);
  if (item && item.soLuong > 1) {
    item.soLuong -= 1;
    luuLocalStorage();
    capNhatSoLuongGioHang();
    renderGioHang();
  }
};

window.xoaSanPham = (phoneId) => {
  state.gioHang = state.gioHang.filter(p => p.id != phoneId);
  luuLocalStorage();
  capNhatSoLuongGioHang();
  renderGioHang();
};

export const renderGioHang = () => {
  if (state.gioHang.length === 0) {
    el.noiDungGioHang.innerHTML = `<p class="py-20 text-center text-gray-400 font-bold">Giỏ hàng trống</p>`;
  } else {
    const listHtml = state.gioHang.map(item => `
      <div class="flex items-center gap-4 p-4 border-b border-gray-50">
        <img src="${item.img}" class="w-16 h-16 object-contain">
        <div class="flex-1">
          <h4 class="font-bold text-sm">${item.name}</h4>
          <p class="text-blue-600 font-bold text-xs">${item.price.toLocaleString()} đ</p>
        </div>
        <div class="flex items-center bg-gray-100 rounded-xl p-1">
          <button onclick="giamSoLuong('${item.id}')" class="w-7 h-7 bg-white rounded-lg shadow-sm ${item.soLuong === 1 ? 'opacity-30' : ''}">-</button>
          <span class="w-8 text-center text-xs font-black">${item.soLuong}</span>
          <button onclick="tangSoLuong('${item.id}')" class="w-7 h-7 bg-blue-600 text-white rounded-lg shadow-sm">+</button>
        </div>
        <button onclick="xoaSanPham('${item.id}')" class="text-gray-300 hover:text-red-500 ml-2">✕</button>
      </div>
    `).join("");

    const tongTien = state.gioHang.reduce((total, item) => total + (item.price * item.soLuong), 0);

    el.noiDungGioHang.innerHTML = listHtml + `
      <div class="p-6 bg-slate-50 mt-auto">
        <div class="mb-4">
          <p class="text-[10px] font-black text-gray-400 uppercase mb-3">Phương thức thanh toán</p>
          <div class="grid grid-cols-2 gap-2">
            <label class="cursor-pointer">
              <input type="radio" name="payment" class="hidden peer" checked>
              <div class="p-3 border-2 border-gray-200 rounded-xl text-center peer-checked:border-blue-600 peer-checked:bg-blue-50">
                <span class="text-[10px] font-bold">TIỀN MẶT (COD)</span>
              </div>
            </label>
            <label class="cursor-pointer">
              <input type="radio" name="payment" class="hidden peer">
              <div class="p-3 border-2 border-gray-200 rounded-xl text-center peer-checked:border-blue-600 peer-checked:bg-blue-50">
                <span class="text-[10px] font-bold">CHUYỂN KHOẢN</span>
              </div>
            </label>
          </div>
        </div>
        <div class="flex justify-between items-center mb-6">
          <span class="text-gray-500 font-bold">TỔNG TIỀN:</span>
          <span class="text-xl font-black text-blue-600">${tongTien.toLocaleString()} đ</span>
        </div>
        <button onclick="alert('Đã gửi đơn hàng!')" class="w-full bg-blue-600 text-white font-black py-4 rounded-2xl shadow-lg hover:bg-blue-700 transition-all">THANH TOÁN NGAY</button>
      </div>`;
  }
  el.popupGioHang.classList.remove("hidden");
};