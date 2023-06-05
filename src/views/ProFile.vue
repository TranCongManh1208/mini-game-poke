<template>
  <div
    class="screen w-full h-screen absolute top-0 left-0 flex justify-center items-center flex-col z-[2] bg-dark text-light"
  >
    <div class="profile__inner" v-if="user">
      <div class="profile-avt my-3">
        <img
          v-if="user.photoURL"
          :src="user.photoURL"
          :alt="user.displayName"
          class="m-auto rounded-full max-w-[120px] w-full h-auto"
        />
        <img
          v-else
          src="https://covid19.vnuhcm.edu.vn/wp-content/uploads/2021/08/no-avatar.png"
          :alt="user.displayName"
          class="m-auto rounded-full max-w-[120px] w-full h-auto"
        />
      </div>
      <div
        v-if="user.displayName !== null"
        class="text-2xl py-1 cursor-pointer profile-name"
      >
        <span>Fullname: </span>
        <span>{{ user.displayName }}</span>
      </div>
      <div v-if="user.email !== null" class="text-2xl py-1 cursor-pointer profile-email">
        <span>Email: </span>
        <span>{{ user.email }}</span>
      </div>
      <div
        v-if="user.phoneNumber !== null"
        class="text-2xl py-1 cursor-pointer profile-phone"
      >
        <span>Phone Number: </span>
        <span>{{ user.phoneNumber }}</span>
      </div>
      <div class="text-2xl py-1 cursor-pointer profile-phone">
        <span>Creation Time: </span>
        <span>{{
          JSON.stringify(new Date(user.metadata.creationTime)).slice(1, 11)
        }}</span>
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
      <div class="update__profile my-3" @click="onShowModal">
        <button class="bg-CornflowerBlue w-full py-2 rounded-lg text-lg">
          Update Profile
        </button>
      </div>
    </div>
  </div>
  <modal-update v-if="isShow" @onIsShow="onIsShow(value)" />
</template>

<script>
import { ref } from "vue";
import modalUpdate from "../components/ModalUpdate.vue";
import { useUser } from "../composables/useUser";
export default {
  components: {
    modalUpdate,
  },
  setup() {
    const { getUser } = useUser();
    const { user } = getUser();
    const isShow = ref(false);
    const onShowModal = () => {
      isShow.value = !isShow.value;
    };
    const onIsShow = (value) => {
      isShow.value = value;
    };
    return { user, isShow, onShowModal, onIsShow };
  },
};
</script>
