import * as actionTypes from './actions'

const initialState = {
   tasks: [],
   currentUser: null,
   users: [],

   showSharePopupId : null
}


const reducer = (state = initialState, action) => {
   switch (action.type) {
      
      case actionTypes.ADD_TASK:
         return {
            ...state,
            tasks: [...state.tasks, action.val]
         }

      case actionTypes.DELETE_TASK:

         return {
            ...state,
            tasks: state.tasks.filter(task => task.id != action.val.id)
         }

      case actionTypes.ADD_USER:
         return {
            ...state,
            users: [...state.users, action.user]
         }

      case actionTypes.CURRENT_USER:
         return {
            ...state,
            currentUser: action.user
         }

      case actionTypes.LOGIN_CURRENT_USER:
         return {
            ...state,
            currentUser: action.user
         }

      case actionTypes.RESET_CURRENT_USER:
         return {
            ...state,
            currentUser: null
         }

      case actionTypes.SHOW_POPUP:
         return {
            ...state,
            showSharePopupId : action.id == state.showSharePopupId ? null: action.id
         }

      case actionTypes.SHARE_TASK:
         return {
            ...state,
            tasks: state.tasks.map(task =>
               task.id === action.payload.task.id ? {
                  ...task,
                  usersId: [...task.usersId.concat(action.payload.user.id)]
               } : task
            ),
            showSharePopupId: null
         }

      case actionTypes.DELETE_SHARED_USER:
         return {

            ...state,
            tasks: state.tasks.map(task =>
               task.id === action.payload.task.id ? {
                  ...task,
                  usersId: [...task.usersId.filter(x => x !== action.payload.user)]
               } : task)
         }

         case actionTypes.UNSUBSCRIBE:
            return {
               ...state,
               tasks: state.tasks.map(task =>
                  task.id === action.payload.task.id ? {
                     ...task,
                     usersId: [...task.usersId.filter(x => x !== action.payload.user)]
                  } : task)
            }
   }
   return state;
}


export default reducer;

