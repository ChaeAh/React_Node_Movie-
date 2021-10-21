import React, {useEffect,useState} from 'react'
import { API_KEY, API_URL,IMAGE_BASE_URL} from '../../Config'
import MainImage from '../LandingPage/Sections/MainImage'
import GridCards from '../commons/GridCards';
import MovieInfo from './Sections/MovieInfo';
import {Row} from 'antd';
import Favorite from './Sections/Favorite';

function MovieDetail(props) {

    let movieId = props.match.params.movieId
    const [Movie, setMovie] = useState([]);
    const [Casts, setCasts] = useState([]);
    const [ActorToggle, setActorToggle] = useState(false);

    //Dom 로드시 해야될것 넣어줌
    useEffect(() => {

        let endpointCrew =`${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;
        let endpointInfo =`${API_URL}movie/${movieId}?api_key=${API_KEY}`;

        //console.log(props.match);
        fetch(endpointInfo)    
        .then(response => response.json())
        .then(response => {
            console.log('endpointInfo',response)
            setMovie(response)
        })
   
        fetch(endpointCrew)    
        .then(response => response.json())
        .then(response => {
            console.log('responseForCrew', response)
            setCasts(response.cast)
            
        })

    }, [])

    const toggleActorView = () => {
        setActorToggle(!ActorToggle);
    } 
    return (
        <div style={{width: '100%', margin:'0'}}>
            {/*Header*/}
            <MainImage 
                  image={`${IMAGE_BASE_URL}w1280${Movie.backdrop_path}`}
                  title={Movie.original_title}
                  text= {Movie.overview}  
                />
            <div style={{width: '85%', margin : '1rem auto'}}>
                <div style={{display: 'flex', justifyContent : 'flex-end'}}>
                 <Favorite movieInfo={Movie} movieId={movieId} userFrom={localStorage.getItem('userId')}/>
                </div>

                {/* MovieInfo */} 
                <MovieInfo
                    movie= {Movie}
                />
            <br />
          
            <div style={{display : 'flex', justifyContent : 'center', margin:'2rem'}}>
                <button onClick={toggleActorView} >Toggle Actor View</button>
            </div>

            {ActorToggle &&
            <Row  gutter={[16,16]}>
                    {Casts && Casts.map((cast, index) => (
                        <React.Fragment key = {index}>
                         <GridCards
                            image = {cast.profile_path? `${IMAGE_BASE_URL}w500${cast.profile_path}` : null }
                            characterName = {cast.name}
                         />
                        </React.Fragment>
                    ))}
            </Row>
            }

        </div>
        </div>
    )
}

export default MovieDetail
