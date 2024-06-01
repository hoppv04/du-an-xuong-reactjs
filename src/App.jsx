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
import Register from "./pages/Register";
import Login from "./pages/Login";

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

  const handleSubmitForm = async (data) => {
    try {
      if (data.id) {
        await instance.patch(`products/${data.id}`, data);
        const newData = await getProducts();
        setProducts(newData);
      } else {
        const res = await instance.post("products", data);
        setProducts([...products, res.data]);
      }

      if (confirm("Successfully, redirect to admin page!")) {
        navigate("/admin");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (id) {
      try {
        const confirmDelete = window.confirm(
          "Are you sure you want to delete it?"
        );
        if (confirmDelete) {
          await instance.delete(`products/${id}`);
          const newData = products.filter(
            (product) => product.id !== id && product
          );
          setProducts(newData);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home data={products} />} />
          <Route path="/about" element={<About />} />
          <Route path="/product-detail/:id" element={<ProductDetail />} />
          <Route
            path="/admin"
            element={
              <Dashboard
                data={products}
                handleDeleteProduct={handleDeleteProduct}
              />
            }
          />
          <Route
            path="/admin/product-form/:id"
            element={<ProductForm handleSubmitForm={handleSubmitForm} />}
          />
          <Route
            path="/admin/product-form/"
            element={<ProductForm handleSubmitForm={handleSubmitForm} />}
          />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
