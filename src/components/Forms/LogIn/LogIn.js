import React, { useState }from 'react';
import './LogIn.scss';
import { connect } from 'react-redux';
import { Link, Redirect } from "react-router-dom";
import { withRouter } from 'react-router-dom';
import * as actionTypes from '../../../store/actions';

 
const LogIn = (props) => {

   const [user, setUser] = useState({
      email: '',
      password: ''
   });

   const [error, setError] = useState(false);

   const handleChange = (e) => {
      setUser({
         ...user,  //take existing key-value pairs and use them in our new state
         [e.target.name]: e.target.value   //define new key-value pair
      })
   }

   const logIn = () => {
      
      const existingUser = props.users.find( x => x.email === user.email && x.password === user.password);
      console.log ("LOGIN isUserExist", existingUser);      

      if(existingUser){
         props.logInCurrentUser(existingUser);

         props.history.push("/tasks");
      }

      else {
         setError(true);
      }
   }

   return(
      
      <div className="auth logIn--bg">
         {props.currentUser!= null ? <Redirect to="/tasks" /> : null }
         <div className = "auth__content--wrapper">
            <div className= "auth__content">
               <div className= "auth__title">Log In</div>
               <form className= "auth__form" >
                  {error
                     ? <div className= "auth__errorText"> Form invalid: email or password is incorrect </div> 
                     : null }
                  <label className= "auth__label" for="email">email</label>
                  <input className= "auth__input"
                     onChange={e => handleChange(e)} 
                     name= "email" 
                     value= {user["email"]} 
                     type= "email"></input>
                  <label className= "auth__label" for="password">password</label>
                  <input className="auth__input"
                     onChange={e => handleChange(e)}
                     name="password"
                     value={user["password"]}
                     type="password"></input>
                  <div className="auth__buttons">
                     <div className="auth__logInBtn" type= "submit" onClick= {logIn}>  Log In </div>
                     {/* <Link className="auth__logIn__signInLink auth__signInLink" to="/signin">
                        <button className="auth__signInBtn auth__btn">Sign In</button>
                     </Link> */}
                  </div>
               </form>
            </div> 
            <div className= "auth__linkText">Don't have an account yet? <Link to= "/signin" className= "auth__link">Sign in</Link></div> 
         </div> 
      </div>      
   );
};

const mapStateToProps = state => {
   return {
      users: state.users,
      currentUser: state.currentUser
   };
};


const mapDispatchToProps = dispatch => {
   return {
      logInCurrentUser: (user) => dispatch({type: actionTypes.LOGIN_CURRENT_USER, user: user})
   };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LogIn));
