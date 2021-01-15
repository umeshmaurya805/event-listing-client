import React from 'react'
import './Card.css'
function Card({ title, image, date, description, organiser }) {
    const newDate = date.split('T')[0];
    const time = date.split('T')[1].split(':')[0] + ":" + date.split('T')[1].split(':')[1];
    return (
        
        <div className="card">
                <div className="card-image">
                    <img src={image} alt=""/>
                </div>
                <div className="card-title">
                    {title}
                </div>
                <div className="card-date">
                    {newDate}&nbsp;&nbsp;{time}
                </div>
                <div className="card-description">
                    {description}</div>
                    <br/>
    
            <div className="card-organisedBy">
                Organised By - {organiser}
                </div>
            
            </div> 
        
    )
}

export default Card
