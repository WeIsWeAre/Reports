<template>
    <div>
        <div class="container-fluid mt-5">

            <div v-if="report" class="row">
                <div class="col">
                    <div class="report-container">


                        <div class="d-flex flex-row flex-wrap align-items-center">
                            <div class="p-2 mr-auto">
                                <h4> Наименование отчета: <span class="bold"> {{ report.report_name }} </span> </h4>
                            </div>
                            <div class="p-2">
                                <router-link :to="{
                                        name:
                                            'update',
                                        params: { id: report.id, report: report},
                                    }">
                                    <b-button variant="success"> Редактировать отчет</b-button>
                                </router-link>

                            </div>
                        </div>

                        <div class="container-fluid">

                            <div class="d-flex flex-row flex-wrap align-items-center">
                                <div class="p-2">
                                    <h5> Время создания ЕП: </h5>
                                </div>
                                <div class="p-2">
                                    С
                                </div>
                                <div class="p-2">
                                    <b-form-datepicker id="date_creation_datepicker_begin" required form="getData"
                                        label-no-date-selected="Дата не выбрана" label-today-button="Выбрать сегодня"
                                        today-button label-help="С" label-calendar="С" placeholder="Введите дату"
                                        v-model="date_creation_b">
                                    </b-form-datepicker>
                                </div>
                                <div class="p-2">
                                    До
                                </div>
                                <div class="p-2">
                                    <b-form-datepicker id="date_creation_datepicker_end" required form="getData"
                                        label-no-date-selected="Дата не выбрана" label-today-button="Выбрать сегодня"
                                        today-button label-help="До" label-calendar="До" placeholder="Введите дату"
                                        v-model="date_creation_e"> </b-form-datepicker>
                                </div>
                                <div class="p-2">


                                    <b-form id="getData" @submit="getProcessedData()">
                                        <b-button type="submit" :disabled="loading" variant="outline-primary">
                                            <span v-if="loading" class="spinner-border spinner-border-sm" role="status"
                                                aria-hidden="true"></span>Выполнить
                                        </b-button>
                                    </b-form>

                                </div>

                            </div>


                         <div v-if="!isEmpty(processed_data)">
                            <b-button v-b-toggle.collapse-chart variant="primary"> + Открыть график</b-button>
                            <b-collapse id="collapse-chart" class="mt-2">

                                <div class="chart-container">
                                    <p class="card-text">
                                        <main-chart></main-chart>
                                    </p>
                                </div>

                            </b-collapse>

                           
                                <table class="table new-table table-responsive mt-5">
                                    <thead>
                                        <tr>
                                            <th v-for="field in processed_data.fields" v-bind:key="field" scope="col">{{ field }}</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="d in processed_data.data" v-bind:key="d.id">
                                           <td v-for="(key,index) in Object.values(d)" v-bind:key="index"> {{ key }} </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>


                        </div>
                    </div>
                </div>
            </div>
            <div v-else>
                <p class="text-center bold"> Отчета не существует </p>
            </div>
        </div>

    </div>
</template>

<script>
    import MainDataChart from "../components/MainDataChart"

    export default {

        data() {

            return {

                date_creation_b: '',
                date_creation_e: '',
            }
        },
        props: {
            report: {
                type: Object,
            },

        },
        components: {

            "main-chart": MainDataChart,

        },
        methods: {

            isEmpty(obj) {
            for (let key in obj) {
                return false;
            }
            return true;
            },

            getProcessedData() {

                event.preventDefault();



                var obj = {
                    'report_id' : this.report.id,
                    'date_creation_b' : this.date_creation_b,
                    'date_creation_e': this.date_creation_e
                }

                this.$store.dispatch('getProcessedDataFromServer',obj);
            }
        },
        computed: {
            processed_data() {
                return this.$store.getters.getProcessedData;
            },
            loading() {
                return this.$store.getters.getLoading;
            }


        },
        mounted() {


        }
    }
</script>


<style>
    .chart-container {
        background-color: #fff;
        padding: 5px;
        border-radius: 5px;
    }

    .new-table{
        white-space: nowrap;
    }
</style>