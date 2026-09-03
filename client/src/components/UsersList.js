import { useUsers } from "../hooks/useUsers";

export const UserList = () => {
    const {users, loading, error} = useUsers();

    if(loading) return <p>Cargando usuarios</p>
    if(error) return <p>Error: {error} </p>

    return(
        <div>
            <h2>Usuarios</h2>
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        {user.username} - {user.email}
                    </li>
                ))}
            </ul>
        </div>
    )
};

