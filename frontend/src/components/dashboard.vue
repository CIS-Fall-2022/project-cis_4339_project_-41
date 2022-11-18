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

export default {
  methods: {
    routePush(routeName) {
      this.$router.push({ name: routeName });
    },
  },
  //mounting the demo chart
  mounted() {
    console.log('test')

    const ctx = document.getElementById('myChart');

const myChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Org A', 'Org B', 'Org C'],
    datasets: [{
      label: "# of Events per Org",
      data: [5, 13, 7]
    }]
  },
  options: {
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
