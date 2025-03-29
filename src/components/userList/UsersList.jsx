import React, { useEffect, useState } from 'react';
import { getAllUsers, deleteUser } from '../../services/UserService';
import UserForm from './UserForm';
import './UserList.css'; // Importamos el archivo CSS

const UserList = ({ onLogout }) => {
    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);
    const [currentPage, setCurrentPage] = useState(1); // Página actual
    const [usersPerPage] = useState(5); // Número de usuarios por página

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

    // Lógica de paginación
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber); // Cambiar la página actual
    };

    // Calcular el número total de páginas
    const totalPages = Math.ceil(users.length / usersPerPage);

    return (
        <div className="user-list-container">
            <button onClick={handleAddUser}>Agregar Usuario</button>
            {/* Botón de cerrar sesión */}
            <button onClick={onLogout}>Cerrar sesión</button>

            <ul>
                {currentUsers.map(user => (
                    <li key={user.id}>
                        <span>{user.name} - {user.email}</span>
                        <div>
                            <button onClick={() => handleEdit(user)}>Editar</button>
                            <button onClick={() => handleDelete(user.id)}>Eliminar</button>
                        </div>
                    </li>
                ))}
            </ul>

            <div className="pagination">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Anterior
                </button>
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => handlePageChange(index + 1)}
                        className={currentPage === index + 1 ? 'active' : ''}
                    >
                        {index + 1}
                    </button>
                ))}
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Siguiente
                </button>
            </div>
            
            {editingUser && <UserForm user={editingUser} />}
            {!editingUser && <UserForm />}

            {/* Paginación */}
            
        </div>
    );
};

export default UserList;
