export const validateLogin = (value: string): boolean => value.trim().length > 0;

export const validateName = (value: string): boolean => {
  return /^[a-zA-Zа-яА-ЯёЁ\s]+$/.test(value.trim()) && value.trim().length > 0;
};

export const validatePassword = (value: string): boolean => {
  return value.length >= 5 && /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/.test(value);
};

export const getValidationState = <
  TField extends string,
  TErrors extends Record<TField, string>,
  TForm extends Record<TField, any>
>(
  fieldName: TField,
  errors: TErrors,
  form: TForm
): boolean | null => {
  if (errors[fieldName] === '') return true;
  if (form[fieldName] !== '') return false;
  return null;
};