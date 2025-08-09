
import { Navigate, useLocation } from 'react-router-dom'
import {useAuthContext} from'../context/context'
import { useEffect, useState } from 'react';

function privateroute({children}) {
  const{user}=useAuthContext();
  const location = useLocation();
  const [waited, setWaited] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setWaited(true);
    }, 1000); 

    return () => clearTimeout(timer); 
  }, []);

  if (!waited) {
    return <div>Checking user status...</div>; 
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return children;
}

export default privateroute