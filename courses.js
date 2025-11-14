// Загружает блюда с API, сохраняет в window.dishesData и вызывает обновление UI
async function loadDishes(apiUrl = 'http://lab7-api.std-900.ist.mospolytech.ru/dishes') {
  try {
    const resp = await fetch(apiUrl, { cache: 'no-store' }); // запрос
    if (!resp.ok) throw new Error(`Network error: ${resp.status} ${resp.statusText}`);

    const json = await resp.json(); // парсим JSON
    if (!Array.isArray(json)) throw new Error('Invalid response format: expected array');

    // Сохраняем данные глобально, чтобы другие функции (фильтрация, корзина и т.п.) могли их использовать
    window.dishesData = json;

    // Обновляем отображение — вызываем существующие в приложении функции (замените на ваши имена)
    if (typeof renderDishes === 'function') renderDishes(json);
    if (typeof applyFilters === 'function') applyFilters(); // например, чтобы текущие фильтры применились сразу
  } catch (err) {
    console.error('loadDishes error:', err);
    if (typeof showError === 'function') {
      showError('Не удалось загрузить список блюд. Попробуйте обновить страницу.');
    } else {
      // Фолбэк — простой alert, если у вас нет функции UI-ошибки
      alert('Ошибка при загрузке блюд: ' + err.message);
    }
  }
}

const dishes = [
  // Супы
  { keyword: "chicken", name: "Куриный суп", price: 180, category: "soup", count: "300 мл", image: "soup/chicken", kind: "meat" },
  { keyword: "gazpacho", name: "Гаспачо", price: 190, category: "soup", count: "300 мл", image: "soup/gazpacho", kind: "vegan" },
  { keyword: "mushroom_soup", name: "Грибной суп", price: 210, category: "soup", count: "300 мл", image: "soup/mushroom_soup", kind: "vegan" },
  { keyword: "norwegian_soup", name: "Норвежский суп", price: 250, category: "soup", count: "300 мл", image: "soup/norwegian_soup", kind: "fish" },
  { keyword: "ramen", name: "Рамен", price: 270, category: "soup", count: "350 мл", image: "soup/ramen", kind: "meat" },
  { keyword: "tomyum", name: "Том Ям", price: 290, category: "soup", count: "350 мл", image: "soup/tomyum", kind: "fish" },

  // Главное блюдо
  { keyword: "chickencutletsandmashedpotatoes", name: "Котлеты из курицы с картофельным пюре", price: 320, category: "maincourse", count: "250 г", image: "maincourse/chickencutletsandmashedpotatoes", kind: "meat" },
  { keyword: "fishrice", name: "Рыба с рисом", price: 340, category: "maincourse", count: "250 г", image: "maincourse/fishrice", kind: "fish" },
  { keyword: "friedpotatoeswithmushrooms", name: "Жареная картошка с грибами", price: 270, category: "maincourse", count: "250 г", image: "maincourse/friedpotatoeswithmushrooms", kind: "vegan" },
  { keyword: "lasagna", name: "Лазанья", price: 360, category: "maincourse", count: "250 г", image: "maincourse/lasagna", kind: "meat" },
  { keyword: "pizza", name: "Пицца", price: 390, category: "maincourse", count: "300 г", image: "maincourse/pizza", kind: "meat" },
  { keyword: "shrimppasta", name: "Паста с креветками", price: 370, category: "maincourse", count: "300 г", image: "maincourse/shrimppasta", kind: "fish" },

  // Салаты и стартеры
  { keyword: "caesar", name: "Салат Цезарь", price: 250, category: "salad", count: "200 г", image: "salad/caesar", kind: "meat" },
  { keyword: "caprese", name: "Салат Капрезе", price: 230, category: "salad", count: "200 г", image: "salad/caprese", kind: "vegan" },
  { keyword: "frenchfries1", name: "Картофель фри с соусом Цезарь", price: 190, category: "salad", count: "150 г", image: "salad/frenchfries1", kind: "vegan" },
  { keyword: "frenchfries2", name: "Картофель фри с кетчупом", price: 180, category: "salad", count: "150 г", image: "salad/frenchfries2", kind: "vegan" },
  { keyword: "saladwithegg", name: "Салат с яйцом", price: 210, category: "salad", count: "200 г", image: "salad/saladwithegg", kind: "vegan" },
  { keyword: "tunasalad", name: "Салат с тунцом", price: 260, category: "salad", count: "200 г", image: "salad/tunasalad", kind: "fish" },

  // Напитки
  { keyword: "applejuice", name: "Яблочный сок", price: 110, category: "drink", count: "300 мл", image: "drink/applejuice", kind: "cold" },
  { keyword: "carrotjuice", name: "Морковный сок", price: 120, category: "drink", count: "300 мл", image: "drink/carrotjuice", kind: "cold" },
  { keyword: "orangejuice", name: "Апельсиновый сок", price: 130, category: "drink", count: "300 мл", image: "drink/orangejuice", kind: "cold" },
  { keyword: "tea", name: "Чай", price: 90, category: "drink", count: "250 мл", image: "drink/tea", kind: "hot" },
  { keyword: "greentea", name: "Зелёный чай", price: 100, category: "drink", count: "250 мл", image: "drink/greentea", kind: "hot" },
  { keyword: "cappuccino", name: "Капучино", price: 160, category: "drink", count: "250 мл", image: "drink/cappuccino", kind: "hot" },

  // Десерты
  { keyword: "baklava", name: "Пахлава", price: 170, category: "dessert", count: "маленькая порция", image: "dessert/baklava", kind: "small" },
  { keyword: "checheesecake", name: "Чизкейк с вишней", price: 220, category: "dessert", count: "средняя порция", image: "dessert/checheesecake", kind: "medium" },
  { keyword: "chocolatecake", name: "Шоколадный торт", price: 240, category: "dessert", count: "средняя порция", image: "dessert/chocolatecake", kind: "medium" },
  { keyword: "chocolatecheesecake", name: "Шоколадный чизкейк", price: 250, category: "dessert", count: "средняя порция", image: "dessert/chocolatecheesecake", kind: "medium" },
  { keyword: "donuts", name: "Пончики (6 штук)", price: 190, category: "dessert", count: "6 шт.", image: "dessert/donuts", kind: "large" },
  { keyword: "donuts2", name: "Пончики (3 штуки)", price: 120, category: "dessert", count: "3 шт.", image: "dessert/donuts2", kind: "small" }
];


const filtersByCategory = {
  soup: [
    { name: "Рыбный", kind: "fish" },
    { name: "Мясной", kind: "meat" },
    { name: "Вегетарианский", kind: "veg" }
  ],
  maincourse: [
    { name: "Рыбное", kind: "fish" },
    { name: "Мясное", kind: "meat" },
    { name: "Вегетарианское", kind: "veg" }
  ],
  drink: [
    { name: "Холодный", kind: "cold" },
    { name: "Горячий", kind: "hot" }
  ],
  salad: [
    { name: "Рыбный", kind: "fish" },
    { name: "Мясной", kind: "meat" },
    { name: "Вегетарианский", kind: "veg" }
  ],
  dessert: [
    { name: "Маленькая порция", kind: "small" },
    { name: "Средняя порция", kind: "medium" },
    { name: "Большая порция", kind: "large" }
  ]
};
