# 🎨 shadcn/ui Components - Telegram Theme Edition

## ✅ Что установлено:

### Зависимости:
- ✅ `class-variance-authority` - для вариантов компонентов
- ✅ `clsx` - для условных классов
- ✅ `tailwind-merge` - для мержа Tailwind классов
- ✅ `lucide-react` - иконки (опционально)

### Утилиты:
- ✅ `src/lib/utils.ts` - функция `cn()` для классов
- ✅ `src/core/providers/css-vars-provider.tsx` - CSS переменные из Telegram

### CSS Variables (автоматически из Telegram):
```css
--bg-color
--text-color
--hint-color
--link-color
--button-color
--button-text-color
--secondary-bg
```

---

## 📦 Созданные компоненты:

### 1. **Button**
```tsx
import { Button } from "@core/ui";

// Варианты
<Button variant="default">Default</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="outline">Outline</Button>
<Button variant="link">Link</Button>

// Размеры
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>

// С иконкой
<Button icon="🚀">Launch</Button>

// Loading
<Button loading>Loading...</Button>

// Disabled
<Button disabled>Disabled</Button>

// Полная кнопка
<Button 
  variant="default" 
  size="lg" 
  icon="✓"
  className="w-full"
  onClick={() => console.log("Clicked!")}
>
  Confirm & Pay $10.67
</Button>
```

### 2. **Card**
```tsx
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter 
} from "@core/ui";

// Базовая карточка
<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description</CardDescription>
  </CardHeader>
  <CardContent>
    Content here
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>

// С градиентом
<Card gradient="orange">
  <CardContent>
    Карточка с оранжевым градиентом сверху
  </CardContent>
</Card>

// С hover эффектом
<Card hover gradient="blue">
  Наведи на меня
</Card>

// Варианты
<Card variant="default">Default</Card>
<Card variant="bordered">Bordered</Card>
<Card variant="elevated">Elevated</Card>

// Padding
<Card padding="none">No padding</Card>
<Card padding="sm">Small</Card>
<Card padding="md">Medium</Card>
<Card padding="lg">Large</Card>
```

### 3. **Input**
```tsx
import { Input } from "@core/ui";

// Базовый
<Input placeholder="Enter text..." />

// С иконкой
<Input icon="📧" placeholder="Email" type="email" />

// С ошибкой
<Input 
  icon="🔒" 
  placeholder="Password" 
  type="password"
  error="Password is required" 
/>

// С подсказкой
<Input 
  placeholder="Username" 
  helperText="At least 3 characters" 
/>

// Disabled
<Input disabled placeholder="Disabled input" />
```

### 4. **Badge (Chip)**
```tsx
import { Badge } from "@core/ui";

// Варианты
<Badge>Default</Badge>
<Badge variant="accent">Accent</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="error">Error</Badge>
<Badge variant="outline">Outline</Badge>

// С иконкой
<Badge icon="✓" variant="success">Paid</Badge>
<Badge icon="🚚" variant="accent">Fast</Badge>

// С закрытием
<Badge onClose={() => console.log("Closed")}>
  Closeable
</Badge>

// В реальном использовании
<Badge variant="accent" icon="🔥">
  Hot Deal
</Badge>
```

### 5. **Skeleton**
```tsx
import { Skeleton } from "@core/ui";

// Варианты
<Skeleton variant="text" className="w-full" />
<Skeleton variant="rect" className="w-full h-32" />
<Skeleton variant="circle" className="w-12 h-12" />

// Карточка товара (loading)
<div className="space-y-3">
  <Skeleton variant="rect" className="w-full h-48" />
  <Skeleton variant="text" className="w-3/4" />
  <Skeleton variant="text" className="w-1/2" />
</div>

// Список
<div className="space-y-3">
  {[1, 2, 3].map((i) => (
    <div key={i} className="flex items-center gap-3">
      <Skeleton variant="circle" className="w-12 h-12" />
      <div className="flex-1 space-y-2">
        <Skeleton variant="text" className="w-3/4" />
        <Skeleton variant="text" className="w-1/2" />
      </div>
    </div>
  ))}
</div>
```

---

## 🎨 Интеграция с Telegram Theme

Все компоненты автоматически используют цвета из Telegram через CSS Variables:

```tsx
// ThemeProvider устанавливает CSS переменные
<ThemeProvider>
  <CssVarsProvider>
    {/* Все компоненты автоматически получают цвета */}
    <Button>Кнопка с цветом из Telegram</Button>
  </CssVarsProvider>
</ThemeProvider>
```

---

## 🔧 Кастомизация:

### Цвета через className:
```tsx
<Button className="bg-purple-600 text-white">
  Custom Purple
</Button>

<Card className="bg-gradient-to-r from-blue-500 to-purple-500">
  Gradient Card
</Card>
```

### Размеры через className:
```tsx
<Button className="h-14 px-8 text-lg">
  Large Custom Button
</Button>
```

### Добавление анимаций:
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
>
  <Card>
    Animated Card
  </Card>
</motion.div>
```

---

## 📋 Практические примеры:

### Checkout карточка:
```tsx
<Card gradient="green" padding="lg">
  <CardHeader className="mt-1">
    <CardTitle className="text-base">💰 Payment Summary</CardTitle>
  </CardHeader>
  <CardContent>
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-[var(--hint-color)]">Subtotal</span>
        <span className="font-semibold">$10.00</span>
      </div>
      <div className="flex justify-between text-sm">
        <span className="text-[var(--hint-color)]">Tax</span>
        <Badge variant="default" icon="📊">10%</Badge>
        <span className="font-semibold">$1.00</span>
      </div>
    </div>
  </CardContent>
  <CardFooter className="pt-3 border-t border-[var(--hint-color)]/20">
    <div className="flex justify-between w-full text-xl font-bold">
      <span>Total</span>
      <span className="text-[var(--link-color)]">$11.00</span>
    </div>
  </CardFooter>
</Card>
```

### Форма с Input:
```tsx
<Card padding="lg">
  <CardHeader>
    <CardTitle>Contact Form</CardTitle>
    <CardDescription>Send us a message</CardDescription>
  </CardHeader>
  <CardContent className="space-y-4">
    <Input icon="👤" placeholder="Your name" />
    <Input icon="📧" type="email" placeholder="Email" />
    <Input icon="💬" placeholder="Message" />
  </CardContent>
  <CardFooter>
    <Button className="w-full" icon="📨">
      Send Message
    </Button>
  </CardFooter>
</Card>
```

### Список с Badge:
```tsx
<Card>
  <CardHeader>
    <div className="flex items-center justify-between">
      <CardTitle>Your Order</CardTitle>
      <Badge variant="accent" icon="📦">
        3 items
      </Badge>
    </div>
  </CardHeader>
  <CardContent>
    {/* content */}
  </CardContent>
</Card>
```

---

## 🎯 Преимущества shadcn/ui:

✅ **Copy-paste approach** - код в твоем проекте  
✅ **Полный контроль** - можешь менять что угодно  
✅ **TypeScript** - полная типизация  
✅ **Tailwind CSS** - привычный подход  
✅ **Framer Motion** - анимации из коробки  
✅ **CSS Variables** - интеграция с Telegram темой  
✅ **class-variance-authority** - типобезопасные варианты  

---

## 📁 Структура:

```
src/
├── lib/
│   └── utils.ts              # cn() функция
├── core/
│   ├── ui/
│   │   ├── button.tsx        # Button компонент
│   │   ├── button-variants.ts # Варианты
│   │   ├── card.tsx          # Card + subcomponents
│   │   ├── input.tsx         # Input
│   │   ├── badge.tsx         # Badge (Chip)
│   │   ├── badge-variants.ts # Варианты
│   │   ├── skeleton.tsx      # Skeleton
│   │   └── index.ts          # Экспорты
│   └── providers/
│       ├── css-vars-provider.tsx # CSS переменные
│       └── theme-provider.tsx    # Обновлен
```

---

## 🚀 Быстрый старт:

```tsx
import { Card, CardHeader, CardTitle, CardContent, Button, Badge } from "@core/ui";

export const MyComponent = () => {
  return (
    <Card gradient="blue" padding="lg">
      <CardHeader className="mt-1">
        <div className="flex items-center justify-between">
          <CardTitle>🍔 Burger King</CardTitle>
          <Badge variant="success" icon="✓">Open</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-[var(--hint-color)]">
          Order your favorite food
        </p>
        <Button className="w-full" icon="🛒">
          View Menu
        </Button>
      </CardContent>
    </Card>
  );
};
```

---

## 💡 Советы:

1. **Используй CSS Variables** для цветов темы:
   ```tsx
   <div className="text-[var(--text-color)]">Text</div>
   <div className="bg-[var(--secondary-bg)]">Background</div>
   ```

2. **Комбинируй с Tailwind**:
   ```tsx
   <Button className="mt-4 shadow-2xl">Custom Button</Button>
   ```

3. **Добавляй анимации**:
   ```tsx
   <motion.div whileHover={{ scale: 1.05 }}>
     <Card>Animated Card</Card>
   </motion.div>
   ```

4. **Используй cn() для условных классов**:
   ```tsx
   import { cn } from "@/lib/utils";
   
   <Button className={cn(
     "w-full",
     isActive && "ring-2",
     isDisabled && "opacity-50"
   )}>
     Button
   </Button>
   ```

---

## 🎉 Готово!

Все компоненты:
- ✅ Работают с Telegram темой
- ✅ Имеют анимации
- ✅ Полностью типизированы
- ✅ Гибкие и кастомизируемые
- ✅ Без ошибок линтера

Начинай использовать! 🚀✨

