<template>
  <div class="screen w-full h-screen absolute top-0 left-0 bg-dark text-light">
    <div class="flex justify-center items-center h-full">
      <div class="screen__inner m-auto md:w-1/4 w-full px-4">
        <h2 class="text-center md:text-5xl text-4xl">Sign Up</h2>
        <form @submit.prevent="onSubmit">
          <div class="row">
            <label class="flex flex-col my-2" for="fullname">
              <span class="font-semibold">Full Name</span>
              <input
                id="fullname"
                class="text-dark py-2 rounded-lg px-2"
                type="text"
                placeholder="CoMan"
                v-model="fullname"
              />
            </label>
          </div>
          <div class="row">
            <label class="flex flex-col my-2" for="email">
              <span class="font-semibold">Email Address</span>
              <input
                id="email"
                type="email"
                class="text-dark py-2 rounded-lg px-2"
                placeholder="example@gmail.com"
                autocomplete="username"
                v-model="email"
              />
            </label>
          </div>
          <div class="row">
            <label class="flex flex-col my-2" for="password">
              <span class="font-semibold">Password</span>
              <input
                id="password"
                class="text-dark py-2 rounded-lg px-2"
                type="password"
                autocomplete="current-password"
                v-model="password"
              />
            </label>
          </div>
          <div v-if="error !== null" class="row">
            <p class="text-[#dc2626]">{{ error }}</p>
          </div>
          <div class="row">
            <button
              v-if="!isPending"
              type="submit"
              class="text-center w-full my-4 p-2 bg-CornflowerBlue text-light rounded-lg text-lg"
            >
              Sign Up
            </button>
            <button
              v-else
              type="button"
              disabled
              class="text-center w-full my-4 p-2 bg-CornflowerBlue text-light rounded-lg text-lg"
            >
              Loading...
            </button>
          </div>
        </form>
        <div class="row">
          <div class="text-center">
            <span>I'm already a member.</span>
            <span class="ms-2 text-CornflowerBlue font-semibold text-lg cursor-pointer">
              <router-link :to="{ name: 'SignIn', params: {} }"
                >Sign In</router-link
              ></span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useSignUp } from "@/composables/useSignUp";
export default {
  setup() {
    const { toastErr, error, isPending, signup } = useSignUp();
    const router = useRouter();
    const fullname = ref("");
    const email = ref("");
    const password = ref("");
    async function onSubmit() {
      await signup(email.value, password.value, fullname.value);
      if (error.value == null) router.push({ name: "SignIn", params: {} });
    }
    return { fullname, email, password, toastErr, error, isPending, onSubmit };
  },
};
</script>
