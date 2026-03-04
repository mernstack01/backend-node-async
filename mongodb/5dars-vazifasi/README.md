# Order Aggregation API (MongoDB + Express)

Aggregation vazifasi:
- `orders` collection bo'yicha `status` kesimida orderlar sonini chiqarish (`group + count`)
- `status` kesimida `total` o'rtacha qiymatini chiqarish (`group + avg`)

## 1) O'rnatish

```bash
npm install
```

`.env` fayl yarating (`.env.example`dan nusxa):

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/order-aggregation-db
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

## 3) Order schema

- `customer`: String (`required`)
- `status`: String (`required`, `paid | pending | canceled`)
- `total`: Number (`required`, `min: 0`)
- `itemsCount`: Number (`required`, `min: 1`)
- `createdAt`: Date (`default: Date.now`)

## 4) Endpointlar

- `POST /api/orders` - order yaratish
- `GET /api/orders` - barcha orderlar
- `GET /api/orders/stats/count-by-status` - status bo'yicha orderlar soni
- `GET /api/orders/stats/avg-total-by-status` - status bo'yicha o'rtacha total

`/orders` prefiksi bilan ham xuddi shu endpointlar ishlaydi.

## 5) Namuna so'rovlar

Order qo'shish:

```http
POST /api/orders
Content-Type: application/json

{
  "customer": "Ali",
  "status": "paid",
  "total": 120,
  "itemsCount": 3
}
```

Status bo'yicha count natija:

```json
[
  { "_id": "paid", "count": 18 },
  { "_id": "pending", "count": 7 },
  { "_id": "canceled", "count": 3 }
]
```

Status bo'yicha avg total natija:

```json
[
  { "_id": "paid", "avgTotal": 156.4 },
  { "_id": "pending", "avgTotal": 98.1 },
  { "_id": "canceled", "avgTotal": 55.8 }
]
```
