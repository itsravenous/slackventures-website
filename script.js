const $ = document.getElementById.bind(document);
const $$ = document.querySelector.bind(document);
const $$$ = document.querySelectorAll.bind(document);

// Join modals
const modalLinks = $$$("[data-modal-id]");
modalLinks.forEach(modalLink => {
  const modal = $(modalLink.getAttribute("data-modal-id"));
  modalLink.addEventListener("click", e => {
    modal.classList.remove("sr-only");
  });
  modal.addEventListener("click", e => {
    if (e.target !== modal) return;
    modal.classList.add("sr-only");
  });
});

const modals = Array.from(modalLinks).map(modalLink =>
  $(modalLink.getAttribute("data-modal-id"))
);
document.body.addEventListener("keydown", e => {
  if (e.key === "Escape") {
    modals.forEach(modal => modal.classList.add("sr-only"));
  }
});
