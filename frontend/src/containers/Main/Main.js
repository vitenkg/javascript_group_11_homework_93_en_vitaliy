import React, {useEffect} from 'react';
import {Button, CircularProgress, Grid, Typography} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {fetchArtists} from "../../store/Actions/mainActions";
import MainItem from "../../components/MainItem/MainItem";
import {Link} from "react-router-dom";

const Main = () => {
    const dispatch = useDispatch();
    const artists = useSelector(state => state.main.artists);
    const fetchLoading = useSelector(state => state.main.fetchLoading);

    useEffect(() => {
        dispatch(fetchArtists());
    }, [dispatch]);

    return (
        <Grid container direction="column" spacing={2}>
            <Grid item container justifyContent="space-between" alignItems="center">
                <Grid item>
                    <Typography variant="h4">Artists</Typography>
                </Grid>
                <Grid item>
                    <Button coloe="primary" component={Link} to="/artists/new">Add</Button>
                </Grid>
            </Grid>
            <Grid item>
                <Grid item container direction="row" spacing={1}>
                    {fetchLoading ? (
                        <Grid container justifyContent="center" alignItems="center">
                            <Grid item>
                                <CircularProgress/>
                            </Grid>
                        </Grid>
                    ) : artists.map(artist => (
                        <MainItem
                            key={artist._id}
                            id={artist._id}
                            name={artist.name}
                            information={artist.information}
                            image={artist.photo}
                        />
                    ))}
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Main;