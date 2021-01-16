import React,{useState} from 'react'
import TextField from '@material-ui/core/TextField';
import EventImage from './images/event.jpg'
import InputLabel from '@material-ui/core/InputLabel';
import axios from 'axios'
import './Event.css'
import { useHistory } from 'react-router-dom';

import { Input } from '@material-ui/core';
import Nav from './Nav';
function Event() {
    const history = useHistory();
    const [EventObj, setEventObj] = useState({})
    const [Loading, setLoading] = useState(0);

    const handleInput = async (e) => {
        if(e.target.name=='image')
            setEventObj({ ...EventObj, [e.target.name]: e.target.files[0] })
        else
            setEventObj({ ...EventObj, [e.target.name]: e.target.value })

        console.log(EventObj);
    }
    const EventSubmit = async (e) => {
        e.preventDefault();
        setLoading(1);
        const user = JSON.parse(localStorage.getItem('user'));
        const formData = new FormData();
        for (var key in EventObj) {
           formData.append(key, EventObj[key]);
        }
        try {
            if (user) {
                const { status, data } = await axios.post('https://event-listing-server.herokuapp.com/api/add-new-event',
                    formData, {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                });
                console.log(status)
                if (status === 200) {
                    alert("Added successfully");
                }
            }
            else {
                alert("You must login first");
                history.push('/login');
                }
                setLoading(0);
            
            
        } catch (e) {
            setLoading(0);
            localStorage.clear();
            alert("Session Expired");
            history.push('/login');
            setLoading(0);


    }
      }
    return (
        <div>
            <Nav/>
            <div className="new_event_title">
                Add New Event
            </div>
            <form className="event-form" onChange={handleInput} onSubmit={EventSubmit}>
                <div className="event-form-image">
                    <img src={ EventImage} alt=""/>
                </div>
                <div className="event-form-elements">
                    <div className="form-headline">
                        Fill the details Below
                    </div>
                    <br /> <br />
                    <div className="event-form-inputs">
                    <TextField name="name" fullWidth={true} required id="standard-required" label="Event Name" />

                    </div>
              
                    <div className="event-form-inputs">
                        <TextField name="datetime"
                    required        fullWidth={true}
    id="datetime-local"
    label="Date and time"
    type="datetime-local"
    defaultValue="2017-05-24T10:30"

    InputLabelProps={{
      shrink: true,
    }}
  /> 
                    </div>
                    <div className="event-form-inputs">

                        <TextField name="description"
                            fullWidth={true}
                            id="filled-multiline-static"
                            required
          label="Event description"
          multiline
          rows={4}

          />
          </div>
                    <div className="event-form-inputs">
                    <TextField name="organiser" fullWidth={true} required id="standard-required" label="Organiser Name"  />

                    </div>
                    <div className="event-form-inputs">
                    <InputLabel htmlFor="image"> Upload an image</InputLabel>

                        <Input name="image" required disableUnderline={true} fullWidth={true} required id="image" type="file" label="Event Name" />

                    </div>
                                   
                <div className="btn">
                     
                {Loading ?
                <button type="submit" disabled className="event-submit">
                  Please wait...
                    </button>:
            <button type="submit"  className="event-submit">
             Add Event
              </button>
          }
                </div>
                </div>
                
                </form>
        </div>
    )
}

export default Event
