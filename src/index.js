let foodName
let foodPrice
let drinkName
let drinkPrice
let dessertName
let dessertPrice

function selectItem(item, category) {
    const previouslySelected = document.querySelector(`.meals-${category} .selected`)

    if (previouslySelected !== null) {
        previouslySelected.classList.remove("selected")
    }

    item.classList.add("selected")
    hasSelectedEverything()
}

function hasSelectedEverything() {
    const food = document.querySelector(`.meals-food .selected`)
    const drink = document.querySelector(`.meals-drink .selected`)
    const dessert = document.querySelector(`.meals-dessert .selected`)

    if (food && drink && dessert) {
        const button = document.querySelector(".order-button")
        button.classList.remove("disabled")
        button.innerHTML = "Fechar Pedido"
    }
}

function showModal() {
    foodName = document.querySelector(`.meals-food .selected .title`).innerHTML
    foodPrice = document.querySelector(`.meals-food .selected .price`).innerHTML
    drinkName = document.querySelector(`.meals-drink .selected .title`).innerHTML
    drinkPrice = document.querySelector(`.meals-drink .selected .price`).innerHTML
    dessertName = document.querySelector(`.meals-dessert .selected .title`).innerHTML
    dessertPrice = document.querySelector(`.meals-dessert .selected .price`).innerHTML

    const overlay = document.querySelector(`.overlay`)
    overlay.classList.remove("hidden")

    const orderInfo = document.querySelector(`.order-info`)
    orderInfo.innerHTML = `
        <div class="item">
            <p>${foodName}</p>
            <p>${foodPrice}</p>
        </div>
        <div class="item">
            <p>${drinkName}</p>
            <p>${drinkPrice}</p>
        </div>
        <div class="item">
            <p>${dessertName}</p>
            <p>${dessertPrice}</p>
        </div>
        <div class="item">
            <p class="total-name">TOTAL</p>
            <p class="total-price">R$${calculateTotal()}</p>
        </div>
    `
    addWhatsAppLink()
}

function calculateTotal() {
    const foodPriceNum = Number(foodPrice.replace(",", ".").replace("R$", ""))
    const drinkPriceNum = Number(drinkPrice.replace(",", ".").replace("R$", ""))
    const dessertPriceNum = Number(dessertPrice.replace(",", ".").replace("R$", ""))

    return (foodPriceNum + drinkPriceNum + dessertPriceNum).toFixed(2).toString().replace(".", ",")
}

function cancelOrder() {
    const overlay = document.querySelector(`.overlay`)
    overlay.classList.add("hidden")
}

function addWhatsAppLink() {
    const message = encodeURIComponent(`Olá, gostaria de fazer o pedido:
        - Prato: ${foodName}
        - Bebida: ${drinkName}
        - Sobremesa: ${dessertName}
        Total: R$${calculateTotal()}`)

    const whatsAppButton = document.querySelector(`.whatsapp-button`)
    whatsAppButton.setAttribute("href", `https://wa.me/5511981094010/?text=${message}`)
}