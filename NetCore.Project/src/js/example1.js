// init
import Vue from "vue";
import axios from "axios";
import pond from "../components/init.vue";

new Vue({
    el: "#app",
    components: {
        pond
    },
    data() {
        return {
            name: "Vue",
            imgs:[],
            myFiles:[]
        }
    },
    methods: {
        getFile(){
            var url = "api/Attachments";
            axios.get(url).then(r=>{
                this.imgs= r.data;

                r.data.forEach(element => {
                    var item =
                    {
                        source: element.guid,
                        options: {
                            type: 'local', // local to indicate an already uploaded file, so it hits the load endpoint
                        }
                    };
                    this.myFiles.push(item);
                });

            })
        },
    },
    async created() {

        // var data = await axios.get("/api/me");
        console.log("Welcome!");
        this.getFile();

    },
});