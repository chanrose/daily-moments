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

// import { useParams } from 'react-router';
// import { entries } from '../data';

interface RouterParams {
  id: string;
}

const EntryPage: React.FC = () => {
  const { userId } = useAuth();
  const match = useRouteMatch<RouterParams>();
  const { id } = match.params;
  const [entry, setEntry] = useState<Entry>();
  const history = useHistory();
  const [title, setTitle] = useState(entry?.title);
  const [description, setDescription] = useState(entry?.description);
  const entryRef = firestore
    .collection("users")
    .doc(userId)
    .collection("entries")
    .doc(id);

  useEffect(() => {
    /*  const entryRef = firestore
    .collection("users")
    .doc(userId)
    .collection("entries")
    .doc(id); */
    entryRef.get().then((doc) => {
      setEntry(toEntry(doc));
    });
  }, [userId, id]);

  const handleDelete = async () => {
    /*     const entryRef = firestore
      .collection("users")
      .doc(userId)
      .collection("entries")
      .doc(entry.id); */
    await entryRef.delete().then(() => {
      console.log("Deleted!");
    });
  };

  const handleSave = async () => {
    /*     const entriesRef = firestore
      .collection("users")
      .doc(userId)
      .collection("entries")
      .doc(entry.id); */
    /*     if (title == undefined || title.length < 3) {
      setTitle(entry?.title);
    }*/

    /*   if (description == undefined || description.length < 3) {
      setDescription(entry?.description);
    } */

    console.log("title", title);
    console.log("description", description);
    if (title != undefined)
      await entryRef.update({
        title,
      });
    if (description != undefined) await entryRef.update({ description });
    history.goBack();
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>{formatDate(entry?.date)}</IonTitle>
          <IonButton
            slot="end"
            onClick={handleDelete}
            routerLink="/my/entries"
            fill="clear"
          >
            <IonIcon icon={trash} />
          </IonButton>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <h2>{entry?.title}</h2>
        <img src={entry?.pictureUrl} alt={entry?.title} />
        <p>{entry?.description}</p>
        <IonList>
          <IonItem>
            <IonInput
              placeholder={entry?.title}
              value={title}
              onIonChange={(e) => setTitle(e.detail.value ?? entry?.title!)}
            />
          </IonItem>
          <IonItem>
            <IonInput
              placeholder={entry?.description}
              value={description}
              onIonChange={(e) => setDescription(e.detail.value)}
            />
          </IonItem>
        </IonList>
        <IonButton expand="full" type="submit" onClick={handleSave}>
          {" "}
          SAVE{" "}
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default EntryPage;
