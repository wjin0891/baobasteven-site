import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import BusinessForSale from "./pages/BusinessForSale";
import IndustrialWarehouse from "./pages/IndustrialWarehouse";
import OfficeRetail from "./pages/OfficeRetail";
import SuccessStories from "./pages/SuccessStories";
import MarketInsights from "./pages/MarketInsights";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ListingDetail from "./pages/ListingDetail";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/business-for-sale" component={BusinessForSale} />
      <Route path="/industrial-warehouse" component={IndustrialWarehouse} />
      <Route path="/office-retail" component={OfficeRetail} />
      <Route path="/success-stories" component={SuccessStories} />
      <Route path="/market-insights" component={MarketInsights} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route path="/listing/:id" component={ListingDetail} />
      <Route path="/404" component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
