import type { ValidationRule } from './useFormValidation';

// сюда писать все правила валидации инпутов
export const required = (message: string = 'Это поле обязательно'): ValidationRule => ({
  validator: (value: any) => !!value && value.toString().trim().length > 0,
  message
});

export const email = (message: string = 'Неверный формат email'): ValidationRule => ({
  validator: (value: string) => /.+@.+\..+/.test(value),
  message
});

export const emailField = (requiredMessage?: string, formatMessage?: string): ValidationRule[] => [
  required(requiredMessage || 'Email обязательное поле'),
  email(formatMessage || 'Неверный формат email')
];

export const minLength = (min: number, message?: string): ValidationRule => ({
  validator: (value: string) => value.length >= min,
  message: message || `Минимальная длина ${min} символов`
});

export const maxLength = (max: number, message?: string): ValidationRule => ({
  validator: (value: string) => value.length <= max,
  message: message || `Максимальная длина ${max} символов`
});

export const length = (min: number, max: number, message?: string): ValidationRule => ({
  validator: (value: string) => value.length >= min && value.length <= max,
  message: message || `Длина должна быть от ${min} до ${max} символов`
});

export const numeric = (message: string = 'Должно быть числом'): ValidationRule => ({
  validator: (value: string) => /^\d+$/.test(value),
  message
});

export const range = (min: number, max: number, message?: string): ValidationRule => ({
  validator: (value: string) => {
    const num = parseInt(value);
    return !isNaN(num) && num >= min && num <= max;
  },
  message: message || `Значение должно быть от ${min} до ${max}`
});

export const pattern = (regex: RegExp, message: string): ValidationRule => ({
  validator: (value: string) => regex.test(value),
  message
});

export const containsDigit = (message: string = 'Должно содержать хотя бы одну цифру'): ValidationRule => ({
  validator: (value: string) => /\d/.test(value),
  message
});

export const containsLetter = (message: string = 'Должно содержать хотя бы одну букву'): ValidationRule => ({
  validator: (value: string) => /[a-zA-Zа-яА-Я]/.test(value),
  message
});

export const password = (minLength: number = 7, maxLength: number = 18): ValidationRule[] => [
  required('Пароль обязательное поле'),
  length(minLength, maxLength, `Пароль должен быть от ${minLength} до ${maxLength} символов`),
  containsDigit('Пароль должен содержать хотя бы одну цифру'),
  containsLetter('Пароль должен содержать хотя бы одну букву')
];

export const age = (minAge: number = 1, maxAge: number = 120): ValidationRule[] => [
  required('Возраст обязательное поле'),
  numeric('Возраст должен быть числом'),
  range(minAge, maxAge, `Возраст должен быть от ${minAge} до ${maxAge} лет`)
];

export const name = (minLength: number = 2, maxLength: number = 50): ValidationRule[] => [
  length(minLength, maxLength, `Имя должно быть от ${minLength} до ${maxLength} символов`)
];

// кастомные правила
export const custom = (validator: (value: any) => boolean, message: string): ValidationRule => ({
  validator,
  message
}); 