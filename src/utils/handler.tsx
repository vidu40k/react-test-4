import {baseUrl} from 'api/index';
import {AxiosError} from 'axios';
import {ValidationError} from 'yup';

export class AppError extends Error {
  axiosError?: AxiosError;
  responseCode?: string = undefined;
  name: string;

  constructor(
    name: string,
    message: string,
    responseCode?: string,
    axiosError?: AxiosError,
  ) {
    const trueProto = new.target.prototype;
    super(message);
    this.name = name;
    this.responseCode = responseCode;
    this.axiosError = axiosError;
    Object.setPrototypeOf(this, trueProto);
  }
}

export const handleBaseError = (er: any, url?: string): AppError => {
  console.error(er);
  console.log(JSON.stringify(er, null, 2));
  if (er instanceof ValidationError) {
    return new AppError('Ошибка валидациии данных с сервера', url);
  }

  if (er instanceof AxiosError) {
    const error = er.toJSON() as AxiosError;

    if (er.message === 'Network Error') {
      return new AppError(
        'Отсуствует подключение к интернету',
        'Проверьте подключение и попробуйте еще раз',
      );
    }

    return new AppError(
      'Серверная ошибка',
      `Код ошибки ${error.status} в запросе ${error.config.url.replace(
        baseUrl,
        '',
      )}`,
      error.status,
    );
  }

  return new AppError('Произошла непредвиденная ошибка', 'Попробуйте еще раз');
};
