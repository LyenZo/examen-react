// src/components/UserList.js
import React, { useEffect, useState } from 'react';
import { getAllUsers, deleteUser } from '../../services/UserService';
import UserForm from './UserForm';

const UserList = ({ onLogout }) => {  // Recibimos onLogout como prop
    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            const usersData = await getAllUsers();
            setUsers(usersData);
        };
        fetchUsers();
    }, []);

    const handleDelete = async (userId) => {
        await deleteUser(userId);
        setUsers(users.filter(user => user.id !== userId)); // Actualiza la lista de usuarios
    };

    const handleEdit = (user) => {
        setEditingUser(user); // Establece el usuario a editar
    };

    const handleAddUser = () => {
        setEditingUser(null); // Para agregar un nuevo usuario
    };

    return (
        <div>
            <button onClick={handleAddUser}>Agregar Usuario</button>
            {/* Botón de cerrar sesión */}
            <button onClick={onLogout}>Cerrar sesión</button>
            
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        {user.name} - {user.email}
                        <button onClick={() => handleEdit(user)}>Editar</button>
                        <button onClick={() => handleDelete(user.id)}>Eliminar</button>
                    </li>
                ))}
            </ul>
            {editingUser && <UserForm user={editingUser} />}
            {!editingUser && <UserForm />}
        </div>
    );
};

export default UserList;
