<template>
  <!-- Main modal -->
  <div
    class="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
  >
    <div class="relative w-full max-w-md max-h-full m-auto top-2/4 -translate-y-2/4">
      <!-- Modal content -->
      <div class="relative bg-light rounded-lg shadow dark:bg-gray-700">
        <button
          type="button"
          @click="$emit('onModal', false)"
          class="absolute top-3 right-2.5 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
          data-modal-hide="authentication-modal"
        >
          <svg
            aria-hidden="true"
            class="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <span class="sr-only">Close modal</span>
        </button>
        <div class="px-6 py-6 lg:px-8">
          <h3 class="mb-4 text-2xl font-medium text-gray-900 dark:text-white">
            Update profile to our platform
          </h3>
          <form @submit.prevent="onSubmit" class="space-y-6">
            <div class="input__change-image">
              <div class="form-group">
                <label for="fileField" class="attachment">
                  <div class="row btn-file">
                    <div
                      class="btn-file__preview bg-no-repeat bg-contain"
                      :style="{ backgroundImage: `url(${filePreview})` }"
                    ></div>
                    <div class="btn-file__actions">
                      <div class="btn-file__actions__item col-xs-12 text-center">
                        <div class="btn-file__actions__item--shadow">
                          <i class="fa fa-plus fa-lg fa-fw" aria-hidden="true"></i>
                          <div class="visible-xs-block"></div>
                          Select file
                        </div>
                      </div>
                    </div>
                  </div>
                  <input type="file" id="fileField" value="" @change="onChangeFile" />
                </label>
              </div>
            </div>
            <div>
              <label
                for="fullname"
                class="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
                >Your Name</label
              >
              <input
                type="text"
                name="fullname"
                id="fullname"
                v-model="fullname"
                :placeholder="user.displayName"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                required
              />
            </div>
            <div v-if="user.phoneNumber !== null">
              <label
                for="phone"
                class="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
                >Your Phone</label
              >
              <input
                type="tel"
                name="phone"
                id="phone"
                v-model="phoneNumber"
                pattern="^(\+84|84|0)(5[5|8|9|6|2]|8[1|2|3|4|5|8|6|9|7]|3[2|3|4|5|6|7|8|9]|7[0|9|7|6|8]|9[0|2|1|4|3|6|7|8|9]|1[2|9])([0-9]{7})$"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder="0987654321"
                required
              />
            </div>
            <button
              v-if="!isPending"
              type="submit"
              class="w-full text-light bg-CornflowerBlue font-medium rounded-lg text-lg px-5 py-2.5 text-center"
            >
              Update
            </button>
            <button
              v-else
              type="button"
              class="w-full text-light bg-CornflowerBlue font-medium rounded-lg text-lg px-5 py-2.5 text-center"
            >
              <svg
                aria-hidden="true"
                role="status"
                class="inline w-4 h-4 mr-2 text-white animate-spin"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="#E5E7EB"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentColor"
                />
              </svg>
              Loading...
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { updateProfile } from "firebase/auth";
import { useUser } from "../composables/useUser";
import useStorage from "../composables/useStorage";
import { toastNotification } from "@/utils/toastNotification";
export default {
  setup(_, { emit }) {
    const { getUser } = useUser();
    const { user } = getUser();
    const { url, uploadFile } = useStorage("user-avatar");
    const file = ref(user.value.photoURL);
    const errorFile = ref(null);
    const isPending = ref(false);
    const filePreview = ref(null);
    const fullname = ref(user.value.displayName);
    const phoneNumber = ref(user.value.phoneNumber);

    function onChangeFile(event) {
      const selected = event.target.files[0];
      const typesFile = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
      if (selected && typesFile.includes(selected.type)) {
        file.value = selected;
        filePreview.value = window.URL.createObjectURL(selected);
      } else {
        file.value = null;
        errorFile.value = "The file is in the wrong data format.";

        toastNotification({
          message: "The file is in the wrong data format.",
          type: "error",
          position: "top-right",
        });
      }
    }

    async function onSubmit() {
      isPending.value = true;
      if (file.value) await uploadFile(file.value);
      await updateProfile(user.value, {
        displayName: fullname.value,
        photoURL: url.value,
      });

      toastNotification({
        message: "Successfully updated",
        type: "success",
        position: "top-right",
      });
      isPending.value = false;
      emit("onModal", false);
    }
    return {
      user,
      isPending,
      fullname,
      phoneNumber,
      filePreview,
      onChangeFile,
      onSubmit,
    };
  },
};
</script>
