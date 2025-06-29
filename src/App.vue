<template>
  <div class="app">
    <div class="app__container">
      <div class="app__section">
        <CardForm @card-added="addCard" />
      </div>
      <div class="cards-section">
        <div class="card" v-for="card in cards" :key="card.id" >
          {{ card }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CardForm from './components/CardForm.vue'

import { onMounted, ref } from "vue"
import { useApi } from '@/composables/useApi'

const { fetchData } = useApi<{ id: number; title: string }[]>()
const cards = ref<any[]>([])

const addCard = (newCard: any) => {
  cards.value.unshift(newCard)
}

onMounted(async () => {
  const result = await fetchData('https://686164a28e7486408445d8a4.mockapi.io/api/creditcards/cards')
  
  if (result.data) {
    cards.value = result.data.reverse()
  }
})
</script>

<style lang="scss" scoped>
.app {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  min-height: 100vh;
  background: #f5f5f5;

  &__container {
    display: flex;
    flex-direction: column;
    gap: 40px;
    max-width: 1200px;
    width: 100%;
  }

  &__section {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  &__title {
    font-size: 24px;
    font-weight: 600;
    color: #374151;
    margin: 0;
    text-align: center;
  }
}

.cards-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 16px;
  padding: 20px;
  background: white;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

  .card {
    padding: 16px;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    background: #f9fafb;
    font-family: 'Courier New', monospace;
    font-size: 14px;
    color: #374151;
    word-break: break-word;

    &:first-child{
      background: linear-gradient(135deg, #42b983 0%, #3aa876 100%);
    }
  }
}
</style>
