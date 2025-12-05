import { TON_MANIFEST_URL } from "@core/config";
import { ThemeProvider, CartProvider, TgProvider } from "@core/providers";
import { TonConnectUIProvider } from "@tonconnect/ui-react";
import { AnimatePresence } from "framer-motion";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import { CartPage } from "@/features/cart/pages";
import { CheckoutPage, SuccessPage } from "@/features/checkout/pages";
import { MenuPage } from "@/features/menu/pages";
import { StepCounter } from "@/features/pedometer/pages";
import { ProfilePage } from "@/features/profile/pages";
import { TonCheckoutPage } from "@/features/ton-checkout/pages";

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
        <Route path="/ton-checkout" element={<TonCheckoutPage />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <TgProvider>
      <TonConnectUIProvider manifestUrl={TON_MANIFEST_URL}>
        <ThemeProvider>
          <CartProvider>
            <Router>
              <AppRoutes />
            </Router>
          </CartProvider>
        </ThemeProvider>
      </TonConnectUIProvider>
    </TgProvider>
  );
}

export default App;
