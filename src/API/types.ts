import {
  driverScheme,
  driversResponse,
  raceScheme,
  resultScheme,
  resultsResponse,
} from 'scheme/driver';
import {imageScheme} from 'scheme/image';
import {InferType} from 'yup';

type Image = InferType<typeof imageScheme>;
type Driver = InferType<typeof driverScheme>;
type DriverResponse = InferType<typeof driversResponse>;
type ResultsResponse = InferType<typeof resultsResponse>;
type Race = InferType<typeof raceScheme>;
type Result = InferType<typeof resultScheme>;

export type {Image, Driver, DriverResponse, ResultsResponse, Race, Result};
