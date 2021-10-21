import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import './favorite.css';
import {Button} from 'antd';
import {Popover} from 'antd';
import { IMAGE_BASE_URL } from '../../Config';

function FavoritePage() {


    const [Favorites, setFavorites] = useState([]);

    useEffect(() => {
        fetchFavoriteMovie();
    }, []);

    const fetchFavoriteMovie = ()=> {  
        Axios.post('/api/favorite/getFavoritedMovie', {userFrom : localStorage.getItem('userId')})
        .then(response=> {
        if(response.data.success) {
            console.log(response.data);
            setFavorites(response.data.favorites);
        }else {
            alert("영화 정보를 가져오는데 실패했습니다.");
        }
        })
    };
    const onClickRemove= (movieId, userFrom) => {
     
            Axios.post('/api/favorite/removeFavoritedMovie', {userFrom: userFrom, movieId : movieId})
            .then(response => {
                if(response.data.success) {
                 //   console.log(response.data);
                    fetchFavoriteMovie();
                }else {
                    alert("영화를 삭제하는데 실패했습니다.");
                }
            })
        
    }

    const renderCards = Favorites && Favorites.map((favorite, index) => {
        const content = (
            <div>
                {favorite.moviePost? 
                <img src={`${IMAGE_BASE_URL}w500${favorite.moviePost}`}/>:"no Image"}
            </div>
        )
       return  <tr key={index}>
            <Popover content={content} title={`${favorite.movieTitle}`}>
            <td>{favorite.movieTitle}</td>
            </Popover>
            <td>{favorite.movieRunTime} mins</td>
            <td><Button onClick={() => onClickRemove(favorite.movieId, favorite.userFrom)}>Remove</Button></td>
        </tr>
    })

    return (
        <div style= {{width : '85%', margin : '3rem auto'}}>
            <h2>Favorite Movies </h2>
            <hr />
            <table>
                <thead>
                    <tr>
                        <th>Movie Title</th>
                        <th>Movie RunTime</th>
                        <th>Movie favorites</th>
                    </tr>
                </thead>
                <tbody>
                {renderCards}
                </tbody>
            </table>
        </div>
    )
}

export default FavoritePage
