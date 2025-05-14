
import { useEffect } from 'react';
import { gapi } from 'gapi-script';

const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
const SCOPES = 'https://www.googleapis.com/auth/calendar.readonly';

const GoogleOAuth = ({ onSuccess, onFailure }) => {
    useEffect(() => {
        gapi.load('client:auth2', initClient);
    }, []);

    const initClient = () => {
        gapi.client.init({
            apiKey: API_KEY,
            clientId: CLIENT_ID,
            scope: SCOPES,
        }).then(() => {
            const authInstance = gapi.auth2.getAuthInstance();
            if (authInstance.isSignedIn.get()) {
                console.log('Usuário já autenticado!');
                onSuccess();
            }
        });
    };

    const handleSignIn = () => {
        gapi.auth2.getAuthInstance().signIn().then(() => {
            console.log('Usuário autenticado');
            onSuccess();
        }).catch(onFailure);
    };

    const handleSignOut = () => {
        gapi.auth2.getAuthInstance().signOut().then(() => {
            console.log('Usuário desconectado');
            onFailure();
        });
    };

    return (
        <div>
            <button onClick={handleSignIn}>Entrar com Google</button>
            <button onClick={handleSignOut}>Sair</button>
        </div>
    );
};

export default GoogleOAuth;
