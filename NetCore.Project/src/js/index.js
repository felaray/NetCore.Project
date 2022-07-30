// init
import $ from "jquery"; 
import Vue from "vue";
import bootstrap from "bootstrap";
import axios from "axios";



new Vue({
    el: "#app",
    components: {

    },
    data() {
        return {
            name: "Vue"
        }
    },
    methods: {
        
    },
    async created() {

        // var data = await axios.get("/api/me");
        console.log("Welcome!");

    },
});