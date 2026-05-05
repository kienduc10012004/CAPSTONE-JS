import { el, state } from "./core.js";
import { renderDanhSachSP } from "./product-flow.js"; // Import trực tiếp ở đây

// Hàm lấy danh sách đã qua xử lý (Lọc + Sắp xếp)
export const getFilteredAndSortedList = () => {
    const keyword = el.searchSP.value.toLowerCase().trim();
    const type = el.filterSP.value.toLowerCase();
    const sort = el.sortSP.value;

    let ketQua = [...state.danhSachSP];

    // Lọc theo từ khóa
    if (keyword) {
        ketQua = ketQua.filter(p => 
            p.name.toLowerCase().includes(keyword) || 
            p.desc.toLowerCase().includes(keyword)
        );
    }
    // Lọc theo hãng
    if (type) {
        ketQua = ketQua.filter(p => p.type.toLowerCase() === type);
    }
    // Sắp xếp giá
    if (sort === "asc") {
        ketQua.sort((a, b) => a.price - b.price);
    } else if (sort === "desc") {
        ketQua.sort((a, b) => b.price - a.price);
    }
    
    return ketQua;
};

// Hàm thực hiện lọc và hiển thị
export const filterSP = () => {
    const ketQua = getFilteredAndSortedList();
    state.currentPage = 1;
    renderDanhSachSP(ketQua);
};

export const bindFilterEvent = () => {
    el.searchSP.addEventListener("input", () => {
        clearTimeout(state.timerId);
        state.timerId = setTimeout(filterSP, 800);
    });
    el.filterSP.addEventListener("change", filterSP);
    el.sortSP.addEventListener("change", filterSP);
};