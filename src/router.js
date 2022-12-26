import VueRouter from 'vue-router'
import Create from './views/Create.vue'
import Update from './views/Update.vue'
import Reports from './views/Reports.vue'
import ReportDetail from './views/ReportDetail.vue'

export default new VueRouter({  routes :
[  
    {  
        path:'/create',
        name:'create',
        component: Create,  
    },
    {  
        path:'/update/:id',
        name:'update',
        component: Update, 
        props : true, 
    },
    {  
        path:'/reports',
        name:'reports',
        component: Reports,  
    },
    {  
        path:'/report/:id',
        name:'report',
        component: ReportDetail,
        props : true,
    },
    
]
,mode : 'history',});