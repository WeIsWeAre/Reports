import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

window.eventBus = new Vue()

export const store = new Vuex.Store({
  state: {

    loading: false,
    plug : 1,

    success_message: "",
    error_message: "",

    reports: [], // отчеты
    
    chart_data: {},

    applied_parameters: [],
    reports_data_now: [],

    processed_data: {},

    types: [

      'Рулон',
      'Сляб'

    ],
    values_report: [{

        id: '1',
        label: 'ППП',

        children: [{
            id: '2',
            label: 'ЛПЦ-2',
            children: [{
                id: '3',
                label: 'Идентификатор',
                children: [{
                    id: '4',
                    label: 'Выбор 1',
                  },
                  {
                    id: '5',
                    label: 'Выбор 2',
                  }
                ]
              },
              {
                id: '6',
                label: 'Чистовая группа клетей',
                children: []
              }
            ]
          },

          {
            id: '7',
            label: 'ЛПЦ-1',
            children: []
          }
        ]
      },

      {
        id: '8',
        label: 'ПТП',
        children: [{
          id: '9',
          label: 'Starred',
        }, ],
      },
    ],



  },
  getters: {


    getPlug(state) {
      return state.processed_data;
    },

    getProcessedData(state) {
      return state.processed_data;
    },

    getChartData(state) {
      return state.chart_data;
    },

    getLoading(state) {
      return state.loading;
    },

    getSuccessMessage(state) {
      return state.success_message;
    },

    getErrorMessage(state) {
      return state.error_message;
    },

    getAppliedParameters(state) {
      return state.applied_parameters;
    },

    getReports(state) {
      return state.reports;
    },

    getReportsData(state) {
      return state.reports_data_now;
    },

    getValuesReport(state) {
      return state.values_report;
    },

    getTypes(state) {
      return state.types;
    }


  },
  mutations: {


    addReport(state, data) {
      state.reports.push(data);

    },



    updateReport(state, report_update) {

      state.reports = state.reports.map(x => x.id == report_update.id ? x = report_update : x);
    },


    deleteReport(state, id) {

      state.reports = state.reports.filter((x) => x.id !== id);

      state.success_message = "Успешное удаление";
    },


    addRestrictions(state, data) {

      state.reports_data_now.forEach(d => {
        
        if (d.id == data.id) {
          let obj = {
            id: Math.random(),
            sign_now: data.sign_now,
            value_restrictions: data.value_restrictions,
          }

          d.restrictions.push(obj);
        }

      });

    },
    deleteRestrictions(state, id) {

      for(var i = state.reports_data_now.length - 1; i >= 0; i--) {
        if(state.reports_data_now[i].id == id) {
          state.reports_data_now.splice(i, 1);
        }
      }

    },
    addParameters(state, data) {
      state.applied_parameters = data;
    },
    updateReportsData(state, data) {
      //state.reports_data_now = data;

      data.filter(d => ! state.reports_data_now.some(obj => obj.id === d.id))
      .forEach(d => {
        state.reports_data_now.push(d);
      });

    },
    deleteReportsData(state) {
      state.reports_data_now.splice(0, state.reports_data_now.length);
    },

    clearMessage(state) {
      state.success_message = "";
    },

    updateLoading(state, data) {
      state.loading = data;
    },


    updateError(state, text) {
      state.error_message = text;
    },

    updateSuccessMessage(state, text) {
      state.success_message = text;
    },

    updateValuesReport(state, data) {
      state.values_report = data;
    },

    updateProcessedData(state, data) {
      state.processed_data = data;
    },

    updateChartData(state, data) {
      state.chart_data = data;
    },

    updatePlug(state, data) {
      state.plug = data;
    },

    clearReportsDataNow(state, data) {
      state.reports_data_now = data;
    },

  },
  actions: {

    clearReportsDataNow(context) {
      context.commit('clearReportsDataNow', []);
    },

    getProcessedDataFromServer({ commit, state }, params) {
      commit('updateLoading', true);

      setTimeout(() => {
        commit('updateLoading', false);

        var plug = state.plug;
        console.log(plug);

        var data = {};


        if(plug == 1){

          data = {
            
            name: "Температура металла перед группой металлок №2",
            use_field_for_graph : "processed_data",
            fields: [
              '№','Единица продукции','Время создания ЕП','Температура металла перед группой металлок №2',
            ],

            data: [

            {
              'id': 1,
              'production': 'Горячекатанный рулон 1011.1',
              'created': '30.05.2021  0:33:02',
              'processed_data': 573.987
            },
            {
              'id': 2,
              'production': 'Горячекатанный рулон 1011.2',
              'created': '30.05.2021  0:33:05',
              'processed_data': 574.1435
            },
            {
              'id': 3,
              'production': 'Горячекатанный рулон 1012',
              'created': '30.05.2021  0:33:10',
              'processed_data': 604.01
            },

            {
              'id': 4,
              'production': 'Горячекатанный рулон 1013',
              'created': '30.05.2021  0:53:00',
              'processed_data': 587.948,
            },

            {
              'id': 5,
              'production': 'Горячекатанный рулон 1014',
              'created': '30.05.2021  0:53:00',
              'processed_data': 602.9595,
            },
            

        ]}

      }
      else if(plug == 2)
      {
        data = {
            
          name: "Т1111111111111111",
          use_field_for_graph : "processed_data",

          fields: [
            '№','Единица продукции','Время создания ЕП','Ширина металла за клетью №12',
          ],

          data: [

          {
            'id': 1,
            'production': 'Горячекатанный рулон  3245',
            'created': '20.05.2021  0:12:00',
            'processed_data': 1174.706
          },
  
      ]}

      }
      else if(plug == 3){
        data = {
            
          name: "asdsadsa",
          use_field_for_graph : "ident",

          fields: [
            '№','Единица продукции','Время создания ЕП','Идентификатор','Номер партии','Номер рулона','Марка стали','Ширина металла за клетью № 12 max, mm','Ширина металла за клетью № 12 min, mm','Ширина металла за клетью № 12 avg, mm','Ширина металла за клетью № 12 заданная max, mm','Ширина металла за клетью № 12 заданная min, mm','Ширина за 12 клетью задание (фактически), мм','Ширина металл за клетью №12  (заданная), мм','Толщина металла за клетью № 12 max, mm','Толшина металла за клетью № 12 min, mm','Толщина металла за клетью № 12 avg, mm','Толщина металла за клетью № 12 заданная max, mm','Толщина металла за клетью № 12 заданная min, mm','Толщина за клетью 12 задание (фактически)','Толщина металла за клетью №12 ( заданная)'
          ],

          data: [

          {
            'id': 1,
            'production': 'Горячекатанный рулон 1011.1',
            'created': '30.05.2021  0:33:02',
            'ident': 10001,
            'num': 1,
            'num rul': 10,
            'mark': "00С",
            'some1': 1001.012,
            'some2': 1000.03,
            'some3': 1000.521,
            'some4': 1015,
            'some5': 1005,
            'some6': 1005,
            'some7': 2.01,
            'some8': 1.589,
            'some9': 1.80,
            'some10': 3.003,
            'some11': 1.20,
            'some12': 3.00,

          },
  
      ]}
      }
       
      
      if(plug == 1){
        commit('updatePlug', 2);
        }
        else if(plug == 2){
          commit('updatePlug', 3);
        }
        else if(plug == 3){
          commit('updatePlug', 1);
        }

       var label = data.name;
       var use_field_for_graph = data.use_field_for_graph;
       var labels = [];
       var numeric_data = [];

       data.data.forEach(d => {

        labels.push(d.production);

        for (const [key, value] of Object.entries(d)) 
        {
          if (key == use_field_for_graph.toString())
          {
            numeric_data.push(value);
        }
      }

      });

       var chart_data = {
        labels: labels,
        datasets: [{
            label: label,
            backgroundColor: '#35B982',
            data: numeric_data
        }]
      }

        commit('updateChartData', chart_data);

       commit('updateProcessedData', data);
      }, 1000);


      /*    axios.post(window.location.origin + "/lalalal", {
            params: {
                'data': data,
                
            }
        })
        .then((response) => {

          context.commit('updateValuesReport',response.data);
          context.commit('updateLoading',false);
          context.commit('updateError',"");

        }).catch(error => {
         
          context.commit('updateError',"Произошла ошибка сервера");
          context.commit('updateLoading',false);
          context.commit('updateError',error.response.data.errors);

        }); */

    },

    getTreeDataFromServer(context) {
      context.commit('updateLoading', true);

      setTimeout(() => {
        context.commit('updateLoading', false);
      }, 1000);


      /*  axios.get(window.location.origin + '/tree_data')
            .then(response => {
              
              context.commit('updateValuesReport',response.data);

              context.commit('updateLoading',false);
              context.commit('updateError',"");
           

            })
            .catch(error => {
              context.commit('updateError',"Произошла ошибка сервера");
              context.commit('updateLoading',false);
              context.commit('updateError',error.response.data.errors);
          
            }) */



    },

    getReportsFromServer(context) {
      context.commit('updateLoading', true);

      setTimeout(() => {
        context.commit('updateLoading', false);
      }, 1000);


      /*  axios.get(window.location.origin + '/reports')
            .then(response => {
              
            

              context.commit('updateLoading',false);
              context.commit('updateError',"");
           

            })
            .catch(error => {
              context.commit('updateError',"Произошла ошибка сервера");
              context.commit('updateLoading',false);
              context.commit('updateError',error.response.data.errors);
          
            }) */



    },

    deleteRestrictions(context,id){
      context.commit('deleteRestrictions',id)
    },


    clearMessage(context) {
      context.commit('clearMessage')
    },

    clearProcessedData(context) {
      context.commit('updateProcessedData', {});
    },

    deleteReport(context, id) {

      // также удалить с сервера
      context.commit('updateLoading', true);

      setTimeout(() => {
        context.commit('updateLoading', false);
      }, 1000);

      context.commit('deleteReport', id)
    },

    addReport(context, data) {

      context.commit('updateLoading', true);

      setTimeout(() => {
        context.commit('updateLoading', false);
        context.commit('updateSuccessMessage', "Успешное добавление");
      }, 1000);

      context.commit('addReport', data)
    },

    updateReport(context, data) {

      context.commit('updateLoading', true);

      setTimeout(() => {
        context.commit('updateLoading', false);
        context.commit('updateSuccessMessage', "Успешное изменение");
      }, 1000);

      context.commit('updateReport', data)
    },

    addRestrictions(context, data) {
      context.commit('addRestrictions', data)
    },

    deleteReportsData(context) {
      context.commit('deleteReportsData')
    },

    addParameters(context, data) {
      context.commit('addParameters', data)
    },


    updateReportsData(context, data) {
      context.commit('updateReportsData', data)
    },


    updateError(context, text) {
      context.commit('updateError', text)
    },

  }
})