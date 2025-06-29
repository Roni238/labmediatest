import { ref, computed } from 'vue';
import type { Ref, ComputedRef } from 'vue';

export interface ValidationRule {
  validator: (value: any) => boolean;
  message: string;
}

export interface FormField {
  value: any;
  error: string;
  placeholder?: string;
  rules: ValidationRule[];
}

export interface FormValidation {
  fields: Ref<FormField[]>;
  isValid: ComputedRef<boolean>;
  validate: () => boolean;
  validateField: (index: number) => boolean;
  updateFieldValue: (index: number, value: any) => void;
  reset: () => void;
}

export default function useFormValidation(initialFields: FormField[]): FormValidation {
  const fields = ref<FormField[]>([...initialFields]);

  const validateField = (index: number): boolean => {
    const field = fields.value[index];
    let error = '';
    
    for (const rule of field.rules) {
      const isValid = rule.validator(field.value);
      if (!isValid) {
        error = rule.message;
        break;
      }
    }

    fields.value[index] = {
      ...field,
      error
    };

    return !error;
  };

  const updateFieldValue = (index: number, value: any): void => {
    fields.value[index] = {
      ...fields.value[index],
      value
    };
    validateField(index);
  };

  const validate = (): boolean => {
    let formIsValid = true;

    fields.value.forEach((_, index) => {
      const fieldIsValid = validateField(index);
      if (!fieldIsValid) {
        formIsValid = false;
      }
    });

    return formIsValid;
  };

  const isValid = computed(() => {
    return fields.value.every(field => !field.error);
  });

  const reset = (): void => {
    fields.value = fields.value.map(field => ({
      ...field,
      value: '',
      error: ''
    }));
  };

  return {
    fields,
    isValid,
    validate,
    validateField,
    updateFieldValue,
    reset,
  };
}