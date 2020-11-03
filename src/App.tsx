import {
  IonApp,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import React, { useEffect, useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { AuthContext } from './auth';
import AppTabs from './AppTabs';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';
import RegisterPage from './pages/RegisterPage';
import { auth } from './firebase';

auth.onAuthStateChanged((user) => {
  console.log('onAuthStateChanged:', user);
});

const App: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
      
  }, []);
  console.log(`Rendering app with loggedIn=${loggedIn}`);
  return (
    <IonApp>
      <AuthContext.Provider value={{ loggedIn }} >
        <IonReactRouter>
          <Switch>

            <Route exact path="/login">
              <LoginPage onLogin={() => setLoggedIn(true)} />
            </Route>

            <Route exact path="/register">
              <RegisterPage />
            </Route>


            <Route path="/my" >
              <AppTabs />
            </Route>

            <Redirect exact path="/" to="/my/entries" />

            <Route>
              <NotFoundPage />
            </Route>

          </Switch>
        </IonReactRouter>
      </AuthContext.Provider>
    </IonApp>
  );
};

export default App;
