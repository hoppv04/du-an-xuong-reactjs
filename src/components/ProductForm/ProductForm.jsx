import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import instance from "../../axios";
import productSchema from "../../schemaValid/productSchema";
import { ProductContext } from "../../contexts/ProductContext";

const { VITE_CLOUD_NAME, VITE_UPLOAD_PRESET } = import.meta.env;

const ProductForm = () => {
  const { id } = useParams();
  const { dispatch } = useContext(ProductContext);
  const navigate = useNavigate();
  const [thumbnailUrl, setThumbnailUrl] = useState(null);
  const [thumbnailOption, setThumbnailOption] = useState("keep");

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
          setThumbnailUrl(data.thumbnail);
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [id, reset]);

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", VITE_UPLOAD_PRESET);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${VITE_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await res.json();
    console.log(data);
    return data.secure_url;
  };

  const handleSubmitForm = async (data) => {
    try {
      let updateProduct = { ...data };
      switch (thumbnailOption) {
        case "upload":
          if (data.thumbnail && data.thumbnail[0]) {
            const thumbnailUrl = await uploadImage(data.thumbnail[0]);
            updateProduct = { ...updateProduct, thumbnail: thumbnailUrl };
          }
          break;
        default:
      }

      if (id) {
        await instance.patch(`products/${id}`, updateProduct);
        dispatch({
          type: "EDIT_PRODUCT",
          payload: { id, data: updateProduct },
        });
      } else {
        const { data: newProduct } = await instance.post(
          "products",
          updateProduct
        );
        dispatch({ type: "ADD_PRODUCT", payload: newProduct });
      }

      if (confirm("Successfully, redirect to admin page!")) {
        navigate("/admin");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="container mt-header d-flex flex-column justify-content-center align-items-center">
        <h2>{id ? "Edit product" : "Add a new product"}</h2>
        <form
          className="w-50 border border-secondary-subtle p-3 rounded-1 shadow mt-2"
          onSubmit={handleSubmit((data) => handleSubmitForm(data))}
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
          <div className="mb-3">
            <label htmlFor="thumbnailOption" className="form-label">
              Choose Thumbnail Option
            </label>
            <select
              className="form-control"
              id="thumbnailOption"
              value={thumbnailOption}
              onChange={(e) => setThumbnailOption(e.target.value)}
            >
              <option value="keep">Keep Current Thumbnail</option>
              <option value="link">Add Thumbnail from Link</option>
              <option value="upload">Upload Thumbnail from Local</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="thumbnail" className="form-label">
              Thumbnail
            </label>
            {thumbnailOption === "link" && (
              <input
                type="text"
                className="form-control"
                id="thumbnail"
                {...register("thumbnail")}
              />
            )}
            {thumbnailOption === "upload" && (
              <input
                type="file"
                className="form-control"
                id="thumbnail"
                {...register("thumbnail", { required: true })}
              />
            )}
            {errors.thumbnail?.message && (
              <p className="text-danger">{errors.thumbnail?.message}</p>
            )}
            {thumbnailUrl && (
              <img
                src={thumbnailUrl}
                alt="Product Thumbnail"
                style={{ maxWidth: "200px", marginTop: "10px" }}
              />
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
