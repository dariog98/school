const BASE = import.meta.env.VITE_API_SERVER

const RoutesAPI = {
    Classtimes: `${BASE}/classtimes`,
    Subjects: `${BASE}/classrooms`,
    Users: `${BASE}/users`,
    Login: `${BASE}/users/login`,
    Register: `${BASE}/users/register`,
}

export { RoutesAPI }