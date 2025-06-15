import axios from "axios";

export async function login(user: string, password: string) {

    const response = await axios.post(`http://localhost:3000/api/users/login`, { user: user, password: password });
    if (response.status) {
        return true

    } else {
        return false
    }
}