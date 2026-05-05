import { dom, state } from "./core.js";

// Hiển thị lỗi 
const setErrorMessage = (id, message) => {
    const errorElement = document.getElementById(`error-${id}`);
    if (errorElement) errorElement.innerText = message;
};

// Xóa thông báo lỗi
export const clearErrors = () => {
    const errorElements = document.querySelectorAll(".error-msg");
    errorElements.forEach(el => el.innerText = "");
};

// Kiểm tra nhập liệu
export const validateForm = () => {
    const data = getProductDataFromForm();
    let isValid = true;
    clearErrors();

    // Kiểm tra trống
    for (let key in data) {
        if (data[key] === "") {
            setErrorMessage(key, "Chưa nhập");
            isValid = false;
        }
    }

    // Kiểm tra số
    const numberFields = [
        { id: "price", name: "Giá bán" }
    ];

    numberFields.forEach(field => {
        const val = data[field.id];
        if (val !== "" && (isNaN(val) || Number(val) <= 0)) {
            setErrorMessage(field.id, `${field.name} phải là số dương`);
            isValid = false;
        }
    });

    return isValid;
};

export const renderDanhSachSP = (danhSachSP) => {
    if (!dom.productTableBody) return;
    dom.productTableBody.innerHTML = "";

    if (!danhSachSP || danhSachSP.length === 0) {
        dom.productTableBody.innerHTML = `<tr><td colspan="5" class="py-10 text-center text-slate-400 italic">Không tìm thấy sản phẩm</td></tr>`;
        dom.paginationContainer.innerHTML = "";
        return;
    }

    const startIndex = (state.currentPage - 1) * state.itemsPerPage;
    const currentItems = danhSachSP.slice(startIndex, startIndex + state.itemsPerPage);

    dom.productTableBody.innerHTML = currentItems.map(phone => `
        <tr class="hover:bg-slate-50 border-b border-slate-100 transition-all">
            <td class="py-4 px-6 text-slate-500 font-medium">${phone.id}</td>
            <td class="py-4 px-6 font-bold text-slate-800">${phone.name}</td>
            <td class="py-4 px-6 text-right text-emerald-600 font-bold">${Number(phone.price).toLocaleString()} VND</td>
            <td class="py-4 px-6"><span class="bg-slate-100 px-2 py-1 rounded text-[10px] font-bold uppercase text-slate-600 text-center">${phone.type}</span></td>
            <td class="py-4 px-6 text-center">
                <div class="flex justify-center gap-2">
                    <button class="bg-blue-500 text-white px-3 py-1.5 rounded-lg hover:bg-blue-600 text-xs shadow-sm cursor-pointer" onclick="editProduct('${phone.id}')">Sửa</button>
                    <button class="bg-rose-500 text-white px-3 py-1.5 rounded-lg hover:bg-rose-600 text-xs shadow-sm cursor-pointer" onclick="deleteProduct('${phone.id}')">Xóa</button>
                </div>
            </td>
        </tr>
    `).join("");

    renderPagination(danhSachSP.length);
};

const renderPagination = (totalItems) => {
    const totalPages = Math.ceil(totalItems / state.itemsPerPage);
    if (totalPages <= 1) { dom.paginationContainer.innerHTML = ""; return; }
    let buttons = "";
    for (let i = 1; i <= totalPages; i++) {
        const active = state.currentPage === i ? "bg-indigo-600 text-white shadow-md" : "bg-white border hover:bg-gray-300";
        buttons += `<button onclick="changePage(${i})" class="w-9 h-9 rounded-lg font-bold transition-all ${active} cursor-pointer">${i}</button>`;
    }
    dom.paginationContainer.innerHTML = buttons;
};

export const getProductDataFromForm = () => ({
    name: dom.name.value.trim(),
    price: dom.price.value.trim(),
    img: dom.img.value.trim(),
    screen: dom.screen.value.trim(),
    backCamera: dom.backCamera.value.trim(),
    frontCamera: dom.frontCamera.value.trim(),
    desc: dom.desc.value.trim(),
    type: dom.type.value
});

export const resetForm = () => {
    dom.productForm.reset();
    state.editingProduct = null;
    clearErrors();
    dom.btnSave.classList.remove("hidden");
    dom.btnUpdate.classList.add("hidden");
};