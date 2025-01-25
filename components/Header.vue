<template>
    <div class="card">
        <Menubar :model="items">
            <template #start>
                <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" shape="circle" />
               

            </template>
            <template #item="{ item, props, hasSubmenu }">
                <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
                    <a v-ripple :href="href" v-bind="props.action" @click="navigate">
                        <span :class="item.icon" />
                        <span>{{ item.label }}</span>
                    </a>
                </router-link>
                <a v-else v-ripple :href="item.url" :target="item.target" v-bind="props.action">
                    <span :class="item.icon" />
                    <span>{{ item.label }}</span>
                    <span v-if="hasSubmenu" class="pi pi-fw pi-angle-down" />
                </a>
            </template>
            <template #end>
                <div class="flex items-center gap-2">
                  <span class="text-primary font-bold">{{ authUser?.subscription?.plan_name }}</span>  {{ authUser?.name }}
                    <button @click="signOut" class="px-4 py-[4px] bg-orange-400 text-white rounded">
                        Sign Out
                    </button>
                </div>
            </template>
        </Menubar>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
const authToken = ref(null)
const authUser = ref(null)
const router = useRouter();



onMounted(()=>{
    
    const token = localStorage.getItem('token')
    const user = JSON.parse(localStorage.getItem('user'))
    authToken.value = token
    authUser.value = user
    if(authUser.value){
        getUserDetails()
    }
})

const getUserDetails = async() =>{
    try {
    const response = await fetch(`https://llmbackend-production.up.railway.app/user/${authUser.value.id}`, {
      method: 'GET',
      headers: {
        // 'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    
    const data = await response.json();
    localStorage.removeItem('user')
    localStorage.setItem('user', JSON.stringify(data.user))
  } catch (error) {
    console.error('Error fetching subscriptions:', error);
  }
    }



const signOut = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    router.push('/login'); }

const items = ref([
    {
        label: 'Home',
        icon: 'pi pi-home',
        route:'/'
    },
    {
        label: 'Tasks',
        icon: 'pi pi-search',
        badge: 3,
        items: [
            {
                label: 'Adds',
                icon: 'pi pi-bolt',
                route:'/adds'
            },
            {
                separator: true
            },
            {
                label: 'Upcoming',
                icon: 'pi pi-pencil',
            }
        ]
    },
    {
        label: 'Sign Out',
        icon: 'pi pi-sign-out',
        command: signOut
    }
]);
</script>
