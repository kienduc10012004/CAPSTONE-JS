import { el, state } from "./core.js";
import { capNhatSoLuongGioHang } from "./product-flow.js";

//
window.tangSoLuong = (phoneId) => {
  // tìm sản phẩm trong giỏ hàng dựa trên id
  const item = state.gioHang.find((phone) => phone.id == phoneId);

  // nếu không tìm thấy sản phẩm thì hiển thị thông báo lỗi
  if (!item) {
    alert("Không tìm thấy sản phẩm trong giỏ hàng");
    return;
  }

  // nếu tìm thấy sản phẩm thì tăng số lượng lên 1
  item.soLuong += 1;

  // cập nhật lại số lượng sản phẩm trong giỏ hàng hiển thị ở badge
  capNhatSoLuongGioHang();

  // render lại giỏ hàng để cập nhật số lượng và tổng tiền
  renderGioHang();
};

window.giamSoLuong = (phoneId) => {
  // tìm sản phẩm trong giỏ hàng dựa trên id
  const item = state.gioHang.find((phone) => phone.id == phoneId);

  // nếu không tìm thấy sản phẩm thì hiển thị thông báo lỗi
  if (!item) {
    alert("Không tìm thấy sản phẩm trong giỏ hàng");
    return;
  }
  // nếu tìm thấy sản phẩm
  // nếu số lượng bằng 1 => không cho giảm nữa
  if (item.soLuong === 1) {
    return;
  }

  // nếu số lượng lớn hơn 1 thì giảm số lượng xuống 1
  item.soLuong -= 1;

  // cập nhật lại số lượng sản phẩm trong giỏ hàng hiển thị ở badge
  capNhatSoLuongGioHang();

  // render lại giỏ hàng để cập nhật số lượng và tổng tiền
  renderGioHang();
};

// const -> window -> chuyển xoaSanPham thành global function để có thể gọi được từ HTML
window.xoaSanPham = (phoneId) => {
  // cập nhật mảng giỏ hàng không chứa sản phẩm muốn xóa
  state.gioHang = state.gioHang.filter((phone) => phone.id != phoneId);

  // cập nhật lại số lượng sản phẩm trong giỏ hàng hiển thị ở badge
  capNhatSoLuongGioHang();

  // render lại giỏ hàng để cập nhật danh sách và tổng tiền
  renderGioHang();
};

export const renderGioHang = () => {
  // nếu giỏ hàng rỗng thì hiển thị thông báo
  if (state.gioHang.length === 0) {
    el.popupGioHang.classList.remove("hidden");
    el.noiDungGioHang.innerHTML = `
            <h2>Giỏ hàng</h2>
            <p class="text-gray-500 text-center">Giỏ hàng của bạn đang trống</p>
        `;
    return;
  }
  // tạo html để hiển thị giỏ hàng
  // list item -> map -> list html -> join("") -> string html -> innerHTML
  const contentHtmlList = state.gioHang.map((item) => {
    // thêm logic disable button giảm số lượng khi số lượng bằng 1, không cho giảm nữa
    // toán tử ba ngôi là cách viết gọn của if else
    // điều kiện ? giá trị nếu đúng : giá trị nếu sai
    // let disableGiam;
    // if (item.soLuong === 1) {
    //     disableGiam = "disabled opacity-50 cursor-not-allowed"
    // } else {
    //     disableGiam = ""
    // }

    const disableGiam =
      item.soLuong === 1 ? "disabled opacity-50 cursor-not-allowed" : "";

    return `
            <div class="flex items-center gap-4 py-5 px-4 border-b border-gray-50 hover:bg-gray-50/80 transition-all duration-300 group">
    <!-- Hình ảnh sản phẩm (Bo góc hơn, bóng đổ nhẹ) -->
    <div class="w-20 h-20 flex-shrink-0 bg-white border border-gray-100 rounded-2xl p-2 shadow-sm relative overflow-hidden">
      <img 
        src="${item.img}" 
        alt="${item.name}" 
        class="w-full h-full object-contain mix-blend-multiply transform group-hover:scale-110 transition-transform duration-500"
      >
    </div>

    <!-- Thông tin sản phẩm (Tiêu đề và giá) -->
    <div class="flex-1 min-w-0 flex flex-col gap-1">
      <h3 class="font-bold text-gray-800 text-base leading-tight truncate group-hover:text-blue-600 transition-colors">
        ${item.name}
      </h3>
      <p class="text-blue-600 font-bold text-sm">
        ${item.price.toLocaleString()} <span class="text-[10px] uppercase tracking-tighter">vnd</span>
      </p>
    </div>

    <!-- Bộ điều khiển số lượng (Thiết kế hiện đại hơn) -->
    <div class="flex items-center bg-gray-100 rounded-xl p-1 border border-gray-200 shadow-inner">
      <button
        class="w-8 h-8 flex items-center justify-center rounded-lg bg-white text-gray-600 hover:bg-red-50 hover:text-red-500 shadow-sm transition-all active:scale-90 ${disableGiam}"
        onclick="giamSoLuong('${item.id}')"
      >
        <span class="text-lg font-bold leading-none">−</span>
      </button>
      
      <span class="w-10 text-center font-black text-gray-700 text-sm">
        ${item.soLuong}
      </span>
      
      <button
        class="w-8 h-8 flex items-center justify-center rounded-lg bg-blue-600 text-white hover:bg-blue-700 shadow-sm transition-all active:scale-90"
        onclick="tangSoLuong('${item.id}')"
      >
        <span class="text-lg font-bold leading-none">+</span>
      </button>
    </div>

    <!-- Tổng tiền cho từng sản phẩm -->
    <div class="w-28 text-right hidden sm:block">
      <p class="text-xs text-gray-400 font-medium uppercase tracking-widest mb-0.5">Thành tiền</p>
      <p class="font-black text-gray-900 text-base">
        ${(item.price * item.soLuong).toLocaleString()}
      </p>
    </div>

    <!-- Nút xóa (Dùng icon thùng rác cho chuyên nghiệp) -->
    <button
      class="p-2.5 text-gray-400 hover:text-white hover:bg-red-500 rounded-xl transition-all duration-300 ml-2 shadow-sm border border-transparent hover:border-red-600 active:scale-90"
      onclick="xoaSanPham('${item.id}')"
      title="Xóa sản phẩm"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
      </svg>
    </button>
  </div>
        `;
  });

  // gộp tất cả các thẻ html lại thành một chuỗi và hiển thị lên trang
  el.noiDungGioHang.innerHTML = contentHtmlList.join("");

  // thêm logic tính tổng tiền của giỏ hàng
  const tongTien = state.gioHang.reduce(
    (tong, item) => tong + item.price * item.soLuong,
    0,
  );

  // ghép HTML hiển thị tổng tiền vào cuối nội dung giỏ hàng
  el.noiDungGioHang.innerHTML += `
       <div class="mt-6 border-t-2 border-dashed border-gray-100 pt-6 px-4">
    <!-- Các dòng chi tiết phụ (tùy chọn) -->
    <div class="flex justify-between items-center mb-2">
      <span class="text-gray-500 font-medium text-sm">Tạm tính:</span>
      <span class="text-gray-800 font-semibold text-sm">${tongTien.toLocaleString()} đ</span>
    </div>
    <div class="flex justify-between items-center mb-4">
      <span class="text-gray-500 font-medium text-sm">Phí vận chuyển:</span>
      <span class="text-green-500 font-bold text-sm">Miễn phí</span>
    </div>

    <!-- Dòng Tổng tiền chính -->
    <div class="flex items-center justify-between bg-blue-50/50 rounded-2xl p-5 mb-6 border border-blue-100/50">
      <div>
        <p class="text-gray-600 font-bold text-xs uppercase tracking-widest mb-1">Tổng cộng thanh toán</p>
        <p class="text-[10px] text-blue-400 font-medium italic">* Đã bao gồm thuế VAT (nếu có)</p>
      </div>
      
      <div class="text-right">
        <p class="text-3xl font-black text-blue-600 tracking-tighter">
          ${tongTien.toLocaleString()}
          <span class="text-sm font-bold uppercase ml-1">vnd</span>
        </p>
      </div>
    </div>

    <!-- Nút hành động bổ sung -->
    <div class="flex flex-col gap-3">
      <button class="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-black py-4 rounded-2xl shadow-xl shadow-blue-200 hover:shadow-blue-300 hover:-translate-y-0.5 transition-all duration-300 active:scale-[0.98] flex items-center justify-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
        </svg>
        THANH TOÁN AN TOÀN
      </button>
      
      <button 
        onclick="el.popupGioHang.classList.add('hidden')"
        class="w-full bg-white text-gray-500 font-bold py-3 rounded-xl hover:text-gray-800 transition-colors text-sm"
      >
        Tiếp tục mua sắm
      </button>
    </div>
  </div>
    `;

  // remove class hidden của popup giỏ hàng để hiển thị popup
  el.popupGioHang.classList.remove("hidden");
};
