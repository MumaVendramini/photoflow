// App.js
import React, { useState, useEffect } from 'react';
import { auth } from './firebase';
import AppRoutes from './routes/Routes';

const App = () => {
  const [user, setUser] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        localStorage.setItem('user', JSON.stringify(firebaseUser)); // opcional, se quiser manter no localStorage
      } else {
        setUser(null);
        localStorage.removeItem('user');
      }
      setCheckingAuth(false);
    });

    return () => unsubscribe();
  }, []);

  if (checkingAuth) {
    return <div>Carregando...</div>;
  }

  return <AppRoutes user={user} />;
};

export default App;
