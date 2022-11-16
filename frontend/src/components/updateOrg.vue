<script>
import useVuelidate from "@vuelidate/core";
import { required, alpha} from "@vuelidate/validators";
import axios from "axios";
import { DateTime } from "luxon";

export default {
  props: ["id"],
  setup() {
    return { v$: useVuelidate({ $autoDirty: true }) };
  },
  data() {
    return {
      // Org Data
      org: {
        orgName: "",
        description: "",
      },
    };
  },
  mounted() {
    window.scrollTo(0, 0);
  },
  beforeMount() {
    axios
      .get(
        import.meta.env.VITE_ROOT_API +
          `/orgdata/id/${this.$route.params.id}`
      )
      .then((resp) => {
        let data = resp.data[0];
        this.org.orgName = data.orgName;
        this.org.description = data.description;
      });
  },
  methods: {
    formattedDate(datetimeDB) {
      return DateTime.fromISO(datetimeDB).plus({ days: 1 }).toLocaleString();
    },
    handleOrgDelete() {
      let apiURL = import.meta.env.VITE_ROOT_API + `/orgdata/${this.id}`;
      axios.delete(apiURL, this.org).then(() => {
        alert("Organization has been deleted.");
        this.$router.back().catch((error) => {
          console.log(error);
        });
      });
    },
    handleOrgUpdate() {
      let apiURL = import.meta.env.VITE_ROOT_API + `/orgdata/${this.id}`;
      axios.put(apiURL, this.org).then(() => {
        alert("Update has been saved.");
        this.$router.back().catch((error) => {
          console.log(error);
        });
      });
    },
  },
  validations() {
    return {
      org: {
        orgName: { required},
        description: {},
      },
    };
  },
};
</script>
<template>
  <main>
    <h1 class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10">Update Organization</h1>
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
                placeholder
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
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder
                v-model="org.description"
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
        </div>

        <!-- grid container -->
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
          <div class="flex justify-between mt-10 mr-20">
            <button
              @click="handleOrgUpdate"
              type="submit"
              class="bg-red-700 text-white rounded"
            >Update Organization</button>
          </div>
          <div class="flex justify-between mt-10 mr-20">
            <button
              @click="handleOrgDelete"
              type="submit"
              class="bg-red-700 text-white rounded"
            >Delete Organization</button>
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
<style src="vue-multiselect/dist/vue-multiselect.css"></style>
