<template>
  <div class="screen w-full h-screen absolute top-0 left-0 bg-dark text-light">
    <div class="flex justify-center items-center h-full">
      <div class="screen__inner m-auto md:w-1/4 w-full px-4">
        <h2 class="text-center md:text-5xl text-4xl">Sign In</h2>
        <form @submit.prevent="onSubmit">
          <div class="row">
            <label class="flex flex-col my-2" for="email">
              <span class="font-semibold">Email Address</span>
              <input
                id="email"
                type="email"
                class="py-2 rounded-lg px-2 text-dark"
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
                class="py-2 rounded-lg px-2 text-dark"
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
              Sign In
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
            <span>I'm a new user.</span>
            <span class="ms-2 text-CornflowerBlue font-semibold text-lg cursor-pointer">
              <router-link :to="{ name: 'SignUp', params: {} }">Sign Up</router-link>
            </span>
          </div>
        </div>
        <div class="row">
          <div
            class="loginWithFacebook flex flex-row my-3 cursor-pointer"
            @click="onFacebookSignIn"
          >
            <div class="w-[40px] text-center bg-[#3b5998] rounded-s-lg py-2">F</div>
            <div
              class="uppercase text-center py-2 w-[calc(100%-40px)] rounded-e-lg bg-[#3b5998]"
            >
              login with facebook
            </div>
          </div>
        </div>
        <div class="row">
          <div
            class="loginWithGoogle flex flex-row my-3 cursor-pointer"
            @click="onGoogleSignIn"
          >
            <div class="w-[40px] text-center bg-[#c72d24] rounded-s-lg py-2">G</div>
            <div
              class="uppercase text-center py-2 w-[calc(100%-40px)] rounded-e-lg bg-[#f54537]"
            >
              login with google
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useSignIn } from "@/composables/useSignIn";
export default {
  setup() {
    const router = useRouter();
    const { error, isPending, signin, googleSignIn, facebookSignIn } = useSignIn();
    const email = ref("");
    const password = ref("");

    const onSubmit = async () => {
      console.log("email", email);
      await signin(email.value, password.value);
      if (error.value == null) router.push({ name: "Match", params: {} });
    };

    const onGoogleSignIn = async () => {
      await googleSignIn();

      if (error.value == null) router.push({ name: "Match", params: {} });
    };

    const onFacebookSignIn = async () => {
      await facebookSignIn();
      console.log("err", error.value);
      if (error.value == null) router.push({ name: "Match", params: {} });
    };

    return {
      email,
      password,
      error,
      isPending,
      onSubmit,
      onGoogleSignIn,
      onFacebookSignIn,
    };
  },
};
</script>
