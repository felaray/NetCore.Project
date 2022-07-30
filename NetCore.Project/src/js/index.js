// init
import $ from "jquery"; 
import Vue from "vue";
import bootstrap from "bootstrap";
import axios from "axios";

// Import Vue FilePond
import vueFilePond, { setOptions } from 'vue-filepond';

// Import FilePond styles
import "filepond/dist/filepond.min.css";


// Import FilePond plugins
// Please note that you need to install these plugins separately

// Import image preview plugin styles
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";

// Import image preview and file type validation plugins
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";

// Create component
const FilePond = vueFilePond(
  FilePondPluginFileValidateType,
  FilePondPluginImagePreview
);

setOptions({
    server: { 
        remove: (source, load, error) => {
            console.log(source);
            // Should somehow send `source` to server so server can remove the file with this source

            // Can call the error method if something is wrong, should exit after
            error('oh my goodness');

            // Should call the load method when done, no parameters required
            load();
        },
    }
});

new Vue({
    el: "#app",
    components: {
        FilePond
    },
    data() {
        return {
            name: "Vue",
            imgs:[],
            myFiles:[]
        }
    },
    computed: {
        imgsUri() {
            return this.imgs.map(c=>'api/file/'+c.url); 
        }
    },
    methods: {
        handleFilePondInit: function () {
            console.log("FilePond has initialized");
            this.$refs.pond.getFiles();
            // FilePond instance methods are available on `this.$refs.pond`
          },
        getFile(){
            var url = "api/TodoFiles";
            axios.get(url).then(r=>{
                this.imgs= r.data;
            })
        },
        handleFilePondAdd:function (e) {
            console.log(e);
            this.$refs.pond.getFiles();
            // FilePond instance methods are available on `this.$refs.pond`
          },
    },
    async created() {

        // var data = await axios.get("/api/me");
        console.log("Welcome!");
        this.getFile();
    },
});