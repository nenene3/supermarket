import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./App.css";
import { ThemeProvider } from "@/components/theme-provider";
import { BrowserRouter, Route, Routes } from "react-router";
import { store } from "./store";
import { Provider } from "react-redux";
import LandingPage from "./pages/LandingPage";
import Store from "./pages/Store";
import CartProvider from "./context/CartProvider";
import AddProduct from "./pages/AddProduct";
import AdminLayout from "./layout/AdminLayout/AdminLayout";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import AuthProvider from "./context/AuthProvider";
import Register from "./pages/Register";
import AuthLayout from "./layout/AuthLayout";
import Login from "./pages/LoginPage";
import ProtectedRoute from "./layout/ProtectedRoute";
import Cart from "./features/Cart/Cart";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Provider store={store}>
          <CartProvider>
            <BrowserRouter>
              {/* <App /> */}
              <Routes>
                <Route element={<LandingPage />} path="/">
                  <Route index element={<h1>welcome</h1>} />
                  <Route element={<ProtectedRoute />}>
                    <Route path="products" element={<Store />} />
                    <Route path="cart" element={<Cart/>}/>
                  </Route>
                </Route>
                <Route path="admin" element={<AdminLayout />}>
                  <Route index path="AddProduct" element={<AddProduct />} />
                </Route>
                <Route path="auth" element={<AuthLayout />}>
                  <Route path="register" element={<Register />} />
                  <Route path="login" element={<Login />} />
                </Route>
                <Route path="*" element={<h1>error 404</h1>} />
              </Routes>
            </BrowserRouter>
          </CartProvider>
        </Provider>
      </AuthProvider>
    </QueryClientProvider>
  </ThemeProvider>,
);
