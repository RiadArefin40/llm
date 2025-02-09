<template>
    <div class="p-4">
        <div class="flex justify-center">

            <Knob v-model="value" />

        </div>

        <div class="card-grid">

            <Card v-for="card in cards" :key="card.id">
                <template #title>
                    <img :style="{ filter: isBlur ? 'blur(5px)' : 'none' }" decoding="async" class="aligncenter size-full wp-image-8597" src="https://business.yelp.com/wp-content/uploads/2023/11/new-banner-ad-example-v3.png" alt="Example of an online banner ad" width="1024" height="388" srcset="https://business.yelp.com/wp-content/uploads/2023/11/new-banner-ad-example-v3.png 1024w, https://business.yelp.com/wp-content/uploads/2023/11/new-banner-ad-example-v3-300x114.png 300w, https://business.yelp.com/wp-content/uploads/2023/11/new-banner-ad-example-v3-768x291.png 768w, https://business.yelp.com/wp-content/uploads/2023/11/new-banner-ad-example-v3-752x285.png 752w, https://business.yelp.com/wp-content/uploads/2023/11/new-banner-ad-example-v3-600x227.png 600w" sizes="(max-width: 1024px) 100vw, 1024px">
                     
                
                </template>
                <template #content>
                  
              
                    
                </template>
            </Card>
        </div>
        <Toast />
    </div>

</template>

<script setup>
import { useToast } from 'primevue/usetoast';
import { useRouter } from 'vue-router';

const router = useRouter();
const toast = useToast();
const value = ref(1); // Start from 1
const duration = 10000; // 30 seconds
const steps = 100; // Increment from 1 to 100
const interval = duration / steps; // Time per step in milliseconds
let intervalId = null;
const isBlur = ref(true)

const cards = [
    {
        id: "1", title: "Bronze", content: {
            income: "300",
            validity: "100 Days",
            price: "5000tk"
        }
    },


];

onMounted(()=>{
    startIncrement()
})

const startIncrement = () => {
  value.value = 1; // Reset value to 1
  clearInterval(intervalId); // Clear any existing interval

  intervalId = setInterval(() => {
    if (value.value < 100) {
      value.value += 1; 
      if(value.value == 100){
        isBlur.value = false
        toast.add({ severity: 'info', summary: 'Task Completed!', life: 3000 });
        setTimeout(()=>{
            router.back();
        },500)
        
      }// Increment the value by 1
    } else {
      clearInterval(intervalId); // Stop when the value reaches 100
    }
  }, interval);
};
</script>

<style scoped>
.card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem;
    margin: 1rem;
}
</style>