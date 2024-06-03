import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import instance, { getProducts } from "../axios";

export const AppContext = createContext({});

export const AppProvider = ({ children }) => {
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
    <AppContext.Provider
      value={{ products, setProducts, handleSubmitForm, handleDeleteProduct }}
    >
      {children}
    </AppContext.Provider>
  );
};
