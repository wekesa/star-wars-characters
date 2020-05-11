import React, {Component, forwardRef} from 'react'
import MaterialTable from "material-table";
import {
    AddBox, ArrowDownward, Check,
    ChevronLeft, ChevronRight,
    Clear, DeleteOutline, Edit,
    FilterList, FirstPage, LastPage,
    Remove, SaveAlt, Search, ViewColumn, ViewCarousel
} from "@material-ui/icons";

import {Redirect, withRouter} from 'react-router-dom';
import { compose } from 'recompose'

import axios from 'axios';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref}/>),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref}/>),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref}/>),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref}/>),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref}/>),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref}/>),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref}/>),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref}/>),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref}/>),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref}/>),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref}/>),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref}/>),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref}/>),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref}/>),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref}/>),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref}/>),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref}/>)
};

const SwapiUrl = "https://swapi.dev/api/people/";

class CharacterList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            characters: [],
            rows: [],
            navigate: false,
            characterId: null,
            characterUrl: "",
        }
    }

    componentDidMount() {
        axios.get(
            SwapiUrl, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((response) => {
            const characters = response.data.results;
            this.setState({characters});
        })
    }


    render() {
        const {navigate, characterId, characterUrl, characters} = this.state;
        if (navigate) {
            return <Redirect push to={{
                pathname: "/character-details/" + characterId,
                state: {url: characterUrl}
            }}
            />
        }
        return (
            <React.Fragment>
                <MaterialTable
                    icons={tableIcons}
                    columns={[
                        {title: "Name", field: "name"},
                        {title: "Eye Color", field: "eye_color"},
                        {title: "Gender", field: "gender"},
                        {title: "Birth year", field: "birth_year",}
                    ]}
                    data={this.state.characters}
                    title="StarWars Characters from SWAPI API"
                    actions={[
                        {
                            icon: ViewCarousel,
                            tooltip: 'View Details',
                            onClick: (event, rowData) => this.setState({
                                    navigate: true,
                                    // Endpoint does not provide the ID using the index of character information
                                    // on the array of objects returned
                                    characterId: characters.findIndex(character => character.url === rowData.url) + 1,
                                    characterUrl: rowData.url
                                }
                            )
                        }
                    ]}
                    options={{
                        actionsColumnIndex: -1
                    }}
                />
            </React.Fragment>
        );
    }
}

export default compose(withRouter)(CharacterList);