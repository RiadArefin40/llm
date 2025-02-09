<template>
  <div class="relative h-custom">

    <div class="p-4">
      <div class="mb-4">
        <img class="h-[180px] w-full" data-v-e28c7305=""
          src="https://stage-building-web.netlify.app/_nuxt/about-image.Dvft-ew6.gif" alt="">
      </div>
      <marquee style="color: orange; font-weight: bold; font-style: italic;">
        🎉 10% Discount for All Packages & Get Double Referral Bonus Till 20 February! 🎉
      </marquee>

      <!-- <div class="balance">
            <div>
                <p>Today : <span class="text-white italic">{{ authUser?.subscription?.daily_income }}</span>  TK </p>
            </div>
            <div>
                <p>Pending : 0TK </p>
            </div>

      </div> -->
      <div
        class="my-2 border-2 border-cyan-400 shadow-lg p-2  px-6 py-2 flex justify-between button-section text-secondary">
        <div @click="handleCashOut" class="relative">
          <span v-if="allViewed" class="text-primary font-medium" style="margin-left: 40px; top:-10px; position: absolute;">{{
            authUser?.subscription?.daily_income }}</span>
             <span v-else class="text-primary font-medium" style="margin-left: 40px; top:-10px; position: absolute;">
              {{ totalViewed }}/5
            </span>
          <img class="w-[40px]" src="https://cdn-icons-png.flaticon.com/512/6556/6556805.png" alt="Recharge free icon"
            title="Recharge free icon">
          <p>CashOut</p>
        </div>

        <div @click="showContact">
          <img class="w-[40px]" src="https://cdn-icons-png.flaticon.com/512/14946/14946653.png " alt="" title="">
          <p>Contact</p>
        </div>

        <div @click="toAdds">
          <img class="w-[40px]" src="https://cdn-icons-png.flaticon.com/512/762/762686.png" alt="" title="">
          <p>Task</p>
        </div>


        <div @click="showReferral">
          <img class="w-[40px]" src="https://cdn-icons-png.flaticon.com/512/12708/12708046.png " alt="" title="">
          <p>Referral</p>
        </div>

      </div>

      <div v-if="!authUser?.subscription?.plan_name" class="card-grid">
        <Card v-for="card in packages" :key="card.id">
          <template #title>
            <div class="flex justify-between">

              <p class="font-bold"> <span class="text-primary !text-[22px] !text-center" style="font-style: italic;">{{
                  card.plan_name }}</span></p>
              <button @click="handleInvest(card)" class="border invest-button">Invest</button>

            </div>




          </template>
          <template #content>
            <div class="flex">
              <div class="flex items-center w-[100px] ml-[-20px]">
                <img alt="" data-src="https://download.ocms365.com/v2/JEETWIN/images/member/vippage/Bronze-icon.webp"
                  src="https://download.ocms365.com/v2/JEETWIN/images/member/vippage/Bronze-icon.webp" lazy="loaded">

              </div>
              <div class="ml-4 mt-4">
                <p class="text-[16px]  font-medium"><i class="pi pi-indian-rupee !font-meduim mr-2"
                    style="font-size: 1rem; color: goldenrod;"></i><span> Daily Income : <span class="text-primary">{{
                      card.daily_income }} Tk</span> </span></p>
                <div class="">
                  <div class="m-0 flex items-center">
                    <i class="pi pi-indian-rupee !font-meduim mr-2" style="font-size: 1rem; color: goldenrod;"></i>
                    <span class="font-medium mr-2">Package Price: {{ card.price }}
                    </span>
                    <span class="text-primary"> </span>
                  </div>
                  <div class=" flex items-center">
                    <i class="pi pi-calendar-clock !font-meduim mr-2" style="font-size: 1rem; color: goldenrod;"></i>
                    <span class="font-medium mr-2">Validity: 100 Days
                    </span>
                    <span class="text-primary"> </span>

                  </div>
                </div>

              </div>

            </div>

          </template>
        </Card>
        <Dialog v-model:visible="visible" modal :style="{ width: '22rem' }" class="text-primary">
          <div class="payment-page">
            <div class="payment-container">
              <div class="payment-body">
                <div class="amount-section">
                  <label class="text-primary" for="plan">Package</label>
                  <input type="text" id="plan" v-model="planName" placeholder="Enter Package" disabled />
                </div>
                <div class="amount-section">
                  <label class="text-primary" for="amount">Amount</label>
                  <input type="number" id="amount" v-model="amount" placeholder="Enter amount" disabled />
                </div>
                <div class="amount-section">
                  <label class="text-primary" for="amount">CashOut Agent Number</label>
                  <input type="number" id="agent" :value="agent" placeholder="Agent Number" disabled />
                </div>
                <div class="amount-section">
                  <label class="text-primary" for="cashoutFrom">Cashout From</label>
                  <input type="number" id="cashoutFrom" :value="authUser?.phone_number"
                    placeholder="Enter Your Bkash Number" />
                </div>
                <div class="amount-section">
                  <label class="text-primary" for="cashoutFrom">Transaction Id</label>
                  <input type="number" id="cashoutFrom" v-model="cashoutFrom" placeholder="Enter TransactionID" />
                </div>

                <div class="payment-method">
                  <label class="text-primary" for="method">Payment Method</label>
                  <select id="method" v-model="paymentMethod">
                    <option value="bkash">Bkash</option>
                    <!-- <option value="credit-card">Credit Card</option>
              <option value="mobile-banking">Mobile Banking</option> -->
                  </select>
                </div>

                <button @click="submitPayment">Pay Now</button>
              </div>
            </div>
          </div>
        </Dialog>
        <Toast />
      </div>
      <div v-else class="card-grid">

        <Card>
          <template #title>
            <div class="flex justify-between">

              <p class="font-bold"> <span class="text-primary !text-[22px] !text-center" style="font-style: italic;">{{
                authUser?.subscription?.plan_name }}</span></p>
              <span v-if="authUser?.status !== 'active'" class="bg-primary text-white rounded px-2">InActive</span>
              <span v-else class="bg-primary text-white rounded px-2">Active</span>
              <!-- <button @click="handleInvest(card)" class="border invest-button">Invest</button> -->

            </div>




          </template>
          <template #content>
            <div class="flex">
              <div class="flex items-center w-[100px] ml-[-20px]">
                <img alt="" data-src="https://download.ocms365.com/v2/JEETWIN/images/member/vippage/Bronze-icon.webp"
                  src="https://download.ocms365.com/v2/JEETWIN/images/member/vippage/Bronze-icon.webp" lazy="loaded">

              </div>
              <div class="ml-4 mt-4">
                <p class="text-[16px]  font-medium"><i class="pi pi-indian-rupee !font-meduim mr-2"
                    style="font-size: 1rem; color: goldenrod;"></i><span> Daily Income : <span class="text-primary">{{
                      authUser?.subscription?.daily_income }} Tk</span> </span></p>
                <div class="">
                  <div class="m-0 flex items-center">
                    <i class="pi pi-indian-rupee !font-meduim mr-2" style="font-size: 1rem; color: goldenrod;"></i>
                    <span class="font-medium mr-2">Package Price: {{ authUser?.subscription?.price }}
                    </span>
                    <span class="text-primary"> </span>
                  </div>
                  <div class=" flex items-center">
                    <i class="pi pi-calendar-clock !font-meduim mr-2" style="font-size: 1rem; color: goldenrod;"></i>
                    <span class="font-medium mr-2">Validity: 100 Days
                    </span>
                    <span class="text-primary"> </span>

                  </div>
                </div>

              </div>

            </div>

          </template>
        </Card>

      </div>
      <div class="mt-6 mb-[20px]">
        <div class="about-us flex justify-around">
          <div class="">
            <p class="text-sm">Official Partner</p>
            <img class="w-[80px]" alt="undefined"
              src="https://img.m156b.com/mb/h5/assets/images/footer/white/official-partner-heyvip.png?v=1738821416688&amp;source=mcdsrc"
              loading="lazy">
          </div>
          <div>
            <img style="width: 55px;" src="https://i.ibb.co.com/9kkzqCNj/dall.png" alt="dall" border="0">
          </div>
          <div>
            <p class="text-sm">Payment</p>
            <img _ngcontent-serverapp-c575922473="" alt="pay22"
              src="https://img.m156b.com/mb/h5/assets/images/footer/white/pay22.png?v=1738821416688&amp;source=mcdsrc"
              loading="lazy" class="ng-star-inserted">
          </div>

        </div>

        <p class="text-center text-sm italic mt-2">All right reserve @ ADLOK 2025</p>


      </div>



      <Dialog v-model:visible="refferCodeModal" modal header="Your Referral Code" :style="{ width: '22rem' }">

        <div class="bg-primary px-4 py-2">
          {{ authUser.referral_code }}
        </div>
      </Dialog>

      <Dialog v-model:visible="contactModal" modal header="Please join for support" :style="{ width: '22rem' }">

        <div class=" px-4 py-2">
          <img src="https://i.ibb.co.com/fzXqNDhM/image.png" alt="image" border="0">
        </div>
      </Dialog>


      <Dialog v-model:visible="cashOutVisible" modal :style="{ width: '22rem' }">
        <div class="payment-page">
          <div class="payment-container">
            <div class="payment-body">

              <div class="amount-section">
                <label class="text-primary" for="amount">Amount</label>
                <input type="number" id="amount" :value="authUser?.subscription?.daily_income"
                  placeholder="Enter amount" disabled />
              </div>

              <div class="amount-section">
                <label class="text-primary" for="cashoutFrom">Cashout To</label>
                <input type="number" id="cashoutFrom" :value="authUser?.phone_number"
                  placeholder="Enter Your Bkash Number" />
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

  </div>

</template>

<script setup>
definePageMeta({
  middleware: 'auth',
});
import Dialog from 'primevue/dialog';
const packages = ref([]);
const visible = ref(false);
const cashOutVisible = ref(false)
const amount = ref("");
const planName = ref("");
const cashoutFrom = ref("");
const paymentMethod = ref("bkash")
const authToken = ref(null)
const authUser = ref(null)
const router = useRouter();
import { useToast } from 'primevue/usetoast';
const toast = useToast();
const refferCodeModal = ref(false);
const contactModal = ref(false);
const profileModal = ref(false);
const refferCode = ref("")
const agent = "01788139990"
const allViewed = ref(false);
const totalViewed =  ref('')




onMounted(() => {
  const token = localStorage.getItem('token')
  const user = JSON.parse(localStorage.getItem('user'))
  authToken.value = token
  authUser.value = user
  console.log(token, user)
  allViewed.value = JSON.parse(localStorage.getItem("allViewed") || "false");
  totalViewed.value = JSON.parse(localStorage.getItem("viewedCount") || "0");
})


const toAdds= () =>{
router.push('/adds')
}

const showReferral = () => {
  refferCodeModal.value = true;
}

const handleCashOut = async () => {
  cashOutVisible.value = true
}
const showContact = () => {
  contactModal.value = true;
}
const showProfile = () => {
  profileModal.value = true
}
const cards = [
  {
    id: "1", title: "Bronze", content: {
      income: "300",
      validity: "100 Days",
      price: "5000tk"
    }
  },
  {
    id: "2", title: "Silver", content: {
      income: "500",
      validity: "200 Days",
      price: "8000tk"
    }
  },
  {
    id: "3", title: "Gold", content: {
      income: "500",
      validity: "200 Days",
      price: "12000tk"
    }
  },
  {
    id: "3", title: "Platinum", content: {
      income: "500",
      validity: "200 Days",
      price: "12000tk"
    }
  },

];


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

const handleInvest = async (data) => {
  visible.value = true
  amount.value = data.price
  planName.value = data.plan_name
}

const fetchSubscriptions = async () => {
  try {
    const response = await fetch('https://llmbackend-production.up.railway.app/subscriptions', {
      method: 'GET',
      headers: {
        // 'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    const data = await response.json();
    packages.value = data.subscriptions;
  } catch (error) {
    console.error('Error fetching subscriptions:', error);
  }
}

const submitPayment = async () => {
  const payload = {
    plan_name: planName.value
  }
  try {
    const response = await fetch(`https://llmbackend-production.up.railway.app/user/${authUser.value.id}/update-plan`, {
      method: 'PATCH',
      headers: {
        // 'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    const data = await response.json();
    visible.value = false
    toast.add({ severity: 'info', summary: data.message, life: 3000 });
  } catch (error) {
    toast.add({ severity: 'info', summary: "Already Submitted, Wait For Confirmation", life: 3000 });
    console.error('Error fetching subscriptions:', error);
  }
};



onMounted(fetchSubscriptions);
</script>

<style>
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin: .2rem;
}

.invest-button {
  background: linear-gradient(to right, rgb(27, 172, 111), rgb(80, 231, 156));
  color: white;
  padding: 0px 20px;
  border-radius: 4px;
}


.balance {
  background: linear-gradient(to right, rgb(35, 204, 134), rgb(102, 255, 178));
  display: flex;
  justify-content: space-between;
  padding: 20px 28px;
  border-radius: 12px;
  color: rgb(51, 49, 49);
}

.button-section {
  /* background-color: rgb(255, 255, 255); */
}

.payment-page {
  display: flex;
  justify-content: center;
  align-items: center;

}

.payment-container {

  width: 90%;
  max-width: 400px;
  padding: 15px;
  border-radius: 30px;
  /* Rounded corners for the container */
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  /* Soft shadow */
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
  margin-bottom: 10px;
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
  background-color: #004b87;
  /* Bkash-like color */
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #003f6a;
  /* Darker blue on hover */
}

.payment-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  border-radius: 50%;
  z-index: -1;
  transform: scale(1.4);
}


</style>