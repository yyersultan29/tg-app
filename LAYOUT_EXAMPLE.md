# 🎨 Использование PageLayout

## ✅ Что создано:

### 1. PageLayout компонент (`src/core/layouts/page-layout.tsx`)

Унифицированный layout с:
- ✅ Header с кнопкой назад
- ✅ Анимациями (fade in/out)
- ✅ Темой из провайдера
- ✅ Backdrop blur эффектами

### 2. Исправлены анимации в App.tsx

Добавлен `key={location.pathname}` для корректных переходов между страницами.

---

## 📝 Как использовать:

### Было (повторяющийся код):

```tsx
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useTelegramTheme } from "@core/hooks";

export const CartPage = () => {
  const navigate = useNavigate();
  const theme = useTelegramTheme();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen"
      style={{ backgroundColor: theme.bgColor }}
    >
      {/* Header */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-10 px-5 py-3 backdrop-blur-lg"
        style={{
          backgroundColor: theme.bgColor + "f0",
          borderBottom: `1px solid ${theme.hintColor}20`,
        }}
      >
        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate("/")}
            className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-white/10 transition-colors"
            style={{ color: theme.textColor }}
          >
            <span className="text-xl">←</span>
          </motion.button>
          <div>
            <h1 className="text-lg font-bold" style={{ color: theme.textColor }}>
              Cart
            </h1>
            <p className="text-xs" style={{ color: theme.hintColor }}>
              {items.length} items
            </p>
          </div>
        </div>
      </motion.div>

      {/* Content */}
      <div className="px-5 py-5">
        {/* ваш контент */}
      </div>
    </motion.div>
  );
};
```

### Стало (чистый код):

```tsx
import { PageLayout } from "@core/layouts";

export const CartPage = ({ items }) => {
  return (
    <PageLayout
      title="Cart"
      subtitle={`${items.length} items`}
      showBackButton
      backPath="/"
    >
      {/* Content */}
      <div className="px-5 py-5">
        {/* ваш контент - только логика страницы! */}
      </div>
    </PageLayout>
  );
};
```

---

## 🎯 Props для PageLayout:

```typescript
interface PageLayoutProps {
  children: ReactNode;        // Контент страницы
  title: string;              // Заголовок в header
  subtitle?: string;          // Подзаголовок (опционально)
  showBackButton?: boolean;   // Показать кнопку назад
  backPath?: string;          // Путь для кнопки назад (по умолчанию navigate(-1))
}
```

---

## 📋 Примеры для всех страниц:

### CartPage:
```tsx
<PageLayout
  title="Cart"
  subtitle={`${items.length} items`}
  showBackButton
  backPath="/"
>
  {/* контент */}
</PageLayout>
```

### CheckoutPage:
```tsx
<PageLayout
  title="Checkout"
  subtitle="Review your order"
  showBackButton
  backPath="/cart"
>
  {/* контент */}
</PageLayout>
```

### MenuPage (без кнопки назад):
```tsx
<PageLayout title="Menu" subtitle="Choose your favorites">
  {/* контент */}
</PageLayout>
```

### SuccessPage (без header):
Можно не использовать Layout, или создать другой вариант без header.

---

## 🎨 Что удалить из страниц:

1. ❌ `import { motion } from "framer-motion"`
2. ❌ `import { useNavigate } from "react-router-dom"`
3. ❌ `import { useTelegramTheme } from "@core/hooks"`
4. ❌ Весь код header
5. ❌ Обертки `<motion.div>`
6. ❌ Логику навигации

Оставить только:
- ✅ Логику страницы
- ✅ Контент
- ✅ Обработчики событий

---

## 📊 Результат:

**Было:** ~100 строк на каждую страницу (header + анимации + тема)  
**Стало:** ~5 строк (только props для Layout)

**Экономия:** ~95 строк × 4 страницы = **380 строк кода!** 🎉

---

## 🚀 Следующие шаги:

1. Обновите импорты на всех страницах
2. Удалите дублирующийся код header
3. Оберните контент в `<PageLayout>`
4. Наслаждайтесь чистым кодом! ✨

