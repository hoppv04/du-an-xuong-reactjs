import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import instance from "./axios/index";
import Home from "./pages/Home";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import ProductDetail from "./pages/ProductDetail";
import Dashboard from "./pages/admin/Dashboard";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    try {
      (async () => {
        const { data } = await instance.get("/products");
        setProducts(data);
      })();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home data={products} />} />
          <Route path="/about" element={<About />} />
          <Route path="/product-detail/:id" element={<ProductDetail />} />
          <Route path="/admin" element={<Dashboard data={products} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
