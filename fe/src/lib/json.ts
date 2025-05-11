import { Result } from '@/types/result';
import { ZodSchema } from 'zod';

export const parseJSON = <T>(json: string): Result<T> => {
  try {
    const data = JSON.parse(json);
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error as SyntaxError };
  }
};

export const parseAndValidateJSON = <T>(
  json: string,
  schema: ZodSchema<T>,
): Result<T> => {
  const result = parseJSON<T>(json);
  if (result.error) {
    return { data: null, error: result.error };
  }

  const validated = schema.safeParse(result.data);
  if (!validated.success) {
    return { data: null, error: validated.error };
  }

  return { data: validated.data, error: null };
};
