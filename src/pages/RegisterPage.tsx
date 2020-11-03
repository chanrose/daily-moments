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
  IonText,
  IonLoading
} from '@ionic/react';
import React, { useState } from 'react';
import { Redirect } from 'react-router';
import { useAuth } from '../auth';
import { auth } from '../firebase';

const RegisterPage: React.FC = () => {
  const [email, setEmailString] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState({loading: false, error: false});
  const {loggedIn} = useAuth();
  const handleRegister = async () => {
    try {
      setStatus({loading: true, error: false})
      const credential = await auth.createUserWithEmailAndPassword(email, password);
      console.log('credential', credential);

    } catch(error) {
        setStatus({loading: false, error: true})
        console.log("An email is already being used");
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
          <IonTitle>Registration Page v3.5</IonTitle>
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
                <IonText color="danger">Registration failed!</IonText>
            </IonItem>
             }
            
        </IonList>
        
        <IonButton expand="block" onClick={handleRegister}>Create Account</IonButton>
        <IonButton expand="block" fill="clear" routerLink="/login">Already have account?</IonButton>
      </IonContent>
      
      <IonLoading isOpen={status.loading} />
    </IonPage>
  );
}

export default RegisterPage;
