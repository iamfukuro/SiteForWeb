const categories = ["soups", "main_course", "beverages", "desserts", "salads_starters"];

function renderFilters(){
    categories.forEach(category => {
        const section = document.querySelector(`[data-category="${category}"]`);
        section.innerHTML = "";

        const filterBlock = document.createElement("div");
        filterBlock.classList.add("filters");
        filtersByCategory[category].forEach(f => {
            const btn = document.createElement("button");
            btn.classList.add("filter_btn");
            btn.textContent = f.name;
            btn.dataset.kind = f.kind;
            btn.addEventListener("click", () => toggleFilter(category, f.kind, btn));
            filterBlock.appendChild(btn);
        });
        section.parentElement.insertBefore(filterBlock, section);
    })
};
renderFilters();

const selected = {
    soups: null,
    main_course: null,
    salads_starters: null,
    beverages: null,
    desserts: null
};

const selectedPrices = {
    soups: 0,
    main_course: 0,
    salads_starters: 0,
    beverages: 0,
    desserts: 0
}

function renderMenu(cat, filt) {
    
    categories.forEach(category => {
        if(cat && category !== cat) return;
        const section = document.querySelector(`[data-category="${category}"]`);
        section.innerHTML = "";

        const filtered =
        dishes.filter(d => d.category === category && (!filt || d.kind === filt)).sort((a,b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
        filtered.forEach(dish => {
            const card = document.createElement("div");
            card.classList.add("dish");
            if(selected[category] === dish.keyword) card.classList.add("active");
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
    })
}
renderMenu();


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


const activeFilters = {
  soups: null,
  main_course: null,
  beverages: null,
  desserts: null,
  salads_starters: null
};

function toggleFilter(category,filter,btn){
    if(activeFilters[category] === filter){
        btn.classList.remove("active");
        activeFilters[category] = null;
        return renderMenu(category);
    };

    if(activeFilters[category]) btn.parentElement.querySelector(`[data-kind="${activeFilters[category]}"]`).classList.remove("active");
    activeFilters[category] = filter;
    btn.classList.add("active");
    renderMenu(category, filter);
}

document.querySelector(".order_form").addEventListener("submit", e => {
  document.querySelector('[name="soup"]').value = selected.soups || "";
  document.querySelector('[name="main"]').value = selected.main_course || "";
  document.querySelector('[name="drink"]').value = selected.beverages || "";
});


// Если блюда не были выбраны, блок "Стоимость заказа" скрыт так же, как и блоки с категориями.