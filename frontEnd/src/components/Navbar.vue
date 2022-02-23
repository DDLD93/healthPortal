<template>
  <nav>
    <!-- color="#00a368" -->
    <v-app-bar app dense flat color="white">
      <v-app-bar-nav-icon
        dark
        small
        tile
        @click="drawer = !drawer"
        class="secondary pa-1 mx-1"
        style="border-radius: 10%"
      ></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <div>
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn small icon class="mx-2" v-on="on" v-bind="attrs">
              <v-badge content="7" color="red" dot overlap>
                <v-icon color="grey">mdi-bell</v-icon>
              </v-badge>
            </v-btn>
          </template>
          <v-card
            width="350"
            class="mx-auto cutom__card--overflow"
            max-height="400"
          >
            <v-card-title primary-title> Notifications </v-card-title>

            <v-list class="grey lighten-4">
              <v-list-item-subtitle class="ml-3">
                Earlier
              </v-list-item-subtitle>

              <v-list-item
                v-for="message in messages"
                :key="message.title"
                to=""
              >
                <v-avatar>
                  <img src="../assets/avatar-1.jpg" alt="alt" class="mr-2" />
                </v-avatar>

                <v-list-item-content>
                  <v-list-item-title>{{ message.title }}</v-list-item-title>
                  <v-list-item-subtitle>{{
                    message.tile
                  }}</v-list-item-subtitle>
                  <v-divider></v-divider>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card>
        </v-menu>

        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" v-on="on" rounded icon>
              <v-list-item-avatar color="grey" class="ml-4">
                <v-img src="../assets/avatar-1.jpg"></v-img>
              </v-list-item-avatar>
            </v-btn>
          </template>
          <span>Profile</span>
        </v-tooltip>
      </div>
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      dark
      app
      color="secondary"
      mini-variant
      mini-variant-width="150"
    >
      <v-layout column align-center>
        <v-flex class="mt-6 mb-4 d-flex align-center">
          <div class="text-center">
            <v-avatar size="75">
              <img src="../assets/nafisatu.png" alt="Logo" />
            </v-avatar>
          </div>
        </v-flex>
      </v-layout>
      <v-divider></v-divider>
      <v-list>
        <v-list-item
          active-class="border"
          v-for="link in links"
          :key="link.icon"
          :to="link.route"
        >
          <!-- <v-list-item-action>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-item-action> -->
          <v-list-item-content>
            <v-icon>{{ link.icon }}</v-icon>
            <v-list-item-subtitle align="center">{{
              link.text
            }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <!-- <div class="d-flex justify-center mb-2">
        <v-btn outlined small dark color="white" class="py-4 text-capitalize">
          <span>Download <br> Form</span>
        </v-btn>
      </div> -->
      <!-- <v-list-group sub-group color="white" class="ml-n4">
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title class="ml-4"
              >Notification Centre</v-list-item-title
            >
          </v-list-item-content>
        </template>

        <v-list-item
          v-for="(element, index) in notifications"
          :key="index"
          :to="element.route"
          color="white"
          active-class="border"
        >
          <v-list-item-icon>
            <v-icon>{{ element.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{ element.text }}</v-list-item-title>
        </v-list-item>
      </v-list-group> -->
      <v-divider></v-divider>

      <template v-slot:append>
        <div class="pa-2 d-flex justify-center">
          <v-btn outlined dark small color="white" @click="logOut()">
            <span>Logout</span>
            <v-icon>mdi-exit-to-app</v-icon>
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
  </nav>
</template>

<script>
export default {
  data: () => ({
    user: JSON.parse(localStorage.getItem("user")),
    drawer: true,
    links: [
      { icon: "mdi-chart-box-outline", text: "Dashboard", route: "/" },
      { icon: "mdi-form-select", text: "Application form", route: "/form" },
      { icon: "mdi-desktop-mac-dashboard", text: "Admin Dashboard", route: "/admin" },
      { icon: "mdi-account", text: "User Management", route: "/user" },
      // {
      //   icon: "mdi-map-outline",
      //   text: "Centre Manager",
      //   route: "/centremanager",
      // },
    ],
    notifications: [
      // {
      //   icon: "mdi-inbox-arrow-down",
      //   text: "Inbox",
      //   route: "/notificationinbox",
      // },
      // {
      //   icon: "mdi-inbox-arrow-up",
      //   text: "Outbox",
      //   route: "/notificationoutbox",
      // },
    ],

    messages: [
      {
        title: "umar abubakar",
        subtitle: "hi",
        tile: "mention you",
        avatar: "mdi-user",
      },

      { title: "musa abubakar", subtitle: "hi", tile: "mention you" },
      { title: "usman murtala", subtitle: "hi", tile: "mention you" },
      { title: "abba kabir", subtitle: "hello", tile: "mention you" },
      { title: "aliyu ibrahim", subtitle: "hello", tile: "mention you" },
      { title: "mubarak ", subtitle: "hi", tile: "mention you" },
      { title: "abubakar", subtitle: "hi", tile: "mention you" },
    ],
    offset: true,
  }),
  methods: {
    logOut() {
      this.$store.dispatch("SIGN_OUT");
    },
  },
  computed: {},
};
</script>

<style scoped>
.border {
  border-left: 4px solid #c2185b;
}
::-webkit-scrollbar {
  width: 10px;
}
::-webkit-scrollbar-track {
  background: #bdbdbd;
}
::-webkit-scrollbar-thumb {
  background: rgb(170, 170, 170);
}
.custom__research--item {
  padding-left: 84px !important;
}
</style>
