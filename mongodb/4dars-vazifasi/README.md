# Category-Product API (MongoDB + Express)

One-to-Many bog'lanish:
- `Category` -> ko'p `Product`
- `Product` ichida `category` (`ObjectId`, `ref: "Category"`) saqlanadi

## 1) O'rnatish

```bash
npm install
```

`.env` fayl yarating (`.env.example`dan nusxa):

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/category-product-db
```

## 2) Ishga tushirish

Development:

```bash
npm run dev
```

Production:

```bash
npm start
```

## 3) Endpointlar

### Category
- `POST /categories` - category yaratish
  - body: `{ "name": "Electronics" }`
- `GET /categories` - categorylar ro'yxati

### Product
- `POST /products` - product yaratish (`categoryId` bilan)
  - body: `{ "title": "iPhone 15", "price": 1200, "categoryId": "..." }`
- `GET /products` - barcha productlar (`populate("category")`)
- `GET /categories/:id/products` - shu categoryga tegishli productlar

Izoh: qulaylik uchun `/api/categories` va `/api/products` aliaslari ham qo'shilgan.

## 4) Sxemalar

### Category
- `name`: `String` (`required`, `unique`, `trim`)

### Product
- `title`: `String` (`required`, `trim`)
- `price`: `Number` (`required`)
- `category`: `ObjectId` (`required`, `ref: "Category"`)
