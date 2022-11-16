<template>
  <main>
    <div>
      <h1 class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10">Welcome</h1>
    </div>
    <div>
      <canvas id="myChart" width="400" height="400"></canvas>
    </div>
    
  </main>
</template>
<script>
import Chart from 'chart.js/auto';

export default {
  methods: {
    routePush(routeName) {
      this.$router.push({ name: routeName });
    },
  },
  mounted(){
    const ctx = document.getElementById('myChart');

    new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Organization A','Organization B','Organization C'],
      datasets: [{
        label: '# of Events per Org',
        data: [12, 19, 3],
        borderWidth: 1
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
  }
};
</script>
