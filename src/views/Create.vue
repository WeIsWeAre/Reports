<template>
  <div>
    <div class="container-fluid mt-5">


      <div class="row">
        <div class="col">


          <div class="container-fluid mt-2">



            <div class="row justify-content-center">

              <div class="col-lg-10">
                <div v-if="success_message">
                  <b-alert show variant="success" fade> {{ success_message }} </b-alert>
                </div>

                <div v-if="error_message">
                  <b-alert show variant="danger" fade> {{ error_message }} </b-alert>
                </div>


                <div class="report-container">


                  <div class="row mt-3 align-items-end">
                    <div class="col-lg-3">
                      <label for="range-2">Тип продукции:</label>

                      <b-form-select form="create_report" id="input-type" v-model="form_type.type" :options="types"
                        required></b-form-select>

                    </div>
                    <div class="col-lg-3">
                      <label for="range-2">Наименование :</label>
                      <b-form-input form="create_report" id="input-1" v-model="form_type.report_name"
                        placeholder="Введите название" required></b-form-input>


                    </div>

                    <div class="col-lg-6">

                      <div class="border-restrictions">
                        <h5 class="text-center"> Параметры ограничений</h5>
                        <div class="row">


                          <div class="col-lg-6">


                            <b-form-select form="form_restrictions" id="input-restrictions"
                              v-model="form_restrictions.sign_now" :options="signs" required>
                            </b-form-select>

                          </div>
                          <div class="col-lg-6">

                            <b-form-input form="form_restrictions" type="number" id="value_restrictions"
                              v-model="form_restrictions.value_restrictions" placeholder="Значение" required>
                            </b-form-input>

                          </div>
                        </div>
                      </div>

                    </div>

                  </div>

                  <div class="row justify-content-center">
                    <div class="col-lg-4">
                      <p class="text-center"> Дерево параметров</p>


                      <tree-check></tree-check>


                    </div>
                    <div class="col-lg-8 mt-md-5">

                      <table class="table table-style table-responsive-md table-success table-striped">
                        <thead>
                          <tr>
                            <th scope="col">Колонка</th>
                            <th scope="col">Параметр</th>
                            <th scope="col">Функция</th>
                            <th scope="col">Ограничения</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="data in reports_data" v-bind:key="data.id">
                            <td>{{ data.root_name }}</td>
                            <td>{{ data.param }}</td>
                            <td>

                              <b-form-select id="input-function" v-model="data.function" :options="functions" required>
                              </b-form-select>


                            </td>
                            <td>
                              <div class="row">
                                <div class="col">
                                    <b-button @click="deleteRestrictions(data.id)" type="button" variant="danger">
                                      <b-icon icon="dash-circle" aria-hidden="true"></b-icon>
                                    </b-button>
                               
                                  </div>
                                <div class="col">

                                  <b-form id="form_restrictions" @submit="addRestrictions(data.id)">
                                    <b-button type="submit" variant="primary">
                                      <b-icon icon="plus-circle" aria-hidden="true"></b-icon>
                                    </b-button>
                                  </b-form>

                                </div>
                                <div class="col">
                                  <ul>
                                    <li v-for="restr in data.restrictions" v-bind:key="restr.id">
                                      {{ restr.sign_now }} {{ restr.value_restrictions }}
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>

                    </div>

                  </div>

                  <div class="d-flex flex-wrap mt-5">
                    <div class="mr-auto">
                      <b-button @click="acceptParameters()" variant="primary">Применить параметры</b-button>
                    </div>

                    <div>

                      <b-form id="create_report" @submit="createReport()">
                        <b-button type="submit" :disabled="reports_data.length == 0 || loading " variant="success">
                          <span v-if="loading" class="spinner-border spinner-border-sm" role="status"
                            aria-hidden="true"></span>Сохранить отчет
                        </b-button>
                      </b-form>

                    </div>


                    <div class="ml-2">
                      <b-button :disabled="reports_data.length == 0" @click="deleteParameters()" variant="danger">
                        Очистить параметры
                      </b-button>
                    </div>
                  </div>


                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import TreeCheck from "../components/TreeCheck.vue"

  export default {

    data() {
      return {

        
        form_restrictions: {
          sign_now: '',
          value_restrictions: '',
        },

        signs: [{
            text: 'Больше',
            value: ">"
          },
          {
            text: 'Меньше',
            value: "<"
          },
          {
            text: 'Не равно',
            value: "!="
          },
          {
            text: 'Равно',
            value: "=="
          },
        ],

        functions: [{
            text: 'По умолчанию',
            value: "default"
          },
          {
            text: 'Максимум',
            value: "max"
          },
          {
            text: 'Минимум',
            value: "min"
          },
          {
            text: 'Avg',
            value: "avg"
          },
        ],

        form_type: {
          report_name: '',
          type: null,
        },
      }
    },
    props: {
      update_report: {
        type: Object,
      },
      action: {
        type: String,
        default: "",
      }

    },
    components: {
      'tree-check': TreeCheck,

    },
    methods: {

      createReport() {

        event.preventDefault();

        var report_name = this.form_type.report_name;
        var type = this.form_type.type;
        var reports_data = this.reports_data;
        var report = {};

        if (this.action == "update") {

          report = {
            id: this.update_report.id,
            report_name: report_name,
            type: type,
            reports_data: reports_data,
          };

          this.$store.dispatch('updateReport', report);
            this.$store.dispatch('clearReportsDataNow');
        } else {

          report = {
            id: Math.random(),
            report_name: report_name,
            type: type,
            reports_data: reports_data,
          };

          this.$store.dispatch('addReport', report);
            this.$store.dispatch('clearReportsDataNow');


        }
      },

      deleteRestrictions(id){
        this.$store.dispatch('deleteRestrictions', id);
      },
      addRestrictions(id) {

        event.preventDefault();

        var sign_now = this.form_restrictions.sign_now;
        var value_restrictions = this.form_restrictions.value_restrictions;

        var data = {
          id: id,
          sign_now: sign_now,
          value_restrictions: value_restrictions,
        }

        this.$store.dispatch('addRestrictions', data);

      },
      deleteParameters() {

        this.$store.dispatch('deleteReportsData');

      },
      acceptParameters() {

        var data = [];

        this.applied_parameters.forEach(d => {

          var id = d.id;
          var label = d.label;

          let obj = {
            id: id,
            root_name: "-",
            param: label,
            function: "default",
            restrictions: [],
          }


          data.push(obj);
        });

        this.$store.dispatch('updateReportsData', data);

      }

    },
    computed: {

      loading() {
        return this.$store.getters.getLoading;
      },

      valuesReportOptios() {
        return this.$store.getters.getValuesReport;
      },

      applied_parameters() {
        return this.$store.getters.getAppliedParameters;
      },
      reports_data() {
        return this.$store.getters.getReportsData;
      },
      types() {
        return this.$store.getters.getTypes;
      },
      success_message() {
        return this.$store.getters.getSuccessMessage;
      },
      error_message() {
        return this.$store.getters.getErrorMessage;
      }

    },
    mounted() {

      if (this.action == "update") {

        this.form_type.report_name = this.update_report.report_name;
        this.form_type.type = this.update_report.type;


        this.$store.dispatch('updateReportsData', this.update_report.reports_data);
      }

    }
  }
</script>


<style>
  .border-restrictions {
    border: 1px solid #e3e4e6;
    border-radius: 5px;
    padding: 5px;
  }

  .report-container {
    background-color: #BDD0D4;
    border-radius: 10px;
    height: auto;
    padding-bottom: 50px;
  }
</style>