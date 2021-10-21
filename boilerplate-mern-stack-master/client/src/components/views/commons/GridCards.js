import React from 'react'
import {Col} from 'antd';


function GridCards(props) {

    if(props.landingPage) {
        return (
            <div>
                <Col lg = {6} md={3} xs={24}> 
                    <div style={{position:'relative'}}>
                        <a href = {`/movie/${props.movieId}`}>
                            <img style= {{width:'100%' , height:'300px'}} src= {props.image} alt={props.moviename}/>
                        </a>
                    </div>
                </Col>
            </div>
        )
    }else {
        return (
            <div>
                <Col lg = {6} md={3} xs={24}> 
                    <div style={{position:'relative'}}>
                            <img style= {{width:'100%' , height:'300px'}} src= {props.image} alt={props.characterName}/>                 
                    </div>
                </Col>
            </div>
        )
    }
  
}

export default GridCards
