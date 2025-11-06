    import { useRegisterLogic } from "../../hooks/use_register_logic";
    import style from "./sign_up.module.scss";

    function SignUp() {
    const { formData, handleChange, handleSubmit, error, success } = useRegisterLogic();

    return (
        <div className={style.registerContainer}>
        <div className={style.registerCard}>
            <h2 className={style.title}>Criar Conta</h2>

            {success && <p className={style.successMessage}>✅ Conta criada com sucesso!</p>}
            {error && <p className={style.errorMessage}>❌ {error}</p>}

            <form onSubmit={handleSubmit} className={style.form}>

            <label>Nome</label>
            <input
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                required
            />

            <label>Email</label>
            <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
            />

            <label>Data de Nascimento</label>
            <input
                name="bd"              // <-- esta é a chave correta
                type="date"
                value={formData.bd}
                onChange={handleChange}
                required
            />

            <label>Senha</label>
            <input
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
            />

            <button type="submit" className={style.submitButton}>
                Criar conta
            </button>
            </form>
        </div>
        </div>
    );
    }

    export default SignUp;