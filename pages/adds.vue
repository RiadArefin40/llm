<template>
    <div class="p-4">
        <h1 class="text-2xl font-medium text-primary pl-4">All Ads For Today :  {{ totalViewed }}/5</h1>
        <p v-if="allViewed" class="text-green-600 text-lg font-medium">You have viewed all ads for today!</p>
        <div class="card-grid">
            <Card v-for="card in filteredCards" :key="card.id">
                <template #title>
                    <div class="flex items-center">
                        <img style="filter: blur(8px); height: 140px;"  decoding="async" class="aligncenter size-full wp-image-8597"
                            :src="card.url"
                            alt="Example of an online banner ad" width="1024" height="388">
                    </div>
                </template>
                <template #content>
                    <div class="py-4">
                        <div class="py-4">
                            <!-- <div class="m-0 flex items-center">
                                <i class="pi pi-indian-rupee !font-medium mr-2"
                                    style="font-size: 1.5rem; color: goldenrod;"></i>
                                <span class="font-medium mr-2">Total income:</span>
                                <span class="text-primary">30tk</span>
                            </div> -->
                        </div>
                        <Button @click="handleDetails(card.id)" label="View Ad" severity="primary" />
                    </div>
                </template>
            </Card>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const cards = ref([
    { id: "1", url:"https://www.radiustheme.com/wp-content/uploads/edd/2022/11/clclassified-Classified-ads-WordPress-Theme.png", title: "Bronze", content: { income: "300", validity: "100 Days", price: "5000tk" } },
    { id: "2",url:"https://business.yelp.com/wp-content/uploads/2023/11/new-banner-ad-example-v3.png", title: "Silver", content: { income: "500", validity: "200 Days", price: "8000tk" } },
    { id: "3",url:"https://cdn.sanity.io/images/8czhh5u2/production/ea32a5f08ff8daed3930a3b8f8fce8886a67bfb5-1306x757.png?w=1306&auto=format", title: "Gold", content: { income: "500", validity: "200 Days", price: "12000tk" } },
    { id: "4",url:"https://i.ytimg.com/vi/tEOuq6KgAiE/sddefault.jpg", title: "Platinum", content: { income: "500", validity: "200 Days", price: "12000tk" } },
    { id: "5",url:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmoKJSauviL1ppSrIz2qAZs5gTV1x3tpFq8YV27-IkjSPW_KMf_5I7XbfW_5KYr4SPkgc&usqp=CAU", title: "Platinum", content: { income: "500", validity: "200 Days", price: "12000tk" } },
]);

const removedAds = ref([]);
const viewedCount = ref(0);
const allViewed = ref(false);
const totalViewed =  ref('')

// Check if 24 hours have passed
function shouldResetAds() {
    const lastViewedTime = localStorage.getItem("lastViewedTime");
    if (!lastViewedTime) return true;

    const currentTime = Date.now();
    return (currentTime - Number(lastViewedTime)) >= 24 * 60 * 60 * 1000;;
}

// Load data from localStorage
onMounted(() => {
    if (shouldResetAds()) {
        localStorage.removeItem("removedAds");
        localStorage.removeItem("viewedCount");
        localStorage.removeItem("allViewed");
        localStorage.setItem("lastViewedTime", Date.now());
    } else {
        removedAds.value = JSON.parse(localStorage.getItem("removedAds") || "[]");
        viewedCount.value = Number(localStorage.getItem("viewedCount") || 0);
        allViewed.value = JSON.parse(localStorage.getItem("allViewed") || "false");
    }
});

// Filter out removed ads
const filteredCards = computed(() => {
    return cards.value.filter(card => !removedAds.value.includes(card.id));
});

// Handle viewing an ad
function handleDetails(id) {
    if (!removedAds.value.includes(id)) {
        removedAds.value.push(id);
        viewedCount.value += 1;
        
        // Update localStorage
        localStorage.setItem("removedAds", JSON.stringify(removedAds.value));
        localStorage.setItem("viewedCount", viewedCount.value.toString());

        // Check if all ads are viewed
        if (viewedCount.value >= cards.value.length) {
            allViewed.value = true;
            localStorage.setItem("allViewed", "true");
        }
    }
    
    router.push('/add-details');
}

onMounted(()=>{
    totalViewed.value = JSON.parse(localStorage.getItem("viewedCount") || "0");
})
</script>

<style scoped>
.card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem;
    margin: 1rem;
}
</style>
