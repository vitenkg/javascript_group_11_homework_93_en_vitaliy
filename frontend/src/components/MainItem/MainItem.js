import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  IconButton,
  makeStyles,
  Typography
} from "@material-ui/core";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import {apiURL} from "../../config";

const useStyles = makeStyles({
  card: {
    height: '100%'
  },
  media: {
    height: 0,
    paddingTop: '56.25%'
  }
})

const MainItem = ({name, information, id, image}) => {
  const classes = useStyles();

  let cardImage;

  if (image) {
    cardImage = apiURL + '/' + image;
  }

  return (
    <Grid item xs={12} sm={6} md={6} lg={4}>
      <Card className={classes.card}>
        <CardHeader title={name}/>
        <CardMedia
          image={cardImage}
          title={name}
          className={classes.media}
        />
        <CardContent>
          <Typography variant="subtitle1">
            {information}
          </Typography>
        </CardContent>
        <CardActions>
          <IconButton component={Link} to={'/albums?artist=' + id}>
            <ArrowForwardIcon />
          </IconButton>
        </CardActions>
      </Card>
    </Grid>
  );
};

MainItem.propTypes = {
  name: PropTypes.string.isRequired,
  information: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  image: PropTypes.string,
  // count: PropTypes.number.isRequired,
};

export default MainItem;