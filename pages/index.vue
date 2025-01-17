<template>
    <div class="p-4">
        <h1 class="text-2xl font-medium text-primary pl-4">All Subscriptions Package</h1>
        <div class="card-grid">

            <Card v-for="card in cards" :key="card.id">
                <template #title>
                    <p class="font-bold"> Package Name: <span class="text-primary !text-[26px] !text-center">{{ card.title }}</span></p>
                    
                    <div class="flex items-center">
                     <img alt="" data-src="https://download.ocms365.com/v2/JEETWIN/images/member/vippage/Bronze-icon.webp" src="https://download.ocms365.com/v2/JEETWIN/images/member/vippage/Bronze-icon.webp" lazy="loaded">
                     
                    </div>
                     
                
                </template>
                <template #content>
                    <p class="text-[18px] font-medium"><span> Daily Income : <span class="text-primary">{{ card.content.income }} Tk</span> </span></p>
                    <div class="py-4">
                        <div class="m-0 flex items-center">
                            <i class="pi pi-indian-rupee !font-meduim mr-2"
                                style="font-size: 1.5rem; color: goldenrod;"></i>
                                <span class="font-medium mr-2">Package Price:
                            </span>
                            <span class="text-primary"> {{ card.content.price }} </span>
                        </div>
                        <div class="my-3 flex items-center">
                            <i class="pi pi-calendar-clock !font-meduim mr-2"
                                style="font-size: 1.5rem; color: goldenrod;"></i>
                                <span class="font-medium mr-2">Package Validity:
                            </span>
                            <span class="text-primary">  {{ card.content.validity}}</span>
                          
                        </div>
                    </div>
                </template>
            </Card>
        </div>
    </div>

</template>

<script setup>
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
</script>

<style scoped>
.card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem;
    margin: 1rem;
}
</style>