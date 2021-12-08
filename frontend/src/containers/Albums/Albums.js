import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Box, Button, Grid, IconButton, makeStyles, Paper, Typography} from "@material-ui/core";
import {fetchAlbums} from "../../store/Actions/mainActions";
import {apiURL} from "../../config";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import {Link} from "react-router-dom";

const useStyles = makeStyles({
    text: {
        marginLeft: "20px",
    },
    margin: {
        marginBottom: "15px",
    },
})

const Albums = () => {
    const dispatch = useDispatch();
    let albums = useSelector(state => state.main.albums);
    const paramsURL = new URLSearchParams(document.location.search.substring(1));
    const classes = useStyles();
    let cardImage = [];

    useEffect(() => {
        if (paramsURL.get('artist')) {
            dispatch(fetchAlbums(paramsURL.get('artist')));
        } else {
            dispatch(fetchAlbums());
        }
    }, [dispatch]);

    if (albums) {
        cardImage = albums.map(album => {
            if (album.image) {
                return apiURL + '/uploads/' + album.image;
            }
            return album;
        })
    }
    return (
        <>
            <Grid container direction="column" spacing={2}>
                <Grid item container justifyContent="space-between" alignItems="center">
                    <Grid item>
                        <Typography
                            variant="h4">{paramsURL.get('artist') && albums && (albums.length > 0)? albums[0].artist.name : "All"}</Typography>
                    </Grid>
                    <Grid item>
                        <Button coloe="primary">Add Album</Button>
                    </Grid>
                </Grid>

            {albums && (
                albums.map((album, id) => (
                    <Paper
                        component={Box}
                        p={2}
                        key={album._id}
                        className={classes.margin}
                    >
                        <Grid container>
                            <img src={cardImage[id]} width={100} alt={albums[id].image}/>
                            <Grid item className={classes.text}>
                                <Typography variant="body1">Название альбома: {album.name}</Typography>
                                <Typography variant="body1">Год выпуска: {album.year}</Typography>
                                <Typography variant="body1">Количество треков: {album.year}</Typography>

                            </Grid>
                            <Grid container item justifyContent={"flex-end"}>
                                <IconButton component={Link}
                                            to={'/tracks?album=' + album._id + '&artist=' + album.artist.name}>
                                    <ArrowForwardIcon/>
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Paper>
                )))}
            </Grid>
        </>
    );
};

export default Albums;
