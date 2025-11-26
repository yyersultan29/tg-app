# 🎨 Product Detail Bottom Sheet - Complete!

## 🎉 Что создано:

### 1. **BottomSheet Component** (`src/core/ui/bottom-sheet.tsx`)
Универсальный bottom sheet с:
- ✅ Backdrop с blur эффектом
- ✅ Spring анимация появления снизу
- ✅ Handle bar для визуального указания
- ✅ Max height 85vh с scroll
- ✅ Блокировка scroll body
- ✅ Закрытие по клику на backdrop

### 2. **ProductDetailSheet** (`src/features/menu/components/product-detail-sheet.tsx`)
Детали товара:
- ✅ Большая картинка (эмодзи 8xl в градиентном круге)
- ✅ Название и цена
- ✅ Описание товара
- ✅ Бейджи (Popular, Category, Great Value)
- ✅ Кнопка "Add to Cart" / Counter +/-
- ✅ Подытог при изменении количества
- ✅ Кнопка "Done"

### 3. **Обновлены данные** (`src/data/menuData.ts`)
Добавлены описания для всех товаров:
- 🍔 Burger - "Juicy beef patty with fresh lettuce..."
- 🍟 Fries - "Crispy golden french fries..."
- 🌭 Hotdog - "Classic all-beef hot dog..."
- и т.д.

### 4. **Обновлен MenuItemCard**
- ✅ Теперь кликабельный (открывает bottom sheet)
- ✅ Показывает badge "X in cart" когда товар в корзине
- ✅ Кнопка меняется: "ADD" → "VIEW"

---

## 🎬 UX Flow:

### Шаг 1: Карточка товара (не в корзине)
```
┌─────────────────┐
│      🍔         │
│    Burger       │
│    $4.99        │
│  ┌───────────┐  │
│  │    ADD    │  │  ← Клик открывает bottom sheet
│  └───────────┘  │
└─────────────────┘
```

### Шаг 2: Bottom Sheet открыт
```
┌─────────────────────────────────┐
│          ─────                  │ ← Handle bar
│                                 │
│     ┌───────────────────┐       │
│     │        🍔         │       │ ← Большой эмодзи в градиенте
│     └───────────────────┘       │
│                                 │
│  Burger              [Popular]  │ ← Название + badge
│  $4.99                          │
│                                 │
│  Juicy beef patty with fresh... │ ← Описание
│                                 │
│  [main] [Great Value]           │ ← Бейджи
│  ─────────────────────────────  │
│  ┌─────────────────────────┐   │
│  │   Add to Cart  🛒       │   │ ← Кнопка добавить
│  └─────────────────────────┘   │
└─────────────────────────────────┘
```

### Шаг 3: После добавления
```
┌─────────────────────────────────┐
│  Quantity               [  −  1  +  ]│
│                                     │
│  ┌───────────┐   ┌──────────┐      │
│  │ Subtotal  │   │   Done   │      │
│  │  $4.99    │   └──────────┘      │
│  └───────────┘                      │
└─────────────────────────────────────┘
```

### Шаг 4: Карточка после добавления
```
┌─────────────────┐
│      🍔         │
│    Burger       │
│    $4.99        │
│  [ 1 in cart ]  │ ← Badge с количеством
│  ┌───────────┐  │
│  │   VIEW    │  │ ← Кнопка изменилась
│  └───────────┘  │
└─────────────────┘
```

---

## 🎨 Компоненты в Bottom Sheet:

### Большая картинка:
```tsx
<div className="w-40 h-40 rounded-3xl bg-gradient-to-br from-orange-500 via-red-500 to-pink-500">
  <motion.span className="text-8xl">
    {product.emoji}
  </motion.span>
</div>
```

### Заголовок с бейджами:
```tsx
<div className="flex items-start justify-between">
  <div>
    <h2 className="text-2xl font-bold">{product.name}</h2>
    <p className="text-3xl font-extrabold text-[var(--link-color)]">
      ${product.price}
    </p>
  </div>
  <Badge variant="accent" icon="🔥">Popular</Badge>
</div>
```

### Описание:
```tsx
<p className="text-sm text-[var(--hint-color)]">
  {product.description}
</p>
```

### Кнопка добавления / Counter:
```tsx
{quantity === 0 ? (
  <Button size="lg" className="w-full" icon="🛒">
    Add to Cart
  </Button>
) : (
  <div className="space-y-3">
    <div className="flex items-center justify-between">
      <span>Quantity</span>
      <div className="flex items-center gap-3">
        <Button size="sm">−</Button>
        <span className="font-bold">{quantity}</span>
        <Button size="sm">+</Button>
      </div>
    </div>
    <div className="flex gap-3">
      <div>Subtotal: ${subtotal}</div>
      <Button onClick={onClose}>Done</Button>
    </div>
  </div>
)}
```

---

## ✨ Особенности:

### Анимации:
- ✅ Backdrop fade in/out
- ✅ Sheet slide up/down (spring animation)
- ✅ Эмодзи появляется с scale анимацией
- ✅ Эмодзи вращается периодически
- ✅ Counter с scale анимацией

### UX:
- ✅ Haptic feedback на всех действиях
- ✅ Backdrop закрывает модалку
- ✅ Handle bar визуально показывает что можно закрыть
- ✅ Scroll body блокируется когда открыто
- ✅ Smooth transitions

### Умные бейджи:
- ✅ "Popular" - на всех товарах
- ✅ Category - категория товара
- ✅ "Great Value" - если цена < $3
- ✅ "X in cart" - на карточке в меню

---

## 📋 Добавленные описания товаров:

| Товар | Описание |
|-------|----------|
| 🍔 Burger | Juicy beef patty with fresh lettuce, tomatoes... |
| 🍟 Fries | Crispy golden french fries, perfectly salted... |
| 🌭 Hotdog | Classic all-beef hot dog in a soft bun... |
| 🌮 Taco | Seasoned meat with fresh vegetables... |
| 🍕 Pizza | Classic Italian pizza with melted mozzarella... |
| 🍩 Donut | Soft and fluffy donut with sweet glaze... |
| 🍝 Pasta | Al dente pasta with rich tomato sauce... |
| 🍣 Sushi | Fresh sushi rolls with premium fish... |
| 🍦 Ice Cream | Creamy soft-serve ice cream in vanilla... |

---

## 🎯 Использование:

### В MenuPage:
```tsx
const [selectedProduct, setSelectedProduct] = useState<MenuEntity | null>(null);

// Карточка товара
<MenuItemCard 
  item={item} 
  onClick={() => setSelectedProduct(item)}
/>

// Bottom Sheet
<ProductDetailSheet
  product={selectedProduct}
  isOpen={selectedProduct !== null}
  onClose={() => setSelectedProduct(null)}
/>
```

---

## 🔥 Весь функционал:

1. ✅ **Клик на карточку** → Открывается bottom sheet
2. ✅ **Просмотр деталей** → Большое фото, описание, бейджи
3. ✅ **Добавить в корзину** → Кнопка "Add to Cart"
4. ✅ **Counter появляется** → Можно менять количество
5. ✅ **Показывается subtotal** → Цена × количество
6. ✅ **Кнопка "Done"** → Закрывает sheet
7. ✅ **Badge на карточке** → "X in cart" если добавлено
8. ✅ **Кнопка меняется** → "ADD" → "VIEW"
9. ✅ **Клик на backdrop** → Закрывает sheet

---

## 📁 Созданные файлы:

```
src/
├── core/ui/
│   └── bottom-sheet.tsx              # Новый компонент ✨
├── features/menu/
│   ├── components/
│   │   ├── product-detail-sheet.tsx  # Детали товара ✨
│   │   └── index.ts                  # Экспорты
│   └── pages/menu/
│       ├── components/card/
│       │   └── index.tsx             # Обновлен ✨
│       └── index.tsx                 # Обновлен ✨
├── data/
│   └── menuData.ts                   # Добавлены описания ✨
└── types/
    └── types.ts                      # Добавлен description ✨
```

---

## 🚀 Готово!

✅ Bottom sheet работает  
✅ Описания товаров добавлены  
✅ Counter в модалке  
✅ Badge "in cart" на карточках  
✅ Анимации везде  
✅ Haptic feedback  
✅ 0 ошибок линтера  

**Попробуй:**
1. Кликни на любой товар
2. Откроется красивый bottom sheet
3. Добавь в корзину
4. Увидишь counter
5. Закрой и увидишь badge "in cart"

Харош! 🍔✨

