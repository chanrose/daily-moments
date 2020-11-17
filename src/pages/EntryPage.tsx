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
} from "@ionic/react";
import { trash } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { useHistory, useRouteMatch } from "react-router";
import { useAuth } from "../auth";
import { firestore } from "../firebase";
import { Entry, toEntry } from "../model";
import dayjs from 'dayjs';

// import { useParams } from 'react-router';
// import { entries } from '../data';

interface RouterParams {
  id: string;
}

const formatDate = (ISOstring:string) => {
  const dayjs = require('dayjs');
  const date = dayjs(ISOstring);
  date.toISOString();
  return (
    date.format('MMM D YYYY')
  );
}
const EntryPage: React.FC = () => {

  const history = useHistory();
  const handleDelete = () => {
    firestore.collection("users").doc(userId).collection('entries').doc(entry.id)
    .delete()
    .then(()=>{console.log("Deleted!")});
    history.goBack();
  };

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

  console.log("Entry.id:", entry?.id);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>
              {entry?.title}     </IonTitle>
                <IonButton slot="end" onClick={handleDelete} routerLink="/my/entries" fill="clear">
                  <IonIcon icon={trash} />
                </IonButton>
     
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        {entry?.description} : created in #{formatDate(entry?.date)}
      </IonContent>
    </IonPage>
  );
};

export default EntryPage;
