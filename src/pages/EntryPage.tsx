import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonBackButton
} from '@ionic/react';
import React from 'react';
import { useParams } from 'react-router';
import { entries } from '../data';

interface RouterParams {
  id: string;
}

const EntryPage: React.FC = () => {
  const { id } = useParams<RouterParams>();
  const entry = entries.find((entry) => entry.id === id);
  if (!entry) {
    throw new Error(`No such ID ${id}`);
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>{entry.title}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        {entry.description} : #{entry.id}

      </IonContent>
    </IonPage >
  );
};

export default EntryPage;
