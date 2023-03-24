import { createAsyncThunk, createSlice, AsyncThunkConfig } from '@reduxjs/toolkit';
import axios from 'axios';

interface IAllEmployees {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | number;
  user_type: string;
  image: string;
  token: void;
}

interface IAllEmployeesState {
  allEmployees: IAllEmployees[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: IAllEmployeesState = {
  allEmployees: [],
  status: 'idle',
  error: null,
};

const userItem = localStorage.getItem('user');
const access_token: string | undefined = userItem ? JSON.parse(userItem).access : undefined;

export const getAllEmployees = createAsyncThunk<IAllEmployees[], void, AsyncThunkConfig>(
  'allEmployees/getAllEmployees',
  async (_, thunkApi) => {
    try {
      const response = await axios.get<IAllEmployees[]>('http://64.226.89.72/api/all-users/', {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      return response.data;
    } catch (error: unknown) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  },
);

const allEmployeesSlice = createSlice({
  name: 'allEmployees',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllEmployees.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAllEmployees.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.allEmployees = action.payload;
      })
      .addCase(getAllEmployees.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Something went wrong.';
      });
  },
});

export default allEmployeesSlice.reducer;
