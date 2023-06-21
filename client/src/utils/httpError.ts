// status code 404
export class NOT_FOUND_ERR extends Error {}

// status code 400
export class BAD_REQUEST_ERR extends Error {}

// status code 401
export class UNAUTHORIZED_ERR extends Error {}

// status code 403
export class FORBIDDEN_ERR extends Error {}

// status code 409
export class CONFLICT_ERR extends Error {}

// status code 429
export class TOO_MANY_REQUESTS_ERR extends Error {}
