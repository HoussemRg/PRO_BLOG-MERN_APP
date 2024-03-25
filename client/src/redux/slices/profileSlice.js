import {createSlice} from '@reduxjs/toolkit'

const profileSlice=createSlice({
    name:'profile',
    initialState:{
       profile:null,
       loading:false,
       isProfileDeleted:false,
       profiles:[],
       usersCount:null
    },
    reducers:{
        setProfile:(state,action)=>{
            state.profile=action.payload
        },
        setProfilePhoto:(state,action)=>{
            state.profile.profilePhoto=action.payload
        },
        updateProfile(state,action) {
            state.profile = action.payload;
        },
        setLoading:(state)=>{
            state.loading=true;
        },
        clearLoading:(state)=>{
            state.loading=false;
        },
        setIsProfileDeleted:(state)=>{
            state.isProfileDeleted=true;
            state.loading=false;
        },
        clearIsProfileDeleted:(state)=>{
            state.isProfileDeleted=false;
        },
        setUsersCount:(state,action)=>{
            state.usersCount=action.payload;
        },
        setProfiles:(state,action)=>{
            state.profiles=action.payload;
        },
    }
        
})

const profileReducer=profileSlice.reducer; //  to handle state updates for the 'profile'
const profileAction=profileSlice.actions;

export {profileAction,profileReducer}