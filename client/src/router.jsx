import { Routes } from './constants/routes'
import { createBrowserRouter } from 'react-router-dom'
import { Attendance, Class, Classes, Login, User } from './pages'
import ProtectedUserRoute from './components/protect/ProtectedUserRoute'

const router = createBrowserRouter([
    {
        path: Routes.Home,
        children: [
            {
                element: <ProtectedUserRoute/>,
                children: [
                    {
                        path: Routes.Classes,
                        element: <Classes/>,
                    },
                    {
                        path: `${Routes.Classes}/:id`,
                        element: <Class/>,
                    },
                    {
                        path: `${Routes.Classes}/:id/attendances`,
                        element: <Attendance/>,
                    },
                    {
                        path: `${Routes.Users}/:id`,
                        element: <User/>,
                    },
                ]
            },
            {
                path: Routes.Login,
                element: <Login/>,
            },
        ]
    },
])
/*
const router = createBrowserRouter([
    {
        path: ROUTES.Home,
        children: [
            {
                element: <ProtectedUserRoute/>,
                children: [
                    {
                        element: <WebContainer/>,
                        children: [
                            {
                                path: ROUTES.Classrooms,
                                element: <ClassroomsIndex/>,
                            },
                            {
                                path: ROUTES.Professors,
                                element: <ProfessorsIndex/>,
                            },
                            {
                                path: ROUTES.Students,
                                element: <StudentsIndex/>,
                            },
                            {
                                path: `${ROUTES.Classrooms}/:id`,
                                element: <Classroom/>,
                            },
                            {
                                path: `${ROUTES.Students}/:id`,
                                element: <Student/>,
                            },
                            {
                                path: `${ROUTES.Professors}/:id`,
                                element: <Professor/>,
                            }
                        ]
                    }
                ]
            },
            {
                path: ROUTES.Login,
                element: <Login/>,
            },
            {
                path: ROUTES.Register,
                element: <Register/>,
            }
        ]
    }
])
*/
export { router }