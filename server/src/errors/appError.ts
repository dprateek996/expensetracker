export default class AppError extends Error {
  public readonly statusCode: number;
  public readonly details?: unknown;

  constructor(message: string, statusCode = 500, details?: unknown) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
    this.name = 'AppError';
  }

  static badRequest(message: string, details?: unknown) {
    return new AppError(message, 400, details);
  }

  static unauthorized(message: string, details?: unknown) {
    return new AppError(message, 401, details);
  }

  static notFound(message: string, details?: unknown) {
    return new AppError(message, 404, details);
  }
}
