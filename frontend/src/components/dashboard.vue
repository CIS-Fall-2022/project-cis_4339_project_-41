<template>
  <main>
    <div>
      <h1 class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10">Welcome</h1>
      <!--canvas used to draw chart dimensions-->
      <canvas id="myChart"></canvas> 
    <!-- Display Table -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
      <div class="ml-10">
        <h2 class="text-2xl font-bold">List of Orgs</h2>
        <h3 class="italic">Clients signed up for events that happened in the last 2 months.</h3>
      </div>
      <div class="flex flex-col col-span-2">
        <table class="min-w-full shadow-md rounded">
          <thead class="bg-gray-50 text-xl">
            <tr>
              <th class="p-4 text-left">Org Name</th>
              <th class="p-4 text-left"># signed up</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-300">
            <tr>
              <td class="p-2 text-left">Org A</td>
              <td class="p-2 text-left">{{orga}}</td>
            </tr>
          </tbody>
          <tbody class="divide-y divide-gray-300">
            <tr>
              <td class="p-2 text-left">Org B</td>
              <td class="p-2 text-left">{{orgb}}</td>
            </tr>
          </tbody>
          <tbody class="divide-y divide-gray-300">
            <tr>
              <td class="p-2 text-left">Org C</td>
              <td class="p-2 text-left">{{orgc}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    </div>
  </main>
</template>
<script>
//import controllers, elements, scales, and plugins for Chart
import Chart from 'chart.js/auto';
import axios from 'axios';

export default {
  name: "App",
  data(){
    return{
    graphData: [],
    orga: '5',
    orgb: '3',
    orgc: '7',
    }
  },
  methods: {
    routePush(routeName) {
      this.$router.push({ name: routeName });
    },
    graphGet() {
      //get the data for the graph
      let apiURL = import.meta.env.VITE_ROOT_API + `/eventdata/dashboard"`;
      this.queryData = [];
      axios.get(apiURL).then((resp) => {
        this.queryData = resp.data;
        this.$router.back().catch((error) => {
          console.log(error);
          alert(error); // improved error handling by alerting on the frontend also
        });
      });
    },
  },
  //mounting the demo chart
  mounted() {
    console.log('test')

    const ctx = document.getElementById('myChart');

const myChart = new Chart(ctx, {
  //Bar chart
  type: 'bar',
  data: {
    //X axis lables
    labels: ['Org A', 'Org B', 'Org C'],
    datasets: [{
      //title
      label: "# of clients signed up",
      //data for the chart
      data: [5, 13, 7]
    }]
  },
  options: {
    //y axis start counting from 0 to nth number
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});
//define chart after initialization
myChart;
  }
};
</script>
