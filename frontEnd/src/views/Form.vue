<template>
  <div class="grey lighten-4 pa-4" style="min-height: 100vh">
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <v-card
            v-if="user.isPayment == true && user.isSubmitted == false"
            class="mt-4"
          >
            <v-card-title class="text-body-1 font-weight-bold pa-2">
              Application Form
            </v-card-title>
            <v-divider></v-divider>
            <v-stepper v-model="formStepper">
              <v-stepper-header class="elevation-0">
                <v-stepper-step
                  :complete="formStepper > 1"
                  step="1"
                  color="secondary"
                >
                  Personal Information
                </v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step color="secondary" step="2">
                  Declaration by Student
                </v-stepper-step>
              </v-stepper-header>
              <v-divider></v-divider>
              <v-stepper-items>
                <v-stepper-content step="1">
                  <v-row>
                    <v-col cols="6">
                      <v-row dense>
                        <v-col cols="12">
                          <v-text-field
                            prepend-inner-icon="mdi-account"
                            hide-details="auto"
                            label="Name of Applicant"
                            type="text"
                            color="primary"
                            v-model="fullName"
                          />
                        </v-col>
                        <v-col cols="12">
                          <v-radio-group v-model="program" row>
                            <v-radio
                              label="Basic Nursing"
                              value="nursing"
                              color="primary"
                            ></v-radio>
                            <v-radio
                              label="Basic Midwifery"
                              value="midwifery"
                              color="primary"
                            ></v-radio>
                          </v-radio-group>
                        </v-col>
                      </v-row>
                      <p class="mb-0">
                        How did you come to know about the college? Please tick
                        your source(s)
                      </p>
                      <v-row dense>
                        <v-col cols="3">
                          <v-checkbox
                            dense
                            v-model="source"
                            label="Friends"
                            value="friends"
                            hide-details="auto"
                          ></v-checkbox>
                        </v-col>
                        <v-col cols="3">
                          <v-checkbox
                            dense
                            v-model="source"
                            label="Relatives"
                            value="relatives"
                            hide-details="auto"
                          ></v-checkbox>
                        </v-col>
                        <v-col cols="3">
                          <v-checkbox
                            dense
                            v-model="source"
                            label="Peer Group"
                            value="peerGroup"
                            hide-details="auto"
                          ></v-checkbox>
                        </v-col>
                        <v-col cols="3">
                          <v-checkbox
                            dense
                            v-model="source"
                            label="Alumni"
                            value="alumni"
                            hide-details="auto"
                          ></v-checkbox>
                        </v-col>
                        <v-col cols="3">
                          <v-checkbox
                            dense
                            v-model="source"
                            label="Media"
                            value="media"
                            hide-details="auto"
                          ></v-checkbox>
                        </v-col>
                        <v-col cols="3">
                          <v-checkbox
                            dense
                            v-model="source"
                            label="Word of Mouth"
                            value="wordOfMouth"
                            hide-details="auto"
                          ></v-checkbox>
                        </v-col>
                        <v-col cols="3">
                          <v-checkbox
                            dense
                            v-model="source"
                            label="Website"
                            value="website"
                            hide-details="auto"
                          ></v-checkbox>
                        </v-col>
                        <v-col cols="3">
                          <v-checkbox
                            dense
                            v-model="source"
                            label="Education Fair"
                            value="educationFair"
                            hide-details="auto"
                          ></v-checkbox>
                        </v-col>
                        <v-col cols="3">
                          <v-checkbox
                            dense
                            v-model="source"
                            label="College Staff"
                            value="collegeStaff"
                            hide-details="auto"
                          ></v-checkbox>
                        </v-col>
                        <v-col cols="3">
                          <v-checkbox
                            dense
                            v-model="source"
                            label="Social Media"
                            value="socialMedia"
                            hide-details="auto"
                          ></v-checkbox>
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col cols="6">
                      <v-row dense>
                        <v-col cols="12">
                          <div class="d-flex justify-center">
                            <v-avatar size="200">
                              <img :src="imageUrlPreview" alt="Logo" />
                            </v-avatar>
                          </div>
                          <v-file-input
                            label="Upload Passport"
                            @change="Preview_image"
                            v-model="image"
                            color="primary"
                            prepend-icon="mdi-camera"
                            accept="image/*"
                            show-size
                            hide-details="auto"
                          ></v-file-input>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      @click="formStepper = 2"
                      small
                      color="primary white--text"
                      class="text-capitalize"
                    >
                      Next
                    </v-btn>
                  </v-card-actions>
                </v-stepper-content>
                <v-stepper-content step="2" class="text-body-2">
                  <div>
                    <v-icon color="success" class="mr-2">mdi-check</v-icon>
                    <span
                      >I have read the rules and regulations regarding the
                      prospective course for admission in the college.</span
                    >
                  </div>
                  <div>
                    <v-icon color="success" class="mr-2">mdi-check</v-icon>
                    <span
                      >I solely affirm that all the information in the previous
                      section(s) given by me and in enclosures are true and
                      correct. I understand that if any information furnished
                      therin is found to be untrue in material content, I shall
                      be liable to legal action and may also be expelled from
                      the college/admission may be cancelled by
                      council/college.</span
                    >
                  </div>
                  <div>
                    <v-icon color="success" class="mr-2">mdi-check</v-icon>
                    <span
                      >I understand that the Personality Enhancement
                      Programme(PEP) & Hospital Oriented Programme(HOP) is
                      essential for the enhancement of my entire personality and
                      that i shall regularly attend the programme.</span
                    >
                  </div>
                  <div>
                    <v-icon color="success" class="mr-2">mdi-check</v-icon>
                    <span
                      >I stand solely responsible for missing my classes due to
                      absenteeism. Strict disciplinary action to the extent of
                      termination from college roll sheet can be taken against
                      me if i am found violating the rules of the college.</span
                    >
                  </div>
                  <div>
                    <v-icon color="success" class="mr-2">mdi-check</v-icon>
                    <span
                      >I undertake to the tuition/hostel/other dues
                      regularly.</span
                    >
                  </div>
                  <div>
                    <v-icon color="success" class="mr-2">mdi-check</v-icon>
                    <span
                      >I commit to follow the uniform norms (dress code) of the
                      college.</span
                    >
                  </div>
                  <div>
                    <v-icon color="success" class="mr-2">mdi-check</v-icon>
                    <span
                      >I know the admission procedures clearly. I wont claim for
                      any fee refund from the college in any circumstance.</span
                    >
                  </div>
                  <div>
                    <v-icon color="success" class="mr-2">mdi-check</v-icon>
                    <span
                      >I will not do anything either inside or outside the
                      college premises that interfere with its oderly working
                      and discipline.</span
                    >
                  </div>
                  <div>
                    <v-icon color="success" class="mr-2">mdi-check</v-icon>
                    <span
                      >I declare that i have not been involved in any unfair
                      means at college examination.
                    </span>
                  </div>
                  <div>
                    <v-icon color="success" class="mr-2">mdi-check</v-icon>
                    <span
                      >I understand that if the college at anytime disqualifies
                      me for enrolment/examination, the admission given to me
                      will automatically be cancelled and i shall not hold the
                      institution responsible for the same.
                    </span>
                  </div>
                  <div>
                    <v-icon color="success" class="mr-2">mdi-check</v-icon>
                    <span
                      >I hereby declare that i have fully read aforementioned
                      rules, regulations, policy e.t.c. framed by
                      college/nursing and midwifery council of Nigeria for
                      admission and swear to abide by the same. If any kind of
                      breach is observed, it will be my whole and sole personal
                      responsibility for the same. I understand that if i leave
                      the college after joining the classes whatsoever may be
                      the reason, I will not claim for refunds of fees. All the
                      amount deposited with the institution will be forfieted.
                    </span>
                  </div>
                  <div>
                    <v-icon color="success" class="mr-2">mdi-check</v-icon>
                    <span>
                      I hereby declare that i am aware that using of mobile
                      phone within the college/hostel campuses is strictly
                      prohibited during the school hours or any
                      official/academic gathering. In case of violation of this
                      rule by me, same will be confiscated.
                    </span>
                  </div>
                  <div>
                    <v-icon color="success" class="mr-2">mdi-check</v-icon>
                    <span>
                      I understand that if my attendance falls below 90%, i will
                      not be allowed to appear for final examination of the
                      college/council examination.
                    </span>
                  </div>
                  <div>
                    <v-checkbox v-model="checkbox">
                      <template v-slot:label>
                        <span class="font-weight-bold black--text">
                          I agree with all the above terms and conditions.
                        </span>
                      </template>
                    </v-checkbox>
                  </div>
                  <v-card-actions class="mt-4">
                    <v-spacer></v-spacer>
                    <v-btn
                      :disabled="checkbox != true"
                      @click="submitForm()"
                      color="primary white--text"
                      class="text-capitalize"
                      small
                    >
                      Submit
                    </v-btn>
                    <v-btn
                      small
                      dark
                      color="red white--text"
                      class="text-capitalize"
                      @click="formStepper = 1"
                    >
                      Back
                    </v-btn>
                  </v-card-actions>
                </v-stepper-content>
              </v-stepper-items>
            </v-stepper>
          </v-card>
          <v-card
            v-else-if="user.isPayment == true && user.isSubmitted == true"
          >
            <v-card-title class="text-body-1 font-weight-bold pa-2">
              Application Summary
            </v-card-title>
            <v-card-text>
              <!-- id, userEmail, fullName, program, source, profilePic -->
              <v-row>
                <v-col cols="12">
                  <div class="d-flex justify-center">
                    <v-avatar size="200">
                      <img src="file:///C:/Users/DDLD/go/src/github.com/ddld93/database/images/namuda@yahoo.com3407049837.png" alt="Logo" />
                    </v-avatar>
                  </div>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="6">
                  <span>Email: {{ userObj.userEmail }}</span>
                  <v-divider></v-divider>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="6">
                  <span>Full Name: {{ userObj.fullName }}</span>
                  <v-divider></v-divider>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="6">
                  <span>Program: {{ userObj.program }}</span>
                  <v-divider></v-divider>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="6">
                  <span>Source: {{ userObj.source }}</span>
                  <v-divider></v-divider>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="6">
                  <span>Payment Reference: {{ this.$store.state.user.paymentInfo.Reference }}</span>
                  <v-divider></v-divider>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
          <v-card v-else>
            <v-card-title class="text-body-1 font-weight-bold pa-2">
              Instructions for Payment process, please read carefully.
            </v-card-title>
            <v-card-text>
              <ol>
                <li>
                  Please return to the dashboard and make your payment first.
                </li>
                <div>
                  <v-btn
                    to="/"
                    color="secondary"
                    small
                    class="my-2 text-capitalize"
                  >
                    Return to Dashboard
                  </v-btn>
                </div>
              </ol>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
import router from "../router/index";
// import LineChart from "../components/LineChart.vue";
export default {
  name: "Home",
  components: {
    // LineChart,
  },
  data: () => ({
    checkbox: false,
    // row: null,
    datepicker: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    // image1: null,
    imageUrlPreview: require("../assets/avatar-2.png"),
    formStepper: 1,
    paystackkey: "pk_test_69a7eba3a25ab433e46f85a7d3bec74fcf2eb55b", //paystack public key
    email: "foobar@example.com", // Customer email
    amount: 10000, // in kobo
    userPaid: false,
    userObj: {},
    // disabledCard: true,
    // paymentMade: false,
    disabled: false,
    fullName: "",
    program: "",
    source: [],
    image: null,
  }),
  computed: {
    token() {
      return this.$store.getters.getToken;
    },
    user() {
      return this.$store.getters.getUser;
    },
  },
  methods: {
    Preview_image() {
      this.imageUrlPreview = URL.createObjectURL(this.image);
    },
    submitForm() {
      const fullName = this.fullName;
      const program = this.program;
      const source = this.source;
      const image = this.image;
      const formData = new FormData();
      formData.append("image", image);
      formData.append("fullName", fullName);
      formData.append("program", program);
      formData.append("source", source);
      formData.append("userEmail", this.$store.state.user.email);
      console.log(formData);
      fetch("http://localhost:4000/newform", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + this.token,
        },
        body: formData,
      })
        .then((r) => r.json())
        .then((response) => {
          this.$toast.success(`${response.message}`);
          console.log("Response", response);
          setTimeout(() => {
            router.push("/");
            this.$store.state.user.isSubmitted = true
          }, 2000);
        })
        .catch((error) => {
          console.log("Error>>>", error);
          this.$toast.error(`${error.message}`);
        });
    },
    getUserDetails() {
      fetch(`http://localhost:4000/api/forms/form/${this.user.email}`, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + this.token,
        },
      })
        .then((r) => r.json())
        .then((response) => {
          // this.$toast.success(`${response.message}`);
          console.log(this.user.email)
          console.log("Response", response);
          response.status == "failed" && this.$toast.error(`${response.message}`);
          this.userObj = response.payload;
        })
        .catch((error) => {
          console.log("Error>>>", error);
          this.$toast.error(`${error.message}`);
        });
    },
  },
  mounted() {
    if (this.user.isPayment == true && this.user.isSubmitted == true) {
      this.getUserDetails();
    }
  },
};
</script>

<style lang="scss">
.custom__bg-home {
  min-height: 100vh;
  background: url("../assets/Sprinkle.svg");
  background-size: cover;
}
</style>