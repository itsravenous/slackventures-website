const $ = document.getElementById.bind(document);
const $$ = document.querySelector.bind(document);
const $$$ = document.querySelectorAll.bind(document);

const phoneEl = $("phone");
const messagesEl = $("messages");
const inputEl = $("input");
const menuEl = $("menu");
const inventoryEl = $("inventory");
const inventoryCloseEl = $("inventory-close");

const COMMANDS = ["invite", "inventory", "objectives"];
const matchCommands = commandPart =>
  COMMANDS.filter(command => command.startsWith(commandPart));

inputEl.addEventListener("input", () => {
  const val = inputEl.value;
  if (val[0] === "/") {
    menuEl.classList.remove("hidden");
    menuEl.innerHTML = matchCommands(val.slice(1))
      .map(command => `<li id="${command}">${command}</li>`)
      .join("");
  } else {
    menuEl.classList.add("hidden");
  }
});

const HANDLERS = {
  inventory: showInventory
};
menuEl.addEventListener("click", e => {
  const item = e.target;
  HANDLERS[item.id] && HANDLERS[item.id]();
});

function showInventory() {
  inventoryEl.classList.remove("hidden");
}

function hideInventory() {
  inventoryEl.classList.add("hidden");
}

inventoryCloseEl.addEventListener("click", hideInventory);

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
