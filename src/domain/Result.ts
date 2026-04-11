/**
 * Result Pattern Utility
 * 
 * Used to handle success and failure states without throwing exceptions.
 * This makes the flow of data more predictable and easier to test.
 */

export type Result<T, E = Error> = Success<T, E> | Failure<T, E>;

export class Success<T, E> {
  readonly value: T;
  constructor(value: T) {
    this.value = value;
  }
  isSuccess(): this is Success<T, E> { return true; }
  isFailure(): this is Failure<T, E> { return false; }
}

export class Failure<T, E> {
  readonly error: E;
  constructor(error: E) {
    this.error = error;
  }
  isSuccess(): this is Success<T, E> { return false; }
  isFailure(): this is Failure<T, E> { return true; }
}

export const success = <T, E>(value: T): Result<T, E> => new Success(value);
export const failure = <T, E>(error: E): Result<T, E> => new Failure(error);
