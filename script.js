let dishes = [
    {
        "name": "Mini Funa Roll Menü",
        "content": "18 Stück: je 6 Mini Funa Roll Mozzarella, Garnele und Lachs",
        "price": 13.90
    },
    {
        "name": "Lachs Menü",
        "content": "18 Stück: je 6 Sake Maki, Sake Nigiri und Sake Avocado",
        "price": 13.90
    },
    {
        "name": "Mini Funa Roll Chicken",
        "content": "mit Hähnchenbrust, Frischkäse und Frühlingszwiebel",
        "price": 12.60
    },
    {
        "name": "Funa Poke Bowl Veggie",
        "content": "große Reisbowl mit Avocado, Edamamebohnen, Möhrenstreifen, Salat-Mix, Frühlingszwiebeln, Mais und Sesam",
        "price": 10.90
    },
    {
        "name": "Funa Poke Bowl Crispy Tofu",
        "content": "große Reisbowl mit Avocado, Edamamebohnen, Möhrenstreifen, Salatmix, Frühlingszwiebeln, Mais und Sesam",
        "price": 12.50
    },
    {
        "name": "The Vegetarian Roll",
        "content": "mit Panko Lauch, Gurke, Frischkäse, on Top Avocado, Funa Cocktail-Mayonnaise, Sesam und Frühlingszwiebeln",
        "price": 9.90
    },
    {
        "name": "Green Love Roll",
        "content": "mit Panko Paprika, Rucola, Karotte, Frischkäse, on Top Avocado, Sesam-Dressing und Frühlingszwiebeln",
        "price": 9.90
    }
];

let shoppingBasket = [];
let prices = [];
let amounts = [];

// =========================================================== Add dishes (menu / Main)
function addDishes() {
    let dishDiv = document.getElementById('dishes');

    for (let i = 0; i < dishes.length; i++) {
        let dishJSON = dishes[i];
        let name = dishJSON['name'];
        let content = dishJSON['content'];
        let price = dishJSON['price'];

        dishDiv.innerHTML += returnAddedDish(name, content, price);
    }
    addEmptyBasket();
}

function returnAddedDish(name, content, price) {
    return `
    <div id="dish">
        <div>
            <div class="dish-name">
                <h3 id="dish-name">${name}</h3>
                <img src="img/info.png" class="info">
            </div>
            <p class="dish-p">
                ${content}
            </p>
            <h3 id="dish-price">${price.toFixed(2).replace('.', ',')} €</h3>
        </div>
        <img src="img/plus.png" id="dish-plus" onclick="pushInNewArray('${name}', '${price}')">
    </div>
    `;
}


// =========================================================== push selected Dish in new Array + save
function pushInNewArray(name, price) {
    const menu = shoppingBasket.indexOf(name);

    if (menu === -1) {
        shoppingBasket.push(name);
        prices.push(price);
        amounts.push(1);

        savePushElements();

    } else {
        amounts[menu]++;
    }
    showAddedBasket();
}

function savePushElements() {
    let shoppingBasketText = JSON.stringify(shoppingBasket);
    let pricesText = JSON.stringify(prices);
    let amountsText = JSON.stringify(amounts);

    localStorage.setItem('ShoppingBasket', shoppingBasketText);
    localStorage.setItem('Prices', pricesText);
    localStorage.setItem('Amounts', amountsText);
    showAddedBasket();
}

// =========================================================== show Basket with added Dishes
function showAddedBasket() {
    let basket = document.getElementById('cart');
    let dishSum = 0;
    let totalSum = 0;
    basket.innerHTML = '';

    if (shoppingBasket.length >= 0) {
        for (let i = 0; i < shoppingBasket.length; i++) {
            dishSum = amounts[i] * +prices[i];
            totalSum = dishSum + totalSum;

            const name = shoppingBasket[i];
            const price = prices[i];
            const amount = amounts[i];

            basket.innerHTML += returnAddedBasket(amount, name, dishSum, price, i);
        }
    } else {
        addEmptyBasket();
    }
    document.getElementById('cart').innerHTML += showTotalPrice(totalSum);
}


function returnAddedBasket(amount, name, dishSum, price, i) {
    return `
    <div id="addedBasket">
    <div>
        <div class="basket-headline">
            <h5 class="amounts-padding">${amount}</h5>
            <h5>${name}</h5>
            <p>${dishSum.toFixed(2).replace('.', ',')} €</p>
        </div>
        <div class="basket-portion">
            <p>Anmerkungen hinzufügen</p>
            <img src="img/minus.png" class="basket-img" onclick="deleteDish(${i}, '${name}', '${price}')">
            <img src="img/plus.png" class="basket-img" onclick="addDish(${i}, '${name}', '${price}')">
        </div>
        <hr>
    </div>
    </div>
    `;
}


function showTotalPrice(totalSum) {
    return `
    <div class="calc-sum">
                    <p>Zwischensumme<span>${totalSum.toFixed(2).replace('.', ',')} €</span></p>
                    <p class="delivery">Lieferkosten<span>kostenlos</span></p>
                    <button id="pay-btn">Bezahlen (<span>${totalSum.toFixed(2).replace('.', ',')} €</span> )</button>
                </div>
    `;
}

// =========================================================== Responsive Basket / Button
function openResponsiveBasket() {
    document.getElementById('right').classList.remove('dis-none');
    document.getElementById('close-basket').classList.remove('d-none');
    document.getElementById('body').classList.add('scrollbar');
}

function closeResponsiveBasket() {
    document.getElementById('right').classList.add('dis-none');
    document.getElementById('close-basket').classList.add('d-none');
    document.getElementById('body').classList.remove('scrollbar');
}

// =========================================================== show empty Basket, if a dish has been deleted
function addEmptyBasket() {

    let basket = document.getElementById('cart');
    basket.innerHTML = `
    <div id="cart2">
        <img src="img/tasche.png" class="cart-bag">
        <h4>Fülle deinen Warenkorb</h4>
        <p>Füge einige leckere Gerichte aus der Speisekarte hinzu und bestelle dein Essen.</p>
    </div>
    `;
}

// =========================================================== decrease dishes || remove Basket 
function deleteDish(position) {

    amounts[position]--;
    if (amounts[position] === 0) {
        shoppingBasket.splice(position, 1);
        prices.splice(position, 1);
        amounts.splice(position, 1);

    }
    if (shoppingBasket.length == 0) {
        addEmptyBasket();
        document.getElementById('responsive-pay-div').classList.add('d-none');
        document.getElementById('footer').classList.remove('margin');
    } else {
        showAddedBasket();
        openResponsiveBasket();
    }
}

// =========================================================== increase number of dishes
function addDish(position) {

    amounts[position]++;
    showAddedBasket();
    openResponsiveBasket();
}

// =========================================================== search
function getInputfromMenu() {
    const searchInput = document.getElementById('search-input');
    const searchValue = searchInput.value.trim();

    return searchValue;
}


function filterDish() {
    let searchInput = getInputfromMenu();
    search = searchInput.toLowerCase();

    // console.log(search);
    let dishDiv = document.getElementById('dishes');
    dishDiv.innerHTML = '';

    for (let i = 0; i < dishes.length; i++) {
        let dishJSON = dishes[i];
        let name = dishJSON['name'];
        let content = dishJSON['content'];
        let price = dishJSON['price'];

        if (name.toLowerCase().includes(search)) {
            dishDiv.innerHTML += returnAddedDish(name, content, price);
        }
    }

}

// =========================================================== display search input 
function openInput() {
    document.getElementById('options').classList.add('d-none')
    document.getElementById('search-input').classList.remove('d-none');
    document.getElementById('close').classList.remove('d-none');
}

function closeInput() {
    document.getElementById('options').classList.remove('d-none')
    document.getElementById('search-input').classList.add('d-none');
    document.getElementById('close').classList.add('d-none');
    document.getElementById('search-input').value = '';
    document.getElementById('dishes').innerHTML = '';
    addDishes();
}

