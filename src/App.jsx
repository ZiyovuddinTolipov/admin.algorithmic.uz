import { useRoutes, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
// pages 

import Login from "./pages/Login";
import NotFound from './pages/NotFound';

import AdminHome from './pages/Home';

import { Toaster } from "react-hot-toast";

const Home = () => { 
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/dashboard")
  })
}

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.getItem('user_jwt') ? "/" : navigate("/login");
  })
  const routes = useRoutes([
    { path: '/', element: <Home /> },
    { path: '/dashboard/*', element: <AdminHome /> },
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