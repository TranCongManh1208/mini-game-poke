<template>
  <div
    class="screen w-full h-screen absolute top-0 left-0 flex justify-center items-center flex-col z-[2] bg-dark text-light"
  ></div>
</template>

<script>
import { useRouter } from "vue-router";
import { useLogout } from "../composables/useLogout";
export default {
  name: "LogOut",
  setup() {
    const router = useRouter();
    const { error, logout } = useLogout();
    async function onLogout() {
      console.log("error", error);
      await logout();
      if (!error.value) router.push({ name: "SignIn", params: {} });
    }
    onLogout();
    return { error };
  },
};
</script>
