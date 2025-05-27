import {number, object, string} from 'yup';

const imageScheme = object({
  id: string().required(),
  author: string().required(),
  width: number().required(),
  height: number().required(),
  url: string().required(),
  download_url: string().required(),
});

const imageErrorScheme = object({
  id: number().required(),
  author: number().required(),
  width: string().required(),
  height: string().required(),
  url: number().required(),
  download_url: number().required(),
});

export {imageScheme, imageErrorScheme};
