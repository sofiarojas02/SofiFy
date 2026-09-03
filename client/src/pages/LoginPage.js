import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../pagesCss/LoginPage.css';
import { useLocalStorage } from '../App/useLocalStorage';
import { api } from '../Api/api';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setpassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const {saveItem: saveUser} = useLocalStorage('user', null)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('')

    try{
        if(!email || !password){
            setError('Email y contraseña son requeridos');
            alert(error)

            return;
        }

        const res = await api.get('users')
        const user = res.data.find(u => u.email === email)

        if (!user) {
            setError('Usuario no encontrado');
            alert(error)

            return;
        }

        if(user.password_hash !== password){
            setError('Contraseña incorrecta');
            alert(error)
            return;
        }

        saveUser(user)
        navigate('/')
    }catch (error) {
      setError('Error: ' + error.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-logo">
        <i className="bi bi-spotify"></i>
      </div>

      <h1 className="auth-title">¡Hola de nuevo!</h1>

      <form onSubmit={handleSubmit} className="auth-form">
        <div className="mb-3">
          <label className="form-label fw-semibold small mb-1">Correo electrónico</label>
          <input
            type="email"
            className="auth-input"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            className="auth-input"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="auth-button-primary">
          Continuar
        </button>
      </form>

      <div className="auth-divider">o</div>

      <div className="auth-social-group">
        <button className="auth-button-social">
          <i className="bi bi-google text-danger"></i> Continuar con Google
        </button>
        <button className="auth-button-social">
          <i className="bi bi-facebook text-primary"></i> Continuar con Facebook
        </button>
        <button className="auth-button-social">
          <i className="bi bi-apple"></i> Continuar con Apple
        </button>
      </div>

      <div className="auth-footer">
        <p className="auth-footer-text">¿No tienes cuenta?</p>
        <button 
          type="button" 
          onClick={() => navigate('/register')} 
          className="auth-link-button"
        >
          Regístrate
        </button>
      </div>
    </div>
  );
};