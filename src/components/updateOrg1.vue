<template>
  <main>
    <div>
      <h1 class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10">Update Organization</h1>
    </div>
    <div class="px-10 py-20">
      <form @submit.prevent="handleSubmitForm">
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
              <span style="color:#ff0000">*</span>
              <input
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                v-model="org.description"
                type="date"
              />
              <span class="text-black" v-if="v$.org.description.$error">
                <p
                  class="text-red-700"
                  v-for="error of v$.org.description.$errors"
                  :key="error.$uid"
                >{{ error.$message }}!</p>
              </span>
            </label>
          </div>

          <div></div>
          <div></div>
          <!-- form field -->
          <div class="flex flex-col">
            <label class="block">
              <span class="text-gray-700">Description</span>
              <input
                type="text"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                rows="2"
                v-model="event.description"
              />
            </label>
          </div>
          <div></div>
          <div></div>
          <div></div>
        </div>

        <!-- grid container -->
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
          <div class="flex justify-between mt-10 mr-20">
            <button
              @click="handleorgUpdate"
              type="submit"
              class="bg-red-700 text-white rounded"
            >Update org</button>
          </div>
          <div class="flex justify-between mt-10 mr-20">
            <button
              @click="handleorgDelete"
              type="submit"
              class="bg-red-700 text-white rounded"
            >Delete org</button>
          </div>
          <div class="flex justify-between mt-10 mr-20">
            <button
              type="reset"
              class="border border-red-700 bg-white text-red-700 rounded"
              @click="$router.go(-1)"
            >Go back</button>
          </div>
        </div>

        <hr class="mt-10 mb-10" />
      </form>
    </div>
  </main>
</template>
<script>
import useVuelidate from "@vuelidate/core";
import { required, email, alpha, numeric } from "@vuelidate/validators";
import axios from "axios";
import { DateTime } from "luxon";

export default {
  props: ["id"],
  setup() {
    return { v$: useVuelidate({ $autoDirty: true }) };
  },
  data() {
    return {
      org: {
        orgName: "",
        description: "",
      },
    };
  },
  beforeMount() {
    axios
      .get(
        import.meta.env.VITE_ROOT_API + `/orgdata/id/${this.$route.params.id}`
      )
      .then((resp) => {
        let data = resp.data[0];
        this.org.orgName = data.orgName;
        console.log(data.date);
        this.org.date = DateTime.fromISO(data.date).plus({ days: 1 }).toISODate();
        this.org.description = data.description;
      });
  },
  methods: {
    formattedDate(datetimeDB) {
      return DateTime.fromISO(datetimeDB).plus({ days: 1 }).toLocaleString();
    },
    handleOrgUpdate() {
      this.org.services = this.checkedServices;
      let apiURL = import.meta.env.VITE_ROOT_API + `/orgdata/${this.id}`;
      axios.put(apiURL, this.org).then(() => {
        alert("Update has been saved.");
        this.$router.back().catch((error) => {
          console.log(error);
        });
      });
    },
    handlOrgDelete() {
      this.event.services = this.checkedServices;
      let apiURL = import.meta.env.VITE_ROOT_API + `/orgdata/${this.id}`;
      axios.delete(apiURL, this.event).then(() => {
        alert("Event has been deleted.");
        this.$router.back().catch((error) => {
          console.log(error);
        });
      });
    },
    editClient(orgID) {
      this.$router.push({ name: "updateorg", params: { id: orgID } });
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