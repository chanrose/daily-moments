import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonRouterLink,
  IonButton
} from '@ionic/react';
import React from 'react';
import {auth} from '../firebase';

const SettingsPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>My Settings</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        Go to <IonRouterLink routerLink="/entries">Home</IonRouterLink>
        <br /> This is the settings page.
        <IonButton 
          color="medium" 
          expand="block"
          onClick={() => auth.signOut()}
          >
            Logout</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default SettingsPage;
