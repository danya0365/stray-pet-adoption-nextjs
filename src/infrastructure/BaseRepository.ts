import { PostgrestError } from '@supabase/supabase-js';
import { Result, success, failure } from '../domain/Result';
import { AppError, ErrorCode } from '../domain/AppError';

/**
 * Base Repository Abstraction
 * 
 * Provides centralized error handling for Supabase operations.
 */
export abstract class BaseRepository {
  protected mapError(error: PostgrestError | Error | null): AppError {
    if (!error) return new AppError(ErrorCode.INTERNAL_ERROR, 'Unknown error');
    
    // Check if it's a Supabase error
    if ('code' in error) {
      switch (error.code) {
        case 'PGRST116': return new AppError(ErrorCode.NOT_FOUND, 'Resource not found');
        case '23505': return new AppError(ErrorCode.VALIDATION_ERROR, 'Duplicate record');
        case '42P01': return new AppError(ErrorCode.INTERNAL_ERROR, 'Table not found');
        default: return new AppError(ErrorCode.INTERNAL_ERROR, error.message);
      }
    }

    return AppError.fromError(error);
  }

  protected async execute<T>(
    operation: () => Promise<{ data: T | null; error: PostgrestError | null }>
  ): Promise<Result<T, AppError>> {
    try {
      const { data, error } = await operation();
      
      if (error) {
        return failure(this.mapError(error));
      }

      if (data === null) {
        return failure(new AppError(ErrorCode.NOT_FOUND, 'Data not found'));
      }

      return success(data);
    } catch (err) {
      return failure(AppError.fromError(err));
    }
  }
}
