import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { CartProvider } from "./contexts/CartContext";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import DecorativeChip from "./pages/DecorativeChip";
import MetallicAdditive from "./pages/MetallicAdditive";
import UTints from "./pages/UTints";
import PolyTints from "./pages/PolyTints";
import SlipResistant from "./pages/SlipResistant";
import Contact from "./pages/Contact";
import Training from "./pages/Training";
import Systems from "@/pages/Systems";
import SystemCategory from "@/pages/SystemCategory";
import SystemDetail from "@/pages/SystemDetail";
import Industries from "./pages/Industries";
import Gallery from "./pages/Gallery";
import About from "./pages/About";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import GarageSolutions from "./pages/GarageSolutions";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/products" component={Products} />
      <Route path={"/products/decorative-chip"} component={DecorativeChip} />
      <Route path={"/products/metallic-additive"} component={MetallicAdditive} />
      <Route path={"/products/u-tints"} component={UTints} />
      <Route path={"/products/polytints"} component={PolyTints} />
      <Route path={"/products/slip-resistant"} component={SlipResistant} />      <Route path="/products/:id" component={ProductDetail} />
      <Route path="/contact" component={Contact} />
      <Route path="/training" component={Training} />
      <Route path="/systems" component={Systems} />
      <Route path="/systems/:categoryId" component={SystemCategory} />
      <Route path="/systems/:categoryId/:systemId" component={SystemDetail} />
      <Route path="/industries" component={Industries} />
      <Route path="/gallery" component={Gallery} />
      <Route path="/about" component={About} />
      <Route path="/privacy" component={PrivacyPolicy} />
      <Route path="/terms" component={TermsOfService} />
      <Route path="/garage-solutions" component={GarageSolutions} />
      <Route path="/cart" component={Cart} />
      <Route path="/checkout" component={Checkout} />
      <Route path="/order-confirmation" component={OrderConfirmation} />
      <Route path="/404" component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <CartProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </CartProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
