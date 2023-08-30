import { validate } from 'class-validator';

type Constructor<T = {}> = new (...arguments_: any[]) => T;

export const validateDto = async <T extends {}>(
  DtoClass: Constructor<T>,
  properties: Partial<T>
): Promise<{ dto?: T; errors?: string[] }> => {
  const instance = Object.assign(new DtoClass(), properties);
  const errors = await validate(instance);

  if (errors.length > 0) {
    return {
      errors: errors.flatMap((error) => Object.values(error.constraints || {})),
    };
  }

  return {
    dto: instance,
  };
};
