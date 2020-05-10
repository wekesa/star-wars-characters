import React, {Component} from "react";
import styled from "styled-components";

import {
    Grid,
    CardContent as MuiCardContent,
    Divider as MuiDivider,
    Paper as MuiPaper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography
} from "@material-ui/core";

import {spacing} from "@material-ui/system";
import {compose} from "recompose";
import {withRouter} from "react-router";
import axios from "axios";

const Divider = styled(MuiDivider)(spacing);
const CardContent = styled(MuiCardContent)(spacing);
const Paper = styled(MuiPaper)(spacing);


class CharacterDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            characterDetails: {},
            dataFetched: false,
            films: [],
            filmsFetched: false
        }
    }

    async componentDidMount() {
        const {url} = this.props.location.state;

        // Get character details
        const characterDetails = await axios.get(
            url, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((response) => {
            return response.data;
        });
        // get film details of the character
        const films = await this.getFilmDetails(characterDetails.films);

        this.setState({
            characterDetails,
            dataFetched: true,
            films,
        })

    }

    fetchFilm = async (filmUrl) => {
        return await axios.get(
            filmUrl, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((response) => response.data
        );

    };

    getFilmDetails = async (filmUrls) => {
        let characterFilms = [];
        for (let i = 0; i < filmUrls.length; i++) {
            let film = await this.fetchFilm(filmUrls[i]);
            characterFilms.push(film)
        }
        return characterFilms
    };

    filmListTable = () => {
        return (
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Title</TableCell>
                        <TableCell>Episode ID</TableCell>
                        <TableCell>Opening Crawl</TableCell>
                        <TableCell>Director</TableCell>
                        <TableCell>Producer</TableCell>
                        <TableCell>Release Date</TableCell>
                        <TableCell>Like Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {this.state.films.map(row => (
                        <TableRow key={row.id}>
                            <TableCell align="left">{row.title}</TableCell>
                            <TableCell>{row.episode_id}</TableCell>
                            <TableCell>{row.opening_crawl}</TableCell>
                            <TableCell>{row.director}</TableCell>
                            <TableCell>{row.producer}</TableCell>
                            <TableCell>{row.release_date}</TableCell>
                             {/*TODO add logic for heart icon when liked and disliked*/}
                            <TableCell>Like/Dislike</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        );
    };

    render() {
        const {characterDetails} = this.state;
        return (
            <>
                <Typography variant="h6" gutterBottom display="inline">
                    StarWar Character Details : {characterDetails.name}
                </Typography>

                <Divider my={6}/>
                <Grid container spacing={6}>
                    <Grid item xs={12}>
                        <CardContent>
                            <Paper>
                                <Typography variant="body2" gutterBottom>
                                    Height - {characterDetails.height}
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    Mass - {characterDetails.mass}
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    Hair Color - {characterDetails.hair_color}
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    Skin Color - {characterDetails.skin_color}
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    Eye color - {characterDetails.eye_color}
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    Birth Year - {characterDetails.birth_year}
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    Gender - {characterDetails.gender}
                                </Typography>

                                <Divider my={6}/>
                                <CardContent pb={1}>
                                    <Typography variant="h6" gutterBottom>
                                        {characterDetails.name} Films
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        A list of films this character has been part of.
                                    </Typography>
                                </CardContent>
                                {this.state.dataFetched && this.filmListTable()}
                            </Paper>
                        </CardContent>
                    </Grid>
                </Grid>
            </>
        )
    }
}

export default compose(withRouter)(CharacterDetails);