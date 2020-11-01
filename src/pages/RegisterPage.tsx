import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonList,
  IonItem,
  IonInput
} from '@ionic/react';
import React, { useState } from 'react';
import { Redirect } from 'react-router';
import { useAuth } from '../auth';
import { auth } from '../firebase';


const RegisterPage: React.FC = () => {
  const [email, setEmailString] = useState('');
  const [password, setPassword] = useState('');
  const {loggedIn} = useAuth();

  const handleLogin = async () => {
    const credential = await auth.signInWithEmailAndPassword('bdchanbroset@gmail.com', 'Asd,car15');
    console.log('credential', credential);
   
  }
  if (loggedIn) {
    return <Redirect to="/my/entries" />
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Registration v1.0</IonTitle>
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

        </IonList>
        <IonButton expand="block" onClick={handleLogin}>Registration</IonButton>
      </IonContent>
    </IonPage>
  );
}

export default RegisterPage;
