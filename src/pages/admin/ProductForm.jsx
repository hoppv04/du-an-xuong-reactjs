/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import productSchema from "./../../schemaValid/productSchema";
import instance from "../../axios";

const ProductForm = ({ handleSubmitForm }) => {
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(productSchema) });

  useEffect(() => {
    if (id) {
      (async () => {
        try {
          const { data } = await instance.get(`products/${id}`);
          reset(data);
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [id, reset]);

  const onSubmitForm = (data) => {
    handleSubmitForm({ ...data, id });
  };

  return (
    <div>
      <div className="container mt-header d-flex flex-column justify-content-center align-items-center">
        <h2>{id ? "Edit product" : "Add a new product"}</h2>
        <form
          className="w-50 border border-secondary-subtle p-3 rounded-1 shadow mt-2"
          onSubmit={handleSubmit(onSubmitForm)}
        >
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title:
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              {...register("title", { required: true })}
            />
            {errors.title?.message && (
              <p className="text-danger">{errors.title?.message}</p>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="price" className="form-label">
              Price:
            </label>
            <input
              type="text"
              className="form-control"
              id="price"
              {...register("price", { required: true, valueAsNumber: true })}
            />
            {errors.price?.message && (
              <p className="text-danger">{errors.price?.message}</p>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description:
            </label>
            <input
              type="text"
              className="form-control"
              id="description"
              {...register("description")}
            />
            {errors.description?.message && (
              <p className="text-danger">{errors.description?.message}</p>
            )}
          </div>

          {id ? (
            <button className="btn btn-warning w-100">Update</button>
          ) : (
            <button className="btn btn-info w-100">Add</button>
          )}
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
