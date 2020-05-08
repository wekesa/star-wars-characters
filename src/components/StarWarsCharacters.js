import React from 'react';
import axios from "axios"
import styled from "styled-components";
import { Redirect} from "react-router";
import {
    Grid,
    Card as MuiCard,
    CardContent as MuiCardContent,
    Divider as MuiDivider,
    Button as MuiButton,
    Paper as MuiPaper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography
} from "@material-ui/core";
import {spacing} from "@material-ui/system";

const ButtonStyling = styled(MuiButton)(spacing);
const Button = styled(ButtonStyling)`
  width: 200px;
`;

const Card = styled(MuiCard)(spacing);

const CardContent = styled(MuiCardContent)(spacing);

const Divider = styled(MuiDivider)(spacing);

const Paper = styled(MuiPaper)(spacing);

class StarWarsCharacters extends React.Component {

    constructor() {
        super();
        this.state = {
            isRedirect: false,
            characterUrl: "",
            starWarsCharacters: [],
            dataFetched: false
        }
    }

    async componentDidMount() {
        await axios.get(`https://swapi.dev/api/people/`).then(res => {
                const characters = res.data.results;
                this.setState({
                    starWarsCharacters: characters,
                    dataFetched: true
                })
            }
        );
    }

    handleViewDetails = (url) => {
        this.setState({
            isRedirect: true,
            url: url
        })
    };

    starWarsTable = () => {
        if (this.state.starWarsCharacters.length > 0) {
            return (
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Eye Color</TableCell>
                            <TableCell align="right">Birth year</TableCell>
                            <TableCell align="right">Gender</TableCell>
                            <TableCell align="right">Details</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.starWarsCharacters.map(row => (
                            <TableRow key={row.id}>
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="right">{row.eye_color}</TableCell>
                                <TableCell align="right">{row.birth_year}</TableCell>
                                <TableCell align="right">{row.gender}</TableCell>
                                <TableCell>
                                    <Button m={3} variant="containedPrimary" color="primary"
                                            onClick={this.handleViewDetails(row.url)}>
                                        View Details
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )
        } else {
            return (
                <Typography>
                    Characters not Found
                </Typography>
            )
        }
    };

    render() {
        if(this.state.isRedirect){
            return <Redirect to={{pathname:"/characters-details", state: {url: this.state.url}}} />
        }
        return (
            <React.Fragment>
                <Typography variant="h3" gutterBottom display="inline">
                    Star war characters
                </Typography>

                <Divider my={6}/>

                <Grid container spacing={6}>
                    <Grid item xs={12}>
                        <Card mb={6}>
                            <CardContent pb={1}>
                                <Typography variant="h6" gutterBottom>
                                    List of Star Wars Characters
                                </Typography>
                            </CardContent>
                            <Paper>
                                {this.state.dataFetched && this.starWarsTable()}
                            </Paper>
                        </Card>
                    </Grid>
                </Grid>
            </React.Fragment>
        )
    }
}

export default StarWarsCharacters;
