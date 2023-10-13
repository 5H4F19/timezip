import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '../store';
import {SliceName} from '../types/sliceNames';

export const withdrawalSlice = createSlice({
  name: SliceName.WITHDRAWAL,
  initialState: [],
  reducers: {},
});

export const selectWithdrawal = (state: RootState) => state.withdrawal;
export default withdrawalSlice.reducer;
