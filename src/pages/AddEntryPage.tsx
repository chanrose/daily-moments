import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonFab,
  IonFabButton,
  IonFabList,
  IonIcon
} from '@ionic/react';
import { add, bicycle, car, ticket, easel } from 'ionicons/icons';
import React, {  } from 'react';




const AddEntryPage: React.FC = () => {
  console.log('Adding Page: ', this);
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
     
      </IonContent>
    </IonPage >
  );
};

export default AddEntryPage;
