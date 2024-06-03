import styles from "./Button.module.scss";

const Button = ({ children, width = "auto" }) => {
  return (
    <>
      <button className={styles.btnCustom} style={{ width: `${width}` }}>
        {children}
      </button>
    </>
  );
};

export default Button;
