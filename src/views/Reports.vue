<template>
    <div>
        <div class="container-fluid mt-5">

            <div class="row">
                <div class="col">


                    <div v-if="loading">
                        <loader></loader>
                    </div>
                    <div v-else>

                        <div class="text-center" v-if="reports.length == 0">
                            <h5> Список отчетов пуст</h5>
                            <b-icon font-scale="5" icon="bookmark-dash" aria-hidden="true"></b-icon>
                        </div>
                        <div v-else>

                            <h3 class="text-center mb-5"> Отчёты </h3>

                            <table class="table table-style table-responsive-md">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Наименование</th>
                                        <th scope="col">Автор</th>
                                        <th scope="col">Параметры</th>
                                        <th scope="col">#</th>
                                    </tr>
                                </thead>
                                <tbody>


                                    <tr v-for="data in reports" v-bind:key="data.id">
                                        <td></td>

                                        <td>{{ data.report_name }} </td>
                                        <td>SEVERSTAL\aa.mozdakova</td>
                                        <td>
                                            <ul>
                                                <li>
                                                    {{ data.type }}
                                                </li>
                                                <li v-if="data.reports_data">
                                                    <p v-for="d in data.reports_data" v-bind:key="d.id"> тип продукции -
                                                        {{ d.param }}<br>
                                                        функция - {{ d.function }}<br> ограничения: <span
                                                            v-if="d.restrictions.length != 0">
                                                            <ul>
                                                                <li v-for="r in d.restrictions" v-bind:key="r.id">
                                                                    {{ r.sign_now }} {{ r.value_restrictions }}
                                                                </li>
                                                            </ul>
                                                        </span>
                                                        <span v-else> отстутствуют </span>

                                                    </p>
                                                </li>
                                            </ul>
                                        </td>
                                        <td>
                                            <b-button @click="deleteReport(data.id)" variant="outline-danger mr-2">
                                                Удалить
                                            </b-button>

                                            <router-link :to="{
                                        name:
                                            'report',
                                        params: { id: data.id, report: data},
                                    }">
                                                <b-button variant="outline-primary">Открыть / Редактировать</b-button>
                                            </router-link>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    </div>
</template>

<script>
    import Loader from '../components/Loader.vue'

    export default {

        data() {

            return {


            }
        },
        components: {
            'loader': Loader,
        },
        methods: {

            deleteReport(id) {
                this.$store.dispatch('deleteReport', id);
            }
        },

        computed: {

            reports() {
                return this.$store.getters.getReports;
            },
            loading() {
                return this.$store.getters.getLoading;
            }

        },
        created(){
            this.$store.dispatch('getReportsFromServer');
        },
        mounted() {


        }
    }
</script>


<style>
    .report-container {
        background-color: #BDD0D4;
        border-radius: 10px;
        height: auto;
        padding: 25px;
    }
</style>