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
      <div
        class="text-2xl py-1 cursor-pointer profile-achievements"
        v-if="state.achievements.length !== 0"
      >
        <span @click="onAchievements">Achievements</span>
        <ul class="ps-4 py-2" v-if="isAchievements">
          <li v-for="mode in state.achievements.modes" :key="mode.id" class="list-disc">
            <div>Mode: {{ mode.mode }}</div>
            <div class="ps-3 text-base">
              Perfect time:
              {{
                mode.timer !== 0
                  ? `${Math.round(mode.timer / 1000)} seconds`
                  : "No achievements"
              }}
            </div>
            <div class="ps-3 text-base">
              Date created: {{ mode.date !== 0 ? mode.date : "No date created" }}
            </div>
          </li>
        </ul>
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
      <div class="update__profile my-3" @click="onModal(true)">
        <button class="bg-CornflowerBlue w-full py-2 rounded-lg text-lg">
          Update Profile
        </button>
      </div>
    </div>
  </div>
  <modal-update v-if="isShow" @onModal="onModal(value)" />
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";
import { db } from "@/configs/firebase";
import modalUpdate from "../components/ModalUpdate.vue";
import { useUser } from "../composables/useUser";
export default {
  components: {
    modalUpdate,
  },
  setup() {
    const auth = getAuth();
    const store = useStore();
    const { getUser } = useUser();
    const { user } = getUser();
    const isShow = ref(false);
    const isAchievements = ref(false);

    const onModal = (value) => {
      isShow.value = value;
    };

    const onAchievements = () => {
      isAchievements.value = !isAchievements.value;
    };

    onAuthStateChanged(auth, async (_user) => {
      try {
        const querySnapshot = await getDoc(doc(db, "achievements", _user.uid));
        console.log("querySnapshot.data()", querySnapshot.data());
        if (querySnapshot.data()) {
          store.commit("setAchievements", querySnapshot.data().achievements);
          console.log("modes: ", store.state.achievements.modes);
        }
      } catch (err) {
        console.log(err, "err");
      }
    });

    return {
      user,
      isShow,
      state: store.state,
      isAchievements,
      onAchievements,
      onModal,
    };
  },
};
</script>
