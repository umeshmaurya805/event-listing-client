import React,{useState} from 'react'
import './login.css'
import Auth from './images/auth.jpg'
import { TextField } from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import { useHistory } from 'react-router-dom';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import axios from 'axios'
import Nav from './Nav';

function Login() {
  const history = useHistory();
  const [LoginObj, setLognObj] = useState({})
  const [Loading, setLoading] = useState(0);

  const handleInput = async(e) => {
    setLognObj({ ...LoginObj, [e.target.name]: e.target.value })
    console.log(LoginObj);
  }
  const SignupSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(1);
      const {status,data} = await axios.post('https://event-listing-server.herokuapp.com/api/signup', LoginObj);
      console.log(status,data)
      if (status === 200) {
        localStorage.clear();
        history.push('/login');
      }
      else if (status === 203) {
        alert(data)
        setLoading(0);
        
      }
    } catch (e) {
      setLoading(0);

      alert("something went wrong");
    }
  }
    const [values, setValues] = React.useState({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
      });
    
      const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
      };
    
      const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
      };
    
      const handleMouseDownPassword = (event) => {
        event.preventDefault();
  };
  const styles = {
    input: {
      "&:invalid": {
        border: "red solid 2px"
      }
    }
  };
    return (
        <>
        <Nav/>
        <div className="login-page">
            <div className="event-form-image">
                <img src={Auth} alt="authentication image"/>
            </div>
            <form onChange={handleInput} onSubmit={SignupSubmit} className="event-form-elements login-form">
                <br/> <br/>
                <div className="form-headline">
                    Fill the details to get registered <br/> <br/>
                </div>
                <div className="event-form-inputs">
              <TextField name="name" fullWidth={true}
                inputProps={{pattern:"[a-zA-Z]+[ ][a-zA-Z]+",title:"Enter a valid First name and last name"}}
                defaultValue="" className="email-input" required id="standard-required" type="text" label="Name" />
                    
                </div>
                <div className="event-form-inputs">
                    <TextField name="email" fullWidth={true} defaultValue="" className="email-input" required id="standard-required" type="email" label=" Email or Username" />
                    
                </div>
                <div className="event-form-inputs">
                <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                    <Input required name="password" fullWidth={true}
                id="standard-adornment-password"
                inputProps={{ pattern:"(?=.*)(?=.*[a-z])(?=.*[A-Z]).{8,}",
                title:"Must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters"}}
            type={values.showPassword ? 'text' : 'password'}
            value={values.password}
            onChange={handleChange('password')}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {values.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
                    </div>
            <div className="btn">
              {Loading ?
                <button type="submit" disabled className="event-submit login-submit">
                  Please wait...
                    </button>:
            <button type="submit"  className="event-submit login-submit">
              Sign Up
              </button>
          }
              
                </div>
            </form>
        </div>
        </>
    )
}

export default Login
