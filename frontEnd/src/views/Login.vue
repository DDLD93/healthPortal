<template>
  <v-main class="custom__gradient-bg">
    <v-container fill-height fluid>
      <v-row align="center" justify="center">
        <v-card width="450px" class="pa-6" flat>
          <div class="text-center">
            <img
              width="100"
              height="auto"
              src="../assets/nafisatu.png"
              alt="Logo"
            />
          </div>
          <h2 class="text-center">
            <span class="text-body-2 font-weight-light black--text"
              ><span class="font-weight-bold"
                >Nafisatu College of Nursing & Midwifery, Kwankwaso
              </span>
            </span>
          </h2>
          <h6 class="text-center secondary--text text-body-2 font-weight-bold">
            Welcome Back, Please Login...
          </h6>
          <v-card-text class="pb-0">
            <v-form @submit.prevent ref="form">
              <v-row justify="center">
                <v-col cols="12" md="12">
                  <v-text-field
                    hide-details="auto"
                    v-model="email"
                    class="mt-4"
                    label="Email"
                    name="Email"
                    type="text"
                    color="secondary"
                    :rules="[rules.required, rules.email]"
                  />
                </v-col>
                <v-col cols="12" md="12">
                  <v-text-field
                    hide-details="auto"
                    v-model="password"
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="showPassword ? 'text' : 'password'"
                    label="Password"
                    name="password"
                    color="secondary"
                    @click:append="showPassword = !showPassword"
                    :rules="[rules.required, rules.password]"
                  />
                </v-col>
              </v-row>
            </v-form>
            <div class="text-center mt-3">
              <v-btn
                @click="signIn()"
                :loading="signInMetaData.signInLoading"
                :disabled="signInMetaData.signInDisabled"
                block
                rounded
                class="
                  text-capitalize
                  white--text
                  mt-10
                  custom__gradient-button
                "
                >Sign In</v-btn
              >
            </div>
            <div class="text-center mt-2">
              <span class="black--text text-body-2"
                >New User?
                <v-btn
                  small
                  text
                  color="secondary"
                  class="text-capitalize"
                  @click="goRegister()"
                  >Register Here</v-btn
                ></span
              >
            </div>
          </v-card-text>
        </v-card>
      </v-row>
      <v-snackbar
        bottom
        color="warning"
        timeout="5000"
        v-model="signInMetaData.signInErrorSnackbar"
      >
        {{ signInMetaData.signInErrorPayload }}
      </v-snackbar>
    </v-container>
  </v-main>
</template>

<script>
export default {
  data: () => ({
    email: "",
    password: "",
    showPassword: "",
    loading: false,
    disabled: false,
    rules: {
      required: (v) => !!v || "Field is required",
      counter: (v) => (v && v.length >= 3) || "Minimum length is 3 characters",
      email: (value) => {
        const pattern =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || "Invalid e-mail.";
      },
      password: (value) =>
        (value && value.length >= 6) || "Minimum length is 6 characters",
    },
  }),
  methods: {
    signIn() {
      const signInData = {
        email: this.email,
        password: this.password,
      };
      if (this.$refs.form.validate()) {
        this.$store.dispatch("SIGN_IN", signInData);
      }
    },
    goRegister() {
      this.$router.push("/register");
    },
  },
  computed: {
    signInMetaData() {
      return this.$store.state.signIn;
    },
  },
};
</script>

<style lang="scss">
.custom__gradient-bg {
  min-height: 100vh;
  background: url('../assets/bg3.jpg');
  background-size: cover;
  // background: -webkit-linear-gradient(
  //   to right,
  //   #C2185B,
  //   #F06292
  // );
  // background: linear-gradient(
  //   to right,
  //   #C2185B,
  //   #F06292
  // );
}
.custom__gradient-button {
  background: #FD595E; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #FD595E,
    #FD595E
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #FD595E,
    #FD595E
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
</style>