const dishes = [
  // Супы
  { keyword: "chicken", name: "Куриный суп", price: 180, category: "soups", count: "300 мл", image: "soups/chicken", kind: "meat" },
  { keyword: "gazpacho", name: "Гаспачо", price: 190, category: "soups", count: "300 мл", image: "soups/gazpacho", kind: "vegan" },
  { keyword: "mushroom_soup", name: "Грибной суп", price: 210, category: "soups", count: "300 мл", image: "soups/mushroom_soup", kind: "vegan" },
  { keyword: "norwegian_soup", name: "Норвежский суп", price: 250, category: "soups", count: "300 мл", image: "soups/norwegian_soup", kind: "fish" },
  { keyword: "ramen", name: "Рамен", price: 270, category: "soups", count: "350 мл", image: "soups/ramen", kind: "meat" },
  { keyword: "tomyum", name: "Том Ям", price: 290, category: "soups", count: "350 мл", image: "soups/tomyum", kind: "fish" },

  // Главное блюдо
  { keyword: "chickencutletsandmashedpotatoes", name: "Котлеты из курицы с картофельным пюре", price: 320, category: "main_course", count: "250 г", image: "main_course/chickencutletsandmashedpotatoes", kind: "meat" },
  { keyword: "fishrice", name: "Рыба с рисом", price: 340, category: "main_course", count: "250 г", image: "main_course/fishrice", kind: "fish" },
  { keyword: "friedpotatoeswithmushrooms", name: "Жареная картошка с грибами", price: 270, category: "main_course", count: "250 г", image: "main_course/friedpotatoeswithmushrooms", kind: "vegan" },
  { keyword: "lasagna", name: "Лазанья", price: 360, category: "main_course", count: "250 г", image: "main_course/lasagna", kind: "meat" },
  { keyword: "pizza", name: "Пицца", price: 390, category: "main_course", count: "300 г", image: "main_course/pizza", kind: "meat" },
  { keyword: "shrimppasta", name: "Паста с креветками", price: 370, category: "main_course", count: "300 г", image: "main_course/shrimppasta", kind: "fish" },

  // Салаты и стартеры
  { keyword: "caesar", name: "Салат Цезарь", price: 250, category: "salads_starters", count: "200 г", image: "salads_starters/caesar", kind: "meat" },
  { keyword: "caprese", name: "Салат Капрезе", price: 230, category: "salads_starters", count: "200 г", image: "salads_starters/caprese", kind: "vegan" },
  { keyword: "frenchfries1", name: "Картофель фри с соусом Цезарь", price: 190, category: "salads_starters", count: "150 г", image: "salads_starters/frenchfries1", kind: "vegan" },
  { keyword: "frenchfries2", name: "Картофель фри с кетчупом", price: 180, category: "salads_starters", count: "150 г", image: "salads_starters/frenchfries2", kind: "vegan" },
  { keyword: "saladwithegg", name: "Салат с яйцом", price: 210, category: "salads_starters", count: "200 г", image: "salads_starters/saladwithegg", kind: "vegan" },
  { keyword: "tunasalad", name: "Салат с тунцом", price: 260, category: "salads_starters", count: "200 г", image: "salads_starters/tunasalad", kind: "fish" },

  // Напитки
  { keyword: "applejuice", name: "Яблочный сок", price: 110, category: "beverages", count: "300 мл", image: "beverages/applejuice", kind: "cold" },
  { keyword: "carrotjuice", name: "Морковный сок", price: 120, category: "beverages", count: "300 мл", image: "beverages/carrotjuice", kind: "cold" },
  { keyword: "orangejuice", name: "Апельсиновый сок", price: 130, category: "beverages", count: "300 мл", image: "beverages/orangejuice", kind: "cold" },
  { keyword: "tea", name: "Чай", price: 90, category: "beverages", count: "250 мл", image: "beverages/tea", kind: "hot" },
  { keyword: "greentea", name: "Зелёный чай", price: 100, category: "beverages", count: "250 мл", image: "beverages/greentea", kind: "hot" },
  { keyword: "cappuccino", name: "Капучино", price: 160, category: "beverages", count: "250 мл", image: "beverages/cappuccino", kind: "hot" },

  // Десерты
  { keyword: "baklava", name: "Пахлава", price: 170, category: "desserts", count: "маленькая порция", image: "desserts/baklava", kind: "small" },
  { keyword: "checheesecake", name: "Чизкейк с вишней", price: 220, category: "desserts", count: "средняя порция", image: "desserts/checheesecake", kind: "medium" },
  { keyword: "chocolatecake", name: "Шоколадный торт", price: 240, category: "desserts", count: "средняя порция", image: "desserts/chocolatecake", kind: "medium" },
  { keyword: "chocolatecheesecake", name: "Шоколадный чизкейк", price: 250, category: "desserts", count: "средняя порция", image: "desserts/chocolatecheesecake", kind: "medium" },
  { keyword: "donuts", name: "Пончики (6 штук)", price: 190, category: "desserts", count: "6 шт.", image: "desserts/donuts", kind: "large" },
  { keyword: "donuts2", name: "Пончики (3 штуки)", price: 120, category: "desserts", count: "3 шт.", image: "desserts/donuts2", kind: "small" }
];


const filtersByCategory = {
  soups: [
    { name: "Рыбный", kind: "fish" },
    { name: "Мясной", kind: "meat" },
    { name: "Вегетарианский", kind: "vegan" }
  ],
  main_course: [
    { name: "Рыбное", kind: "fish" },
    { name: "Мясное", kind: "meat" },
    { name: "Вегетарианское", kind: "vegan" }
  ],
  beverages: [
    { name: "Холодный", kind: "cold" },
    { name: "Горячий", kind: "hot" }
  ],
  salads_starters: [
    { name: "Рыбный", kind: "fish" },
    { name: "Мясной", kind: "meat" },
    { name: "Вегетарианский", kind: "vegan" }
  ],
  desserts: [
    { name: "Маленькая порция", kind: "small" },
    { name: "Средняя порция", kind: "medium" },
    { name: "Большая порция", kind: "large" }
  ]
};
