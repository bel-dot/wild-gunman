// Add modal elements
const addModal = document.getElementById('add-modal');
const addButton = document.getElementById('add-btn');
const addCloseButton = document.getElementById('add-close');
const addForm = document.getElementById('add-form');

// Edit modal elements
const editModal = document.getElementById('edit-modal');
const editCloseButton = document.getElementById('edit-close');
const editForm = document.getElementById('edit-form');

// Add input elements
const addName = document.getElementById('add-name');
const addPrice = document.getElementById('add-price');
const addCategory = document.getElementById('add-category');
const addImage = document.getElementById('add-image');

// Edit input elements
const editName = document.getElementById('edit-name');
const editPrice = document.getElementById('edit-price');
const editCategory = document.getElementById('edit-category');
const editImage = document.getElementById('edit-image');

// Other elements
const root = document.getElementById('root');
const emptySpan = document.getElementById('no-products-text');
const sumHeader = document.getElementById('sum-header');
const productSum = document.getElementById('products-sum');

// Sort buttons
const sortByPriceButton = document.getElementById('sort-by-price');
const sortByDateAddedButton = document.getElementById('sort-by-date-added');
const sortByDateUpdatedButton = document.getElementById('sort-by-date-updated');
const clearSortButton = document.getElementById('clear-sort');

const productsListDiv = document.getElementById('products-list');
const filterDiv = document.getElementById('filter-div');
const clearFiltersButton = document.getElementById('clear-filters');
const toastey = document.getElementById('toastey');

let id = 3;
const products = [
    {
        id: 1,
        name: "Nintendo Switch 2",
        price: 18550,
        category: "Ігрові консолі",
        image: "https://static.independent.co.uk/2025/04/03/8/54/nintendo-switch-2.png", 
        added: new Date(2025, 5, 5, 0, 0, 0),
        updated: new Date(2025, 6, 5, 0, 0, 0),
    },
    {
        id: 2,
        name: "Jagermeister 0.7L",
        price: 550,
        category: "Алкоголь",
        image: "https://www.fratellimazza.it/4702-large_default/jagermeister-amaro.jpg",
        added: new Date(2010, 2, 15, 23, 43, 23),
        updated: new Date(2018, 2, 15, 23, 43, 23),
    },
];

const categories = [];


function renderProducts(list) {
    productsListDiv.innerHTML = '';
    if(list.length == 0) {
        emptySpan.style.visibility = "visible";
        sumHeader.style.visibility = "hidden";
    }
    else {
        emptySpan.style.visibility = "hidden";
        sumHeader.style.visibility = "visible";

        for(const product of list) {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';

            const productId = document.createElement('span');
            productId.className = 'product-id';
            productId.textContent = product.id;

            const productImage = document.createElement('img');
            productImage.src = product.image;
            productImage.alt = product.name;

            const productName = document.createElement('span');
            productName.innerText = product.name;

            const productPrice = document.createElement('span');
            productPrice.innerText = `${product.price} UAH`;

            const productCategory = document.createElement('span');
            productCategory.innerText = `Категорія: ${product.category}`;
            
            productCard.appendChild(productId);
            productCard.appendChild(productImage);
            productCard.appendChild(productName);
            productCard.appendChild(productPrice);
            productCard.appendChild(productCategory);
            
            const cardControls = document.createElement('div');
            cardControls.className = 'card-controls';

            const editButton = document.createElement('button');
            editButton.innerText = 'Редагувати';
            editButton.type = 'button';
            editButton.onclick = () => {
                editProduct(product);
            };
            
            const deleteButton = document.createElement('button');
            deleteButton.innerText = 'Видалити';
            deleteButton.type = 'button';
            deleteButton.onclick = () => {
                deleteProduct(products, product.id);
            };
            
            cardControls.appendChild(editButton);
            cardControls.appendChild(deleteButton);
            
            productCard.appendChild(cardControls);
            
            productsListDiv.appendChild(productCard);

            if(!categories.includes(product.category)) {
                categories.push(product.category);
                const filterButton = document.createElement('button');
                filterButton.innerText = product.category;
                filterButton.onclick = () => {
                    filterList(products, product.category);
                }
                
                filterDiv.appendChild(filterButton);
            }
        }
        
        productSum.textContent = calculateSum(products);
    }

}

function calculateSum(list) {
    return list.map(product => product.price).reduce((price, sum) => sum + price, 0);
}

function showToast(msg) {
    toastey.textContent = msg;
    toastey.style.visibility = "visible";

    setTimeout(() => {
        toastey.style.visibility = "hidden";
    }, 3000);
}

function sortList(list, param) {
    const copy = [...list];

    switch(param) {
        case 'price':
            copy.sort((a, b) => a.price - b.price);
            break;
        case 'added':
            copy.sort((a, b) => a.added - b.added);
            break;
        case 'updated':
            copy.sort((a, b) => a.updated - b.updated);
            break;
    }
    
    renderProducts(copy);
}

function filterList(list, category) {
    renderProducts(list.filter(product => product.category == category));
}

function editProduct(product) {
    editName.value = product.name;
    editPrice.value = product.price;
    editCategory.value = product.category;
    editImage.value = product.image;
    
    editModal.style.display = "block";
    root.style.opacity = '0.5';
    
    editForm.onsubmit = (e) => {
        e.preventDefault();

        product.name = editName.value;
        product.price = Number(editPrice.value);
        product.category = editCategory.value;
        product.image = editImage.value;
        product.updated = new Date();
        
        
        
        closeEditModal();
        showToast(`Товар ${product.name} (${product.id}) успішно відредаговано.`);
        renderProducts(products);
    }
}


function closeAddModal() {
    addModal.style.display = 'none';
    root.style.opacity = '1.0';
}

function closeEditModal() {
    editModal.style.display = 'none';
    root.style.opacity = '1.0';
}

function deleteProduct(list, id) {
    for(let i = 0; i < list.length; i++) {
        if(list[i].id == id) {
            list.splice(i, 1);
            showToast("Товар успішно видалено");
            break;
        }
    }
    renderProducts(list);
}

function addProduct(list) {
    const name = addName.value;
    const price = Number(addPrice.value);
    const category = addCategory.value;
    const image = addImage.value;
    
    const product = {
        id: id++,
        name,
        price,
        category,
        image,
        added: new Date(),
        updated: new Date(),
    };
    
    list.push(product);
    closeAddModal();
    renderProducts(list);
}

renderProducts(products);

addButton.onclick = () => {
    addModal.style.display = "block";
    root.style.opacity = '0.5';
}

addCloseButton.onclick = closeAddModal;

addForm.onsubmit = (e) => {
    e.preventDefault();
    addProduct(products);
}

editCloseButton.onclick = closeEditModal;

sortByPriceButton.onclick = () => {
    sortList(products, 'price');
}

sortByDateAddedButton.onclick = () => {
    sortList(products, 'added');
}

sortByDateUpdatedButton.onclick = () => {
    sortList(products, 'updated');
}

clearFiltersButton.onclick = () => {
    renderProducts(products);
}

clearSortButton.onclick = () => {
    renderProducts(products);
}