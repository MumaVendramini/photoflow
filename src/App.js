import React, { useState, useEffect } from 'react';
import { auth } from './firebase';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

const App = () => {
  const [user, setUser] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser);
      setCheckingAuth(false);
    });

    return () => unsubscribe();
  }, []);

  if (checkingAuth) {
    return <div>Carregando...</div>; // ou um spinner bonitinho
  }

  return (
    <div>
      {user ? <Dashboard /> : <Login />}
    </div>
  );
};

export default App;
