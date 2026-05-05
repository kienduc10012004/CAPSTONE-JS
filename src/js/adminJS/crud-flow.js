import { API_URL, dom, state } from "./core.js";
import { renderDanhSachSP, resetForm, validateForm, getProductDataFromForm } from "./ui-flow.js";

// Lấy danh sách đang lọc hiện tại
export const getFilteredList = () => {
    const keyword = dom.inputKeyword.value.toLowerCase().trim();
    if (!keyword) return state.danhSachSP;
    return state.danhSachSP.filter(p => 
        p.name.toLowerCase().includes(keyword) || p.desc.toLowerCase().includes(keyword)
    );
};

export const fetchDanhSachSP = async () => {
    try {
        const response = await axios.get(API_URL);
        state.danhSachSP = response.data;
        renderDanhSachSP(getFilteredList());
    } catch (error) { console.error(error); }
};

export const filterSP = () => {
    state.currentPage = 1;
    renderDanhSachSP(getFilteredList());
};

window.changePage = (page) => {
    state.currentPage = page;
    renderDanhSachSP(getFilteredList());
    // dom.productTableBody.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

export const createProduct = async () => {
    if (!validateForm()) return;
    try {
        await axios.post(API_URL, getProductDataFromForm());
        alert("Thêm thành công!");
        resetForm();
        await fetchDanhSachSP();
    } catch (error) { alert("Lỗi khi thêm"); }
};

export const updateProduct = async () => {
    if (!validateForm()) return;
    try {
        await axios.put(`${API_URL}/${state.editingProduct.id}`, getProductDataFromForm());
        alert("Cập nhật thành công!");
        resetForm();
        await fetchDanhSachSP();
    } catch (error) { alert("Lỗi khi cập nhật"); }
};

window.editProduct = (id) => {
    const product = state.danhSachSP.find(p => p.id == id);
    if (!product) return;
    state.editingProduct = product;
    const fields = ["name", "price", "img", "screen", "backCamera", "frontCamera", "desc", "type"];
    fields.forEach(f => dom[f].value = product[f]);
    dom.btnSave.classList.add("hidden");
    dom.btnUpdate.classList.remove("hidden");
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

window.deleteProduct = async (id) => {
    if (confirm("Xóa sản phẩm này?")) {
        await axios.delete(`${API_URL}/${id}`);
        await fetchDanhSachSP();
    }
};