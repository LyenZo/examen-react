import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser, updateUser } from '../../services/UserService';
import './UserForm.css'; // Importamos el archivo CSS

const UserForm = ({ user }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Inicializamos useNavigate

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setPassword(user.password);
        }
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userData = { name, email, password };

        if (user) {
            await updateUser(user.id, userData);
        } else {
            await createUser(userData);
            navigate('/'); // Redirigir a la página principal después de crear el usuario
        }

        setName('');
        setEmail('');
        setPassword('');
    };

    return (
        <div className="form-container">
            <h2>{user ? 'Actualizar Usuario' : 'Crear Usuario'}</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Nombre"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="Correo electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">{user ? 'Actualizar' : 'Crear'}</button>
            </form>
        </div>
    );
};

export default UserForm;