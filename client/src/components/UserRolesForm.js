import { useState, useEffect } from 'react';
import { api } from '../api';

export const UserRolesForm = ({ user }) => {
  const [userRoles, setUserRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Roles disponibles
  const availableRoles = [
    { id: 1, name: 'user' },
    { id: 2, name: 'artist' },
    { id: 3, name: 'admin' }
  ];


// Obtener roles del usuario al cargar
  useEffect(() => {
    fetchUserRoles();
  }, []);

  const fetchUserRoles = async () =>{
    try{
        const res = await api.get(`/users/${user.id}/roles`);
        setUserRoles(res.data)
    }catch (err) {
      setError('Error al obtener roles: ' + err.message);
    }
  }







}

