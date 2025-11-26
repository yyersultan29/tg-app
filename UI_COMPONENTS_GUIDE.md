# 🎨 UI Components Guide

## 📦 Созданные компоненты:

### 1. **Card** - Карточка
### 2. **Button** - Кнопка  
### 3. **Input** - Поле ввода
### 4. **Text** - Текст
### 5. **Tooltip** - Всплывающая подсказка
### 6. **Chip** - Чип/Бейдж
### 7. **Skeleton** - Загрузка

---

## 🎯 Card

Карточка с градиентным акцентом и анимациями.

```tsx
import { Card } from "@core/ui";

// Базовая карточка
<Card>
  <h3>Заголовок</h3>
  <p>Контент карточки</p>
</Card>

// С градиентом
<Card gradient="orange">
  Карточка с оранжевым градиентом
</Card>

// С hover эффектом
<Card hover gradient="blue">
  Наведи на меня
</Card>

// Кликабельная
<Card onClick={() => alert("Click!")} hover>
  Кликабельная карточка
</Card>

// Размеры padding
<Card padding="sm">Маленький</Card>
<Card padding="md">Средний (по умолчанию)</Card>
<Card padding="lg">Большой</Card>
```

**Props:**
- `gradient`: "orange" | "green" | "blue" | "pink" | "purple"
- `hover`: boolean - hover эффект
- `padding`: "sm" | "md" | "lg"
- `onClick`: () => void

---

## 🔘 Button

Кнопка с вариантами и состояниями.

```tsx
import { Button } from "@core/ui";

// Варианты
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="outline">Outline</Button>

// Размеры
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>

// С иконкой
<Button icon="🚀">Launch</Button>

// Состояния
<Button loading>Loading...</Button>
<Button disabled>Disabled</Button>

// Full width
<Button fullWidth>Full Width Button</Button>

// Пример использования
<Button 
  variant="primary" 
  size="lg" 
  icon="✓"
  onClick={() => console.log("Clicked!")}
>
  Confirm & Pay
</Button>
```

**Props:**
- `variant`: "primary" | "secondary" | "ghost" | "outline"
- `size`: "sm" | "md" | "lg"
- `loading`: boolean
- `disabled`: boolean
- `fullWidth`: boolean
- `icon`: ReactNode

---

## 📝 Input

Поле ввода с label, error и иконкой.

```tsx
import { Input } from "@core/ui";

// Базовый input
<Input placeholder="Enter text..." />

// С label
<Input label="Email" placeholder="your@email.com" />

// С иконкой
<Input icon="📧" placeholder="Email" />

// С ошибкой
<Input 
  label="Password" 
  error="Password is required" 
  type="password" 
/>

// С подсказкой
<Input 
  label="Username" 
  helperText="At least 3 characters" 
/>

// С ref (для форм)
const inputRef = useRef<HTMLInputElement>(null);
<Input ref={inputRef} label="Name" />
```

**Props:**
- `label`: string
- `error`: string
- `helperText`: string
- `icon`: string (emoji)
- Все стандартные HTML input props

---

## 📄 Text

Типографика с вариантами.

```tsx
import { Text } from "@core/ui";

// Заголовки
<Text variant="h1">Heading 1</Text>
<Text variant="h2">Heading 2</Text>
<Text variant="h3">Heading 3</Text>

// Текст
<Text variant="body">Body text</Text>
<Text variant="caption">Caption</Text>
<Text variant="label">Label</Text>

// Цвета
<Text color="primary">Primary color</Text>
<Text color="secondary">Secondary color</Text>
<Text color="accent">Accent color</Text>
<Text color="hint">Hint color</Text>

// Вес
<Text weight="normal">Normal</Text>
<Text weight="medium">Medium</Text>
<Text weight="semibold">Semibold</Text>
<Text weight="bold">Bold</Text>

// Выравнивание
<Text align="left">Left</Text>
<Text align="center">Center</Text>
<Text align="right">Right</Text>

// Комбинация
<Text variant="h2" color="accent" weight="bold" align="center">
  Styled Heading
</Text>
```

**Props:**
- `variant`: "h1" | "h2" | "h3" | "body" | "caption" | "label"
- `color`: "primary" | "secondary" | "accent" | "hint"
- `weight`: "normal" | "medium" | "semibold" | "bold"
- `align`: "left" | "center" | "right"

---

## 💬 Tooltip

Всплывающая подсказка.

```tsx
import { Tooltip } from "@core/ui";

// Базовый tooltip
<Tooltip content="This is a tooltip">
  <button>Hover me</button>
</Tooltip>

// Позиции
<Tooltip content="Top tooltip" position="top">
  <span>Top</span>
</Tooltip>

<Tooltip content="Bottom tooltip" position="bottom">
  <span>Bottom</span>
</Tooltip>

<Tooltip content="Left tooltip" position="left">
  <span>Left</span>
</Tooltip>

<Tooltip content="Right tooltip" position="right">
  <span>Right</span>
</Tooltip>

// С иконкой
<Tooltip content="Helpful information">
  <span className="cursor-help">ℹ️</span>
</Tooltip>
```

**Props:**
- `content`: string - текст подсказки
- `position`: "top" | "bottom" | "left" | "right"

---

## 🏷️ Chip

Чип/бейдж для меток.

```tsx
import { Chip } from "@core/ui";

// Варианты
<Chip>Default</Chip>
<Chip variant="accent">Accent</Chip>
<Chip variant="success">Success</Chip>
<Chip variant="warning">Warning</Chip>
<Chip variant="error">Error</Chip>

// Размеры
<Chip size="sm">Small</Chip>
<Chip size="md">Medium</Chip>

// С иконкой
<Chip icon="✓" variant="success">Confirmed</Chip>
<Chip icon="🚚" variant="accent">Fast</Chip>

// С закрытием
<Chip onClose={() => console.log("Closed")}>
  Closeable
</Chip>

// Примеры использования
<Chip variant="accent" icon="🔥">Hot</Chip>
<Chip variant="success" icon="✓">Paid</Chip>
<Chip variant="warning" icon="⏱️">Pending</Chip>
```

**Props:**
- `variant`: "default" | "accent" | "success" | "warning" | "error"
- `size`: "sm" | "md"
- `icon`: string (emoji)
- `onClose`: () => void

---

## ⏳ Skeleton

Загрузка с анимацией.

```tsx
import { Skeleton, SkeletonCard, SkeletonList } from "@core/ui";

// Базовые варианты
<Skeleton variant="text" />
<Skeleton variant="rect" width="200px" height="100px" />
<Skeleton variant="circle" width="48px" />

// Готовая карточка
<SkeletonCard />

// Список
<SkeletonList count={5} />

// Кастомная загрузка
<div className="space-y-3">
  <Skeleton variant="rect" height="200px" />
  <Skeleton variant="text" width="80%" />
  <Skeleton variant="text" width="60%" />
  <div className="flex gap-2">
    <Skeleton variant="circle" width="32px" />
    <Skeleton variant="circle" width="32px" />
    <Skeleton variant="circle" width="32px" />
  </div>
</div>
```

**Props:**
- `variant`: "text" | "rect" | "circle"
- `width`: string
- `height`: string

---

## 🎨 Примеры композиции:

### Карточка товара:
```tsx
<Card gradient="orange" hover padding="lg">
  <div className="text-6xl mb-3">🍔</div>
  <Text variant="h3" weight="bold">Burger</Text>
  <Text color="accent" weight="bold">$4.99</Text>
  <Button fullWidth icon="➕" className="mt-3">
    Add to Cart
  </Button>
</Card>
```

### Профиль пользователя:
```tsx
<Card>
  <div className="flex items-center gap-3">
    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500" />
    <div>
      <Text weight="bold">John Doe</Text>
      <Text variant="caption" color="hint">john@example.com</Text>
    </div>
    <Chip variant="success" icon="✓" size="sm">
      Verified
    </Chip>
  </div>
</Card>
```

### Форма:
```tsx
<Card padding="lg">
  <Text variant="h2" weight="bold" className="mb-4">
    Contact Us
  </Text>
  <div className="space-y-4">
    <Input label="Name" icon="👤" placeholder="Your name" />
    <Input label="Email" icon="📧" type="email" placeholder="your@email.com" />
    <Input label="Message" icon="💬" placeholder="Your message" />
    <Button fullWidth variant="primary" icon="📨">
      Send Message
    </Button>
  </div>
</Card>
```

---

## 🎯 Использование:

```tsx
// Импорт
import { Card, Button, Input, Text, Tooltip, Chip, Skeleton } from "@core/ui";

// В компоненте
export const MyComponent = () => {
  return (
    <div className="space-y-4">
      <Card gradient="blue">
        <Text variant="h2">Hello World</Text>
        <Button variant="primary">Click Me</Button>
      </Card>
    </div>
  );
};
```

---

## 📁 Структура:

```
src/core/ui/
├── card.tsx       # Карточка
├── button.tsx     # Кнопка
├── input.tsx      # Поле ввода
├── text.tsx       # Типографика
├── tooltip.tsx    # Подсказка
├── chip.tsx       # Чип/бейдж
├── skeleton.tsx   # Загрузка
└── index.ts       # Экспорты
```

---

## ✨ Особенности:

✅ **Интеграция с темой** - автоматически используют цвета из `useTheme()`  
✅ **Анимации** - плавные переходы и Framer Motion  
✅ **TypeScript** - полная типизация  
✅ **Гибкость** - множество вариантов и props  
✅ **Консистентность** - единый стиль во всём приложении  
✅ **Доступность** - семантичная разметка  

Готово к использованию! 🚀✨

