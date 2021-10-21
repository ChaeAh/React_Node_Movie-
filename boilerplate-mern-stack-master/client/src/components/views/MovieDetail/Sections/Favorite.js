import Axios from 'axios';
import React, {useEffect, useState} from 'react'
import {Button } from 'antd';

function Favorite(props) {

    const movieId = props.movieId;
    const userFrom = props.userFrom;
    const movieTitle = props.movieInfo.original_title;
    const moviePost = props.movieInfo.backdrop_path;
    const movieRunTime = props.movieInfo.runtime;

    const [FavoriteNumber, setFavoriteNumber] = useState(0);
    const [Favorited, setFavorited] = useState(false);
    let variables = {
        userFrom : userFrom, 
        movieId : movieId,
        movieTitle : movieTitle,
        moviePost : moviePost,
        movieRunTime : movieRunTime
    }

    useEffect(() => {

       
       Axios.post('/api/favorite/favoriteNumber',variables)
       .then(response => {
           if(response.data.success) {
               // console.log(response.data);
                setFavoriteNumber(response.data.favoriteNumber);
           }else {
            alert("숫자 정보를 가져오는데 실패 했습니다.");
                
           }
       })

       Axios.post('/api/favorite/favorited',variables)
       .then(response => {
           if(response.data.success) {
               // console.log('favorited',response.data);
                setFavorited(response.data.favorited);
           }else {
            alert("정보를 가져오는데 실패 했습니다.");
                
           }
       })


    }, []);

    const onClickFavorite = () => {
        if(Favorited) {
            Axios.post('/api/favorite/removeFromFavorite', variables )
            .then(response => {
                if(response.data.success){
                    setFavoriteNumber(FavoriteNumber-1);
                    setFavorited(!Favorited);
                }else {
                    alert("Favorite 리스트에서 삭제하는걸 실패하였습니다.");
                }
            })
        }else {
            Axios.post('/api/favorite/addToFavorite', variables )
            .then(response => {
                if(response.data.success){
                    setFavoriteNumber(FavoriteNumber+1);
                    setFavorited(!Favorited);
                }else {
                    alert("Favorite 리스트에서 추가하는걸 실패하였습니다.");
                }
            })
        }
    }


    return (
        <div>
              <Button onClick={onClickFavorite}>{Favorited? " Not Favorite": "Add to Favorite"} {FavoriteNumber}</Button>
        </div>
    )
}

export default Favorite
