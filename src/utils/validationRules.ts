import type { ValidationRule } from '@/composables/useFormValidation';

// сюда писать все правила валидации инпутов
export const required = (message: string = 'Это поле обязательно'): ValidationRule => ({
  validator: (value: any) => !!value && value.toString().trim().length > 0,
  message
});

export const length = (min: number, max: number, message?: string): ValidationRule => ({
  validator: (value: string) => value.length >= min && value.length <= max,
  message: message || `Длина должна быть от ${min} до ${max} символов`
});

export const numeric = (message: string = 'Должно быть числом'): ValidationRule => ({
  validator: (value: string) => /^\d+$/.test(value),
  message
});

export const pattern = (regex: RegExp, message: string): ValidationRule => ({
  validator: (value: string) => regex.test(value),
  message
});




export const cardNumber = (): ValidationRule[] => [
  required('Номер карты обязателен'),
  numeric('Номер карты должен содержать только цифры'),
  length(16, 16, 'Номер карты должен содержать ровно 16 цифр')
];

export const cardHolder = (): ValidationRule[] => [
  required('Имя владельца обязательно'),
  pattern(/^[A-Za-z\s]+$/, 'Имя должно содержать только латинские буквы и пробелы'),
  length(2, 30, 'Имя должно содержать от 2 до 30 символов')
];

export const expiryDate = (): ValidationRule[] => [
  required('Срок действия обязателен'),
  pattern(/^\d{2}\/\d{4}$/, 'Формат: MM/YYYY (например: 12/2025)')
];

export const cvv = (): ValidationRule[] => [
  required('CVV обязателен'),
  numeric('CVV должен содержать только цифры'),
  length(3, 4, 'CVV должен содержать 3 или 4 цифры')
]; 