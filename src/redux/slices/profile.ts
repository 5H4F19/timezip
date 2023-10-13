import {createSlice} from '@reduxjs/toolkit';
import {getProfileInitialState} from '../default/utils';
import {RootState} from '../store';
import {SliceName} from '../types/sliceNames';

export const profileSlice = createSlice({
  name: SliceName.PROFILE,
  initialState: getProfileInitialState(),
  reducers: {},
});

export const selectProfile = (state: RootState) => state.profile;
export default profileSlice.reducer;
