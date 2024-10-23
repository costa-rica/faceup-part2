import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type UserState = {
  value: {
    email: string | null;
    photos: [{height:number,uri:string,width:number} | null] ;
  };
};

const initialState: UserState = {
  value: { email: null, photos: [null]  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateEmail: (state, action: PayloadAction<string>) => {
      state.value.email = action.payload;
    },
    addPhoto: (state, action: PayloadAction<{height:number,uri:string,width:number}>) => {
      state.value.photos?.push(...state.value.photos, action.payload)
    }
  },
});

export const { updateEmail, addPhoto } = userSlice.actions;
export default userSlice.reducer;
