<template>
    <div class="p-4">
        <h1 class="text-2xl font-medium text-primary pl-4">All Adds For Today</h1>
        <div class="card-grid">

            <Card v-for="card in cards" :key="card.id">
                <template #title>
                    
                    
                    <div class="flex items-center">
                        <img decoding="async" class="aligncenter size-full wp-image-8597" src="https://business.yelp.com/wp-content/uploads/2023/11/new-banner-ad-example-v3.png" alt="Example of an online banner ad" width="1024" height="388" srcset="https://business.yelp.com/wp-content/uploads/2023/11/new-banner-ad-example-v3.png 1024w, https://business.yelp.com/wp-content/uploads/2023/11/new-banner-ad-example-v3-300x114.png 300w, https://business.yelp.com/wp-content/uploads/2023/11/new-banner-ad-example-v3-768x291.png 768w, https://business.yelp.com/wp-content/uploads/2023/11/new-banner-ad-example-v3-752x285.png 752w, https://business.yelp.com/wp-content/uploads/2023/11/new-banner-ad-example-v3-600x227.png 600w" sizes="(max-width: 1024px) 100vw, 1024px">
                     
                    </div>
                     
                
                </template>
                <template #content>
                    <div class="py-4">
                        <div class="py-4">
                        <div class="m-0 flex items-center">
                            <i class="pi pi-indian-rupee !font-meduim mr-2"
                                style="font-size: 1.5rem; color: goldenrod;"></i>
                                <span class="font-medium mr-2">Total income:
                            </span>
                            <span class="text-primary"> 30tk</span>
                        </div>
                    </div>
                    <Button @click="handleDetails" label="View Add" severity="primary" />
                    </div>
                </template>
            </Card>
        </div>
    </div>

</template>

<script setup>
const router = useRouter();
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
function handleDetails(){
    router.push('/add-details')
} 
</script>

<style scoped>
.card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem;
    margin: 1rem;
}
</style>