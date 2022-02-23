<template>
  <div class="grey lighten-4 pa-4" style="height: 100vh">
    <v-row>
      <!-- Line Chart -->
      <v-col cols="12" sm="12" md="9">
        <v-card outlined tile class="custom__card">
          <v-card-title class="pa-2">
            <div class="d-flex align-center">
              <span class="lstick ml-n2 red"></span>
              <div class="ml-4 mr-1">
                <h5 class="subtitle-1">User Registrations over time</h5>
                <h2
                  class="font-weight-regular body-2 grey--text text--darken-2"
                >
                  Year 2021
                </h2>
              </div>
            </div>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text class="">
            <line-chart
              :chartdata="lineChartData"
              :options="lineChartOptions"
            />
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="12" md="3" align-self="center">
        <v-row>
          <v-col cols="12">
            <v-card color="secondary">
              <v-card-title class="text-body-1 font-weight-light white--text">
                Total Users
              </v-card-title>
              <v-card-text class="text-h6">
                <v-icon color="white" class="mr-2">mdi-account-group</v-icon>
                <span class="white--text">{{ userAnalytics.total }}</span>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12">
            <v-card>
              <v-card-title class="text-body-1 font-weight-light">
                User Payment (Completed)
              </v-card-title>
              <v-card-text class="text-h6">
                <v-icon color="secondary" class="mr-2">mdi-account</v-icon>
                <span
                  >{{ userAnalytics.totalPaid }} /
                  {{ userAnalytics.total }}</span
                >
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12">
            <v-card>
              <v-card-title class="text-body-1 font-weight-light">
                User Payment (Pending)
              </v-card-title>
              <v-card-text class="text-h6">
                <v-icon color="secondary" class="mr-2">mdi-account</v-icon>
                <span
                  >{{ userAnalytics.pending}}</span
                >
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12">
            <v-card>
              <v-card-title class="text-body-1 font-weight-light">
                Users Online
              </v-card-title>
              <v-card-text class="text-h6">
                <v-icon color="secondary" class="mr-2"
                  >mdi-account-group</v-icon
                >
                <span>{{this.online}}</span>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <!-- <v-row>
      <v-col cols="12">
        <v-card>
          <v-data-table :headers="userHeaders" :items="users" sort-by="name">
            <template v-slot:top>
              <v-toolbar flat>
                <v-toolbar-title>Registered Users</v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
              </v-toolbar>
            </template>
            <template v-slot:item="{ item }">
              <tr>
                <td class="pa-2">
                  <v-avatar size="50">
                    <v-img :src="item.image"></v-img
                  ></v-avatar>
                </td>
                <td>{{ item.name }}</td>
                <td>{{ item.phone }}</td>
                <td>{{ item.email }}</td>
                <td>{{ item.nin }}</td>
                <td>{{ item.state.toLowerCase() }}</td>
                <td>{{ item.lga.toLowerCase() }}</td>
                <td>{{ item.address }}</td>
                <td>
                  <div>{{ item.latitude }},</div>
                  <div>{{ item.longitude }}</div>
                </td>
                <td>
                  {{
                    new Date(item.createdAt).toLocaleString("en-GB", {
                      hour12: true,
                    })
                  }}
                </td>
                <td>
                  <v-icon color="blue" class="mr-2" @click="viewLocation(item)">
                    mdi-eye
                  </v-icon>
                </td>
              </tr>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row> -->
  </div>
</template>

<script>
// @ is an alias to /src

import LineChart from "../components/LineChart.vue";
export default {
  name: "Home",
  components: {
    LineChart,
  },
  data: () => ({
    lineChartData: {
      labels: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      datasets: [
        {
          label: "No of Registrations",
          borderColor: "#FD595E",
          backgroundColor: "transparent",
          data: [0, 150, 110, 240, 200, 200, 300, 200, 380, 300, 400, 380],
        },
      ],
    },
    lineChartOptions: {
      responsive: true,
      maintainAspectRatio: false,
      fill: true,
    },
    userHeaders: [
      { text: "Image", value: "image" },
      { text: "Full Name", value: "name", sortable: true },
      { text: "Phone", value: "phone", sortable: false },
      { text: "Email", value: "email", sortable: false },
      { text: "Nin", value: "nin", sortable: false },
      { text: "State", value: "state" },
      { text: "LGA", value: "lga" },
      { text: "Address", value: "address" },
      { text: "Lat/Lng" },
      { text: "Date Joined", value: "createdAt" },
      { text: "locate" },
    ],
    users: [],
    userAnalytics: {},
  }),
  computed: {
    token() {
      return this.$store.getters.getToken;
    },
    online() {
      return this.$store.getters.getOnline;
    },

  },
  methods: {
    viewLocation(item) {
      console.log("Item", item);
      this.$router.push("/view/" + item._id);
    },
    fetchAnalytics() {
      fetch("http://localhost:4000/api/users/analytics", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.token,
        },
      })
        .then((r) => r.json())
        .then((response) => {
          console.log("Response", response);
          this.userAnalytics = response;
          // this.centres = response.payload;
        })
        .catch((error) => {
          console.log("Error>>>", error);
        });
    },
    // fetchAllUsers() {
    //   fetch("http://18.222.126.74/api/v1/auth/users", {
    //     method: "GET",
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: "Bearer " + this.token,
    //     },
    //   })
    //     .then((r) => r.json())
    //     .then((response) => {
    //       console.log("Response", response);
    //       // this.userAnalytics = response;
    //       // this.centres = response.payload;
    //     })
    //     .catch((error) => {
    //       console.log("Error>>>", error);
    //     });
    // },
  },
  mounted() {
    this.fetchAnalytics();
    // this.fetchAllUsers();
  },
};
</script>

<style lang="scss">
.custom__card-bg-admin {
  background: url("../assets/Sprinkle.svg");
  background-size: cover;
}
</style>