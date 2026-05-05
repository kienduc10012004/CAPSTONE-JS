import { API, el, state } from "./core.js";

//
window.showChiTietSP = (phoneId) => {
  // tìm sản phẩm trong danh sách sản phẩm dựa trên id
  const phone = state.danhSachSP.find((sp) => sp.id == phoneId);

  // nếu không tìm thấy sản phẩm thì hiển thị thông báo lỗi
  if (!phone) {
    alert("Không tìm thấy sản phẩm");
    return;
  }

  // hiển thị popup chi tiết sản phẩm
  el.contentPopup.innerHTML = `
        <div class="flex flex-col md:flex-row gap-8 items-start">
    <!-- Cột trái: Hình ảnh sản phẩm -->
    <div class="w-full md:w-1/2 bg-gray-50 rounded-2xl p-8 sticky top-0">
      <div class="relative group">
        <img
          src="${phone.img}"
          alt="${phone.name}"
          class="w-full h-80 object-contain drop-shadow-2xl transition-transform duration-500 group-hover:scale-105"
        >
        <span class="absolute top-0 left-0 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-lg uppercase tracking-wider">
          ${phone.type}
        </span>
      </div>
    </div>

    <!-- Cột phải: Thông tin & Thông số -->
    <div class="w-full md:w-1/2">
      <h2 class="text-3xl font-black text-gray-900 mb-2 leading-tight">${phone.name}</h2>
      
      <div class="flex items-baseline gap-2 mb-6">
        <span class="text-3xl font-black text-red-500">${phone.price.toLocaleString()}</span>
        <span class="text-lg font-bold text-red-500 underline">đ</span>
      </div>

      <div class="space-y-6">
        <!-- Bảng thông số -->
        <div class="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
          <div class="bg-gray-50 px-4 py-2 border-b border-gray-100">
            <h4 class="text-sm font-bold text-gray-700 uppercase tracking-widest">Thông số kỹ thuật</h4>
          </div>
          <table class="w-full text-sm">
            <tbody class="divide-y divide-gray-50">
              <tr class="hover:bg-blue-50/30 transition-colors">
                <td class="py-3 px-4 text-gray-500 font-medium">Màn hình</td>
                <td class="py-3 px-4 text-gray-800 font-semibold text-right">${phone.screen}</td>
              </tr>
              <tr class="hover:bg-blue-50/30 transition-colors">
                <td class="py-3 px-4 text-gray-500 font-medium">Camera trước</td>
                <td class="py-3 px-4 text-gray-800 font-semibold text-right">${phone.frontCamera}</td>
              </tr>
              <tr class="hover:bg-blue-50/30 transition-colors">
                <td class="py-3 px-4 text-gray-500 font-medium">Camera sau</td>
                <td class="py-3 px-4 text-gray-800 font-semibold text-right">${phone.backCamera}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Mô tả -->
        <div>
          <h4 class="text-sm font-bold text-gray-700 uppercase tracking-widest mb-2">Mô tả sản phẩm</h4>
          <p class="text-gray-600 leading-relaxed italic border-l-4 border-blue-200 pl-4">
            "${phone.desc}"
          </p>
        </div>

        <!-- Nút hành động -->
        <button
          onclick="themVaoGioHang('${phone.id}')"
          class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-200 transition-all active:scale-95 flex items-center justify-center gap-3"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          Thêm vào giỏ hàng
        </button>
      </div>
    </div>
  </div>
    `;
  el.popup.classList.remove("hidden");
};

export const capNhatSoLuongGioHang = () => {
  // tính tổng số lượng sản phẩm trong giỏ hàng
  // duyệt từng item trong giỏ hàng -> lấy số lượng -> cộng dồn lại -> reduce
  const tongSoLuong = state.gioHang.reduce(
    (tong, item) => tong + item.soLuong,
    0,
  );

  // cập nhật số lượng sản phẩm trong giỏ hàng hiển thị ở badge
  el.badgeGioHang.textContent = tongSoLuong;
};

window.themVaoGioHang = (phoneId) => {
  // B1: tìm sản phẩm trong danh sách sản phẩm dựa trên phoneId
  const phone = state.danhSachSP.find((phone) => phone.id == phoneId);

  // B2.1: nếu không tìm thấy sản phẩm thì hiển thị thông báo lỗi
  if (!phone) {
    alert("Không tìm thấy sản phẩm");
    return;
  }

  // B2.2: nếu tìm thấy sản phẩm thì thêm vào giỏ hàng
  // kiểm tra phone này đã có trong giỏ hàng chưa dựa trên id
  const phoneTrongGioHang = state.gioHang.find((item) => item.id == phoneId);

  // B2.2.1: kiểm tra sản phẩm này có trong giỏ hàng chưa. Nếu chưa có thì thêm mới với số lượng là 1
  if (!phoneTrongGioHang) {
    state.gioHang.push({
      ...phone,
      soLuong: 1,
    });
  } else {
    // B2.2.2: nếu đã có trong giỏ hàng thì tăng số lượng lên 1
    phoneTrongGioHang.soLuong += 1;
  }

  // B3: cập nhật lại số lượng sản phẩm trong giỏ hàng hiển thị ở badge trên nút giỏ hàng
  // => nên viết hàm xử lý riêng để cập nhật số lượng sản phẩm trong giỏ hàng hiển thị ở badge
  capNhatSoLuongGioHang();
};

// Hàm chuyển trang (Gắn vào window để HTML gọi được)
window.changePage = (page) => {
  state.currentPage = page;
  renderDanhSachSP(state.danhSachSP);
  window.scrollTo({ top: 0, behavior: "smooth" });
};

export const renderDanhSachSP = (danhSach) => {
  el.danhSachSP.innerHTML = "";

  if (danhSach.length === 0) {
    el.danhSachSP.innerHTML = `<p class="text-gray-500 text-center col-span-full">Không tìm thấy sản phẩm</p>`;
    return;
  }

  // --- LOGIC PHÂN TRANG ---
  const totalPages = Math.ceil(danhSach.length / state.itemsPerPage);
  if (state.currentPage > totalPages) state.currentPage = 1;

  const start = (state.currentPage - 1) * state.itemsPerPage;
  const currentItems = danhSach.slice(start, start + state.itemsPerPage);
  // ------------------------

  el.danhSachSP.innerHTML = currentItems
    .map(
      (phone) => `
    <div class="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all border border-gray-100 flex flex-col h-full overflow-hidden">
      <div class="absolute top-3 left-3 z-10">
        <span class="bg-white/80 backdrop-blur-sm text-blue-600 text-[10px] font-bold px-2.5 py-1 rounded-lg uppercase shadow-sm border border-blue-50">${phone.type}</span>
      </div>
      <div class="bg-gray-50 p-6 flex justify-center items-center">
        <img src="${phone.img}" class="w-full h-48 object-contain group-hover:scale-110 transition-all duration-500">
      </div>
      <div class="p-5 flex flex-col flex-1">
        <h3 class="text-lg font-bold text-gray-800 mb-1 group-hover:text-blue-600 line-clamp-1">${phone.name}</h3>
        <p class="text-gray-500 text-sm line-clamp-2 mb-4 flex-1">${phone.desc}</p>
        <div class="mb-4">
          <span class="text-xs text-gray-400 block">Giá ưu đãi</span>
          <span class="text-xl font-black text-red-500">${Number(phone.price).toLocaleString()} <span class="text-sm underline">đ</span></span>
        </div>
        <div class="grid grid-cols-2 gap-2 mt-auto">
          <button onclick="showChiTietSP('${phone.id}')" class="bg-gray-100 text-gray-700 text-sm font-semibold py-2.5 rounded-xl hover:bg-gray-200">Chi tiết</button>
          <button onclick="themVaoGioHang('${phone.id}')" class="bg-blue-600 text-white text-sm font-semibold py-2.5 rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-100">Thêm giỏ</button>
        </div>
      </div>
    </div>
  `,
    )
    .join("");

  renderPagination(totalPages);
};

// Hàm tạo nút phân trang
const renderPagination = (totalPages) => {
  let paginBox = document.getElementById("pagination");
  if (!paginBox) {
    paginBox = document.createElement("div");
    paginBox.id = "pagination";
    paginBox.className = "flex justify-center gap-2 mt-10 mb-10 col-span-full";
    el.danhSachSP.after(paginBox);
  }

  let buttons = "";
  for (let i = 1; i <= totalPages; i++) {
    const active =
      i === state.currentPage
        ? "bg-blue-600 text-white"
        : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-100";
    buttons += `<button onclick="changePage(${i})" class="w-10 h-10 rounded-lg font-bold transition-all ${active}">${i}</button>`;
  }
  paginBox.innerHTML = buttons;
};

export const layDanhSachSP = async () => {
  // hiển thị loading
  el.loading.classList.remove("hidden");

  // call API
  try {
    const response = await axios.get(API);
    // lưu dữ liệu vào biến danhSachSP
    state.danhSachSP = response.data;

    console.log(state.danhSachSP);

    // ẩn loading
    el.loading.classList.add("hidden");

    // hiển thị danh sách sản phẩm -> viết hàm renderDanhSachSP
    renderDanhSachSP(state.danhSachSP);
  } catch (error) {
    // show error message
    el.danhSachSP.innerHTML = `
            <p class="text-red-500 text-center">Lỗi tải dữ liệu</p>
        `;

    console.log(error);
    // ẩn loading
    el.loading.classList.add("hidden");
  }
};
