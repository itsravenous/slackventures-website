/* If you're feeling fancy you can add interactivity 
    to your site with Javascript */

// prints "hi" in the browser's dev tools console
console.log("hi");

const $ = document.getElementById.bind(document)
const $$ = document.querySelector
const $$$ = document.querySelectorAll

const phoneEl = $('phone')
const messagesEl = $('messages')
const inputEl = $('input')
const menuEl = $('menu')
const inventoryEl = $('inventory')
const inventoryCloseEl = $('inventory-close')

const COMMANDS = [
  'invite',
  'inventory',
  'objectives'
]
const matchCommands = commandPart => COMMANDS.filter(command => command.startsWith(commandPart))

inputEl.addEventListener('input', () => {
  const val = inputEl.value
  if(val[0] === '/') {
    menuEl.classList.remove('hidden')
    menuEl.innerHTML = matchCommands(val.slice(1)).map(command => `<li id="${command}">${command}</li>`).join('')
  } else {
    menuEl.classList.add('hidden')
  }
})

const HANDLERS = {
  inventory: showInventory
}
menuEl.addEventListener('click', e => {
  const item = e.target;
  HANDLERS[item.id] && HANDLERS[item.id]()
})
                       
function showInventory () {
  inventoryEl.classList.remove('hidden')
}

function hideInventory () {
  inventoryEl.classList.add('hidden')
}

inventoryCloseEl.addEventListener('click', hideInventory)