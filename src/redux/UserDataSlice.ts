import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Driver, Image, Race} from 'api/types';
import {fetchImage, getDrivers, reset, getRacesByDriver} from './thunks';

interface User {
  token: string;
  user_id: string;
}

interface dataState extends User {
  images: Image[];
  drivers: Driver[];
  driversRaces: Record<string, Race[]>;
}

const initialState = {
  token: '',
  images: [],
  drivers: [],
  driversRaces: {},
} as dataState;

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setAuthData(state, action: PayloadAction<User>) {
      const {token = '', user_id} = action.payload;
      state.token = token;
      state.user_id = user_id;
    },
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload || '';
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchImage.fulfilled, (state, action) => {
      state.images.concat(action.payload);
    });
    builder.addCase(getDrivers.fulfilled, (state, action) => {
      if (action.meta.arg === 0) {
        state.drivers = action.payload.MRData.DriverTable.Drivers;
      } else {
        state.drivers = [
          ...state.drivers,
          ...action.payload.MRData.DriverTable.Drivers,
        ];
      }
    });
    builder.addCase(getRacesByDriver.fulfilled, (state, action) => {
      if (!state.driversRaces) {
        state.driversRaces = {};
      }

      if (action.meta.arg.offset === 0) {
        state.driversRaces[action.meta.arg.driver] =
          action.payload.MRData.RaceTable.Races;
      } else {
        state.driversRaces[action.meta.arg.driver] = [
          ...state.driversRaces[action.meta.arg.driver],
          ...action.payload.MRData.RaceTable.Races,
        ];
      }
    });

    builder.addCase(reset.fulfilled, () => initialState);
  },
});

export const {setAuthData} = dataSlice.actions;
export default dataSlice.reducer;
