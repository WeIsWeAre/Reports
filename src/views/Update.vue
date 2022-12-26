<template>
    <div>
        <div v-if="report">
            <create v-bind:update_report="report" action="update" ></create>
        </div>
        <div v-else >
           <p class="text-center bold"> Нечего редактировать </p>
        </div>


    </div>
</template>

<script>
    import axios from 'axios'
    import Create from "./Create.vue"


    export default {

        data() {
            return {

            }
        },
        props: {
            report: {
                type: Object,
            },

        },
        components: {

            'create': Create,

        },
        methods: {




        },
        computed: {


        },
        mounted() {


        }
    }
</script>


<style>

</style>