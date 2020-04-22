import React, { useState  } from 'react';
import './Tasks.scss';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';
import { generateGuid } from '../../helpers/commonHelper';


const Tasks = (props) => {

   const [newItem, setNewItem] = useState({
      title: '',
      content: '',
      id: '',
      usersId: [],
      ownerId: props.curUser.id,
      popup: false
   });

   //for two input 
   const handleChange = (e) => {
      setNewItem({
         ...newItem,
         [e.target.id]: e.target.value,
         id: generateGuid(),
      })
   }
   
   const onAddTask = (e) => {
      e.preventDefault();
      
      props.addTask(newItem);
      
      setNewItem({
         title: '',
         content: '',
         id: '',
         usersId: [],
         ownerId: props.curUser.id,
         popup: false
      });
   }

   const isSubmitDisabled = () => {
      return !newItem.content || !newItem.title ||
         newItem.content.length == 0 || newItem.title.length == 0;
   }


   const getCurentUserTasks = props.tasks.filter(x => x.ownerId === props.curUser.id || x.usersId.some(y => y  === props.curUser.id));

   const availableUsersToShare = (curTask) => {
      if (curTask.usersId) {
         let availableUsers = props.users.filter(user => !curTask.usersId.some(id => id === user.id) && user.id != props.curUser.id);

         if (availableUsers.length > 0) {
            let result = availableUsers.map(user => {
               return (
                  <span className="users__name" onClick={() => props.shareTask(user, curTask)}>{user.name}</span>
               )
            })
            return result;
         } else if (availableUsers.length === 0) {
            return (
               <span className="users__name--warning">no available users to share with</span>
            )
         }
      }
   }

   const showSharedUsers = (task) => {
     let users = props.users.map(user => {
        if(task.usersId){
         let result = task.usersId.map(userId => {
            if(user.id === userId){
               return (
                  <li className= "task__sharedUseres" onClick= {() => props.deleteSharedUser(userId, task)}>{user.name}</li> 
               )
            }
         })
         return result;
     }})
      return users;
   } 

   const isTaskShared = (task) => task.usersId && task.usersId.some(x => x === props.curUser.id);

   const unsubscribe = (task) => {
      props.users.map(user => {
         task.usersId.map(userId => {
            if (user.id === userId) {
               props.deleteSharedUser(userId, task)
            }
         })
      })
   }


   const listTasks = getCurentUserTasks.length
      ? (
         getCurentUserTasks.map(task => {
            return (
               <div className= "task" key={task.id}>
               <div className= "task__header">
                  <div className= "task__title">{task.title}</div>
                     <button className= {isTaskShared(task) ? "task__shareBtn--disabled" : "task__shareBtn"} onClick={() => props.showPopup(task.id)}><i className={ !task.popup ? "fa fa-user-plus" : "fa fa-user-plus task__shareBtn--active"}></i></button>
                  </div>
                  <div className="task__text">{task.content}</div>

                  {isTaskShared(task)
                     ? <div className="task__sharedRemark">this task is shared with you</div> 
                     : task.usersId.length > 0 
                     ? <div className="task__shared">shared with:
                        {showSharedUsers(task)} 
                        </div> 
                     : null
                  }
                  {isTaskShared(task)
                     ? <button className="task__unsubscribeBtn" onClick={() => unsubscribe(task)}>unsubscribe</button>
                     : <button className="task__deleteBtn" onClick={() => props.deleteTask(task)}>delete</button>
                  }
                     <div className="users__popup">
                        {task.popup ? availableUsersToShare(task) : null}
                     </div>
               </div>
         )
      })
   )
   : (
      <div className= "task__remark"> You have no Tasks yet yaay!</div>
      )


   const logOut = () => {
      props.resetCurrentUser();
   };


   return (
      <div className= "tasks">
         <div className= "tasks__creation">
         <div className= "tasks__greeting">Hi {props.curUser.name}!</div>
            <div className= "tasks__text">Create New Task!</div>
            <form className= "tasks__form" >
               <input className= "tasks__input" 
                  onChange={e => handleChange(e)} 
                  type="text" id="title" 
                  name="title" 
                  value= {newItem.title}
                  placeholder="title"
                  autocomplete="off" required />
               <textarea className= "tasks__input" 
                  onChange={e => handleChange(e)} 
                  type="text" id="content" 
                  value= {newItem.content}
                  name="task" placeholder="task" required />
               <button className= "tasks__createBtn" disabled= {isSubmitDisabled()} onClick={(e) => onAddTask(e)}><i className="fa fa-plus"></i> add task</button>
            </form>
            <Link to="/login" className= "tasks__logOutLink" onClick={logOut}>
               <button className= "tasks__logOutBtn">Log Out</button>
            </Link>
         </div>
         <div className= "tasks__allTasks">
            {listTasks}
         </div> 
         <Link to="/login" className= "tasks__logOutLink--phone" onClick={logOut}>
               <button className= "tasks__logOutBtn--phone">Log Out</button>
            </Link>
      </div> 
   )
};


const mapStateToProps = state => {
   return {
      number: state.number,
      tasks: state.tasks,
      curUser: state.currentUser,
      users: state.users,
   };
};

const mapDispatchToProps = dispatch => {
   return {
      addTask: (task) => dispatch({type: actionTypes.ADD_TASK, val: task}),
      deleteTask: (task) => dispatch({type: actionTypes.DELETE_TASK, val: task}),
      resetCurrentUser: () => dispatch({type: actionTypes.RESET_CURRENT_USER}),
      showPopup:(id) => dispatch({type: actionTypes.SHOW_POPUP, id: id}),
      shareTask: (curUser, curTask) => dispatch({ type: actionTypes.SHARE_TASK,  payload: {user: curUser, task: curTask},}),
      deleteSharedUser: (curUserId, curTask) => dispatch({ type: actionTypes.DELETE_SHARED_USER,  payload: {user: curUserId, task: curTask},})
   };
};


export default connect(mapStateToProps, mapDispatchToProps)(Tasks);