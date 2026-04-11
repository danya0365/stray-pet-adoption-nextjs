/**
 * Centralized Application Errors
 */

export enum ErrorCode {
  NOT_FOUND = 'NOT_FOUND',
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  INTERNAL_ERROR = 'INTERNAL_ERROR',
  NETWORK_ERROR = 'NETWORK_ERROR',
}

export class AppError extends Error {
  constructor(
    public readonly code: ErrorCode,
    public readonly message: string,
    public readonly originalError?: any
  ) {
    super(message);
    this.name = 'AppError';
  }

  static fromError(error: any, defaultCode = ErrorCode.INTERNAL_ERROR): AppError {
    if (error instanceof AppError) return error;
    return new AppError(defaultCode, error.message || 'Unknown error occurred', error);
  }
}
