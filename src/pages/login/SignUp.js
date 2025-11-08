import { useRegisterLogic } from "../../hooks/use_register_logic";
import LoginForm from "../../components/auth_conponents/LoginForm";
import SignUpForm from "../../components/auth_conponents/SignUpForm";
import style from "./sign_up.module.scss";

function SignUp() {
  const {
    isLoginMode,
    formData,
    loading,
    error,
    success,
    toggleMode,
    handleChange,
    handleSubmit,
  } = useRegisterLogic();

  const formProps = {
    formData,
    handleChange,
    handleSubmit,
    loading,
    error,
  };
  return (
    <div className={style.registerContainer}>
      <div className={style.registerCard}>
        {/* <h2 className={style.title}>Criar Conta</h2> */}
        <h2>{isLoginMode ? "Login" : "Criar Conta"}</h2>

        {isLoginMode ? (
          <LoginForm {...formProps} />
        ) : (
          <SignUpForm {...formProps} />
        )}

        {success && (
          <p className={style.successMessage}>✅ Conta criada com sucesso!</p>
        )}
        {error && <p className={style.errorMessage}>❌ {error}</p>}

        <button onClick={toggleMode} className={style.toggleButton}>
          {isLoginMode ? "Criar nova conta" : "Já tenho uma conta"}
        </button>
      </div>
    </div>
  );
}

export default SignUp;
