import { createAsyncThunk, createSlice, AsyncThunkConfig } from '@reduxjs/toolkit';
import axios from 'axios';

interface IMentors {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | number;
  image: string;
  token: void;
  patent_number: number;
  patent_start: string;
  patent_end: string;
}

interface IMentor {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  image: string;
  linkedin: string;
  department: {
    name: string;
  };
  patent_number: number;
  patent_start: string;
  patent_end: string;
  is_active: boolean;
}

interface IMentorsState {
  mentors: IMentors[];
  mentor: IMentor | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  deleteStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  archiveStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  archiveError: string | null;
  deleteError: string | null;
  error: string | null;
}

const initialState: IMentorsState = {
  mentors: [],
  mentor: null,
  status: 'idle',
  deleteStatus: 'idle',
  deleteError: null,
  archiveStatus: 'idle',
  archiveError: null,
  error: null,
};

const userItem = localStorage.getItem('user');
const access_token: string | undefined = userItem ? JSON.parse(userItem).access : undefined;

export const getArchiveMentors = createAsyncThunk<IMentorsState[], void, AsyncThunkConfig>(
  'mentors/getArhiveMentors',
  async (_, thunkApi) => {
    try {
      const response = await axios.get<IMentorsState[]>(
        'http://64.226.89.72/api/archive/mentors/',
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        },
      );
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  },
);

export const deleteMentorById = createAsyncThunk<void, number, AsyncThunkConfig>(
  'mentors/deleteMentorById',
  async (id: number, thunkApi) => {
    try {
      await axios.delete<void>(`http://64.226.89.72/api/archive/mentors/${id}`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  },
);

export const archiveMentorById = createAsyncThunk<IMentor, number, AsyncThunkConfig>(
  'mentors/archiveMentorById',
  async (id: number, thunkApi) => {
    try {
      const response = await axios.patch<IMentor>(
        `http://64.226.89.72/api/archive/mentors/${id}/`,
        {
          is_active: true, // изменяем состояние на неактивное
        },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        },
      );
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  },
);

const mentorArchiveSlice = createSlice({
  name: 'mentors',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getArchiveMentors.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getArchiveMentors.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.mentors = action.payload;
      })
      .addCase(getArchiveMentors.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Something went wrong.';
      })
      .addCase(deleteMentorById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(deleteMentorById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Something went wrong.';
      })
      .addCase(archiveMentorById.pending, (state) => {
        state.archiveStatus = 'loading';
      })
      .addCase(archiveMentorById.fulfilled, (state, action) => {
        state.archiveStatus = 'succeeded';
        const index = state.mentors.findIndex((e) => e.id === action.payload.id);
        state.mentors[index] = action.payload;
      })
      .addCase(archiveMentorById.rejected, (state, action) => {
        state.archiveStatus = 'failed';
        state.archiveError = action.error.message ?? 'Something went wrong.';
      });
  },
});

export default mentorArchiveSlice.reducer;
