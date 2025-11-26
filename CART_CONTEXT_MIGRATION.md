# 🛒 Миграция на CartContext

## ✅ Что создано:

### 1. CartProvider (`src/core/providers/cart-provider.tsx`)
Провайдер с логикой корзины

### 2. useCart hook (`src/core/providers/use-cart.ts`)
Хук для доступа к корзине из любого компонента

### 3. App.tsx обновлен
Удалена вся логика корзины, добавлен `CartProvider`

---

## 📝 Как обновить страницы:

### MenuPage

**Было:**
```tsx
interface MenuPageProps {
  cart: CartItem[];
  onAddToCart: (item: MenuItem) => void;
}

export const MenuPage = ({ cart, onAddToCart }: MenuPageProps) => {
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  
  return (
    <div>
      {/* используем cart и onAddToCart из props */}
      <button onClick={() => onAddToCart(item)}>Add</button>
    </div>
  );
};
```

**Стало:**
```tsx
import { useCart } from "@core/providers";

export const MenuPage = () => {
  const { cart, addToCart } = useCart();
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  
  return (
    <div>
      {/* используем cart и addToCart из контекста */}
      <button onClick={() => addToCart(item)}>Add</button>
    </div>
  );
};
```

---

### CartPage

**Было:**
```tsx
interface CartPageProps {
  items: CartItem[];
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemove: (id: number) => void;
}

export const CartPage = ({ items, onUpdateQuantity, onRemove }: CartPageProps) => {
  return (
    <div>
      {items.map(item => (
        <div key={item.id}>
          <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}>+</button>
          <button onClick={() => onRemove(item.id)}>Remove</button>
        </div>
      ))}
    </div>
  );
};
```

**Стало:**
```tsx
import { useCart } from "@core/providers";

export const CartPage = () => {
  const { cart, updateQuantity, removeFromCart } = useCart();
  
  return (
    <div>
      {cart.map(item => (
        <div key={item.id}>
          <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
          <button onClick={() => removeFromCart(item.id)}>Remove</button>
        </div>
      ))}
    </div>
  );
};
```

---

### CheckoutPage

**Было:**
```tsx
interface CheckoutPageProps {
  items: CartItem[];
  onConfirm: () => void;
}

export const CheckoutPage = ({ items, onConfirm }: CheckoutPageProps) => {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  
  return (
    <div>
      <p>Total: ${total}</p>
      <button onClick={onConfirm}>Confirm</button>
    </div>
  );
};
```

**Стало:**
```tsx
import { useCart } from "@core/providers";
import { useNavigate } from "react-router-dom";

export const CheckoutPage = () => {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  
  const handleConfirm = () => {
    clearCart();
    navigate('/success');
  };
  
  return (
    <div>
      <p>Total: ${total}</p>
      <button onClick={handleConfirm}>Confirm</button>
    </div>
  );
};
```

---

## 🎯 API useCart:

```typescript
const {
  cart,              // CartEntity[] - массив товаров в корзине
  addToCart,         // (item: MenuEntity) => void
  updateQuantity,    // (id: number, quantity: number) => void
  removeFromCart,    // (id: number) => void
  clearCart,         // () => void
} = useCart();
```

---

## 📋 Чек-лист миграции:

### MenuPage:
- [ ] Удалить `MenuPageProps` interface
- [ ] Удалить props из сигнатуры функции
- [ ] Добавить `import { useCart } from "@core/providers"`
- [ ] Добавить `const { cart, addToCart } = useCart()`
- [ ] Заменить все `onAddToCart` на `addToCart`

### CartPage:
- [ ] Удалить `CartPageProps` interface
- [ ] Удалить props из сигнатуры функции
- [ ] Добавить `import { useCart } from "@core/providers"`
- [ ] Добавить `const { cart, updateQuantity, removeFromCart } = useCart()`
- [ ] Заменить `items` на `cart`
- [ ] Заменить `onUpdateQuantity` на `updateQuantity`
- [ ] Заменить `onRemove` на `removeFromCart`

### CheckoutPage:
- [ ] Удалить `CheckoutPageProps` interface
- [ ] Удалить props из сигнатуры функции
- [ ] Добавить `import { useCart } from "@core/providers"`
- [ ] Добавить `const { cart, clearCart } = useCart()`
- [ ] Заменить `items` на `cart`
- [ ] Заменить `onConfirm` на `clearCart` + navigate

---

## 💪 Преимущества:

✅ **Нет prop drilling** - не нужно пробрасывать через все компоненты  
✅ **Чище код** - страницы без лишних props  
✅ **Легче тестировать** - можно мокать провайдер  
✅ **Единое место** - вся логика корзины в одном месте  
✅ **Переиспользуемость** - useCart() в любом компоненте  

---

## 🎨 Структура:

```
src/core/providers/
├── cart-context.ts      # Контекст
├── cart-provider.tsx    # Провайдер с логикой
├── use-cart.ts          # Хук useCart
├── theme-context.ts     # Контекст темы
├── theme-provider.tsx   # Провайдер темы
├── use-theme.ts         # Хук useTheme
└── index.ts             # Экспорты
```

---

## 🚀 После миграции:

1. Удалите неиспользуемые интерфейсы пропсов
2. Страницы станут проще и чище
3. Можно использовать `useCart()` в любых вложенных компонентах
4. App.tsx станет минималистичным (~40 строк вместо 120)

**Экономия:** ~80 строк в App.tsx + упрощение всех страниц! 🎉

