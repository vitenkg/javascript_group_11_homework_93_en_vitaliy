import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Box, Button, Grid, makeStyles, Paper, Typography} from "@material-ui/core";
import {createTrackHistory, fetchTracks} from "../../store/Actions/mainActions";
import {Redirect} from "react-router-dom";

const useStyles = makeStyles({
    text: {
        marginLeft: "20px",
        width: "70%",
    },
    margin: {
        marginBottom: "15px",
    },
    endButton: {
        alignSelf: "flex-end",
    }
})

const Tracks = () => {
    const dispatch = useDispatch();
    const tracks = useSelector(state => state.main.tracks);
    const token = useSelector(state => state.users.user);
    const paramsURL = new URLSearchParams(document.location.search.substring(1));
    const classes = useStyles();

    useEffect(() => {
        if (paramsURL.get('album') && token) {
            dispatch(fetchTracks(paramsURL.get('album'), token.token));
        } else {
            dispatch(fetchTracks());
        }
    }, [dispatch]);

    const buttonHandler = id => {
        console.log(id);
        dispatch(createTrackHistory(token.token, id));
    };

    if (!token) {
        return <Redirect to={'/login'}/>
    }

    return (
        <>
            <Grid container direction="column" spacing={2}>
                <Grid item container justifyContent="space-between" alignItems="center">
                    <Grid item>
                        <Typography variant="h4">{tracks && (paramsURL.get('artist')) ? paramsURL.get('artist') : "All"}</Typography>
                        <Typography variant="h4">{tracks && (tracks.length> 0) ? tracks[0].album.name : "Tracks"}</Typography>
                    </Grid>
                    <Grid item>
                        <Button color="primary">Add Track</Button>
                    </Grid>
                </Grid>

            {tracks && (
                tracks.map((track, id) => (
                    <Paper
                        component={Box}
                        p={2}
                        key={track._id}
                        className={classes.margin}
                    >
                        <Grid container>
                            <Grid item>{id + 1}.</Grid>
                            <Grid item className={classes.text}>
                                <Typography variant="body1">Название альбома: {track.name}</Typography>
                                <Typography variant="body1">Длина трека: {track.lasting}</Typography>
                            </Grid>
                            <Grid item className={classes.endButton}>
                                <Button
                                    type="button"
                                    onClick={() => buttonHandler(track._id)}
                                >
                                    Play
                                </Button>
                            </Grid>
                        </Grid>
                    </Paper>
                )))}
            </Grid>
        </>
    );
};

export default Tracks;
