<template>
<div>
    <file-pond
    ref="pond"
    label-idle="Drop files here..."
    v-bind:allow-multiple="true"
    accepted-file-types="image/jpeg, image/png,image/jpg"
    v-bind:files="myFiles"
    />
</div>
</template>

<script>
import Compressor from 'compressorjs';

// Import Vue FilePond
import vueFilePond, { setOptions } from 'vue-filepond';

// Import FilePond styles
import "filepond/dist/filepond.min.css";
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

export default {
    props: {
        dataRow: []
    },
    watch: {
        dataRow(newValue, oldValue) {
            this.dataRow.forEach(element => {
                this.myFiles.push(element);
            });
        }
    },
    components: {
        FilePond
    },
    data() {
        return {
            myFiles:[]
        }
    },
    methods: {
        fileCompressor(file) {
            return new Promise((resolve, reject) => {
                console.log(file);
                new Compressor(file, {
                    quality: 0.4,
                    convertSize: 1000*100,
                    success(result) {
                        var file = new File([result], result.name , {
                            lastModified: result.lastModified,
                        });
                        resolve(file);
                    },
                    error(err) {
                        reject(err.message);
                    },
                });
            });
        },
    },
    mounted () {
        setOptions({
            server: {
                url: "api/file/attachment/",
                process:async (fieldName, file, metadata, load, error, progress, abort) => {
                    file = await this.fileCompressor(file);
                    const formData = new FormData();
                    formData.append(fieldName, file, file.name);
                    formData.append("CaseID", 1123546);
        
                    const request = new XMLHttpRequest();
                    var ApiUrl="api/file/attachment/";
                    request.open('POST', ApiUrl);
                    // Setting computable to false switches the loading indicator to infinite mode
                    request.upload.onprogress = (e) => {
                        progress(e.lengthComputable, e.loaded, e.total);
                    };
        
                    request.onload = function () {
                    if (request.status >= 200 && request.status < 300) {
                        load(request.responseText);// the load method accepts either a string (id) or an object
                    }
                    else {
                        error('Error during Upload!');
                    }
                };
        
                request.send(formData);
                //expose an abort method so the request can be cancelled
                return {
                    abort: () => {
                        // This function is entered if the user has tapped the cancel button
                        request.abort();
                        // Let FilePond know the request has been cancelled
                        abort();
                    }
                };
                }, // we've not implemented these endpoints yet, so leave them null!
                fetch: null,
                remove: null,
                load: "./",
            },
            remove: (source, load, error) => {
                const request = new XMLHttpRequest();
                request.open('DELETE', api);
                // Setting computable to false switches the loading indicator to infinite mode
                request.upload.onprogress = (e) => {
                    progress(e.lengthComputable, e.loaded, e.total);
                };
                request.onload = function () {
                    if (request.status >= 200 && request.status < 300) {
                        load();// the load method accepts either a string (id) or an object
                    }
                    else {
                        error('Error while removing file!');
                    }
                }
                request.send(source);
            },
        });
    },
    }
</script>

<style>

</style>