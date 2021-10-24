import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { AppContext } from './appContext';
import axios from 'axios';
import Home from './pages/home';
import PostAdd from './pages/postAdd';
import Results from './pages/results';
import Details from './pages/details';
import Layout from './components/layout';
import './App.scss';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

export function App() {
  //context to store enums like categories and conditions
  const [settingsFromBackend, setSettingsFromBackend] = useState({
    categories: [],
    conditions: [],
  });
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get('http://localhost:8080/api/enums');
      setSettingsFromBackend(res.data);
    };
    fetchData();
  }, []);
  return (
    <BrowserRouter>
      <AppContext.Provider value={settingsFromBackend}>
        <Layout>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/sell" component={PostAdd} />
            <Route exact path="/results" component={Results} />
            <Route path="/details/:id" component={Details}/>
          </Switch>
        </Layout>
      </AppContext.Provider>
    </BrowserRouter>
  );
}