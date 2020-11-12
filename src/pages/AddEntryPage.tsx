import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonBackButton
} from '@ionic/react';
import React, {  } from 'react';




const AddEntryPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>{entry?.title} </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
         {entry?.description} : #{entry?.id
         }
 
      </IonContent>
    </IonPage >
  );
};

export default AddEntryPage;
