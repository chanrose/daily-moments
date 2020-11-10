import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonBackButton
} from '@ionic/react';
import React, { useEffect, useState } from 'react';
import {useRouteMatch} from 'react-router';
import {firestore} from '../firebase';
import {Entry, toEntry} from '../model';

// import { useParams } from 'react-router';
// import { entries } from '../data';

interface RouterParams {
  id: string;
}



const EntryPage: React.FC = () => {
  const  match = useRouteMatch<RouterParams>();
  const {id} = match.params;
  const [entry, setEntry] = useState<Entry>();

  useEffect(() => {
    const entryRef = firestore.collection('entries').doc(id);
    entryRef.get().then((doc) => {
      setEntry(toEntry(doc));
    });
  }, [id]);

  
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
         {entry?.description} : #{entry?.id}
 
      </IonContent>
    </IonPage >
  );
};

export default EntryPage;
