<template>
  <div
    class="screen w-full h-screen absolute top-0 left-0 flex justify-center items-center flex-col z-[2] bg-dark text-light"
  >
    <div class="profile__inner">
      <div class="profile-avt">
        <img src="../assets/images/10.png" alt="" />
      </div>
      <div class="text-2xl py-1 cursor-pointer profile-name">
        <span>Fullname: </span>
        <span>name</span>
      </div>
      <div class="text-2xl py-1 cursor-pointer profile-email">
        <span>Email: </span>
        <span>example@gmail.com</span>
      </div>
      <div class="text-2xl py-1 cursor-pointer profile-phone">
        <span>Phone Number: </span>
        <span>0987767567</span>
      </div>
      <div class="text-2xl py-1 cursor-pointer profile-phone">
        <span>Creation Time: </span>
        <span>20/12/2020</span>
      </div>
      <div class="text-2xl py-1 cursor-pointer profile-achievements">
        <span>Achievements</span>
      </div>
      <div class="text-2xl py-1 cursor-pointer profile-logout">
        <span>
          <router-link :to="{ name: 'Logout', params: {} }" class="decoration-clone"
            >Logout</router-link
          >
        </span>
      </div>
      <div class="text-2xl py-1 cursor-pointer profile-logout">
        <span>
          <router-link :to="{ name: 'Match', params: {} }" class="decoration-clone"
            >Back to Home</router-link
          ></span
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStore } from "vuex";

const store = useStore();
console.log(store.getters);
</script>
