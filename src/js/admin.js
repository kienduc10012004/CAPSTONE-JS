import { dom } from "./adminJS/core.js";
import { createProduct, fetchDanhSachSP, updateProduct, filterSP } from "./adminJS/crud-flow.js";
import { resetForm } from "./adminJS/ui-flow.js";

dom.productForm.addEventListener('submit', (e) => {
    e.preventDefault();
    createProduct();
});

dom.btnUpdate.addEventListener('click', updateProduct);
dom.btnReset.addEventListener('click', resetForm);
dom.btnSearch.addEventListener('click', filterSP);

dom.inputKeyword.addEventListener('keypress', (e) => {
    if (e.key === "Enter") filterSP();
});

fetchDanhSachSP();