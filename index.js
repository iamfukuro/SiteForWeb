function saveSelectedDish(category, dishId) {
    const saved = JSON.parse(localStorage.getItem('selectedDishes') || '{}');
    saved[category] = dishId;
    localStorage.setItem('selectedDishes', JSON.stringify(saved));
};

let dishes = []

async function loadDishes() {
    try {
        const response = await fetch('https://edu.std-900.ist.mospolytech.ru/labs/api/dishes', {
            cache: 'no-store'
        });

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        const data = await response.json();

        dishes = data;
        renderMenu();

    } catch (err) {
        console.error("Ошибка загрузки блюд:", err);
    }
}
loadDishes();

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
}
renderFilters();

function renderMenu(cat, filt) {
    categories.forEach(category => {
        if(cat && category !== cat) return;
        const selectedDishes = JSON.parse(localStorage.getItem('selectedDishes') || {});
        if(!cat && !filt && Object.keys(selectedDishes).length !== 0) orderDisplay();

        const section = document.querySelector(`[data-category="${category}"]`);
        section.innerHTML = "";

        const filtered = dishes.filter(d => d.category.replace("-", "") === category && (!filt || d.kind === filt)).sort((a,b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));

        filtered.forEach(dish => {
            const card = document.createElement("div");
            card.classList.add("dish");
            if(selectedDishes[category] === dish.id) card.classList.add("active");
            card.setAttribute("data-keyword", dish.keyword);
            card.innerHTML = `
                <img src="${dish.image}" alt="${dish.name}" class="img_dish">
                <p class="dish_price">${dish.price}₽</p>
                <p class="dish_name">${dish.name}</p>
                <p class="dish_volume">${dish.count}</p>
                <button class="dish_button">Добавить</button>
            `;
            section.appendChild(card);
        });
    })
}

function getPrices(){
    let prices = 0;
    const selectedDishes = JSON.parse(localStorage.getItem('selectedDishes') || {});
    
    dishes.forEach(element => {
        if(element.id === selectedDishes[element.category.replace("-","")]) prices += element.price
    });
    
    return prices;
}

function orderDisplay(){
    const section = document.getElementById(`do_order`);

    section.classList.remove('disable');
    section.querySelector('p').textContent = `Стоимость заказа: ${getPrices()}₽`;
}

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

function checkCombos() {
  const s = JSON.parse(localStorage.getItem('selectedDishes'));;

  const MESSAGES = {
    NOTHING: 'Ничего не выбрано. Выберите блюда для заказа',
    CHOOSE_DRINK: 'Выберите напиток',
    CHOOSE_MAIN_OR_SALAD: 'Выберите главное блюдо/салат/стартер',
    CHOOSE_SOUP_OR_MAIN: 'Выберите суп или главное блюдо',
    CHOOSE_MAIN: 'Выберите главное блюдо'
  };

  // 1. Ничего не выбрано
  if (!s.soup && !s.maincourse && !s.salad && !s.drink && !s.dessert) return MESSAGES.NOTHING;

  // 2. Есть комбо без напитка (любая комбинация блюд, но напитка нет)
  const hasMainElements = s.soup || s.maincourse
  if (hasMainElements && !s.drink) return MESSAGES.CHOOSE_DRINK;

  // 3. Выбран суп, но нет остального
  if (s.soup && !s.maincourse && !s.salad) return MESSAGES.CHOOSE_MAIN_OR_SALAD;

  // 4. Выбран салат/стартер, но нет супа и главного
  if (s.salad && !hasMainElements) return MESSAGES.CHOOSE_SOUP_OR_MAIN;

  // 5. Выбран только напиток или десерт, но нет главного
  if ((s.drink || s.dessert) && !hasMainElements) return MESSAGES.CHOOSE_MAIN;

  // Всё в порядке
  return null;
}

function createNotification(message) {
  const existing = document.getElementById('combo-notification-overlay');
  if (existing) existing.remove();

  const overlay = document.createElement('div');
  overlay.id = 'combo-notification-overlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');

  const card = document.createElement('div');
  card.className = 'combo-notification-card';

  const text = document.createElement('div');
  text.className = 'combo-notification-text';
  text.textContent = message;

  const btn = document.createElement('button');
  btn.className = 'combo-notification-ok';
  btn.type = 'button';
  btn.textContent = 'Окей';

  btn.addEventListener('click', () => overlay.remove());

  card.appendChild(text);
  card.appendChild(btn);
  overlay.appendChild(card);
  document.body.appendChild(overlay);
}

document.body.addEventListener("click", e => {
    if(e.target.classList.contains("dish_button")) {
        const selectedDishes = JSON.parse(localStorage.getItem('selectedDishes') || {});
        if(Object.keys(selectedDishes).length === 0) orderDisplay();

        const category = e.target.parentElement.parentElement.getAttribute("data-category").replace("-", ""),
        dish = e.target.parentElement.getAttribute("data-keyword"),

        dishInfo = dishes.filter(d => d.keyword == dish)[0],
        dishNowInfo = dishes.filter(d => d.id == selectedDishes[category])[0];

        if(dishNowInfo?.id === dishInfo.id) return;

        if(selectedDishes[category]){
            const dishElement = document.querySelector(`[data-keyword="${dishNowInfo.keyword}"]`);
            if(dishElement) dishElement.classList.remove("active");
        }

        const newDishElement = document.querySelector(`[data-keyword="${dish}"]`);
        newDishElement.classList.add("active");

        saveSelectedDish(category,dishInfo.id);

        document.getElementById(`order_total`).textContent = `Стоимость заказа: ${getPrices()}₽`;
    }
    else if(e.target.classList.contains("do_order_btn")){
        const msg = checkCombos();
        if (msg) {
            e.preventDefault();
            createNotification(msg);
        } else{
            window.location.href = "order.html";
        }
    }
});