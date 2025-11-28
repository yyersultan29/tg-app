import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import { ThemeProvider, CartProvider, TgProvider } from "@core/providers";

import { MenuPage } from "@/features/menu/pages";
import { CartPage } from "@/features/cart/pages";
import { ProfilePage } from "@/features/profile/pages";
import { CheckoutPage, SuccessPage } from "@/features/checkout/pages";
import { StepCounter } from "@/features/pedometer/pages";

function AppRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<MenuPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/pedometer" element={<StepCounter />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <TgProvider>
      <ThemeProvider>
        <CartProvider>
          <Router>
            <AppRoutes />
          </Router>
        </CartProvider>
      </ThemeProvider>
    </TgProvider>
  );
}

export default App;
