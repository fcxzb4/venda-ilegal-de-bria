import style from "./login_form.module.scss";

function LoginForm({ formData, handleChange, handleSubmit, loading, error }) {
  return (
    <div className={style.loginContainer}>
      <div className={style.loginCard}>
        <h2 className={style.title}>Login</h2>

        {error && <p className={style.errorMessage}>❌ {error}</p>}

        <form onSubmit={handleSubmit} className={style.form}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="password">Senha</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            minLength={6}
          />

          <button>{loading ? "Carregando..." : "Entrar"}</button>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
