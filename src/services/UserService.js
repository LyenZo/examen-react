// src/services/userService.js

const BASE_URL = "https://18.212.243.73/";

export async function getAllUsers() {
    try {
        const response = await fetch(BASE_URL + 'users');
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error al obtener usuarios:", error);
        return [];
    }
}

export async function createUser(userData) {
    try {
        const response = await fetch(BASE_URL + 'users/post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error al crear usuario:", error);
        return null;
    }
}

export async function updateUser(userId, userData) {
    try {
        const response = await fetch(`${BASE_URL}users/update/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error al actualizar usuario:", error);
        return null;
    }
}

export async function deleteUser(userId) {
    try {
        const response = await fetch(`${BASE_URL}users/delete/${userId}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error al eliminar usuario:", error);
        return null;
    }
}
