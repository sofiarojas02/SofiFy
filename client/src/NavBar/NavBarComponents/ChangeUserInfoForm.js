import { useEffect, useRef, useState } from 'react'
import '../NavBarCss/ChangeUserInfoForm.css'
import { api } from '../../Api/api'
import { useLocalStorage } from '../../App/useLocalStorage'


export function ChangeUserInfoFomr ({user}) {
    const [userImageValue, setUserImageValue] = useState(user.image_url ? user.image_url : '')
    const [userNameValue, setUserNameValue] = useState(user.username)
    const [userDescriptionValue, setUserDescriptionValue] = useState(user.description ? user.description : '')

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const {saveItem: saveUser} = useLocalStorage('user', user)

    const handleSubmint = async (e) => {
        e.preventDefault()
        setError('')
        setSuccess('')

        try{
            setLoading(true)

            //Put al backend
            const res = await api.put(`/users/${user.id}`, {
                username: userNameValue,
                description: userDescriptionValue,
                imageUrl: userImageValue,
            })

            saveUser(res.data)
            document.location.reload()
            setSuccess('Perfil actualizado correctamente')
        }catch (err) {
            setError('Error al actualizar: ' + (err.response?.data?.error || err.message))
        } finally {
            setLoading(false)
        }
    }


    return (
        <div className="user-profile-container">

  {/* Contenedor desplegable con el formulario */}
        <div className="profile-dropdown">
            <h3 className="dropdown-title">Editar Perfil</h3>

            <form className="profile-form" onSubmit={handleSubmint}>
            <div className="form-group">
                <label>Nombre de usuario</label>
                <input 
                type="text" 
                name="username" 
                placeholder="Nuevo nombre"
                onChange={(e) => setUserNameValue(e.target.value)}
                value={userNameValue} 
                />
            </div>

            <div className="form-group">
                <label>Descripción</label>
                <textarea 
                name="description" 
                rows="3" 
                placeholder="Tu descripción..."
                onChange={(e) => setUserDescriptionValue(e.target.value)}
                value={userDescriptionValue} 
                />
            </div>

            <div className="form-group">
                <label>URL de Imagen</label>
                <input 
                type="url" 
                name="image_url" 
                placeholder="https://..." 
                onChange={(e) => setUserImageValue(e.target.value)}
                value={userImageValue} 
                />
            </div>

            <button 
            disabled={loading}
            type="submit" 
            className="save-btn">
                {loading ? 'Guardando...' : 'Guardar cambios'}
            </button>
            </form>
        </div>
    </div>
    )
}