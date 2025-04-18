// src/components/InstallButton.js
import React, { useEffect, useState } from 'react';

const InstallButton = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsVisible(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then(() => {
        setDeferredPrompt(null);
        setIsVisible(false);
      });
    }
  };

  if (!isVisible) return null;

  return (
    <button onClick={handleInstallClick} style={{ position: 'fixed', bottom: 20, right: 20, padding: 10 }}>
      Instalar PhotoFlow
    </button>
  );
};

export default InstallButton;
