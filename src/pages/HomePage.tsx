import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonFab,
  IonFabButton,
  IonFabList,
  IonIcon,
  IonLabel
} from '@ionic/react';
import { add, bicycle, car, ticket, easel } from 'ionicons/icons';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../auth';
// import { entries } from '../data';
import {firestore} from '../firebase';
import { Entry, formatDate, toEntry } from '../model';


const HomePage: React.FC = () => {
  const {userId} = useAuth();
  console.log('This user is logged in homepage', userId);
  const [entries, setEntries] = useState<Entry[]>([]);

  useEffect(() => {
    const entriesRef = firestore.collection('users').doc(userId).collection('entries');
    
      return entriesRef
      .orderBy('date', 'desc')
      .limit(7)
      .onSnapshot(({docs}) => setEntries(docs.map(toEntry)));

/*     entriesRef.get().then((snapshot) => {
      const entries = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEntries(entries);
    });
     */
  }, [userId]);
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
              routerLink={`/my/entries/view/${entry.id}`}>
              <IonLabel><h2>{formatDate(entry.date)}:</h2> <h3>{entry.title}</h3></IonLabel>
            </IonItem>
          )}
        </IonList>
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton routerLink="/my/entries/add">
            <IonIcon icon={add} />
          </IonFabButton>
        
        </IonFab>
      </IonContent>
    </IonPage >
  );
};

export default HomePage;
