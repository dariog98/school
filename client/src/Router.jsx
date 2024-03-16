import { Routes } from './constants/routes'
import { createBrowserRouter } from 'react-router-dom'
import { Attendance, Class, ClassForm, Classes, EditProfile, Home, Login, Test, User, NotFound, Register } from './pages'
import ProtectedUserRoute from './components/protect/ProtectedUserRoute'

const router = createBrowserRouter([
    {
        path: Routes.Home,
        errorElement: (<NotFound/>),
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
                        path: `${Routes.Classes}/:id/edit`,
                        element: <ClassForm/>,
                    },
                    {
                        path: `${Routes.Classes}/new`,
                        element: <ClassForm/>,
                    },
                    {
                        path: `${Routes.Classes}/:id/attendances`,
                        element: <Attendance/>,
                    },
                    {
                        path: `${Routes.Classes}/:id/tests/:test`,
                        element: <Test/>,
                    },
                    {
                        path: `${Routes.Users}/:id`,
                        element: <User/>,
                    },
                    {
                        path: Routes.ProfileEdit,
                        element: <EditProfile/>,
                    },
                ]
            },
            {
                path: Routes.Login,
                element: <Login/>,
            },
            {
                path: Routes.Register,
                element: <Register/>,
            },
            {
                path: Routes.Home,
                element: <Home/>,
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