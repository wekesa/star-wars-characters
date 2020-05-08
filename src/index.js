import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import StarWarsCharacters from './components/StarWarsCharacters';
import CharacterDetails from './components/CharacterDetails'

class App extends React.Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route
                        path={"/characters"}
                        render={props => (
                            <StarWarsCharacters {...props}/>
                        )}
                    />
                    <Route path={"/characters-details"}
                           component={CharacterDetails}
                           render={props => (
                               <CharacterDetails {...props} />
                           )}
                    />
                </Switch>
            </Router>
        )
    }
}

ReactDOM.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>,
    document.getElementById('app')
);

