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
            Welcome New User, Register here
          </h6>
          <v-card-text class="pb-0">
            <v-form @submit.prevent ref="form">
              <v-row justify="center">
                <v-col cols="12" md="12">
                  <v-text-field
                    v-model="fullName"
                    hide-details="auto"
                    label="Full Name"
                    name="Fullname"
                    type="text"
                    color="secondary"
                    :rules="[rules.required]"
                  />
                </v-col>
                <v-col cols="12" md="12">
                  <v-text-field
                    hide-details="auto"
                    v-model="email"
                    label="Email"
                    name="Email"
                    type="text"
                    color="secondary"
                    :rules="[rules.required, rules.email]"
                  />
                </v-col>
                <v-col cols="12" md="12">
                  <v-text-field
                    v-model="phone"
                    hide-details="auto"
                    label="Phone"
                    name="Phone"
                    type="text"
                    color="secondary"
                    :rules="[rules.required]"
                  />
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    hide-details="auto"
                    v-model="password"
                    type="text"
                    label="Password"
                    color="secondary"
                    :rules="[rules.required, rules.password]"
                  />
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    hide-details="auto"
                    label="Confirm Password"
                    type="text"
                    color="secondary"
                    v-model="confirmPassword"
                    :rules="[
                      rules.required,
                      rules.password,
                      passwordConfirmationRule,
                    ]"
                  />
                </v-col>
              </v-row>
            </v-form>
            <div class="text-center mt-3">
              <v-btn
                @click="register()"
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
                >Register</v-btn
              >
            </div>
            <div class="text-center mt-2">
              <span class="black--text text-body-2"
                >Already have an account?
                <v-btn
                  small
                  text
                  color="secondary"
                  class="text-capitalize"
                  @click="goLogin()"
                  >Login Here</v-btn
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
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
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
    register() {
      const registerData = {
        fullName: this.fullName,
        email: this.email,
        password: this.confirmPassword,
        phone: this.phone,
      };
      if (this.$refs.form.validate()) {
        this.$store.dispatch("SIGN_UP", registerData);
      }
    },
    goLogin() {
      this.$router.push("/login");
    },
  },
  computed: {
    signInMetaData() {
      return this.$store.state.signIn;
    },
        passwordConfirmationRule() {
      return () =>
        this.password === this.confirmPassword || "Password must match";
    },
  },
};
</script>

<style lang="scss">
.custom__gradient-bg {
  min-height: 100vh;
  background: url("../assets/bg3.jpg");
  background-size: cover;
  // min-height: 100vh;
  // background: #C2185B;
  //  /* fallback for old browsers */
  // background: -webkit-linear-gradient(
  //   to right,
  //   #C2185B,
  //   #F06292
  // ); /* Chrome 10-25, Safari 5.1-6 */
  // background: linear-gradient(
  //   to right,
  //   #C2185B,
  //   #F06292
  // ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
.custom__gradient-button {
  background: #fd595e; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #fd595e,
    #fd595e
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #fd595e,
    #fd595e
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
</style>