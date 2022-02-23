<template>
  <div class="grey lighten-4 pa-4" style="height: 100vh">
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title class="text-body-1 font-weight-bold pa-2">
            User Management
          </v-card-title>
          <v-divider></v-divider>
          <v-data-table :headers="userHeaders" :items="users" sort-by="name">
            <template v-slot:item="{ item }">
              <tr>
                <td class="pa-2">
                  <v-avatar size="50">
                    <v-img src="file:///C:/Users/DDLD/go/src/github.com/ddld93/database/images/namuda@yahoo.com3407049837.png"></v-img
                  ></v-avatar>
                </td>
                <td>{{ item.name || item.fullName }}</td>
                <td>{{ item.phone }}</td>
                <td>{{ item.email }}</td>
                <td>{{ item.isPayment?"Paid":"Pending"}}</td>
                <td>
                  {{
                    new Date(item.createAt).toLocaleString("en-GB", {
                      hour12: true,
                    })
                  }}
                </td>
                <td>
                  <v-icon
                    color="#00a368"
                    class="mr-2"
                    @click="updateAdminDialog(item)"
                  >
                    mdi-pencil
                  </v-icon>
                  <v-icon color="red" @click="deleteAdminDialog(item)">
                    mdi-delete
                  </v-icon>
                </td>
              </tr>
            </template>
          </v-data-table>
          <!-- Dialog Add -->
          <v-dialog v-model="dialogAdd" max-width="800px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="secondary"
                dark
                fab
                class="mb-2 custom__btn"
                v-bind="attrs"
                v-on="on"
              >
                Add
              </v-btn>
            </template>
            <v-card>
              <v-card-title class="font-weight-light"
                >Add New Admin</v-card-title
              >
              <v-card-text>
                <v-container>
                  <v-form @submit.prevent ref="form">
                    <v-row>
                      <v-col cols="12">
                        <v-text-field
                          type="text"
                          prepend-icon="mdi-account"
                          hide-details="auto"
                          color="primary"
                          solo
                          v-model="newAdmin.name"
                          label="Fullname"
                          :rules="[rules.required]"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          type="text"
                          prepend-icon="mdi-phone"
                          hide-details="auto"
                          color="Phone"
                          solo
                          v-model="newAdmin.phone"
                          label="Phone"
                          :rules="[rules.required]"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          type="email"
                          prepend-icon="mdi-email"
                          hide-details="auto"
                          color="primary"
                          solo
                          v-model="newAdmin.email"
                          label="Email"
                          :rules="[rules.required, rules.email]"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          type="password"
                          prepend-icon="mdi-lock"
                          hide-details="auto"
                          color="primary"
                          solo
                          v-model="newAdmin.password"
                          label="New Password"
                          :rules="[rules.required, rules.password]"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          type="password"
                          prepend-icon="mdi-lock"
                          hide-details="auto"
                          color="primary"
                          solo
                          v-model="confirmPassword"
                          label="Confirm Password"
                          :rules="[
                            rules.required,
                            rules.password,
                            passwordConfirmationRule,
                          ]"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-form>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red" text @click="dialogAdd = false">
                  Cancel
                </v-btn>
                <v-btn color="primary" text @click="addAdmin()"> Add </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <!-- Dialog Edit -->
          <v-dialog v-model="dialogEdit" max-width="800px">
            <v-card>
              <v-card-title class="font-weight-light"
                >Edit Password</v-card-title
              >
              <v-card-text>
                <v-container>
                  <v-form @submit.prevent ref="form1">
                    <v-row>
                      <v-col cols="12">
                        <v-text-field
                          prepend-icon="mdi-account"
                          hide-details
                          color="primary"
                          solo
                          v-model="editAdmin.name"
                          label="Name"
                          disabled
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          type="password"
                          prepend-icon="mdi-lock"
                          hide-details="auto"
                          color="primary"
                          solo
                          v-model="editAdmin.oldPassword"
                          label="Old Password"
                          :rules="[rules.required, rules.password]"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          type="password"
                          prepend-icon="mdi-lock"
                          hide-details="auto"
                          color="primary"
                          solo
                          v-model="editAdmin.password"
                          label="New Password"
                          :rules="[rules.required, rules.password]"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          type="password"
                          prepend-icon="mdi-lock"
                          hide-details="auto"
                          color="primary"
                          solo
                          v-model="confirmPassword"
                          label="Confirm Password"
                          :rules="[
                            rules.required,
                            rules.password,
                            passwordConfirmationRule,
                          ]"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-form>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red" text @click="dialogEdit = false">
                  Cancel
                </v-btn>
                <v-btn color="primary" text @click="updateAdminPassword()">
                  Update
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <!-- Dialog Delete -->
          <v-dialog v-model="dialogDelete" max-width="600px">
            <v-card>
              <v-card-title class="font-weight-light"
                >Are you sure you want to delete
                {{ deleteAdmin.name }}?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red" text @click="dialogDelete = false"
                  >Cancel</v-btn
                >
                <v-btn color="primary" text @click="deleteAdminConfirm()"
                  >OK</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
// @ is an alias to /src

// import { mapGetters } from "vuex";
export default {
  components: {},
  data: () => ({
    dialogAdd: false,
    dialogEdit: false,
    dialogDelete: false,
    confirmPassword: "",
    newAdmin: {
      name: "",
      phone: "",
      email: "",
      password: "",
    },
    editAdmin: {
      id: "",
      name: "",
      oldPassword: "",
      password: "",
    },
    deleteAdmin: {
      id: "",
      name: "",
    },
    userHeaders: [
      { text: "Image" },
      { text: "Full Name", value: "name", sortable: true },
      { text: "Phone", value: "phone", sortable: false },
      { text: "email", value: "email", sortable: false },
      { text: "status", value: "state" },
      { text: "Date Joined", value: "createdAt" },
      { text: "Actions" },
    ],
    users: [],
    rules: {
      required: (v) => !!v || "Field is required",
      counter: (v) => (v && v.length >= 3) || "Minimum length is 3 characters",
      maxChar: (v) => (v && v.length <= 11) || "Max 11 characters",
      email: (value) => {
        const pattern =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || "Invalid e-mail.";
      },
      password: (value) =>
        (value && value.length >= 6) || "Minimum length is 6 characters",
    },
  }),
  computed: {
    token() {
      return this.$store.getters.getToken;
    },
    passwordConfirmationRule() {
      return () =>
        (this.newAdmin.password || this.editAdmin.password) ===
          this.confirmPassword || "Password must match";
    },
  },

  methods: {
    addAdmin() {
      if (this.$refs.form.validate()) {
        fetch("https://lexnos.unicoms.ng/api/v1/user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-token": this.token,
          },
          body: JSON.stringify(this.newAdmin),
        })
          .then((r) => r.json())
          .then((response) => {
            console.log("Response", response);
            this.fetchUsers();
            this.dialogAdd = false;
            // this.centres = response.payload;
          })
          .catch((error) => {
            console.log("Error>>>", error);
          });
      }
    },
    updateAdminDialog(data) {
      this.editAdmin.id = data._id;
      this.editAdmin.name = data.name;
      this.dialogEdit = true;
      console.log(data);
    },
    updateAdminPassword() {
      if (this.$refs.form1.validate()) {
        console.log("Edit Admin", this.editAdmin);
        fetch("https://lexnos.unicoms.ng/api/v1/user/" + this.editAdmin.id, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "x-token": this.token,
          },
          body: JSON.stringify(this.editAdmin),
        })
          .then((r) => r.json())
          .then((response) => {
            console.log("Response", response);
            this.fetchUsers();
            this.dialogEdit = false;
          })
          .catch((error) => {
            console.log("Error>>>", error);
          });
      }
    },
    deleteAdminDialog(data) {
      console.log(data)
      this.deleteAdmin.id = data.id;
      this.deleteAdmin.name = data.name;
      this.dialogDelete = true;
      console.log("Delete Admin", this.deleteAdmin.id);
    },
    deleteAdminConfirm() {
      // console.log("Deleted Admin", this.deleteAdmin);
      fetch("http://localhost:4000/api/users/delete/" + this.deleteAdmin.id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.token
        },
      })
        .then((r) => r.json())
        .then((response) => {
          console.log("Response", response);
          this.dialogDelete = false;
          this.fetchAllUsers();
          // this.dialogDelete = false;
        })
        .catch((error) => {
          console.log("Error>>>", error);
        });
    },
    fetchAllUsers() {
      fetch("http://localhost:4000/api/users/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.token,
        },
      })
        .then((r) => r.json())
        .then((response) => {
          console.log("Response", response);
          // this.userAnalytics = response;
          this.users = response
        })
        .catch((error) => {
          console.log("Error>>>", error);
        });
    },
  },
  mounted() {
    this.fetchAllUsers();
  },
};
</script>

<style lang="scss">
.custom__btn {
  position: fixed;
  bottom: 70px;
  right: 40px;
}
</style>