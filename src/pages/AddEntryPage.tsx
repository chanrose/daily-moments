import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonInput,
  IonButton,
  IonList,
  IonItem,
  IonTextarea,
  IonDatetime
} from '@ionic/react';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { useAuth } from '../auth';
import { firestore } from '../firebase';




const AddEntryPage: React.FC = () => {
  const { userId } = useAuth();
  const history = useHistory();
  const handleSave = () => {
    firestore.collection("users").doc(userId).collection("entries")
      .add({
        description: description,
        title: title,
        date: selectedDate
      });
      history.goBack();

  }
  const [selectedDate, setSelectedDate] = useState<string>('');  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle> Adding Entries </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonList>
          <IonItem><IonInput type="text" value={title} onIonChange={(e) => setTitle(e.detail.value)} placeholder="Title: " />
          </IonItem>
          <IonItem><IonTextarea value={description} onIonChange={(e) => setDescription(e.detail.value)} placeholder="message" /></IonItem>
          <IonDatetime value={selectedDate} onIonChange={(e) => setSelectedDate(e.detail.value)} placeholder="Date: " />
        </IonList>

        <IonButton type="submit" onClick={handleSave} routerLink="/my/entries"> Submit </IonButton>

      </IonContent>
    </IonPage >
  );
};

export default AddEntryPage;
