import {array, object, string} from 'yup';

const driverScheme = object({
  driverId: string().required(),
  code: string(),
  url: string().required(),
  givenName: string().required(),
  familyName: string().required(),
  dateOfBirth: string().required(),
  nationality: string().required(),
});

const driversResponse = object({
  MRData: object({
    xmlns: string().required(),
    series: string().required(),
    url: string().url().required(),
    limit: string().required(),
    offset: string().required(),
    total: string().required(),
    DriverTable: object({
      Drivers: array().of(driverScheme).required(),
    }).required(),
  }),
});

const resultScheme = object({
  number: string(),
  position: string().required(),
  positionText: string().required(),
  points: string().required(),
  Driver: driverScheme,
  Constructor: object({
    constructorId: string().required(),
    url: string().url().required(),
    name: string().required(),
    nationality: string().required(),
  }),
  grid: string().required(),
  laps: string().required(),
  status: string().required(),
});

const raceScheme = object({
  season: string().required(),
  round: string().required(),
  url: string().url().required(),
  raceName: string().required(),
  Circuit: object({
    circuitId: string().required(),
    url: string().url().required(),
    circuitName: string().required(),
    Location: object({
      lat: string().required(),
      long: string().required(),
      locality: string().required(),
      country: string().required(),
    }).required(),
  }).required(),
  date: string().required(),
  Results: array().of(resultScheme).required(),
});

const resultsResponse = object({
  MRData: object({
    xmlns: string().required(),
    series: string().required(),
    url: string().url().required(),
    limit: string().required(),
    offset: string().required(),
    total: string().required(),
    RaceTable: object({
      driverId: string().required(),
      Races: array().of(raceScheme).required(),
    }).required(),
  }),
});

export {
  driverScheme,
  driversResponse,
  resultsResponse,
  raceScheme,
  resultScheme,
};
