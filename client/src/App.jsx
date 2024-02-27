import {  RouterProvider } from 'react-router-dom'
import { router } from './Router'
import '@fontsource/ubuntu'
import '@fontsource/fredoka'
import './bootstrap.css'
import './styles.css'

const App = () => {
    return (
        <RouterProvider router={router}/>
    )
}

export default App