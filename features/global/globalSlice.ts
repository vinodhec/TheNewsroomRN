import { MiddlewareArray, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import {omit} from 'lodash'
export interface GlobalState {
  bookmarks:string[],
  breaking:any;
  categories:string[],
  groups:string[],
  showNotifications:boolean,
  autoPlayVideos:boolean,
  editNews:any;
  defaultSharingApp:string
}

const initialState: GlobalState = {
  bookmarks:[],
  breaking:null,
  showNotifications:true,
  editNews:null,
  autoPlayVideos:true,
  defaultSharingApp:'Whatsapp',
  categories:[
    'All',
    'India',
    'Tamil Nadu',
    'Sports',
    'Entertainment',
    'Finance',
    'World',
  ],
  groups:[]

};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.


export const logout = createAsyncThunk(
  'logout',
  async (obj: any, a) => {
    const { type } = obj



    return { type, details: {} }


  }
);


export const globalSlice = createSlice({
  name: 'global',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {

    // Use the PayloadAction type to declare the contents of `action.payload`
    update: (state: any, { payload }: any) => {
      
      const { valueType, value } = payload
      state[valueType] = omit(value,['timestamp','updatedTimestamp']);
      
      return state

    },

  }, extraReducers: (builder) => {
    builder

      .addCase(logout.fulfilled, (state: any, action) => {
        state.status = 'idle';

        state['user'] = null;

      })

  }    // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.

});

export const { update } = globalSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.global.value)`

export const selectGlobalValue = (type: any) => {
  return (state: any) => state.global[type]
}

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.

export default globalSlice.reducer;


