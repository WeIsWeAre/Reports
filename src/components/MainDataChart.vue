<template>
    <chart :chart-data="chart_data" :height="100" :options="{responsive: true , maintainAspectRatio: true}" />
</template>

<script>
    import ChartData from './ChartData.js'

    export default {

        components: {
            'chart': ChartData
        },
        computed:{
            processed_data() {
                return this.$store.getters.getProcessedData;
            },
            chart_data(){
                return this.$store.getters.getChartData;
            }
        },
        data() {

            return {

                datacollection: []

            }
        },
        methods: {
            fillData() {
            
                this.datacollection = 
                {
                        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                        datasets: [{
                            label: 'Data One',
                            backgroundColor: '#35B982',
                            data: [40, 39, 10, 40, 39, 80, 40]
                        }]
                }

            
            }
        },
        mounted() {
            this.fillData();
        }

        }
</script>