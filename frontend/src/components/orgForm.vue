<template>
  <main>
    <div>
      <h1 class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10">Create New Organization</h1>
    </div>
    <div class="px-10 py-20">
      <!-- @submit.prevent stops the submit event from reloading the page-->
      <form @submit.prevent="handleSubmitForm">
        <!-- grid container -->
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
          <h2 class="text-2xl font-bold">Organization Details</h2>

          <!-- form field -->
          <div class="flex flex-col">
            <label class="block">
              <span class="text-gray-700">Organization Name</span>
              <span style="color:#ff0000">*</span>
              <input
                type="text"
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                v-model="org.orgName"
              />
              <span class="text-black" v-if="v$.org.orgName.$error">
                <p
                  class="text-red-700"
                  v-for="error of v$.org.orgName.$errors"
                  :key="error.$uid"
                >{{ error.$message }}!</p>
              </span>
            </label>
          </div>
          <!-- form field -->
          <div class="flex flex-col">
            <label class="block">
              <span class="text-gray-700">Description</span>
              <input
                type="text"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                rows="2"
                v-model="org.description"
              />
            </label>
          </div>

          <div></div>
          <div></div>
        </div>

        <div class="flex justify-between mt-10 mr-20">
          <button class="bg-red-700 text-white rounded" type="submit">Add New Organization</button>
        </div>
      </form>
    </div>
  </main>
</template>
<script>
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import axios from "axios";
export default {
  setup() {
    return { v$: useVuelidate({ $autoDirty: true }) };
  },
  data() {
    return {
      checkedServices: [],
      org: {
        orgName: "",
        description: "",
      },
    };
  },
  methods: {
    async handleSubmitForm() {
      // Checks to see if there are any errors in validation
      const isFormCorrect = await this.v$.$validate();
      // If no errors found. isFormCorrect = True then the form is submitted
      if (isFormCorrect) {
        this.org.services = this.checkedServices;
        let apiURL = import.meta.env.VITE_ROOT_API + `/orgdata`;
        axios
          .post(apiURL, this.org)
          .then(() => {
            alert("Organization has been added.");
            this.$router.push("/findorg");
            this.org = {
              orgName: "",
              description: "",
            };
            this.checkedServices = [];
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
  },
  // sets validations for the various data properties
  validations() {
    return {
      org: {
        orgName: { required },
      },
    };
  },
};
</script>