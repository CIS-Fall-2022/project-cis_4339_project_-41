<template>
  <main>
    <div>
      <h1 class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10">Find Organization</h1>
    </div>
    <div class="px-10 pt-20">
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
        <h2 class="text-2xl font-bold">Search Organization By</h2>
        <!-- Displays Organization Name search field -->
        <div class="flex flex-col">
          <select
            class="rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            v-model="searchBy"
          >
            <option value="Organization Name">Organization Name</option>
          </select>
        </div>
        <div class="flex flex-col" v-if="searchBy === 'Organization Name'">
          <label class="block">
            <input
              type="text"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              v-model="orgName"
              v-on:keyup.enter="handleSubmitForm"
              placeholder="Enter Organization Name"
            />
          </label>
        </div>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
        <div></div>
        <div></div>
        <div class="mt-5 grid-cols-2">
          <button
            class="mr-10 border border-red-700 bg-white text-red-700 rounded"
            @click="clearSearch"
            type="submit"
          >Clear Search</button>
          <button
            class="bg-red-700 text-white rounded"
            @click="handleSubmitForm"
            type="submit"
          >Search Organization</button>
        </div>
      </div>
    </div>

    <hr class="mt-10 mb-10" />
    <!-- Display Found Data -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
      <div class="ml-10">
        <h2 class="text-2xl font-bold">List of Organizations</h2>
        <h3 class="italic">Click table row to edit/display an entry</h3>
      </div>
      <div class="flex flex-col col-span-2">
        <table class="min-w-full shadow-md rounded">
          <thead class="bg-gray-50 text-xl">
            <tr>
              <th class="p-4 text-left">Name</th>
              <th class="p-4 text-left">Description</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-300">
            <tr @click="editOrg(org._id)" v-for="org in queryData" :key="org._id">
              <td class="p-2 text-left">{{ org.orgName }}</td>
              <td class="p-2 text-left">{{ org.description }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </main>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      queryData: [],
      //Parameter for search to occur
      searchBy: "",
      orgName: "",
      description: "",
    };
  },
  mounted() {
    let apiURL = import.meta.env.VITE_ROOT_API + `/orgdata/`;
    axios.get(apiURL).then((resp) => {
      this.queryData = resp.data;
    });
    window.scrollTo(0, 0);
  },
  methods: {
    handleSubmitForm() {
      let apiURL = "";
      if (this.searchBy === "Organization Name") {
        apiURL =
          import.meta.env.VITE_ROOT_API +
          `/orgdata/search/?orgName=${this.orgName}`;
      }
      axios.get(apiURL).then((resp) => {
        this.queryData = resp.data;
      });
    },
    clearSearch() {
      //Resets all the variables
      this.searchBy = "";
      this.orgName = "";
      this.description = "";

      //get all entries
      let apiURL = import.meta.env.VITE_ROOT_API + `/orgdata/`;
      axios.get(apiURL).then((resp) => {
        this.queryData = resp.data;
      });
    },
    editOrg(orgID) {
      this.$router.push({ name: "updateorg", params: { id: orgID } });
    },
  },
};
</script>