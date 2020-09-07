import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from "axios";
import { useParams} from "react-router-dom";


const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});




export default function Movies() {
    const classes = useStyles();
    let {id} = useParams();
    let path='';
    const fetchData = React.useCallback(() => {
        axios.get(
            `/api/v1/movies/${id}`)
            .then((response) => {
                // setResponseData(prev => ({ ...prev, ...response}))
                path = response.data.poster_path
                console.log("path",path)
                // console.log("sucess".responseData)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])
    React.useEffect(() => {
        fetchData()
    }, [fetchData])
    
   
    let pathImg=`https://image.tmdb.org/t/p/w500{path}`
    console.log('pathImg'.pathImg)
    return (
         <img src ={pathImg}/>
      );
    }