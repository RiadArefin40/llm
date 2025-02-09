<template class="my-app-dark">
  <div>
    <Header></Header>
    <div class="custom-h">
      <NuxtPage />
    </div>

    <div class="balance-bottom">

      <div @click="goHome">
        <img style="width: 30px;" src="https://cdn-icons-png.flaticon.com/512/1946/1946488.png " alt="" title=""
          class="img-small">
      </div>
      <div @click="showProfile">
        <img style="width: 30px;" src="https://cdn-icons-png.flaticon.com/512/1144/1144760.png " alt="" title=""
          class="img-small">
      </div>
      <div @click="handleCashOut">
        <img style="width: 30px;" src="https://cdn-icons-png.flaticon.com/512/925/925748.png " alt="" title=""
          class="img-small">
      </div>

    </div>

    <Dialog v-model:visible="profileModal" modal header="User Details"  :style="{ width: '22rem' }">
             
             <div class=" px-4 py-2">
                <p> <span class="text-primary">Package Name :</span> {{ authUser?.subscription?.plan_name}}</p>
                <p><span class="text-primary">Total Income :</span>___</p>
                <p><span class="text-primary">Active Referral Count :</span>___</p>
                <p><span class="text-primary">Total Referral Income :</span>___</p>
             </div>
      </Dialog>

    <Dialog v-model:visible="cashOutVisible" modal  :style="{ width: '22rem' }">
      <div class="payment-page">
      <div class="payment-container">        
        <div class="payment-body">

          <div class="amount-section">
            <label class="text-primary" for="amount">Amount</label>
            <input type="number" id="amount" :value="authUser?.subscription?.daily_income" placeholder="Enter amount"  disabled/>
          </div>
          
          <div class="amount-section">
            <label class="text-primary" for="cashoutFrom">Cashout To</label>
            <input type="number" id="cashoutFrom" :value="authUser?.phone_number" placeholder="Enter Your Bkash Number" />
          </div>          
          <div class="payment-method">
            <label class="text-primary" for="method">Payment Method</label>
            <select id="method" v-model="paymentMethod">
              <option value="bkash">Bkash</option>
              <!-- <option value="credit-card">Credit Card</option>
              <option value="mobile-banking">Mobile Banking</option> -->
            </select>
          </div>
  
          <button @click="submitPaymentRequest"> Request Payment</button>
        </div>
      </div>
    </div>
        </Dialog>
  </div>

  <Toast />

</template>


<script setup>

import { useRouter } from 'vue-router';
const agent = "01788139990"
const router = useRouter();
import { useToast } from 'primevue/usetoast';
const toast = useToast();
const cashOutVisible = ref(false)
const profileModal = ref(false);
const authUser = ref(null)
const allViewed = ref(false);

onMounted(()=>{
    const user = JSON.parse(localStorage.getItem('user'))
    authUser.value = user
    console.log('authUser.value',authUser.value)
    allViewed.value = JSON.parse(localStorage.getItem("allViewed") || "false");
})


const handleCashOut = async () => {
  cashOutVisible.value = true
}
const showProfile = () => {
  profileModal.value = true
}
const goHome = () =>{
  router.push('/')
}

const submitPaymentRequest = async () => {
  if(allViewed.value){

    const payload = {
    userId: authUser?.value?.id,
    amount: Math.floor(authUser?.value?.subscription?.daily_income)
  }
  try {
    const response = await fetch(`https://llmbackend-production.up.railway.app/transaction`, {
      method: 'POST',
      headers: {
        // 'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    const data = await response.json();
    cashOutVisible.value = false
    toast.add({ severity: 'info', summary: data.message, life: 3000 });
  } catch (error) {
    toast.add({ severity: 'info', summary: "Already Submitted, Wait For Confirmation", life: 3000 });
    console.error('Error fetching subscriptions:', error);
  }
    
  }

  else{
    toast.add({ severity: 'info', summary: "Please Complete your daily task", life: 3000 });
  }

}


</script>


<style>
.balance-bottom {
  background: linear-gradient(to right, rgb(174, 227, 231), rgb(47, 208, 236));
  display: flex;
  justify-content: space-between;
  padding: 20px 28px;
  border-radius: 12px;
  color: rgb(51, 49, 49);
  width: 100%;
}

.custom-h{
  min-height: 82vh;
}
</style>