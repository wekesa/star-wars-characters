import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Layout from './components/Layout'
import CharacterDetails from './components/CharacterDetails'
import CharacterList from './components/CharacterList'

function App() {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route exact path="/" component={CharacterList}/>
          <Route exact path="/characters" component={CharacterList}/>
          <Route exact path="/character-details/:id">
              <CharacterDetails/>
          </Route>
        </Switch>
      </Layout>
      </Router>
  );
}

ReactDOM.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>,
    document.getElementById('app')
);

