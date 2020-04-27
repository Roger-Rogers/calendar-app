<template>
  <div class="home col-8 mx-auto py-5 mt-5">
    <h1>Availability</h1>
    <div class="card">
      <div class="card-body" v-if="user">
        <h3>Hello, {{ user.name }}</h3>
        <span>{{ user.email }}</span>
      </div>
      <v-app>
      <v-row class="mx-auto py-3 mt-3">
        <v-date-picker
          class="m-4" 
          color="primary"
          v-model="date" >
        </v-date-picker>
        <v-time-picker
          class="m-4" 
          color="primary"
          v-model="time" >
        </v-time-picker>
      </v-row>
      <Calendar />
      </v-app>
    </div>
  </div>
</template>

<script>
import User from "../apis/User";
import Calendar from "../components/Calendar.vue";

export default {
  data() {
    return {
      user: null,
      date: new Date().toISOString().substr(0, 10),
      time: new Date().toISOString().substr(11,8)
    }
  },

mounted() {
    User.auth().then(response => {
      this.user = response.data;
    });
  },
  components: {
    Calendar
  }
};
</script>