import products from "../data/products.seed.js";

/**
 * GET /products
 * Pagination + Filtering + Search
 */
export const getProducts = (req, res) => {
  let {
    page = 1,
    limit = 10,
    minPrice,
    maxPrice,
    category,
    search,
  } = req.query;

  page = Number(page);
  limit = Number(limit);

  if (page <= 0 || limit <= 0) {
    return res.status(400).json({
      message: "page va limit musbat son bo‘lishi kerak",
    });
  }

  let result = [...products];

  // 🔍 Search (name bo‘yicha)
  if (search) {
    result = result.filter(product =>
      product.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  // 🎯 Filtering
  if (category) {
    result = result.filter(product => product.category === category);
  }

  if (minPrice) {
    result = result.filter(product => product.price >= Number(minPrice));
  }

  if (maxPrice) {
    result = result.filter(product => product.price <= Number(maxPrice));
  }

  // 📄 Pagination
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  const paginatedData = result.slice(startIndex, endIndex);

  res.status(200).json({
    total: result.length,
    page,
    limit,
    data: paginatedData,
  });
};

/**
 * POST /products
 * Create product
 */
export const createProduct = (req, res) => {
  const { name, price, category, inStock } = req.body;

  if (!name || !price || !category) {
    return res.status(400).json({
      message: "name, price va category majburiy",
    });
  }

  const newProduct = {
    id: products.length + 1,
    name,
    price,
    category,
    inStock: Boolean(inStock),
  };

  products.push(newProduct);

  res.status(201).json(newProduct);
};

/**
 * PATCH /products/:id
 * Update product
 */
export const updateProduct = (req, res) => {
  const id = Number(req.params.id);
  const product = products.find(p => p.id === id);

  if (!product) {
    return res.status(404).json({
      message: "Product topilmadi",
    });
  }

  Object.assign(product, req.body);

  res.status(200).json(product);
};

/**
 * DELETE /products/:id
 * Delete product
 */
export const deleteProduct = (req, res) => {
  const id = Number(req.params.id);
  const index = products.findIndex(p => p.id === id);

  if (index === -1) {
    return res.status(404).json({
      message: "Product topilmadi",
    });
  }

  products.splice(index, 1);

  res.status(204).send();
};
