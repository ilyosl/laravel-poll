<template>
    <div>
        <img class="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company" />
        <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Sign up</h2>
        <p class="mt-2 text-center text-sm text-gray-600">
            Or
            <router-link :to="{name: 'Login'}" class="font-medium text-indigo-600 hover:text-indigo-500">Sign in</router-link>
        </p>
    </div>
    <form class="mt-8 space-y-6" @submit="register">
        <input type="hidden" name="remember" value="true" />
        <div class="-space-y-px rounded-md shadow-sm">
            <div >
                <label for="full_name" class="sr-only">Full Name</label>
                <input id="full_name" name="full_name" type="text"  required="" v-model="user.full_name"
                    class="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="Full name" />
            </div>

            <div class="mb-8">
                <label for="email-address" class="sr-only">Email address</label>
                <input id="email-address" name="email" type="email" autocomplete="email" required="" v-model="user.email"
                    class="relative block w-full appearance-none rounded-none  border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="Email address" />
            </div>

            <div>
                <label for="password" class="sr-only">Password</label>
                <input id="password" name="password" type="password" autocomplete="current-password" required="" v-model="user.password"
                    class="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="Password" />
            </div>
            <div>
                <label for="password_confirmation" class="sr-only">Password Confirm</label>
                <input id="password_confirmation" name="password_confirmation" type="password" autocomplete="current-password_confirmation" required="" v-model="user.password_confirmation"
                    class="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="Password confirm" />
            </div>
        </div>
        <div>
            <button type="submit"
                class="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                    <LockClosedIcon class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                        aria-hidden="true" />
                </span>
                Sign up
            </button>
        </div>
    </form>
</template>

<script setup>
import { LockClosedIcon } from '@heroicons/vue/20/solid'
import { useRouter } from 'vue-router';
import store from '../store';

const router = useRouter();

const user = {
    full_name: '',
    email: '',
    password: '',
    password_confirmation: '',
}

function register(ev){
    ev.preventDefault();
    store.dispatch('register', user)
    .then(()=> {
        router.push({name:"Dashboard"});
    })
}

</script>
