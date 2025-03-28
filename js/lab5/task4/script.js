const addForm = document.getElementById('add-product-form');
const deleteForm = document.getElementById('delete-product-form');
const editForm = document.getElementById('edit-product-form');
const searchForm = document.getElementById('search-product-form');
const orderForm = document.getElementById('order-product-form');

const products = new Map();
const orderLog = new WeakMap();
const orders = new WeakSet();
let id = 0;

addForm.addEventListener('submit', (event) => {
    event.preventDefault();
    
    const product = Object.fromEntries(new FormData(addForm));
    product.price = Number(product.price);
    product.amount = Number(product.amount);
    products.set(id++, product);
    alert("Продукт успішно додано.");
});

deleteForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const id = Number(deleteForm.firstElementChild.value);
    console.log(id);
    
    if(!products.delete(id)) {
        alert("Продукт не знайдено.");
    }
    else alert("Продукт успішно видалено.");
    
    console.log(orderLog);
});

editForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const productToEdit = Object.fromEntries(new FormData(editForm));
    for(const key of Object.keys(productToEdit)) {
        productToEdit[key] = Number(productToEdit[key]);
    }
    
    if(products.has(productToEdit.id)) {
        products.set(productToEdit.id, {
            name: products.get(productToEdit.id).name,
            price: productToEdit.price,
            amount: productToEdit.amount,
        });
        alert("Продукт успішно оновлено.");
    }
    else {
        alert("Продукт не знайдено.");
    }
});

searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    let found = false;
    const name = searchForm.firstElementChild.value;
    products.forEach((value, key) => {
        if(value.name.includes(name)) {
            alert(`Знайдено продукт зі схожою назвою:\n ID: ${key}\n Назва: ${value.name}\n Ціна: ${value.price}\n К-ть на складі: ${value.amount}`);
            found = true;
        }
    });
    
    if(!found) {
        alert("Продукт не знайдено.")
    }
});

orderForm.addEventListener('submit', (event) => {
    event.preventDefault();
    let found = false;
    
    const order = Object.fromEntries(new FormData(orderForm));
    order.amount = Number(order.amount);

    products.forEach((value, key) => {
        if(value.name === order.product) {
            found = true;
            if(value.amount < order.amount) {
                alert("Неможливо замовити більше продуктів");
            }
            else {
                products.set(key, {
                    name: value.name,
                    price: value.price,
                    amount: value.amount - order.amount,
                });
                
                orderLog.set(products.get(key), order.name);
                orders.add(order);
                console.log(orderLog);
                alert("Продукт успішно замовлено.");
            }
        }
    });

    if(!found) {
        alert("Продукт не знайдено.");
    }
});
