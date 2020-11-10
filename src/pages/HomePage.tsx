import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem
} from '@ionic/react';
import React, { useEffect, useState } from 'react';
// import { entries } from '../data';
import {firestore} from '../firebase';
import { Entry, toEntry } from '../model';

const HomePage: React.FC = () => {
  const [entries, setEntries] = useState<Entry[]>([]);
  useEffect(() => {
    const entriesRef = firestore.collection('entries');
      entriesRef
      .get()
      .then(({docs}) => setEntries(docs.map(toEntry)));

/*     entriesRef.get().then((snapshot) => {
      const entries = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEntries(entries);
    });
     */
  }, []);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>My Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          {entries.map((entry) =>
            <IonItem button key={entry.id}
              routerLink={`/my/entries/${entry.id}`}>
              {entry.title}
            </IonItem>
          )}
        </IonList>
      </IonContent>
    </IonPage >
  );
};

export default HomePage;
