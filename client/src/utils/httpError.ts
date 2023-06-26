import { AxiosError } from "axios";
type Error = AxiosError<unknown, unknown>;

class HttpError extends Error {
  public config;
  public response;
  public request;

  constructor(error: Error) {
    super(error.message, error.cause);
    this.config = error.config;
    this.response = error.response;
    this.request = error.request;
  }
}

// status code 404
export class NOT_FOUND_ERR extends HttpError {}

// status code 400
export class BAD_REQUEST_ERR extends HttpError {}

// status code 401
export class UNAUTHORIZED_ERR extends HttpError {}

// status code 403
export class FORBIDDEN_ERR extends HttpError {}

// status code 409
export class CONFLICT_ERR extends HttpError {}

// status code 429
export class TOO_MANY_REQUESTS_ERR extends HttpError {}
