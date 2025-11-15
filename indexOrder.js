const categories = ["soup", "maincourse", "salad", "drink", "dessert",];

function saveSelectedDish(category, dishId) {
    const saved = JSON.parse(localStorage.getItem('selectedDishes') || '{}');
    if(dishId === null){
        delete saved[category]
    } else{
        saved[category] = dishId;
    }
    localStorage.setItem('selectedDishes', JSON.stringify(saved));
};

let selectedDishes = {};

async function loadDishes() {
    const dishes = JSON.parse(localStorage.getItem('selectedDishes') || '{}');
    if(Object.keys(dishes).length === 0) return

    for(const key in dishes){
        try {
            const response = await fetch(`https://edu.std-900.ist.mospolytech.ru/labs/api/dishes/${dishes[key]}?api_key=94543198-fd4a-4fb1-93be-52cbeaa95ca2`, {
                cache: 'no-store'
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }

            selectedDishes[key] = await response.json();
        }
        catch (err){
            console.error("Ошибка загрузки блюд:", err);
        }
    }

    renderMenu();
}
loadDishes();

function renderMenu() {
    if(Object.keys(selectedDishes).length === 0){
        const section = document.getElementById('order_compound'),
        paragraph = document.createElement('p');
        paragraph.textContent = 'Ничего не выбрано. Чтобы добавить блюда в заказ, перейдите на страницу';
        const link = document.createElement('a');
        link.href = 'lunch.html';
        link.textContent = "Собрать ланч"
        
        section.append(paragraph,link);
        return;
    }

    const section = document.querySelector(`.container_dish`);
    section.innerHTML = "";

    for(const key in selectedDishes){
        const dish = selectedDishes[key],
        card = document.createElement("div");
        card.classList.add("dish");
        card.setAttribute("data-keyword", dish.keyword);
        card.setAttribute("data-category", dish.category.replace("-", ""));
        card.innerHTML = `
            <img src="${dish.image}" alt="${dish.name}" class="img_dish">
            <p class="dish_price">${dish.price}₽</p>
            <p class="dish_name">${dish.name}</p>
            <p class="dish_volume">${dish.count}</p>
            <button class="dish_button remove">Удалить</button>
        `;
        section.appendChild(card);
    };

    orderDisplay();
}

document.body.addEventListener("click", e => {
    if(e.target.classList.contains("remove")) {
        const category = e.target.parentElement.getAttribute("data-category").replace("-", ""),
        dishInfo = Object.values(selectedDishes).find(d => d.id === selectedDishes[category]);
        saveSelectedDish(category,null);
        document.querySelector(`[data-keyword="${dishInfo.keyword}"]`)?.remove();

        document.getElementById(`order_${category}`).textContent = `Не выбрано`;
        document.getElementById(`order_total`).textContent = `${getPrices()}₽`;
        if(Object.keys(selectedDishes).length === 1) renderMenu();
    }
});

function getPrices(){
    let prices = 0;
    
    for(const key in selectedDishes){
        prices += selectedDishes[key].price
    }
    
    return prices;
}

function orderDisplay(){
    const section = document.getElementById(`order_summary`);

    section.querySelectorAll('.disable').forEach(element => {
        element.classList.remove('disable');
    });

    const h3 = section.querySelector('h3').textContent = 'Ваш заказ';
    
    if(Object.keys(selectedDishes).length === 0) return
    console.log(selectedDishes)
    for(const key in selectedDishes){
        dishInfo = Object.values(selectedDishes).find(d => d.id == selectedDishes[key].id);
        document.getElementById(`order_${dishInfo.category.replace("-", "")}`).textContent = `${dishInfo.name} ${dishInfo.price}₽`;
    };

    document.getElementById(`order_total`).textContent = `${getPrices()}₽`;
}

function checkCombos() {
  const s = selectedDishes;

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

document.getElementById("order_form").addEventListener("submit", async (e) => {
    e.preventDefault(); // отменяем стандартную отправку

    // 1) Проверка комбо
    const msg = checkCombos();
    if (msg) {
        return createNotification(msg);
    }

    // 2) Собираем значения формы
    const form = e.target,

    full_name = form.fio.value.trim(),
    email = form.email.value.trim(),
    phone = form.tel.value.trim(),
    delivery_address = form.addr.value.trim(),

    delivery_type = form.source.value === "now" ? "now" : "by_time",
    delivery_time = delivery_type === "by_time" ? form.form_deltime.value : null,

    comment = "", // Если появится поле комментария, подставим сюда

    // 3) Собираем ID выбранных блюд
    soup_id = selectedDishes.soup?.id || null,
    main_course_id = selectedDishes.maincourse?.id || null,
    salad_id = selectedDishes.salad?.id || null,
    drink_id = selectedDishes.drink?.id || null,
    dessert_id = selectedDishes.dessert?.id || null,

    // 4) Готовим JSON
    body = {
        full_name,
        email,
        phone,
        delivery_address,
        delivery_type,
        delivery_time,
        comment,

        soup_id,
        main_course_id,
        salad_id,
        drink_id,
        dessert_id
    };

    console.log("Отправляем заказ:", body);

    try {
        const response = await fetch(
            "https://edu.std-900.ist.mospolytech.ru/labs/api/orders?api_key=94543198-fd4a-4fb1-93be-52cbeaa95ca2",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            }
        );

        const result = await response.json();

        if (!response.ok) {
            console.error("Ошибка сервера:", result);
            return createNotification("Ошибка сервера: " + (result.error || response.status));
        }

        localStorage.removeItem("selectedDishes");

        createNotification("Заказ успешно оформлен! Номер заказа: " + result.id);
        
        renderMenu();
        orderDisplay();
        
    } catch (err) {
        console.error("Ошибка сети:", err);
        createNotification("Ошибка сети. Попробуйте позже.");
    }
});