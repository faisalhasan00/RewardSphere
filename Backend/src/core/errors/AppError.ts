export enum HttpCode {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  TOO_MANY_REQUESTS = 429,
  INTERNAL_SERVER_ERROR = 500,
}

export class AppError extends Error {
  public readonly name: string;
  public readonly httpCode: HttpCode;
  public readonly isOperational: boolean;

  constructor(name: string, httpCode: HttpCode, description: string, isOperational: boolean) {
    super(description);

    Object.setPrototypeOf(this, new.target.prototype);

    this.name = name;
    this.httpCode = httpCode;
    this.isOperational = isOperational;

    Error.captureStackTrace(this);
  }

  static badRequest(description: string): AppError {
    return new AppError('BadRequest', HttpCode.BAD_REQUEST, description, true);
  }

  static unauthorized(description: string): AppError {
    return new AppError('Unauthorized', HttpCode.UNAUTHORIZED, description, true);
  }

  static notFound(description: string): AppError {
    return new AppError('NotFound', HttpCode.NOT_FOUND, description, true);
  }

  static tooManyRequests(description: string): AppError {
    return new AppError('TooManyRequests', HttpCode.TOO_MANY_REQUESTS, description, true);
  }
}
