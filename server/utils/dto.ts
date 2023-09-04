import { validate } from 'class-validator';

type Constructor<T> = new () => T;

export const validateDto = async <T>(
  DtoClass: Constructor<T>,
  properties: Partial<T>
): Promise<{ dto?: T; errors?: string[] }> => {
  const instance = { ...new DtoClass(), ...properties };
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

export const validateEventDto = async <T>(
  DtoClass: Constructor<T>,
  properties: Partial<T> | undefined
): Promise<T> => {
  const { dto, errors } = await validateDto<T>(DtoClass, properties || {});

  if (!dto) {
    throw createError({
      statusCode: 400,
      message: errors!.join(', '),
    });
  }

  return dto;
};
