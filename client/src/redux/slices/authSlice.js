import {createSlice} from '@reduxjs/toolkit'

const authSlice=createSlice({
    name:'auth',
    initialState:{
        user: localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null,
        registerMessage:null,
        isEmailVerified:false
    },
    reducers:{
        login:(state,action)=>{
            state.user=action.payload //When a 'login' action is dispatched, it sets the user property in the state to the payload of the action.
        },
        logout:(state)=>{
            state.user=null
        },
        register:(state,action)=>{
            state.registerMessage=action.payload
        },
        //when the user update his profile photo, the profile slice handle this update but the image in user slice still unchanged so we must create a reducer that handle this update and dispatch it when the user update his photo
        // and don't forget to update the local storage witth the new photo
        //and we mus't not forget this should be done with the username and other credentials of user
        setUserPhoto:(state,action)=>{
            state.user.profilePhoto=action.payload
        },
        setUsername:(state,action)=>{
            state.user.username=action.payload
        },
        clearIsRegistered:(state)=>{
            state.registerMessage=null;
        },
        setIsEmailVerified:(state)=>{
            state.isEmailVerified=true;
            state.registerMessage=null;
        }
    }
})

const authReducer=authSlice.reducer; //  to handle state updates for the 'user'
const authAction=authSlice.actions;

export {authAction,authReducer}