import React, {Component} from "react";
import styled from "styled-components";

import {
    Divider as MuiDivider,
    Typography,
    Card,
    Paper,
    CardContent
} from "@material-ui/core";

import {spacing} from "@material-ui/system";

const Divider = styled(MuiDivider)(spacing);


class CharacterDetails extends Component {
    constructor() {
        super()
        this.state = {}
    }


    render() {
        return (
            <>
                <Typography variant="h3" gutterBottom display="inline">
                    StarWar Character
                </Typography>

                <Divider my={6}/>
                <CardContent>
                    <Paper>
                        <Typography variant="body2" gutterBottom>
                            Height - {}
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                            Mass - {}
                        </Typography>
                       <Typography variant="body2" gutterBottom>
                            Hair Color - {}
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                            Skin Color - {}
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                            Eye color - {}
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                            Birth Year - {}
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                            Gender - {}
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                            Homeworld - {}
                        </Typography>
                    </Paper>
                </CardContent>
            </>
        )
    }
}


export default CharacterDetails;