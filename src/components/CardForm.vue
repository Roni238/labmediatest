<template>
  <div class="card-form">
    <CreditCard 
      :card-number="fields[0].value"
      :card-holder="fields[1].value"
      :expiry-date="fields[2].value"
      :cvv="fields[3].value"
    />

    <form class="form" @submit.prevent="submitForm">
      <div v-for="(field, index) in fields" :key="index" class="field">
        <label class="field__label" v-if="field.label">{{ field.label }}</label>
        <BaseInput 
          v-model="field.value" 
          :placeholder="field.placeholder"
          :type="field.type"
          :has-error="!!field.error"
          :max-length="field.maxLength"
          @update:modelValue="(value) => updateFieldValue(index, value)"
        />
        <p class="field__error" v-if="field.error">{{ field.error }}</p>
      </div>
      
      <button 
        class="form__submit" 
        :class="{ 'form__submit--valid': isValid }"
        type="submit"
      >
        {{ isValid ? 'Добавить карту' : 'Исправьте ошибки' }}
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import CreditCard from './CreditCard.vue'
import BaseInput from './BaseInput.vue'
import { useApi } from '@/composables/useApi'
import useFormValidation, { type FormField } from '@/composables/useFormValidation';
import { cardNumber, cardHolder, expiryDate, cvv } from '@/utils/validationRules';

const fieldConfig: FormField[] = [
  {
    value: '',
    error: '',
    placeholder: 'Номер карты (16 цифр)',
    rules: cardNumber(),
    label: 'Номер карты',
    type: 'text',
    maxLength: 16
  },
  {
    value: '',
    error: '',
    placeholder: 'Имя и фамилия владельца',
    rules: cardHolder(),
    label: 'Владелец карты',
    type: 'text',
    maxLength: 30
  },
  {
    value: '',
    error: '',
    placeholder: 'MM/YYYY (например: 12/2025)',
    rules: expiryDate(),
    label: 'Срок действия',
    type: 'text',
    maxLength: 7
  },
  {
    value: '',
    error: '',
    placeholder: 'CVV (3-4 цифры)',
    rules: cvv(),
    label: 'CVV',
    type: 'text',
    maxLength: 4
  }
];

const { isValid, fields, validate, updateFieldValue, reset } = useFormValidation(fieldConfig);
const { fetchData } = useApi<{ number: string; holder: string; expiry: string; cvv: string }>()
const emit = defineEmits<{ 'card-added': [card: any]}>()

const submitForm = async () => {
  const isFormValid = validate();
  
  if (isFormValid) {
    const cardData = {
      number: fields.value[0].value,
      holder: fields.value[1].value,
      expiry: fields.value[2].value,
      cvv: fields.value[3].value
    };
    console.log(cardData)
    const result = await fetchData('https://686164a28e7486408445d8a4.mockapi.io/api/creditcards/cards', { method: "POST", body: cardData})
    
    if (result.data) {
      // (тут должен быть пуш объекта в стор карточек, но сделаю просто через эмит)
      emit('card-added', result.data)
      console.log('Карта валидна, данные:', result.data);
    }
    reset();
  } else {
    console.log('Форма содержит ошибки');
  }
};
</script>

<style lang="scss" scoped>
.card-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  padding: 20px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 8px;
  
  &__label {
    font-size: 14px;
    font-weight: 600;
    color: #374151;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  
  &__error {
    color: #ef4444;
    font-size: 0.875rem;
    margin: 0;
    padding: 0;
    font-weight: 500;
  }
}

.form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  max-width: 400px;
  padding: 32px;
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  background: #fff;
  box-sizing: border-box;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);

  &__submit {
    padding: 16px 24px;
    border: none;
    border-radius: 12px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    background: #ef4444;
    color: white;
    box-shadow: 0 4px 6px -1px rgba(239, 68, 68, 0.2);
    box-sizing: border-box;
    width: 100%;
    text-transform: uppercase;
    letter-spacing: 0.5px;

    &:hover {
      background: #dc2626;
      box-shadow: 0 6px 8px -1px rgba(239, 68, 68, 0.3);
      transform: translateY(-2px);
    }

    &--valid {
      background: linear-gradient(135deg, #42b983 0%, #3aa876 100%);
      box-shadow: 0 4px 6px -1px rgba(66, 185, 131, 0.2);
    }

    &--valid:hover {
      background: linear-gradient(135deg, #3aa876 0%, #2d8a5f 100%);
      box-shadow: 0 6px 8px -1px rgba(66, 185, 131, 0.3);
      transform: translateY(-2px);
    }

    &--valid:active {
      box-shadow: 0 2px 4px -1px rgba(66, 185, 131, 0.2);
      transform: translateY(0);
    }
  }
}
</style> 