import React from 'react'
import { createRoot } from 'react-dom/client'
import { UserProvider } from './components/providers/UserProvider'
import { SettingsProvider } from './components/providers/SettingsProvider'
import { NotificationsProvider } from './components/providers/NotificationsProvider'
import App from './App'

const root = createRoot(document.getElementById('app'))

root.render(
    <React.StrictMode>
        <SettingsProvider>
            <NotificationsProvider>
                <UserProvider>
                    <App/>
                </UserProvider>
            </NotificationsProvider>
        </SettingsProvider>
    </React.StrictMode>
)