import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonList,
  IonCard,
  IonText,
  IonCardHeader,
  IonCardContent
} from '@ionic/react';
import React, { useState } from 'react';
import {auth} from '../firebase';
import moment from 'moment';

const SettingsPage: React.FC = () => {
  const [timeIn, setTimeIn] = useState('');
  const [timeOut, setTimeOut] = useState('');  
  const [timeSaved, setTimeSaved] = useState('');

  const handleTimeIn = () => {
    const now = moment();
    console.log("Time In: ", now);
    setTimeIn(now.toISOString());    
  }

  const handleTimeOut = () => {
    const now = moment();  
    console.log("Time Out: ", now);
    setTimeOut(now.toISOString());  
  }

  const handleSaveTime = () => {
    const time1 = moment(timeIn);
    const time2 = moment(timeOut);
    const timeDiff = time2.diff(time1);
    console.log(timeDiff/1000, "Second");
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>My Settings</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonCard>
          <IonCardHeader><IonText>Stopwatch</IonText></IonCardHeader>
          <IonCardContent>
            <IonButton onClick={handleTimeIn} >Time In</IonButton>
            <IonButton onClick={handleTimeOut} color="danger">Time Out</IonButton>
            <IonButton onClick={handleSaveTime} color="secondary">Save Time</IonButton>
          </IonCardContent>
          
        </IonCard>
        <IonButton 
          color="medium" 
          expand="block"
          onClick={() => auth.signOut()}>
            Logout</IonButton>
        
      </IonContent>
    </IonPage>
  );
};

export default SettingsPage;
