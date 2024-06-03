import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import instance from "../axios";
import authSchema from "../schemaValid/authSchema";
import { useNavigate } from "react-router-dom";

const AuthForm = ({ isRegister }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(authSchema) });

  const navigate = useNavigate();

  const onSubmitForm = async (data) => {
    try {
      if (isRegister) {
        const res = await instance.post("/register", data);
        if (res.status === 201) {
          alert(res.statusText);
          navigate("/login");
          reset();
        }
      } else {
        const res = await instance.post("/login", data);
        if (res.status === 200) {
          alert("Login in successfully!");
          navigate("/");
          reset();
        }
      }
    } catch (error) {
      alert(error?.response?.data);
    }
  };

  return (
    <div>
      <div className="container mt-header d-flex flex-column justify-content-center align-items-center">
        <form
          className="w-50 border border-secondary-subtle p-3 rounded-1 shadow mt-2"
          onSubmit={handleSubmit(onSubmitForm)}
        >
          <h2 className="text-center">{isRegister ? "Register" : "Login"}</h2>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email:
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              {...register("email", { required: true })}
            />
            {errors.email?.message && (
              <p className="text-danger">{errors.email?.message}</p>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password:
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              {...register("password", { required: true })}
            />
            {errors.password?.message && (
              <p className="text-danger">{errors.password?.message}</p>
            )}
          </div>
          <button className="btn btn-secondary w-100">
            {isRegister ? "Register" : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
