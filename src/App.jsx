import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import instance, { getProducts } from "./axios/index";
import Home from "./pages/Home";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import ProductDetail from "./pages/ProductDetail";
import Dashboard from "./pages/admin/Dashboard";
import ProductForm from "./pages/admin/ProductForm";

function App() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await instance.get("/products");
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const handleSubmitForm = (data) => {
    (async () => {
      try {
        if (data.id) {
          await instance.patch(`products/${data.id}`, data);
          const newData = await getProducts();
          setProducts(newData);
        } else {
          const res = await instance.post("/products", data);
          setProducts([...products, res.data]);
        }

        if (confirm("Successfully, redirect to admin page!")) {
          navigate("/admin");
        }
      } catch (error) {
        console.log(error);
      }
    })();
  };

  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home data={products} />} />
          <Route path="/about" element={<About />} />
          <Route path="/product-detail/:id" element={<ProductDetail />} />
          <Route path="/admin" element={<Dashboard data={products} />} />
          <Route
            path="/admin/product-form/:id"
            element={<ProductForm handleSubmitForm={handleSubmitForm} />}
          />
          <Route
            path="/admin/product-form/"
            element={<ProductForm handleSubmitForm={handleSubmitForm} />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
