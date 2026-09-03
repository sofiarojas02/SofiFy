import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../pagesCss/LoginPage.css';
import '../pagesCss/RegisterPage.css';
import { api } from '../Api/api';
import { useLocalStorage } from '../App/useLocalStorage';

export const RegisterPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password_hash: '',
        description: '',
        image_url: ''
    });

  const {saveItem: saveUser} = useLocalStorage('user', null)


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try{
        if(!formData.username || !formData.email || !formData.password_hash){
            alert('Completa los campos obligatorios');
            return;
        }

        const res = await api.post('/users' , formData)
        saveUser(res.data)

        navigate('/login')
    } catch (error) {
        alert('Error: ' + error.message);
  }
  };

  return (
    <div className="register-wrapper">
      <div className="auth-logo mb-3">
        <i className="bi bi-spotify"></i>
      </div>

      <h1 className="register-main-title">
        Regístrate para empezar a escuchar contenido
      </h1>

      <div className="register-content">
        {/* Columna Izquierda: Formulario */}
        <div className="register-form-side">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-semibold small">Nombre de usuario</label>
              <input
                type="text"
                name="username"
                className="auth-input"
                placeholder="ej. Sofia123"
                maxLength={100}
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold small">Correo electrónico</label>
              <input
                type="email"
                name="email"
                className="auth-input"
                placeholder="nombre@dominio.com"
                maxLength={150}
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold small">Contraseña</label>
              <input
                type="password"
                name="password_hash"
                className="auth-input"
                placeholder="Contraseña"
                maxLength={50}
                value={formData.password_hash}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold small">Descripción (Opcional)</label>
              <textarea
                name="description"
                className="auth-input register-textarea"
                placeholder="Cuéntanos un poco sobre ti..."
                rows={3}
                value={formData.description}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold small">URL de Foto de Perfil (Opcional)</label>
              <input
                type="url"
                name="image_url"
                className="auth-input"
                placeholder="https://imagen.com/foto.jpg"
                maxLength={500}
                value={formData.image_url}
                onChange={handleChange}
              />
            </div>

            <button type="submit" className="auth-button-primary mt-2">
              Registrarse
            </button>
          </form>
        </div>

        {/* Columna Derecha: Métodos alternativos y Login */}
        <div className="register-social-side">
          <div className="auth-social-group">
            <button type="button" className="auth-button-social">
              <i className="bi bi-google text-danger"></i> Registrarte con Google
            </button>
            <button type="button" className="auth-button-social">
              <i className="bi bi-apple"></i> Registrarte con Apple
            </button>
          </div>

          <div className="auth-footer mt-4">
            <p className="auth-footer-text">¿Ya tienes una cuenta?</p>
            <button 
              type="button" 
              onClick={() => navigate('/login')} 
              className="auth-link-button fs-5"
            >
              Iniciar sesión
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};