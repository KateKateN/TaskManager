import React from 'react';
import classes from './Task.module.scss';

const Task = (props) => {

   const listTasks = props.tasks.length
      ? (
         props.tasks.map(task => {
            return (
               <div className={classes.task} key={task.id}>
                  <div className={classes.taskHeader}>
                     <div className={classes.title}>{task.title}</div>
                     <button className={classes.shareBtn}><i className="fa fa-user-plus"></i></button>
                  </div>
                  <div className={classes.taskText}>{task.content}</div>
                  <div className={classes.sharedWith}>shared with: <span className={classes.sharedUseres}>Kikik</span></div>
                  <button className={classes.deleteBtn}>delete</button>
               </div>
            )
         })
      )
      : (
         <p> You have no Tasks yaay!</p>
      )

   return (
      { listTasks }
      // <div className={classes.task}>
      //    <div className={classes.taskHeader}>
      //       <div className={classes.title}>fggggggg</div>
      //       <button className={classes.shareBtn}><i className="fa fa-user-plus"></i></button>
      //    </div>
      //    <div className={classes.taskText}>Lorem dkdsfkdsvmvjdfhhhhhhhh >Lorem dkds>Lorem dkds>Lorem dkds>Lorem dkds>Lorem dkds>Lorem dkds>Lorem dkds vdkjvdnvd vj</div>
      //    <div className={classes.sharedWith}>shared with: <span className={classes.sharedUseres}>Kikik</span></div>
      //    <button className={classes.deleteBtn}>delete</button>
      // </div>
   )
};

export default Task;