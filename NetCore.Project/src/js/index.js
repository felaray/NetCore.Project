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
    // server: {
    //     url: "api/file/attachment/",
    //     process: (fieldName, file, metadata, load, error, progress, abort) => {
    //         console.log(123);
    //         const formData = new FormData();
    //         formData.append(fieldName, file, file.name);
    //         formData.append("CaseID", 1123546);

    //         const request = new XMLHttpRequest();
    //         var ApiUrl="api/file/attachment/";
    //         request.open('POST', ApiUrl);
    //         // Setting computable to false switches the loading indicator to infinite mode
    //         request.upload.onprogress = (e) => {
    //             progress(e.lengthComputable, e.loaded, e.total);
    //         };

    //         request.onload = function () {
    //         if (request.status >= 200 && request.status < 300) {
    //             load(request.responseText);// the load method accepts either a string (id) or an object
    //         }
    //         else {
    //             error('Error during Upload!');
    //         }
    //     };

    //     request.send(formData);
    //     //expose an abort method so the request can be cancelled
    //     return {
    //         abort: () => {
    //             // This function is entered if the user has tapped the cancel button
    //             request.abort();
    //             // Let FilePond know the request has been cancelled
    //             abort();
    //         }
    //     };
    //     }, // we've not implemented these endpoints yet, so leave them null!
    //     fetch: null,
    //     remove: null,
    //     load: "./",
    // },
    // remove: (source, load, error) => {
    //     const request = new XMLHttpRequest();
    //     request.open('DELETE', api);
    //     // Setting computable to false switches the loading indicator to infinite mode
    //     request.upload.onprogress = (e) => {
    //         progress(e.lengthComputable, e.loaded, e.total);
    //     };
    //     request.onload = function () {
    //         if (request.status >= 200 && request.status < 300) {
    //             load();// the load method accepts either a string (id) or an object
    //         }
    //         else {
    //             error('Error while removing file!');
    //         }
    //     }
    //     request.send(source);
    // },
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
            var url = "api/Attachments";
            axios.get(url).then(r=>{
                this.imgs= r.data;

                r.data.forEach(element => {
                    console.log(element);
                    var item =
                    {
                        source: "api/files/attachment/",
                        options: {
                            type: 'limbo', // local to indicate an already uploaded file, so it hits the load endpoint
                        }
                    };
                    this.myFiles.push("api/file/attachment/"+element.guid);
                });

            })
        },
        uploadFile(){
            const formData = new FormData();

            this.$refs.pond.getFiles()
              .map(fileItem => fileItem.file)
              .forEach(file => {
                formData.append("file", file, file.name);
              });
          
            // upload here

            axios.post('/api/file', formData).then(result => {
                // this.ok();
                // this.quotationListGet();
                // this.$refs.close1.click();
            }).catch(r => {
                // this.apiError(r)
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