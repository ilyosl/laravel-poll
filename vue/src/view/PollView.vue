<template>
    <PageComponent>
        <template v-slot:header>
            <div class="flex items-center justify-between">
                <h1 class="text-3xl font-bold text-gray-900">
                    {{ route.params.id ? model.title: "Create a poll"}}
                </h1>
                <button
                    v-if="route.params.id"
                    type="button"
                    @click="deletePoll()"
                    class="py-2 px-3 text-white bg-red-500 rounded-md hover:bg-red-600"
                >
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 -mt-1 inline-block"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    >
                    <path
                        fill-rule="evenodd"
                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                        clip-rule="evenodd"
                    />
                    </svg>
                    Delete Poll
                </button>
            </div>
        </template>

        <div v-if="loadingPoll" class="flex justify-center">Loading...</div>
        <form v-else @submit.prevent = 'savePoll'>
            <div class="shadow sm:rounded-md sm:overflow-hidden">
                <!-- Survey Fields -->
                <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
                    <!-- Image -->
                    <div>
                        <label class="block text-sm font-medium text-gray-700">
                            Image
                        </label>
                        <div class="mt-1 flex items-center">
                            <img
                                v-if="model.image_url"
                                :src="model.image_url"
                                :alt="model.title"
                                class="w-64 h-48 object-cover"
                            />
                            <span
                                v-else
                                class="flex items-cente justify-center h-12 w-12 rounded-full overflow-hidden bg-gray-100"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20" class="w-[80%] h-[80%] text-gray-300">
                                    <path full-rule="evenodd" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                </svg>

                            </span>
                            <button
                                    type="button"
                                    class="relative overflow-hidden ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                <input
                                    type="file"
                                    @change="onImageChoose"
                                    class="absolute left-0 top-0 right-0 bottom-0 opacity-0 cursor-pointer"
                                />
                                Change
                            </button>
                        </div>
                    </div>
                    <!-- /Image -->

                    <!-- Title -->
                    <div>
                        <label for="title" class="block text-sm font-medium text-gray-700"
                        >Title</label
                        >
                        <input
                        type="text"
                        name="title"
                        id="title"
                        v-model="model.title"
                        autocomplete="poll_title"
                        class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                    </div>
                    <!--/ Title -->

                    <!-- Description -->
                    <div>
                        <label for="about" class="block text-sm font-medium text-gray-700">
                        Description
                        </label>
                        <div class="mt-1">
                        <textarea
                            id="description"
                            name="description"
                            rows="3"
                            v-model="model.description"
                            autocomplete="poll_description"
                            class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                            placeholder="Describe your poll"
                        />
                        </div>
                    </div>
                    <!-- Description -->

                    <!-- Expire Date -->
                    <div>
                        <label
                        for="expire_date"
                        class="block text-sm font-medium text-gray-700"
                        >Expire Date</label
                        >
                        <input
                        type="date"
                        name="expire_date"
                        id="expire_date"
                        v-model="model.expire_date"
                        class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                    </div>
                    <!--/ Expire Date -->

                    <!-- Status -->
                    <div class="flex items-start">
                        <div class="flex items-center h-5">
                        <input
                            id="status"
                            name="status"
                            type="checkbox"
                            v-model="model.status"
                            class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                        />
                        </div>
                        <div class="ml-3 text-sm">
                            <label for="status" class="font-medium text-gray-700">Active</label>
                        </div>
                    </div>
                    <!--/ Status -->
                </div>
                <!--/ Survey Fields -->
                <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
                    <h3 class="text-2xl font-semibold flex items-center justify-between">
                        Questions
                        <!-- Add new question -->
                        <button
                            type="button"
                            @click="addQuestion()"
                            class="flex items-center text-sm py-1 px-4 rounded-sm text-white bg-gray-600 hover:bg-gray-700"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-4 w-4"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                fill-rule="evenodd"
                                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                clip-rule="evenodd"
                                />
                            </svg>
                            Add Question
                        </button>
                        <!--/ Add new question -->
                    </h3>
                    <!-- Add new question -->
                    <div v-if="!model.questions.length" class="text-center text-gray-600">
                        You don't have any questions created
                    </div>
                    <div v-for="(question, index) in model.questions" :key="question.id">
                        <QuestionEditor
                            :question="question"
                            :index="index"
                            @change="questionChange"
                            @addQuestion="addQuestion"
                            @deleteQuestion="deleteQuestion"
                        />
                    </div>
                </div>

            </div>
            <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
                <button
                    type="submit"
                    class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Save
                </button>
            </div>
        </form>
    </PageComponent>
</template>
<script setup>
import { v4 as uuidv4 } from "uuid";
import { computed, ref, watch } from 'vue';
import store from '../store';
import {useRoute, useRouter} from 'vue-router';
import PageComponent from '../components/PageComponent.vue';
import QuestionEditor from "../components/editor/QuestionEditor.vue";

const router = useRouter();
const route = useRoute();
const loadingPoll = computed(()=> store.state.currentPoll.loading);
let model = ref({
    title: '',
    status: false,
    description: null,
    image_url: null,
    expire_date: null,
    questions: []
})

watch(
  () => store.state.currentPoll.data,
  (newVal, oldVal) => {
    model.value = {
      ...JSON.parse(JSON.stringify(newVal)),
      status: !!newVal.status,
    };
  }
);

if(route.params.id) {
    store.dispatch('getPoll', route.params.id);
}

function onImageChoose(ev) {
    const file = ev.target.files[0];

    const reader = new FileReader();
    reader.onload = ()=> {

      // for send to backend
      model.value.image = reader.result;

      // for display
      model.value.image_url = reader.result;
    };
    reader.readAsDataURL(file);
}

function addQuestion(index) {
    const newQuestion = {
        id: uuidv4(),
        type: "text",
        question: "",
        description: null,
        data:{}
    }
    model.value.questions.splice(index, 0, newQuestion);
}
function savePoll() {
    store.dispatch('savePoll', model.value).then(({data}) => {
        router.push({
            name: 'pollView',
            params: {id: data.data.id}
        })
    })
}
function questionChange(question) {
    model.value.questions = model.value.questions.map((q)=>{
        if(q.id === question.id){
            return JSON.parse(JSON.stringify(question));
        }
        return q;
    })
}
function deleteQuestion(question) {
    model.value.questions = model.value.questions.filter(
        (q) => q !== question
    )
}
function deletePoll() {
    if(
        confirm("Are you sure you want to delete this poll")
    ){
        store.dispatch('deletePoll', model.value.id).then(()=> {
            router.push({
                name: "Poll"
            })
        })
    }
}

</script>
