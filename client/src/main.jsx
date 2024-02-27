import React from 'react'
import { createRoot } from 'react-dom/client'
import { UserProvider } from './components/providers/UserProvider'
import { SettingsProvider } from './components/providers/SettingsProvider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App'

const root = createRoot(document.getElementById('app'))
const queryClient = new QueryClient()

root.render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <SettingsProvider>
                <UserProvider>
                    <App/>
                </UserProvider>
            </SettingsProvider>
        </QueryClientProvider>
    </React.StrictMode>
)