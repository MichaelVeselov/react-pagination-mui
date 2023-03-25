import './styles/App.css';

import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Layout from './pages/Layout';
import About from './pages/About';
import HomePage from './pages/HomePage';
import NotFound from './pages/NotFound';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      errorElement: '',
      children: [
        { index: true, element: <HomePage /> },
        { path: 'about', element: <About /> },
        { path: '*', element: <NotFound /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
