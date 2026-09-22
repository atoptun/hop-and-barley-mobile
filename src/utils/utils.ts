export const hasErrorMessage = (error: unknown): error is { message: string } => {
  return (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof error.message === 'string'
  );
};

export const hasErrorError = (error: unknown): error is { error: string } => {
  return (
    typeof error === 'object' &&
    error !== null &&
    'error' in error &&
    typeof error.error === 'string'
  );
};

export const getErrorText = (error: unknown): string | undefined => {
  return hasErrorMessage(error) ? error.message : hasErrorError(error) ? error.error : undefined;
};
