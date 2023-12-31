import { createAsyncThunk, createSlice, AsyncThunkConfig } from '@reduxjs/toolkit';
import getToken from '../../helpers/getToken';
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
  deleteStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  deleteError: string | null;
  archiveStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  archiveError: string | null;
}

const initialState: IAllEmployeesState = {
  allEmployees: [],
  status: 'idle',
  error: null,
  deleteStatus: 'idle',
  deleteError: null,
  archiveStatus: 'idle',
  archiveError: null,
};

export const getAllEmployees = createAsyncThunk<IAllEmployees[], void, AsyncThunkConfig>(
  'allEmployees/getAllEmployees',
  async (_, thunkApi) => {
    try {
      const response = await axios.get<IAllEmployees[]>('http://64.226.89.72/api/all-users/', {
        headers: getToken(),
      });
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  },
);

export const deleteEmployee = createAsyncThunk<void, number, AsyncThunkConfig>(
  'employee/deleteEmployee',
  async (id: number, thunkApi) => {
    try {
      await axios.delete(`http://64.226.89.72/api/all-users/${id}/`, {
        headers: getToken(),
      });
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  },
);

export const archiveEmployee = createAsyncThunk<IAllEmployees, number, AsyncThunkConfig>(
  'employee/archiveEmployee',
  async (id: number, thunkApi) => {
    try {
      const response = await axios.patch<IAllEmployees>(
        `http://64.226.89.72/api/all-users/${id}/`,
        { is_active: false },
        {
          headers: getToken(),
        },
      );
      return response.data;
    } catch (error: any) {
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
      })
      .addCase(deleteEmployee.pending, (state) => {
        state.deleteStatus = 'loading';
      })
      .addCase(deleteEmployee.fulfilled, (state) => {
        state.deleteStatus = 'succeeded';
      })
      .addCase(deleteEmployee.rejected, (state, action) => {
        state.deleteStatus = 'failed';
        state.deleteError = action.error.message ?? 'Something went wrong.';
      })
      .addCase(archiveEmployee.pending, (state) => {
        state.archiveStatus = 'loading';
      })
      .addCase(archiveEmployee.fulfilled, (state, action) => {
        state.archiveStatus = 'succeeded';
        const index = state.allEmployees.findIndex((e) => e.id === action.payload.id);
        state.allEmployees[index] = action.payload;
      })
      .addCase(archiveEmployee.rejected, (state, action) => {
        state.archiveStatus = 'failed';
        state.archiveError = action.error.message ?? 'Something went wrong.';
      });
  },
});

export default allEmployeesSlice.reducer;
