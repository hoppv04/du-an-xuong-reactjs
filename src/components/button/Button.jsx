import styles from "./Button.module.scss";

const Button = ({
  children,
  width = "auto",
  backgroundColor = "orange",
  color = "white",
}) => {
  return (
    <>
      <button
        className={styles.btnCustom}
        style={{
          width: `${width}`,
          backgroundColor: `${backgroundColor}`,
          color: `${color}`,
        }}
      >
        {children}
      </button>
    </>
  );
};

export default Button;
