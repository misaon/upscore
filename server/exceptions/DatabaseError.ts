export const ERROR_NOT_FOUND = 'ERROR_NOT_FOUND';
export const ERROR_UNIQUE = 'ERROR_UNIQUE';

export class DatabaseError extends Error {
  public code: string;

  constructor(message: string, code: string) {
    super(message);
    this.name = 'DatabaseError';
    this.code = code;

    Object.setPrototypeOf(this, DatabaseError.prototype);
  }
}
