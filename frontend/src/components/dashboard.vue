<template>
  <main>
    <div>
      <h1 class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10">Welcome</h1>
      <!--canvas used to draw chart dimensions-->
      <canvas id="myChart"></canvas>
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
    graphData: []
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
      label: "# of Events per Org",
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
