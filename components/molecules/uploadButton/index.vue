
<template>
  <div>
    <v-btn @click.native="selectFile" v-if="!uploadEnd && !uploading">
      <slot></slot>
    </v-btn>
    <input
      id="files"
      type="file"
      name="file"
      ref="uploadInput"
      accept="image/*"
      :multiple="false"
      @change="detectFiles($event)"
    >
    <v-progress-linear
      v-if="uploading && !uploadEnd"
      :size="100"
      :width="15"
      :rotate="360"
      :value="progressUpload"
      color="primary"
    >%</v-progress-linear>
    <div v-if="uploadEnd">
      <v-btn class="ma-0" dark small color="error" @click="deleteImage()">Delete</v-btn>
    </div>
  </div>
</template>

<script>
//
// Firebase upload component
// Original from: https://lovemewithoutall.github.io/it/vue-image-upload-to-firestorage/
//

// Thanks Marcelo Forclaz(https://github.com/CristalT) https://gist.github.com/CristalT/2651023cfa2f36cddd119fd979581893
// Thanks Matteo Leoni(https://github.com/signalkuppe) https://github.com/signalkuppe/vuetify-cloudinary-upload/blob/master/src/components/v-cloudinary-upload.vue

import firebase from '~/utils/firebase'
const firestorage = firebase.storage()

export default {
  name: 'uploadImage',
  props: {
    actionName: {
      default: '',
      type: String,
      required: true
    }
  },
  data() {
    return {
      progressUpload: 0,
      fileName: '',
      uploadTask: '',
      uploading: false,
      uploadEnd: false,
      downloadURL: ''
    }
  },
  methods: {
    selectFile() {
      this.$refs.uploadInput.click()
    },
    detectFiles(e) {
      let fileList = e.target.files || e.dataTransfer.files
      Array.from(Array(fileList.length).keys()).map(x => {
        this.upload(fileList[x])
      })
    },
    upload(file) {
      this.fileName = file.name
      this.uploading = true
      this.uploadTask = firestorage
        .ref(`images/${this.generateUUID()}/${file.name}`)
        .put(file)
    },
    deleteImage() {
      this.progressUpload = 0
      this.fileName = ''
      this.uploading = false
      this.uploadEnd = false
      this.downloadURL = ''
      this.$store.commit(this.actionName, '')
      this.query = false
    },
    generateUUID: function() {
      // https://stackoverflow.com/a/2117523/2711443
      return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (
          c ^
          (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
        ).toString(16)
      )
    }
  },
  watch: {
    uploadTask: function() {
      this.uploadTask.on(
        'state_changed',
        sp => {
          this.progressUpload = Math.floor(
            (sp.bytesTransferred / sp.totalBytes) * 100
          )
        },
        null,
        () => {
          this.uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
            this.uploadEnd = true
            this.downloadURL = downloadURL
            this.$store.dispatch(this.actionName, downloadURL)
            this.$store.commit('imageURL', downloadURL)
            this.$emit('downloadURL', downloadURL)
          })
        }
      )
    }
  }
}
</script>

<style>
.progress-bar {
  margin: 10px 0;
}
input[type='file'] {
  position: absolute;
  clip: rect(0, 0, 0, 0);
}
</style>
