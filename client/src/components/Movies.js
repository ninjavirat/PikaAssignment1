import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Link from '@material-ui/core/Link';
import axios from "axios";



const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        width: 500,
        height: 450,
    },
}));

/**
 * The example data is structured as follows:
 *
 * import image from 'path/to/image.jpg';
 * [etc...]
 *
 * const tileData = [
 *   {
 *     img: image,
 *     title: 'Image',
 *     author: 'author',
 *     cols: 2,
 *   },
 *   {
 *     [etc...]
 *   },
 * ];
 */
export default function MoviesList() {
    const classes = useStyles();
    let [responseData, setResponseData] = React.useState({ results: [] });
    const fetchData = React.useCallback(() => {
        axios.get(
            '/api/v1/movies')
            .then((response) => {
                setResponseData(prev => ({ ...prev, ...response.data }))
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])
    React.useEffect(() => {
        fetchData()
    }, [fetchData])
    const movies = responseData.results
    console.log('movies', movies)
    return (
        <div className={classes.root}>
            <GridList cellHeight={160} className={classes.gridList} cols={3}>
                {movies.map((movie) => (
                    <GridListTile key={movie.id} cols={1}>
                        <Link href={`api/v1/movies/${movie.id}`} className={classes.link}>
                            <img src={`${process.env.REACT_APP_IMAGE_URL}${movie.poster_path}`} />
                        </Link>
                    </GridListTile>
                ))}
            </GridList>
        </div>
    );
}



