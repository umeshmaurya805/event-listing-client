import React,{useEffect, useState} from 'react'
import Card from './Card'
import axios from 'axios'
import './Home.css'
import Nav from './Nav'
function Home() {
    const [EventList, setEventList] = useState([])
    useEffect(async() => {
        const {status,data} = await axios.get('https://event-listing-server.herokuapp.com/api/all-events');
        console.log(status, data);
        setEventList(data);
      },[]);
    return (
        <>
            <Nav/>
        <div className="Home">
            <div className="Home-title">
                    All Upcoming Events are here   
            </div>
                <div className="card-container">
                    {Array.from(EventList).map((value, i) => {
                        return(
                        <Card key={i} image={value.image} title={value.name} description={value.description } organiser={value.organiser } date={value.datetime } />
                            
                        )
                    })}
           
                </div>
           

            {/* <div className="home_button">
                <button>Add new Event</button>
            </div> */}
        </div>
        </>
    )
            
}

export default Home
