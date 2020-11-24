import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonInput,
  IonButton,
  IonList,
  IonItem,
  IonTextarea,
  IonDatetime,
  IonLabel,
} from "@ionic/react";
import { url } from "inspector";
import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router";
import { useAuth } from "../auth";
import { firestore, storage } from "../firebase";

async function savePicture(blobUrl, userId) {
  const pictureRef = storage.ref(`/users/${userId}/pictures/${Date.now()}`);
  const response = await fetch(blobUrl);
  const blob = await response.blob();
  const snapshot = await pictureRef.put(blob);
  const url = await snapshot.ref.getDownloadURL();
  return url;
}

const AddEntryPage: React.FC = () => {
  const { userId } = useAuth();
  const history = useHistory();
  const [date, setSelectedDate] = useState<string>("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [pictureUrl, setPictureUrl] = useState("/assets/placeholder.png");
  const fileInputRef = useRef<HTMLInputElement>();

  useEffect(
    () => () => {
      if (pictureUrl.startsWith("blob:")) {
        URL.revokeObjectURL(pictureUrl);
      }
    },
    [pictureUrl]
  );
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files.length > 0) {
      const file = event.target.files.item(0);
      const pictureUrl1 = URL.createObjectURL(file);
      console.log("Created URL:", pictureUrl1);
      setPictureUrl(pictureUrl1);
    }
  };

  const handleSave = async () => {
    const entriesRef = firestore
      .collection("users")
      .doc(userId)
      .collection("entries");
    const entryData = {
      description,
      title,
      date,
      pictureUrl,
    };
    if (pictureUrl.startsWith("blob:")) {
      entryData.pictureUrl = await savePicture(pictureUrl, userId);
    }
    const entryRef = await entriesRef.add(entryData);
    history.goBack();
  };

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
        <IonList>
          <IonItem>
            <IonDatetime
              value={date}
              onIonChange={(e) => setSelectedDate(e.detail.value)}
              placeholder="Date: "
            />
          </IonItem>
          <IonItem>
            <IonInput
              type="text"
              value={title}
              onIonChange={(e) => setTitle(e.detail.value)}
              placeholder="Title: "
            />
          </IonItem>

          <IonItem>
            <IonLabel position="stacked">Picture</IonLabel> <br />
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              ref={fileInputRef}
              hidden
            />
            <img
              onClick={() => fileInputRef.current.click()}
              src={pictureUrl}
              alt="placeholder"
              style={{ cursor: "pointer" }}
            />
          </IonItem>
          <IonItem>
            <IonTextarea
              value={description}
              onIonChange={(e) => setDescription(e.detail.value)}
              placeholder="Description"
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

export default AddEntryPage;
