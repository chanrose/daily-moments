import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonIcon,
  IonButton,
  IonRow,
  IonCol,
  IonList,
  IonItem,
  IonInfiniteScrollContent,
  IonInput,
} from "@ionic/react";
import { trash } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { useHistory, useRouteMatch } from "react-router";
import { useAuth } from "../auth";
import { firestore } from "../firebase";
import { Entry, formatDate, toEntry } from "../model";
import dayjs from 'dayjs';

// import { useParams } from 'react-router';
// import { entries } from '../data';

interface RouterParams {
  id: string;
}


const EntryPage: React.FC = () => {

  const history = useHistory();
  const handleDelete = () => {
    firestore.collection("users").doc(userId).collection('entries').doc(entry.id)
    .delete()
    .then(()=>{console.log("Deleted!")});
    history.goBack();
  };

  const handleSave = () => {
    firestore.collection("users").doc(userId).collection("entries").doc(entry.id)
      .update({
           title: tile     
      });
      history.goBack();

  }

  const { userId } = useAuth();
  const match = useRouteMatch<RouterParams>();
  const { id } = match.params;
  const [entry, setEntry] = useState<Entry>();

   useEffect(() => {
    const entryRef = firestore
      .collection("users")
      .doc(userId)
      .collection("entries")
      .doc(id);
    entryRef.get().then((doc) => {
      setEntry(toEntry(doc));
    });
  }, [userId]);

  const [tile, setTile] = useState(entry?.title);
  console.log('This', tile);
  console.log("Entry ID:", [entry?.id, entry?.title]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>
              {formatDate(entry?.date)}
              </IonTitle>
                <IonButton slot="end" onClick={handleDelete} routerLink="/my/entries" fill="clear">
                  <IonIcon icon={trash} />
                </IonButton>
     
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        {entry?.title}: {entry?.description}:
        <IonList>
            <IonItem>
                <IonInput value={tile} />
            </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default EntryPage;
