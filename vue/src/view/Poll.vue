<template>
   <PageComponent title="Poll">
      <template v-slot:header>
         <div class="flex justify-between items-center">
            <h1 class="text-3xl font-bold tracking-tight text-gray-900">Poll</h1>
            <router-link
               :to="{name: 'pollCreate'}"
               class="py-2 px-3 text-white bg-emerald-500 rounded-md hover:bg-emerald-600"
            >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
               class="w-4 h-4 -mt-1 inline-block">
               <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>

            Add new poll
            </router-link>
         </div>

      </template>
      <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
        <PollListItem
            v-for="poll in polls"
            :key="poll.id"
            :poll="poll"
            @delete="deletePoll(poll)"
        />
      </div>
   </PageComponent>
</template>
<script setup>
import { computed } from 'vue';
import PageComponent from '../components/PageComponent.vue';
import store from '../store';
import PollListItem from '../components/PollListItem.vue';

const polls = computed(() => store.state.poll.data)

store.dispatch('getPolls');

function deletePoll(poll) {
   if(confirm('Are you sure ?')){
        store.dispatch('deletePoll', poll.id).then(()=> {
            store.dispatch('getPolls');
        });
   }
}
</script>
