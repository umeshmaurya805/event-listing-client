import React, { useState,useEffect } from 'react'
import './login.css'
import Auth from './images/auth.jpg'
import { TextField } from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import axios from 'axios'
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { useHistory } from 'react-router-dom';
import Nav from './Nav';

function Login() {
  const history = useHistory();
  const [Loading, setLoading] = useState(0);

  const [LoginObj, setLognObj] = useState({})
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) history.push('/');
  });

  const handleInput = async(e) => {
    setLognObj({ ...LoginObj, [e.target.name]: e.target.value })
    console.log(LoginObj);
  }
  const LoginSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(1);
      const {status,data} = await axios.post('http://localhost:8000/api/login', LoginObj);
      if (status === 200) {
        localStorage.setItem("user", JSON.stringify({ token: data.token, name: data.name, email: data.email }));
        history.push('/');
      }
    } catch (e) {
      alert("Email or password is incorrect");
      setLoading(0);
    }
  }
    const [values, setValues] = useState({
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
  return (
      <>
      <Nav/>
      <div className="login-page">
            <div className="event-form-image">
                <img src={Auth} alt="authentication image"/>
            </div>
            <form onChange={handleInput} onSubmit={LoginSubmit}  className="event-form-elements login-form">
          <br /> <br />

                <div className="form-headline">
                    Login to Get Started <br/> <br/>
                </div>
                <div className="event-form-inputs">
                    <TextField name="email" fullWidth={true} defaultValue="" className="email-input" required id="standard-required" type="email" label=" Email or Username" />
                    
                </div>
                <div className="event-form-inputs">
                <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                    <Input required name="password" fullWidth={true}
            id="standard-adornment-password"
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
             Login
              </button>
          }
            </div>

            </form>
      </div>
      </>
    )
}

export default Login
