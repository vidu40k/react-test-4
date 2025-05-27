import {createAsyncThunk} from '@reduxjs/toolkit';
import {driversResponse, resultsResponse} from 'scheme/driver';
import {imageErrorScheme, imageScheme} from 'scheme/image';
import {AppError, handleBaseError} from 'utils/handler';
import * as API from '../API/requests';

export const reset = createAsyncThunk('reset', () => {});
export const fetchImagesWithError = createAsyncThunk(
  'users/getImages',
  async (_, {rejectWithValue}) => {
    try {
      const response = await API.getImageError();
      return imageScheme.validateSync(response.data);
    } catch (er) {
      const error: AppError = handleBaseError(er);
      return rejectWithValue(error);
    }
  },
);

export const fetchImagesWithValidationError = createAsyncThunk(
  'users/getImages',
  async (_, {rejectWithValue}) => {
    let url = '';
    try {
      const response = await API.getImage();
      url = response.request.responseURL;
      return imageErrorScheme.validateSync(response.data);
    } catch (er) {
      const error: AppError = handleBaseError(er, url);
      return rejectWithValue(error);
    }
  },
);

export const fetchImage = createAsyncThunk(
  'users/getImage',
  async (_, {rejectWithValue}) => {
    try {
      const response = await API.getImage();
      return imageScheme.validateSync(response.data);
    } catch (er) {
      const error: AppError = handleBaseError(er);
      return rejectWithValue(error);
    }
  },
);

export const getDrivers = createAsyncThunk(
  'users/getDrivers',
  async (offset: number, {rejectWithValue}) => {
    try {
      const response = await API.getDrivers(offset);
      return driversResponse.validateSync(response.data);
    } catch (er) {
      const error: AppError = handleBaseError(er);
      return rejectWithValue(error);
    }
  },
);

export const getRacesByDriver = createAsyncThunk(
  'users/getRacesByDriver',
  async (data: {offset: number; driver: string}, {rejectWithValue}) => {
    try {
      const response = await API.getRacesByDriver(data.offset, data.driver);
      return resultsResponse.validateSync(response.data);
    } catch (er) {
      const error: AppError = handleBaseError(er);
      return rejectWithValue(error);
    }
  },
);
