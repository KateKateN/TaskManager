import React, { useState } from 'react';
import './SignIn.scss';
import { Link, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import { generateGuid } from '../../../helpers/commonHelper';
import * as actionTypes from '../../../store/actions';

const SignIn = (props) => {

   const [user, setUser] = useState({
      id: '',
      name: '',
      email: '',
      password: ''
   });

   const [nameError, setNameError] = useState("");
   const [emailError, setEmailError] = useState("");
   const [passwordError, setPasswordError] = useState("");


   const handleChange = (e) => {
      setUser({
         ...user,  //take existing key-value pairs and use them in our new state
         [e.target.name]: e.target.value,   //define new key-value pair
         id: generateGuid()
      })
   }

   // validation
   const validate = () => {
      let nameError = "";
      let emailError = "";
      let passwordError = "";

      if (!user.name) {
         nameError = "name can not be blank";
      }

      if (!user.email) {
         emailError = "invalid email";
      }

      if (user.email !== null) {
         let lastAtPos = user["email"].lastIndexOf('@');
         let lastDotPos = user["email"].lastIndexOf('.');


         if (!(lastAtPos < lastDotPos && lastAtPos > 0 && user["email"].indexOf('@@') == -1 && lastDotPos > 2 && (user["email"].length - lastDotPos) > 2)) {
            emailError = "invalid email";
         }

         if (props.users) {
            props.users.map(x => {
               if (x.email === user.email) {
                  emailError = "email used by another user"
               }
            })
         }
      }

      if (user.password.length < 5) {
         passwordError = "password is too short";
      }

      if (emailError || nameError || passwordError) {
         setNameError(nameError);
         setEmailError(emailError);
         setPasswordError(passwordError);
         return false;
      }
      return true;
   }


   const signIn = (e) => {
      e.preventDefault();
      const isValid = validate();

      if (isValid) {
         console.log(user);

         setNameError("");
         setEmailError("");
         setPasswordError("");

         props.addUser(user);
         props.currentUser(user);

         props.history.push("/tasks");
      }
   }
   
   return (
      <div className="auth signIn--bg">
         {props.curUser!= null ? <Redirect to="/tasks" /> : null }
         <div className = "auth__content--wrapper">
            <div className="auth__content">
               <div className="auth__title">Sign In</div>
               <form className="auth__form">
                  <label className="auth__label" for="name">your name</label>
                  <div className="auth__errorText">{nameError}</div>
                  <input className= "auth__input" 
                     onChange={e => handleChange(e)} 
                     name= "name"
                     value= {user["name"]} 
                     type= "text"></input>
                  <label className= "auth__label" for="email">email</label>
                  <div className="auth__errorText">{emailError}</div>
                  <input className= "auth__input"
                     onChange={e => handleChange(e)} 
                     name= "email" 
                     value= {user["email"]} 
                     type= "text"></input>
                  <label className= "auth__label" for="password">password</label>
                  <div className="auth__errorText">{passwordError}</div>
                  <input className="auth__input"
                     onChange= {e => handleChange(e)}
                     name= "password"
                     value= {user["password"]}
                     type= "password"></input>
                  <div className= "auth__buttons">
                     <button className= "auth__signInBtn" type="submit" onClick={signIn}>
                  Sign In 
                     </button>
                     {/* <Link className= "auth__signIn__logInLink auth__logInLink" to="/login">
                        <button className= "auth__logInBtn">Log In</button>
                     </Link> */}
                  </div>
               </form>
            </div> 
            <div className= "auth__linkText">Do you have an account yet? <Link to= "/login" className= "auth__link">Log in</Link></div> 
         </div>
      </div>      
   );
};

const mapStateToProps = state => {
   return {
      users: state.users,
      curUser: state.currentUser,
      isLogged: state.isLogged
   };
};

const mapDispatchToProps = dispatch => {
   return {
      addUser: (user) => dispatch({type: actionTypes.ADD_USER, user: user}),
      currentUser: (user) => dispatch({type: actionTypes.CURRENT_USER, user: user})
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);