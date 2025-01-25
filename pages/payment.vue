<template>
    <div class="payment-page">
      <div class="payment-container">
        <div class="payment-header">
          <h2>Payment</h2>
        </div>
        
        <div class="payment-body">
          <div class="amount-section">
            <label for="amount">Amount</label>
            <input type="number" id="amount" v-model="amount" placeholder="Enter amount" />
          </div>
          
          <div class="payment-method">
            <label for="method">Payment Method</label>
            <select id="method" v-model="paymentMethod">
              <option value="bkash">Bkash</option>
              <option value="credit-card">Credit Card</option>
              <option value="mobile-banking">Mobile Banking</option>
            </select>
          </div>
  
          <button @click="submitPayment">Pay Now</button>
        </div>
      </div>
    </div>
  </template>
<script>
export default {
  data() {
    return {
      amount: "",
      paymentMethod: "bkash"
    };
  },
  methods: {
    submitPayment() {
      if (!this.amount) {
        alert("Please enter an amount.");
        return;
      }

      alert(`Payment of ${this.amount} is being processed using ${this.paymentMethod}.`);
    }
  }
};
</script>
<style scoped>
.payment-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #addddb; /* Light grey background */
}

.payment-container {
  background-color: #ffffff; /* White background */
  width: 90%;
  max-width: 400px;
  padding: 40px;
  border-radius: 30px; /* Rounded corners for the container */
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1); /* Soft shadow */
  position: relative;
}

.payment-header h2 {
  text-align: center;
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
}

.payment-body {
  display: flex;
  flex-direction: column;
}

.amount-section,
.payment-method {
  margin-bottom: 20px;
}

.amount-section input,
.payment-method select {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

button {
  padding: 12px;
  background-color: #004b87; /* Bkash-like color */
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #003f6a; /* Darker blue on hover */
}

.payment-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #00A9E0; /* Background color similar to Bkash blue */
  border-radius: 50%;
  z-index: -1;
  transform: scale(1.4);
}
</style>
