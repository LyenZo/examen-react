import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginForm from './components/userList/LoginForm';
import UserList from './components/userList/UsersList';
import UserForm from './components/userList/UserForm';
import { ToastContainer } from 'react-toastify';

const App = () => {
    const [access_token, setAuthToken] = useState(null);

    // Cargar el token desde localStorage si está disponible
    useEffect(() => {
        const token = localStorage.getItem('access_token');
        if (token) {
            setAuthToken(token);
        }
    }, []);

    // Manejar el cierre de sesión
    const handleLogout = () => {
        localStorage.removeItem('access_token'); // Eliminar token del localStorage
        setAuthToken(null); // Limpiar el estado de autenticación
    };

    const handleLoginSuccess = (token) => {
        localStorage.setItem('access_token', token);
        setAuthToken(token);
    };

    return (
        <Router>
            <div>
                <ToastContainer /> {/* Este es el contenedor donde se mostrarán las notificaciones */}

                <Routes>
                    {/* Si no hay token, mostrar LoginForm. Si hay token, redirigir a UsersList */}
                    <Route
                        path="/"
                        element={access_token ? <Navigate to="/users" /> : <LoginForm onLoginSuccess={handleLoginSuccess} />}
                    />

                    {/* Ruta para UserList, solo accesible si hay token */}
                    <Route
                        path="/users"
                        element={
                            access_token ? (
                                <UserList onLogout={handleLogout} />  
                            ) : (
                                <Navigate to="/" />
                            )
                        }
                    />

                    {/* Ruta para UserForm, accesible sin token */}
                    <Route path="/user-form" element={<UserForm />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;