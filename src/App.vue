<template>
  <div class="app">
    <BaseForm @submit.prevent="submitForm">
      <div v-for="(field, index) in fields" :key="index" class="app__field">
        <BaseInput 
          v-model="field.value" 
          :placeholder="field.placeholder"
          :has-error="!!field.error"
          @update:modelValue="(value) => updateFieldValue(index, value)"
        />
        <p class="app__error" v-if="field.error">{{ field.error }}</p>
      </div>
      
      <button 
        class="app__submit" 
        :class="{ 'app__submit--valid': isValid }"
        type="submit"
      >
        {{ isValid ? 'Отправить' : 'Исправьте ошибки' }}
      </button>
    </BaseForm>
  </div>
</template>

<script setup lang="ts">
import BaseForm from './components/BaseForm.vue'
import BaseInput from './components/BaseInput.vue'

//работа хука api
import { onMounted } from "vue"
import { useApi } from '@/composables/useApi'
const { response, fetchData } = useApi<{ id: number; title: string }[]>()

onMounted(async () => {
  const res = await fetchData('https://dummyjson.com/todos/')
  console.log(res.data)
})

//работа хука валидации
import useFormValidation, { type FormField } from '@/composables/useFormValidation';
import { emailField, password, age, name } from '@/composables/validationRules';

const fieldConfig: FormField[] = [
  {
    value: '',
    error: '',
    placeholder: 'Введите email',
    rules: emailField('Email обязательное поле', 'не валидный email')
  },
  {
    value: '',
    error: '',
    placeholder: 'Введите пароль',
    rules: password(7, 18)
  },
  {
    value: '',
    error: '',
    placeholder: 'Введите возраст',
    rules: age(1, 120)
  },
  {
    value: '',
    error: '',
    placeholder: 'Введите имя',
    rules: name(2, 50)
  }
];

const { isValid, fields, validate, updateFieldValue, rese } = useFormValidation(fieldConfig);

const submitForm = () => {
  const isFormValid = validate();
  
  if (isFormValid) {
    const formData = fields.value.map(f => f.value);
    console.log('Форма валидна, отправляем данные:', formData);

    reset();
  } else {
    console.log('Форма содержит ошибки');
  }
};
</script>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  min-height: 100vh;
  background: #f5f5f5;
}

.app__field {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.app__error {
  color: #ef4444;
  font-size: 0.875rem;
  margin: 0;
  padding: 0;
}

.app__submit {
  padding: 12px 24px;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.3s ease;
  background: #ef4444;
  color: white;
  box-shadow: 0 4px 6px -1px rgba(239, 68, 68, 0.2);
  box-sizing: border-box;
  width: 100%;
}

.app__submit:hover {
  background: #dc2626;
  box-shadow: 0 6px 8px -1px rgba(239, 68, 68, 0.3);
}

.app__submit--valid {
  background: linear-gradient(135deg, #42b983 0%, #3aa876 100%);
  box-shadow: 0 4px 6px -1px rgba(66, 185, 131, 0.2);
}

.app__submit--valid:hover {
  background: linear-gradient(135deg, #3aa876 0%, #2d8a5f 100%);
  box-shadow: 0 6px 8px -1px rgba(66, 185, 131, 0.3);
}

.app__submit--valid:active {
  box-shadow: 0 2px 4px -1px rgba(66, 185, 131, 0.2);
}
</style>
