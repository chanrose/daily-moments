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
  IonText
} from '@ionic/react';
import React, { useState } from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { useAuth } from '../auth';
import { auth } from '../firebase';

interface Props {
  onLogin: () => void;
}

const LoginPage: React.FC<Props> = ({ onLogin }) => {
  const [email, setEmailString] = useState('');
  const [password, setPassword] = useState('');
  const {loggedIn} = useAuth();

  const handleLogin = async () => {
    try {
    const credential = await auth.signInWithEmailAndPassword(email, password);
    console.log('credential', credential);
    onLogin();
    } catch(error) {
        console.log("Incorrect email or password!");
    }
    
  }
  if (loggedIn) {
    return <Redirect to="/my/entries" />
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login v1.0</IonTitle>
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

            <IonItem>
            <IonLabel>Do you already have account? <Link to="/register"> Register </Link> </IonLabel>
            </IonItem>
            
        </IonList>
        <IonButton expand="block" onClick={handleLogin}>Login</IonButton>
      </IonContent>
      <IonText color="danger">Invalid Credential</IonText>
    </IonPage>
  );
}

export default LoginPage;
