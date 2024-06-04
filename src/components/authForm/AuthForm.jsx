import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import instance from "../../axios";
import authSchema from "../../schemaValid/authSchema";
import styles from "./AuthForm.module.scss";
import Button from "../button/Button";

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
      <div className="container mt-header d-flex justify-content-center align-items-center">
        <form className={styles.authForm} onSubmit={handleSubmit(onSubmitForm)}>
          <h2 className={styles.titleForm}>
            {isRegister ? "Register" : "Login"}
          </h2>
          <div className="mb-3">
            <label htmlFor="email" className={styles.labelForm}>
              Email:
            </label>
            <input
              type="email"
              className={styles.inputForm}
              id="email"
              {...register("email", { required: true })}
            />
            {errors.email?.message && (
              <p className="text-danger">{errors.email?.message}</p>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="password" className={styles.labelForm}>
              Password:
            </label>
            <input
              type="password"
              className={styles.inputForm}
              id="password"
              {...register("password", { required: true })}
            />
            {errors.password?.message && (
              <p className="text-danger">{errors.password?.message}</p>
            )}
          </div>
          <Button width="100%">{isRegister ? "Register" : "Login"}</Button>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
