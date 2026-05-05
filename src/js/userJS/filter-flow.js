import { el, state } from "./core.js";
import { renderDanhSachSP } from "./product-flow.js";

export const filterSP = () => {
  const keyword = el.searchSP.value.toLowerCase().trim();
  const type = el.filterSP.value.toLowerCase();
  const sort = el.sortSP.value;

  let ketQua = [...state.danhSachSP];

  if (keyword) {
    ketQua = ketQua.filter(p => p.name.toLowerCase().includes(keyword) || p.desc.toLowerCase().includes(keyword));
  }

  if (type) {
    ketQua = ketQua.filter(p => p.type.toLowerCase() === type);
  }

  if (sort === "asc") {
    ketQua.sort((a, b) => a.price - b.price);
  } else if (sort === "desc") {
    ketQua.sort((a, b) => b.price - a.price);
  }

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