

<template>
  <div>
    <form class="w-full max-w-lg" @submit.prevent="updateFirebase" @input="fieldUpdate">
      <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="grid-first-name"
          >First Name</label>
          <input
            class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="grid-first-name"
            type="text"
            placeholder="Jane"
            v-model="formData.firstName"
          />
        </div>
        <div class="w-full md:w-1/2 px-3">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="grid-last-name"
          >Last Name</label>
          <input
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-last-name"
            type="text"
            placeholder="Doe"
            v-model="formData.lastName"
          />
        </div>
      </div>
      <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full px-3">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="grid-password"
          >Password</label>
          <input
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-password"
            type="password"
            placeholder="******************"
            v-model="formData.password"
          />
       
        </div>
      </div>
      <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full px-3">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="grid-city"
          >City</label>
          <input
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-city"
            type="text"
            placeholder="Albuquerque"
            v-model="formData.city"
          />
        </div>
        <div class="w-full px-3" v-bind:style="{marginTop: '10px'}">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="grid-state"
          >State</label>
          <input
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-state"
            type="text"
            placeholder="State"
            v-model="formData.select"
          />
        </div>
      </div>
      <div class="btn">
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          @click="revertToOriginal"
        >Reset</button>
      </div>
      <div>{{dataKey}}</div>
      <div v-if="state === 'synced'">Form is saved</div>
      <div v-if="state === 'error'">Failed to save {{errorMessage}}</div>
      <div v-if="state === 'loading'">Loading...</div>
    </form>
  </div>
</template>



<script>
import { db } from "../components/firebase";
import { debounce } from "debounce";

const documentPath = "contacts/mncxjPCBxpoW48DFpCF4";

export default {
  data() {
    return {
      firebaseData: null,
      formData: {},
      state: "loading",
      errorMessage: "",
      originalData: null,
      dataKey: ""
    };
  },
  firestore() {
    return {
      firebaseData: db.doc(documentPath)
    };
  },

  methods: {
    async updateFirebase() {
      try {
        await db.doc(documentPath).set(this.formData);
        this.state = "synced";
      } catch (error) {
        this.errorMessage = JSON.stringify(error);
        this.state = "error";
      }

      let array = [];

      array.push(this.formData);
      array.forEach(i => {
        let dataKey = Object.values(i);

        if (dataKey.length > 0) {
          this.dataKey = dataKey.length * 20 + '%';
        }
      });
    },
    fieldUpdate() {
      this.state = "modified";
      this.debounceUpdate();
    },
    debounceUpdate: debounce(function() {
      this.updateFirebase();
    }, 1500),
    revertToOriginal() {
      this.state = "revorked";
      this.formData = { ...this.originalData };
      this.dataKey = '';
    }
  },

  created: async function() {
    const docRef = db.doc(documentPath);
    let data = (await docRef.get()).data();
    if (!data) {
      data = {
        firstName: "wefwef",
        lastName: "",
        password: "",
        city: "",
        select: "",
        zip: ""
      };
      docRef.set(data);
    }
    this.formData = data;
    this.originalData = { ...data };
    this.state = "synced";
  }
};
</script>