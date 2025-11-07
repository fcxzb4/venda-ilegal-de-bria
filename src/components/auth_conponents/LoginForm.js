import React from 'react';

function LoginForm({ formData, handleChange, handleSubmit, loading, error }) {
  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
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
      </div>

      {error && <p className="auth-error">{error}</p>}

      <button type="submit" className="auth-button" disabled={loading}>
        {loading ? 'Carregando...' : 'Entrar'}
      </button>
    </form>
  );
}

export default LoginForm;