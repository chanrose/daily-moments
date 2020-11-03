import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonList,
  IonItem,
  IonInput,
  IonLabel,
  IonText,
  IonLoading
} from '@ionic/react';
import React, { useState } from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { useAuth } from '../auth';
import { auth } from '../firebase';

const LoginPage: React.FC = () => {
  const [email, setEmailString] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState({loading: false, error: false});
  const {loggedIn} = useAuth();
  const handleLogin = async () => {
    try {
      setStatus({loading: true, error: false})
      const credential = await auth.signInWithEmailAndPassword(email, password);
      console.log('credential', credential);

    } catch(error) {
        setStatus({loading: false, error: true})
        console.log("Incorrect email or password!");
        console.log('error: ', error);
    }
    
  }
  if (loggedIn) {
    return <Redirect to="/my/entries" />
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login v3.1</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          <IonItem>
            <IonInput placeholder="Email" type="email" value={email} onIonChange={(event) => setEmailString(event.detail.value)} />
            </IonItem>


            <IonItem>
              <IonInput placeholder="password" type="password" value={password} onIonChange={(event) => setPassword(event.detail.value)} />
            </IonItem>

            {status.error &&
            <IonItem>
                <IonText color="danger">Invalid Credential</IonText>
            </IonItem>
             }

            
        </IonList>
        
        <IonButton expand="block" onClick={handleLogin}>Login</IonButton>
        <IonButton expand="block" fill="clear" routerLink="/register">Create Account</IonButton>
      </IonContent>
      
      <IonLoading isOpen={status.loading} />
    </IonPage>
  );
}

export default LoginPage;
