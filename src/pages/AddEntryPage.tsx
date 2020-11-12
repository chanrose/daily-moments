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
      <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton>
            <IonIcon icon={add} />
          </IonFabButton>
          <IonFabList side="start">
            <IonFabButton>
              <IonIcon icon={bicycle} />
            </IonFabButton>
            <IonFabButton>
              <IonIcon icon={car} />
            </IonFabButton>
          </IonFabList>
          <IonFabList side="top">
            <IonFabButton>
              <IonIcon icon={ticket} />
            </IonFabButton>
            <IonFabButton>
              <IonIcon icon={easel} />
            </IonFabButton>
          </IonFabList>
        </IonFab>
      </IonContent>
    </IonPage >
  );
};

export default AddEntryPage;
