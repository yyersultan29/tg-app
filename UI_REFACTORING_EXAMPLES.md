# 🔄 Рефакторинг существующего кода с UI компонентами

## Как заменить существующий код на UI компоненты

---

## 📦 CheckoutPage - Example

### Было:
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.1 }}
  className="rounded-2xl p-5 relative overflow-hidden"
  style={{ backgroundColor: theme.secondaryBgColor }}
>
  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 rounded-t-2xl"></div>
  
  <div className="flex items-center justify-between mb-5 mt-1">
    <h2 className="text-base font-bold flex items-center gap-2" style={{ color: theme.textColor }}>
      <span>📦</span>
      <span>Your Order</span>
    </h2>
    <div className="flex items-center gap-1.5">
      <span className="text-xs px-2.5 py-1 rounded-full font-medium" style={{ 
        backgroundColor: theme.linkColor + '20',
        color: theme.linkColor 
      }}>
        {items.length} {items.length === 1 ? 'item' : 'items'}
      </span>
    </div>
  </div>
  
  {/* content */}
</motion.div>
```

### Стало:
```tsx
import { Card, Text, Chip } from "@core/ui";

<Card gradient="orange" padding="lg">
  <div className="flex items-center justify-between mb-5">
    <Text variant="body" weight="bold">
      📦 Your Order
    </Text>
    <Chip variant="accent" size="sm">
      {items.length} {items.length === 1 ? 'item' : 'items'}
    </Chip>
  </div>
  
  {/* content */}
</Card>
```

**Экономия:** ~15 строк на каждую карточку!

---

## 🔘 Buttons - Example

### Было:
```tsx
<motion.button
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
  onClick={handleConfirm}
  className="w-full py-4 rounded-xl font-bold text-base shadow-xl relative overflow-hidden"
  style={{ 
    backgroundColor: theme.buttonColor,
    color: theme.buttonTextColor 
  }}
>
  <motion.div
    animate={{
      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
    }}
    transition={{
      duration: 2.5,
      repeat: Infinity,
      ease: 'linear'
    }}
    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent"
    style={{ backgroundSize: '200% 100%' }}
  />
  <span className="relative z-10 flex items-center justify-center gap-2">
    <span>✓</span>
    <span>Confirm & Pay ${finalTotal.toFixed(2)}</span>
  </span>
</motion.button>
```

### Стало:
```tsx
import { Button } from "@core/ui";

<Button 
  fullWidth 
  variant="primary" 
  size="lg"
  icon="✓"
  onClick={handleConfirm}
>
  Confirm & Pay ${finalTotal.toFixed(2)}
</Button>
```

**Экономия:** ~20 строк!

---

## 🏷️ Chips/Badges - Example

### Было:
```tsx
<span className="text-xs px-2.5 py-1 rounded-full font-medium" style={{ 
  backgroundColor: theme.linkColor + '20',
  color: theme.linkColor 
}}>
  {items.length} items
</span>
```

### Стало:
```tsx
<Chip variant="accent" size="sm">
  {items.length} items
</Chip>
```

---

## 📝 Text - Example

### Было:
```tsx
<h2 className="text-base font-bold mb-3" style={{ color: theme.textColor }}>
  Payment Summary
</h2>

<p className="text-xs" style={{ color: theme.hintColor }}>
  Subtotal: ${total.toFixed(2)}
</p>
```

### Стало:
```tsx
<Text variant="body" weight="bold" className="mb-3">
  Payment Summary
</Text>

<Text variant="label" color="hint">
  Subtotal: ${total.toFixed(2)}
</Text>
```

---

## 🎯 CartPage - Полный пример

### Было (~50 строк на header):
```tsx
<motion.div 
  initial={{ y: -50, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  className="sticky top-0 z-10 px-5 py-3 backdrop-blur-lg"
  style={{ 
    backgroundColor: theme.bgColor + 'f0',
    borderBottom: `1px solid ${theme.hintColor}20`
  }}
>
  <div className="flex items-center gap-3">
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => navigate('/')}
      className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-white/10 transition-colors"
      style={{ color: theme.textColor }}
    >
      <span className="text-xl">←</span>
    </motion.button>
    <div className="flex-1">
      <h1 className="text-lg font-bold" style={{ color: theme.textColor }}>
        Cart
      </h1>
      {items.length > 0 && (
        <p className="text-xs" style={{ color: theme.hintColor }}>
          {items.length} {items.length === 1 ? 'item' : 'items'}
        </p>
      )}
    </div>
  </div>
</motion.div>
```

### Стало (~5 строк):
```tsx
import { PageLayout } from "@core/layouts";
import { Text } from "@core/ui";

<PageLayout 
  title="Cart" 
  subtitle={`${items.length} ${items.length === 1 ? 'item' : 'items'}`}
  showBackButton 
  backPath="/"
>
  {/* content */}
</PageLayout>
```

---

## 🎨 Преимущества рефакторинга:

### До рефакторинга:
- 🔴 ~100 строк кода на страницу
- 🔴 Повторяющиеся стили
- 🔴 Ручное управление темой
- 🔴 Много дублированного кода

### После рефакторинга:
- ✅ ~30 строк кода на страницу
- ✅ Переиспользуемые компоненты
- ✅ Автоматическая тема
- ✅ Чистый и читаемый код

**Итого:** Экономия ~70% кода! 🎉

---

## 📋 План рефакторинга:

### 1. CheckoutPage
- [ ] Заменить карточки на `<Card>`
- [ ] Заменить кнопку на `<Button>`
- [ ] Заменить текст на `<Text>`
- [ ] Заменить бейджи на `<Chip>`

### 2. CartPage
- [ ] Использовать `<PageLayout>`
- [ ] Заменить карточки на `<Card>`
- [ ] Заменить кнопки на `<Button>`
- [ ] Заменить текст на `<Text>`

### 3. MenuPage
- [ ] Заменить карточки на `<Card>`
- [ ] Заменить кнопки на `<Button>`
- [ ] Добавить `<Tooltip>` для информации

### 4. MenuItemCard
- [ ] Полностью переписать на `<Card>` и `<Button>`

---

## 🚀 Быстрый старт:

```tsx
// Импорт всех компонентов
import { Card, Button, Input, Text, Tooltip, Chip, Skeleton } from "@core/ui";
import { PageLayout } from "@core/layouts";
import { useCart, useTheme } from "@core/providers";

// Используй!
export const MyPage = () => {
  const { cart } = useCart();
  
  return (
    <PageLayout title="My Page" showBackButton>
      <div className="px-5 py-5 space-y-4">
        <Card gradient="blue" padding="lg">
          <Text variant="h2" weight="bold">
            Hello World
          </Text>
          <Button variant="primary" fullWidth icon="🚀">
            Click Me
          </Button>
        </Card>
      </div>
    </PageLayout>
  );
};
```

Готово! 🎊

