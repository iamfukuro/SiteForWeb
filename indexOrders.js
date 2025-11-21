const categories = ["soup", "maincourse", "salad", "drink", "dessert",];

let orders = [],
dishes = []

async function loadOrders() {
    try {
        const response = await fetch(`https://edu.std-900.ist.mospolytech.ru/labs/api/orders?api_key=94543198-fd4a-4fb1-93be-52cbeaa95ca2`, {
            cache: "no-store"
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }
        
        orders = await response.json();
        await loadDishes();
    }
    catch (err){
        console.error("Ошибка загрузки блюд:", err);
    }
}

function saveSelectedDish(category, dishId) {
    const saved = JSON.parse(localStorage.getItem("selectedDishes") || "{}");
    if(dishId === null){
        delete saved[category]
    } else{
        saved[category] = dishId;
    }
    localStorage.setItem("selectedDishes", JSON.stringify(saved));
}

let selectedDishes = {};

async function loadDishes() {
    try {
        const response = await fetch("https://edu.std-900.ist.mospolytech.ru/labs/api/dishes", {
            cache: "no-store"
        });

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        dishes = await response.json();
        await additionOrders();
    } catch (err) {
        console.error("Ошибка загрузки блюд:", err);
    }
}

async function additionOrders() {
    orders.forEach((order) => {
        let dish = {};

        order.price = 0;
        order.text = "";

        if(order.soup_id){
            dish = dishes.find(d => d.id === order.soup_id);
            order.soup = dish;

            order.price += dish.price
            order.text = `${order.text}${order.text.length==0?"":","} ${dish.name}`
        }
        if(order.main_course_id){
            dish = dishes.find(d => d.id === order.main_course_id);
            order.main_course = dish;

            order.price += dish.price
            order.text = `${order.text}${order.text.length==0?"":","} ${dish.name}`
        }
        if(order.salad_id){
            dish = dishes.find(d => d.id === order.salad_id);
            order.salad = dish;

            order.price += dish.price
            order.text = `${order.text}${order.text.length==0?"":","} ${dish.name}`
        }
        if(order.drink_id){
            dish = dishes.find(d => d.id === order.drink_id);
            order.drink = dish;

            order.price += dish.price
            order.text = `${order.text}${order.text.length==0?"":","} ${dish.name}`
        }
        if(order.desser_id){
            dish = dishes.find(d => d.id === order.desser_id);
            order.desser = dish;

            order.price += dish.price
            order.text = `${order.text}${order.text.length==0?"":","} ${dish.name}`
        }
    });
}

async function renderOrders() { 
    const orders_tbody = document.querySelector("#orders_tbody")
    const template = document.querySelector("#order_info_template")

    orders.forEach((order) => {
        let item = template.content.cloneNode(true),
        date = new Date(order.created_at)

        item.querySelector(`[data-appointment="number"]`).textContent = (orders.indexOf(order) + 1)
        item.querySelector(`[data-appointment="data"]`).textContent = `${date.toLocaleDateString("ru-RU")} ${date.toTimeString().slice(0, 5)}`
        item.querySelector(`[data-appointment="compound"]`).textContent = order.text
        item.querySelector(`[data-appointment="price"]`).textContent = order.price
        item.querySelector(`[data-appointment="time"]`).textContent = order.delivery_type == "by_time" ? order.delivery_time.slice(0,5) : "Как можно скорее (с 7:00 до 23:00)"

        orders_tbody.append(item)
    });
}

document.body.addEventListener("click", e => {
    const btn = e.target.closest(".view, .edit, .delete");
    btn && createModal(btn.className.match(/view|edit|delete/)[0]);
});

function getPrices(){
    let prices = 0;
    
    for(const key in selectedDishes){
        prices += selectedDishes[key].price
    }
    
    return prices;
}

function handleTabKey(e) {
    if (e.key === "Tab") {
        e.preventDefault();
    }
}

function renderModal(type){
    console.log(type)
}

function createModal(type) {

    const existing = document.getElementById("order_notification_overlay");
    if (existing) existing.remove();

    document.body.style.overflow = "hidden"; 
    document.addEventListener("keydown", handleTabKey);
    
    const overlay = document.createElement("div");
    overlay.id = "order_notification_overlay";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");

    renderModal(type);

    const card = document.createElement("div");
    card.className = "order_notification_card";

    const text = document.createElement("div");
    text.className = "order_notification_text";
    text.textContent = type;

    const btn = document.createElement("button");
    btn.className = "order_notification_ok";
    btn.type = "button";
    btn.textContent = "Окей";

    btn.addEventListener("click", () => {
        overlay.remove();
        document.body.style.overflow = ""; 
        document.removeEventListener("keydown", handleTabKey);
    });

    card.appendChild(text);
    card.appendChild(btn);
    overlay.appendChild(card);
    document.body.appendChild(overlay);
}

// document.getElementById("order_form").addEventListener("submit", async (e) => {
//     e.preventDefault(); // отменяем стандартную отправку

//     // 1) Проверка комбо
//     const msg = checkCombos();
//     if (msg) {
//         return createModal(msg);
//     }

//     // 2) Собираем значения формы
//     const form = e.target,

//     full_name = form.fio.value.trim(),
//     email = form.email.value.trim(),
//     phone = form.tel.value.trim(),
//     delivery_address = form.addr.value.trim(),

//     delivery_type = form.source.value === "now" ? "now" : "by_time",
//     delivery_time = delivery_type === "by_time" ? form.form_deltime.value : null,

//     comment = form.comments.value.trim()??"", // Если появится поле комментария, подставим сюда

//     // 3) Собираем ID выбранных блюд
//     soup_id = selectedDishes.soup?.id || null,
//     main_course_id = selectedDishes.maincourse?.id || null,
//     salad_id = selectedDishes.salad?.id || null,
//     drink_id = selectedDishes.drink?.id || null,
//     dessert_id = selectedDishes.dessert?.id || null,

//     // 4) Готовим JSON
//     body = {
//         full_name,
//         email,
//         phone,
//         delivery_address,
//         delivery_type,
//         delivery_time,
//         comment,

//         soup_id,
//         main_course_id,
//         salad_id,
//         drink_id,
//         dessert_id
//     };

//     console.log("Отправляем заказ:", body);

//     try {
//         const response = await fetch(
//             "https://edu.std-900.ist.mospolytech.ru/labs/api/orders?api_key=94543198-fd4a-4fb1-93be-52cbeaa95ca2",
//             {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json"
//                 },
//                 body: JSON.stringify(body)
//             }
//         );

//         const result = await response.json();

//         if (!response.ok) {
//             console.error("Ошибка сервера:", result);
//             return createModal("Ошибка сервера: " + (result.error || response.status));
//         }

//         localStorage.setItem("selectedDishes", JSON.stringify({}));
//         selectedDishes = {};

//         createModal("Заказ успешно оформлен! Номер заказа: " + result.id);
        
//         renderMenu();
//         orderDisplay();
        
//     } catch (err) {
//         console.error("Ошибка сети:", err);
//         createModal("Ошибка сети. Попробуйте позже.");
//     }
// });

document.addEventListener("DOMContentLoaded", async () => {
    await loadOrders();
    renderOrders();


    // const orders = document.querySelector("#orders_tbody")
    // const template = document.querySelector("#order_info_template")

    // const item = template.content.cloneNode(true)

    // item.querySelector(`[data-appointment="number"]`).textContent = "12"
    // item.querySelector(`[data-appointment="data"]`).textContent = "12.02.23"
    // item.querySelector(`[data-appointment="compound"]`).textContent = "АФыафцафцаафц фцаааааааа ацфааааааа"
    // item.querySelector(`[data-appointment="price"]`).textContent = "121255"
    // item.querySelector(`[data-appointment="time"]`).textContent = "21:00"

    // orders.append(item)
});

