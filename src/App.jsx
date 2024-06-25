import { useRoutes, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
// pages 

import Login from "./pages/Login";
import NotFound from './pages/NotFound';

import AdminHome from './admin/Home';

import { Toaster } from "react-hot-toast";
function App() {
  const navigate = useNavigate();
  useEffect(() => {
    // localStorage.getItem('token') ? "/" : navigate("/login");
  })
  const routes = useRoutes([
    { path: '/', element: <AdminHome /> },
    { path: '/login', element: <Login /> },
    { path: '*', element: <NotFound /> }
  ]);

  return (
    <main className='bg-[#020817] h-full relative'>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
      {routes}
    </main>
  );
}

export default App;