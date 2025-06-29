<template>
  <div class="credit-card">
    <div class="credit-card__container">

      <div class="credit-card__back">
        <div class="credit-card__stripe"></div>
        <div class="credit-card__signature-panel">
          <div class="credit-card__signature"></div>
          <div class="credit-card__cvv">
            <label class="credit-card__label">CVV</label>
            <div class="credit-card__cvv-display">{{ cvv || '123' }}</div>
          </div>
        </div>
      </div>

      <div class="credit-card__front">
        <div class="credit-card__header">
          <div class="credit-card__chip"></div>
          <div class="credit-card__logo">VISA</div>
        </div>
        
        <div class="credit-card__number">
          <div class="credit-card__number-display">
            {{ cardNumber || '0000 0000 0000 0000' }}
          </div>
        </div>
        
        <div class="credit-card__footer">
          <div class="credit-card__holder">
            <label class="credit-card__label">CARD HOLDER</label>
            <div class="credit-card__holder-display">
              {{ cardHolder || 'FULL NAME' }}
            </div>
          </div>
          
          <div class="credit-card__expiry">
            <label class="credit-card__label">EXPIRES</label>
            <div class="credit-card__expiry-display">
              {{ expiryDate || 'MM/YY' }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  cardNumber?: string
  cardHolder?: string
  expiryDate?: string
  cvv?: string
}

defineProps<Props>()
</script>

<style lang="scss" scoped>
.credit-card {
  display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  
  &__container {
    position: relative;
    width: 400px;
    height: 250px;
  }
  
  &__front,
  &__back {
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 15px;
    padding: 20px;
    box-sizing: border-box;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  }
  
  &__front {
    background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    z-index: 2;
    transform: translateX(-40px);
  }
  
  &__back {
    background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
    color: white;
    z-index: 1;
    transform: translateX(40px);
  }
  
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  &__chip {
    width: 50px;
    height: 40px;
    background: linear-gradient(135deg, #95a5a6 0%, #7f8c8d 100%);
    border-radius: 8px;
    position: relative;
    
    &::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 30px;
      height: 20px;
      background: repeating-linear-gradient(
        90deg,
        transparent,
        transparent 2px,
        #5d6d7e 2px,
        #5d6d7e 4px
      );
    }
  }
  
  &__logo {
    font-size: 24px;
    font-weight: bold;
    letter-spacing: 2px;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    color: #ecf0f1;
  }
  
  &__number {
    margin: 20px 0;
  }
  
  &__number-display {
    width: 100%;
    color: white;
    font-size: 24px;
    font-family: 'Courier New', monospace;
    letter-spacing: 2px;
    opacity: 0.8;
  }
  
  &__footer {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }
  
  &__holder,
  &__expiry {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  
  &__label {
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 1px;
    opacity: 0.7;
    color: #bdc3c7;
  }
  
  &__holder-display,
  &__expiry-display {
    color: white;
    font-size: 14px;
    font-weight: 500;
    text-transform: uppercase;
    opacity: 0.8;
  }
  
  &__stripe {
    width: 100%;
    height: 50px;
    background: #1a252f;
    margin: 20px 0;
  }
  
  &__signature-panel {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  &__signature {
    width: 200px;
    height: 40px;
    background: #ecf0f1;
    border-radius: 4px;
    position: relative;
    
    &::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 10px;
      transform: translateY(-50%);
      width: 180px;
      height: 2px;
      background: repeating-linear-gradient(
        90deg,
        transparent,
        transparent 2px,
        #bdc3c7 2px,
        #bdc3c7 4px
      );
    }
  }
  
  &__cvv {
    display: flex;
    flex-direction: column;
    gap: 5px;
    align-items: flex-end;
  }
  
  &__cvv-display {
    width: 60px;
    background: #ecf0f1;
    border-radius: 4px;
    padding: 8px;
    text-align: center;
    font-size: 14px;
    font-weight: bold;
    color: #2c3e50;
  }
}
</style>
