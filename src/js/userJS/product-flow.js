import { API, el, state } from "./core.js";
import { luuLocalStorage } from "./cart-flow.js";
import { getFilteredAndSortedList } from "./filter-flow.js";

export const capNhatSoLuongGioHang = () => {
  const total = state.gioHang.reduce((sum, item) => sum + item.soLuong, 0);
  el.badgeGioHang.textContent = total;
};

window.themVaoGioHang = (id) => {
  const sp = state.danhSachSP.find(p => p.id == id);
  if (!sp) return;

  const inCart = state.gioHang.find(item => item.id == id);
  if (inCart) {
    inCart.soLuong += 1;
  } else {
    state.gioHang.push({ ...sp, soLuong: 1 });
  }

  luuLocalStorage();
  capNhatSoLuongGioHang();
  alert(`Đã thêm ${sp.name} vào giỏ!`);
};

window.showChiTietSP = (id) => {
  const sp = state.danhSachSP.find(p => p.id == id);
  if (!sp) return;

  el.contentPopup.innerHTML = `
    <div class="flex flex-col md:flex-row gap-10 items-start">
      <div class="w-full md:w-1/2 bg-slate-50 rounded-3xl p-10 flex justify-center">
        <img src="${sp.img}" class="h-80 object-contain drop-shadow-2xl">
      </div>
      <div class="w-full md:w-1/2">
        <span class="text-blue-600 font-bold text-xs uppercase tracking-widest">${sp.type}</span>
        <h2 class="text-3xl font-black text-slate-800 mt-2 mb-4 leading-tight">${sp.name}</h2>
        <p class="text-red-500 font-black text-3xl mb-8">${Number(sp.price).toLocaleString()} đ</p>
        <div class="space-y-4 mb-10 border-l-4 border-blue-100 pl-6">
          <p class="text-sm text-slate-500"><b>Màn hình:</b> ${sp.screen}</p>
          <p class="text-sm text-slate-500"><b>Camera:</b> Trước ${sp.frontCamera} / Sau ${sp.backCamera}</p>
          <p class="text-slate-600 italic">"${sp.desc}"</p>
        </div>
        <button onclick="themVaoGioHang('${sp.id}')" class="w-full bg-blue-600 hover:bg-blue-700 text-white cursor-pointer font-black py-4 rounded-2xl shadow-lg transition-all active:scale-95">THÊM VÀO GIỎ HÀNG</button>
      </div>
    </div>`;
  el.popup.classList.remove("hidden");
};

window.changePage = (p) => {
    state.currentPage = p;
    const danhSachHienTai = getFilteredAndSortedList();
    renderDanhSachSP(danhSachHienTai);
};

export const renderDanhSachSP = (list) => {
  const totalPages = Math.ceil(list.length / state.itemsPerPage);
  const start = (state.currentPage - 1) * state.itemsPerPage;
  const currentItems = list.slice(start, start + state.itemsPerPage);

  el.danhSachSP.innerHTML = currentItems.map(p => `
    <div class="bg-white rounded-3xl p-5 border border-slate-100 hover:shadow-xl transition-all group relative">
      <div class="bg-slate-50 rounded-2xl p-6 mb-5 flex justify-center overflow-hidden">
        <img src="${p.img}" class="h-44 object-contain group-hover:scale-110 transition-all duration-500">
      </div>
      <h3 class="font-bold text-slate-800 mb-1 group-hover:text-blue-600 transition-colors">${p.name}</h3>
      <p class="text-red-500 font-black text-lg mb-4">${Number(p.price).toLocaleString()} đ</p>
      <div class="grid grid-cols-2 gap-2">
        <button onclick="showChiTietSP('${p.id}')" class="bg-slate-100 text-slate-600 font-bold py-2.5 rounded-xl text-xs hover:bg-slate-200 cursor-pointer">Chi tiết</button>
        <button onclick="themVaoGioHang('${p.id}')" class="bg-blue-600 text-white font-bold py-2.5 rounded-xl text-xs hover:bg-blue-700 shadow-lg shadow-blue-100 cursor-pointer">Thêm giỏ</button>
      </div>
    </div>
  `).join("");

  renderPagination(totalPages);
};

const renderPagination = (total) => {
  let box = document.getElementById("pagination");
  if(!box) {
    box = document.createElement("div"); box.id = "pagination";
    box.className = "flex justify-center gap-2 mt-12 col-span-full";
    el.danhSachSP.after(box);
  }
  let btns = "";
  for(let i=1; i<=total; i++) {
    const active = i === state.currentPage ? "bg-blue-600 text-white" : "bg-white text-slate-400 border border-slate-200 hover:bg-slate-50";
    btns += `<button onclick="changePage(${i})" class="w-10 h-10 rounded-xl font-bold transition-all ${active} cursor-pointer">${i}</button>`;
  }
  box.innerHTML = btns;
};

export const layDanhSachSP = async () => {
  el.loading.classList.remove("hidden");
  try {
    const res = await axios.get(API);
    state.danhSachSP = res.data;
    renderDanhSachSP(state.danhSachSP);
    capNhatSoLuongGioHang();
  } catch (e) {
    el.danhSachSP.innerHTML = `<p class="col-span-full py-20 text-center text-red-500 font-bold">Lỗi kết nối máy chủ!</p>`;
  } finally {
    el.loading.classList.add("hidden");
  }
};