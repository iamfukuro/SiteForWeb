const dishes = [
  { keyword: "gaspacho", name: "Гаспачо", price: 250, category: "soups", count: "350 г", image: "soups/gazpacho" },
  { keyword: "mushroom_soup", name: "Грибной суп-пюре", price: 185, category: "soups", count: "330 г", image: "soups/mushroom_soup" },
  { keyword: "norwegian_soup", name: "Норвежский суп", price: 270, category: "soups", count: "330 г", image: "soups/norwegian_soup" },
  { keyword: "friedpotatoeswithmushrooms1", name: "Жареная картошка с грибами", price: 150, category: "main_course", count: "250 г", image: "main_course/friedpotatoeswithmushrooms" },
  { keyword: "lasagna", name: "Лазанья", price: 385, category: "main_course", count: "310 г", image: "main_course/lasagna" },
  { keyword: "chickencutletsandmashedpotatoes", name: "Котлеты из курицы с картофельным пюре", price: 225, category: "main_course", count: "280 г", image: "main_course/chickencutletsandmashedpotatoes" },
  { keyword: "orangejuice", name: "Апельсиновый сок", price: 120, category: "beverages", count: "300 мл", image: "beverages/orangejuice" },
  { keyword: "applejuice", name: "Яблочный сок", price: 90, category: "beverages", count: "300 мл", image: "beverages/applejuice" },
  { keyword: "carrotjuice", name: "Морковный сок", price: 110, category: "beverages", count: "300 мл", image: "beverages/carrotjuice" },
];

function renderMenu() {
    const categories = ["soups", "main_course", "beverages"];

    categories.forEach(category => {
        const section = document.querySelector(`[data-category="${category}"]`);
        section.innerHTML = "";

        const filtered = dishes.filter(d => d.category === category).sort((a,b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
        filtered.forEach(dish => {
            const card = document.createElement("div");
            card.classList.add("dish");
            card.setAttribute("data-keyword", dish.keyword);
            card.innerHTML = `
                <img src="./images/menu/${dish.image}.jpg" alt="${dish.name}" class="img_dish">
                <p class="dish_price">${dish.price}₽</p>
                <p class="dish_name">${dish.name}</p>
                <p class="dish_volume">${dish.count}</p>
                <button class="dish_button">Добавить</button>
            `;
            section.appendChild(card);
        });

                // 

                // <button class="dish_button">Добавить</button>
    })
}
renderMenu();

const selected = {
    soups: null,
    main_course: null,
    beverages: null
};

const selectedPrices = {
    soups: 0,
    main_course: 0,
    beverages: 0
}

document.body.addEventListener("click", e => {
    if(e.target.classList.contains("dish_button")) {
        if(!selected.soups && !selected.main_course && !selected.beverages) orderDisplay();

        const category = e.target.parentElement.parentElement.getAttribute("data-category"),
        dish = e.target.parentElement.getAttribute("data-keyword");

        if(selected[category] === dish) return;

        if(selected[category]){
            const dishElement = document.querySelector(`[data-keyword="${selected[category]}"]`);
            dishElement.classList.remove("active")
        }

        const newDishElement = document.querySelector(`[data-keyword="${dish}"]`);
        newDishElement.classList.add("active");
        selected[category] = dish;

        const dishInfo = dishes.filter(d => d.keyword == dish)[0];
        selectedPrices[category] = dishInfo.price;

        console.log(selectedPrices[0])
        document.getElementById(`order_${category}`).textContent = `${dishInfo.name} ${dishInfo.price}₽`;
        document.getElementById(`order_total`).textContent = `${selectedPrices.soups + selectedPrices.main_course + selectedPrices.beverages}₽`;
    }
});

function orderDisplay(){
    const section = document.getElementById(`order_summary`);

    section.querySelectorAll('.disable').forEach(element => {
        element.classList.remove('disable');
    });

    const h3 = section.querySelector('h3').textContent = 'Ваш заказ';
};

document.querySelector(".order_form").addEventListener("submit", e => {
  document.querySelector('[name="soup"]').value = selected.soups || "";
  document.querySelector('[name="main"]').value = selected.main_course || "";
  document.querySelector('[name="drink"]').value = selected.beverages || "";
});


// Если блюда не были выбраны, блок "Стоимость заказа" скрыт так же, как и блоки с категориями.