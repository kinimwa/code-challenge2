document.addEventListener('DOMContentLoaded', () => {
    const itemInput = document.getElementById('itemInput');
    const addButton = document.getElementById('addButton');
    const shoppingList = document.getElementById('shoppingList');
    const clearButton = document.getElementById('clearButton');
    let itemsArray = JSON.parse(localStorage.getItem('shoppingList')) || [];

    function addItem() {
        const itemText = itemInput.value.trim();
        if (itemText !== '') {
            const item = { text: itemText, purchased: false };
            itemsArray.push(item);
            updateList();
            itemInput.value = '';
            saveToLocalStorage();
        }
    }

    function updateList() {
        shoppingList.innerHTML = '';
        itemsArray.forEach((item, index) => {
            const li = document.createElement('li');
            li.textContent = item.text;
            li.className = item.purchased ? 'purchased' : '';
            li.addEventListener('click', () => togglePurchased(index));
            li.addEventListener('dblclick', () => editItem(index));
            shoppingList.appendChild(li);
        });
    }

    function togglePurchased(index) {
        itemsArray[index].purchased = !itemsArray[index].purchased;
        updateList();
        saveToLocalStorage();
    }

    function clearList() {
        itemsArray = [];
        updateList();
        saveToLocalStorage();
    }

    function editItem(index) {
        const newItemText = prompt('Edit item:', itemsArray[index].text);
        if (newItemText !== null && newItemText.trim() !== '') {
            itemsArray[index].text = newItemText.trim();
            updateList();
            saveToLocalStorage();
        }
    }

    function saveToLocalStorage() {
        localStorage.setItem('shoppingList', JSON.stringify(itemsArray));
    }

    addButton.addEventListener('click', addItem);
    clearButton.addEventListener('click', clearList);

    updateList();
});