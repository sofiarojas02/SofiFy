import { useEffect, useState } from "react";
import { api } from "../Api/api";

export const useUsers = () =>{
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(()=>{
        fetchUsers()
    }, []);

    const fetchUsers = async () => {
        try{
            setLoading(true);
            const response = await api.get('/users');
            setUsers(response.data);
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return {users, loading, error, fetchUsers}
}

