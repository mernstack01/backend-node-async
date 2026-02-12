const products = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  name: `Product ${i + 1}`,
  price: Math.floor(Math.random() * 900) + 100,
  category: i % 2 === 0 ? "electronics" : "clothes",
  inStock: i % 3 !== 0,
}));

export default products;
