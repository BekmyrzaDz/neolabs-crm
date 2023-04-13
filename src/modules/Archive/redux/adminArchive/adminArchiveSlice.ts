import { createAsyncThunk, createSlice, AsyncThunkConfig } from '@reduxjs/toolkit';
import axios from 'axios';

interface IAdmins {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | number;
  image: string;
  token: void;
}

interface IAdminsState {
  admins: IAdmins[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: IAdminsState = {
  admins: [],
  status: 'idle',
  error: null,
};

interface ICreateAdminRequest {
  first_name: string;
  last_name: string;
  email: string;
  phone: string | number;
  image: string;
  is_archive: boolean;
}

const userItem = localStorage.getItem('user');
const access_token: string | undefined = userItem ? JSON.parse(userItem).access : undefined;

export const getArchiveAdmins = createAsyncThunk<IAdmins[], void, AsyncThunkConfig>(
  'admins/getArchiveAdmins',
  async (_, thunkApi) => {
    try {
      const response = await axios.get<IAdmins[]>('http://64.226.89.72/api/archive/admins/', {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  },
);

const adminArchiveSlice = createSlice({
  name: 'admins',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getArchiveAdmins.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getArchiveAdmins.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.admins = action.payload;
      })
      .addCase(getArchiveAdmins.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Something went wrong.';
      });
  },
});

export default adminArchiveSlice.reducer;
