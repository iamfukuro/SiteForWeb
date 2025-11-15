const categories = ["soup", "maincourse", "salad", "drink", "dessert",];

const activeFilters = {
  soup: null,
  main_course: null,
  drink: null,
  dessert: null,
  salad: null
};

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