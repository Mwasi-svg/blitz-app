import { createBrowserRouter } from 'react-router-dom';
import { MainLayout } from './components/MainLayout';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                index: true,
                lazy: async () => {
                    const { HomePage } = await import('./pages/HomePage');
                    return { Component: HomePage };
                },
            },
        ],
    },
]);
