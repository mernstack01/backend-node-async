# User CRUD API (MongoDB + Express)

## 1) O'rnatish

```bash
npm install
```

`.env` fayl yarating:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/user-crud-db
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

- `POST /api/users` - Create (`Model.create`)
- `GET /api/users` - Read all (`Model.find`)
- `GET /api/users/:id` - Read one (`Model.findById`)
- `PUT /api/users/:id` - Update (`Model.findByIdAndUpdate`)
- `DELETE /api/users/:id` - Delete (`Model.findByIdAndDelete`)

## 4) User schema

- `fullName`: String (`required`, `minlength: 3`)
- `email`: String (`required`, `unique`, email format)
- `age`: Number (`optional`, `min: 6`)
- `role`: String (`default: "student"`)
- `createdAt`: Date (`default: Date.now`)
