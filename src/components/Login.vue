<template>
  <div class="login">
    <!-- Modal -->
    <div
      class="modal fade"
      id="login"
      tabindex="-1"
      role="dialog"
      aria-labelledby="loginTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <a class="close-modal-class nav-link" href="#" @click="closeModal">X</a>

          <div class="modal-body">
            <ul class="nav nav-fill nav-pills mb-3" id="pills-tab" role="tablist">
              <li class="nav-item">
                <a
                  class="nav-link active"
                  id="pills-home-tab"
                  data-toggle="pill"
                  href="#pills-login"
                  role="tab"
                  aria-controls="pills-login"
                  aria-selected="true"
                >Log In</a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  id="pills-register-tab"
                  data-toggle="pill"
                  href="#pills-register"
                  role="tab"
                  aria-controls="pills-register"
                  aria-selected="false"
                >Sign Up</a>
              </li>
            </ul>

            <div class="tab-content" id="pills-tabContent">
              <div
                class="tab-pane fade show active"
                id="pills-login"
                role="tabpanel"
                aria-labelledby="pills-login-tab"
              >
                <h5 class="text-center">Log In</h5>
                <form id="login" @submit.prevent="login">
                <div class="form-group">
                  <label for="thisemail">
                    <div align="left">Email address</div>
                  </label>
                  
                  <input
                    type="email"
                    v-model="email"
                    class="form-control"
                    name="email" 
                    id="email"
                    aria-describedby="emailHelp"
                    placeholder="Enter email"
                    autocomplete="email"
                  >
                  
                  
                <small class="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div class="form-group">
                  <label for="password">Password</label>
                  <input
                    type="password"
                    @keyup.enter="login"
                    v-model="password"
                    class="form-control"
                    name="password" 
                    id="password"
                    placeholder="Password"
                    autocomplete="password"
                  >
                </div>
              
                
                <div class="form-group">
                  <button class="btn btn-primary">Log In</button>
                </div>
                </form>

              </div>
              <div
                class="tab-pane fade"
                id="pills-register"
                role="tabpanel"
                aria-labelledby="pills-register-tab"
              >
                <h5 class="text-center">Sign Up</h5>

                
                <div>
                  <form @submit.prevent="register">
                    <div class="form-group">
                      <label for="email">Email address</label>
                      <input
                        type="email"
                        v-model="email"
                        class="form-control"
                        id="2email"
                        name="email"
                        aria-describedby="emailHelp"
                        placeholder="Enter email"
                        :class="{ 'is-invalid': submitted && $v.email.$error }"
                      >
                      <div v-if="submitted && $v.email.$error" class="invalid-feedback">
                        <span v-if="!$v.email.required">Email is required</span>
                        <span v-if="!$v.email.email">Email is invalid</span>
                      </div>
                    </div>
                    <div class="form-group">
                      <label for="password">Password</label>
                      <input
                        type="password"
                        v-model="password"
                        class="form-control"
                        name="password"
                        id="2password"
                        placeholder="Password"
                        :class="{ 'is-invalid': submitted && $v.password.$error }"
                      >
                      <div v-if="submitted && $v.password.$error" class="invalid-feedback">
                        <span v-if="!$v.password.required">Password is required</span>
                        <span
                          v-else-if="!$v.password.lowCase"
                        >Password must include at least 1 lower case letter</span>
                        <span
                          v-else-if="!$v.password.upCase"
                        >Password must include at least 1 upper case letter</span>
                        <span
                          v-else-if="!$v.password.number"
                        >Password must include at least 1 number</span>
                        <span
                          v-else-if="!$v.password.minLength"
                        >Password must be at least 8 characters</span>
                      </div>
                    </div>
                    <div class="form-group">
                      <label for="confirmPassword">Confirm Password</label>
                      <input
                        type="password"
                        v-model="confirmPassword"
                        id="confirmPassword"
                        name="confirmPassword"
                        class="form-control"
                        placeholder="Confrim Password"
                        :class="{ 'is-invalid': submitted && $v.confirmPassword.$error }"
                      >
                      <div v-if="submitted && $v.confirmPassword.$error" class="invalid-feedback">
                        <span v-if="!$v.confirmPassword.required">Confirm Password is required</span>
                        <span v-else-if="!$v.confirmPassword.sameAsPassword">Passwords must match</span>
                      </div>
                    </div>

                    <div class="form-group">
                      <button class="btn btn-primary">Sign Up</button>
                    </div>
                  </form>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
    
    
    
  
  
  </div>
</template>

<script>
import { required, email, minLength, sameAs } from "vuelidate/lib/validators";
import { fb, db } from "../firebase";
import { VueReCaptcha } from 'vue-recaptcha-v3'


export default {
  name: "Login",
  props: {
    msg: String
  },
  data() {
    return {
      username:null,
      email: null,
      password: null,
      confirmPassword: null,
      submitted: false,

    };
  },
  validations: {
    email: { required, email },
    password: {
      required,
      minLength: minLength(8),
      lowCase: password => {
        return /[a-z]/.test(password);
      },
      upCase: password => {
        return /[A-Z]/.test(password);
      },
      number: password => {
        return /[0-9]/.test(password);
      }
    },
    confirmPassword: { required, sameAsPassword: sameAs("password") }
  },
  methods: {
    login() {
      fb.auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          $("#login").modal("hide");
          this.$router.replace("admin");
        })
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          if (errorCode === "auth/wrong-password") {
           // alert("Wrong password.");
            Toast.fire({
            type: "error",
            title: '<a style="color:white;">Wrong password.</>',
            background: "#000000"
          });
          } else {
            //alert(errorMessage);
            Toast.fire({
            type: "error",
            title: '<a style="color:white;">'+errorMessage+'</>',
            background: "#000000"
          });
          }
          console.log(error);
        });
    },
    closeModal() {
      $("#login").modal("hide");
    },
    register() {
      this.submitted = true;
      // stop here if form is invalid
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }

      fb.auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(user => {
          $("#login").modal("hide");
          
          db.collection("profiles")
            .doc(user.user.uid)
            .set({
              email: this.email
            })
            .then(function() {
              console.log("Document successfully written!");
            })
            .catch(function(error) {
              console.error("Error writing document: ", error);
            });
          //     this.$router.replace("admin");
          Toast.fire({
            type: "success",
            title: '<a style="color:white;">Account created successfully</>',
            background: "#000000"
          });
        })
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          if (errorCode == "auth/weak-password") {
           // alert("The password is too weak.");
            Toast.fire({
            type: "error",
            title: '<a style="color:white;">The password is too weak.</>',
            background: "#000000"
          });
          } else {
            //alert(errorMessage);
            Toast.fire({
            type: "error",
            title: '<a style="color:white;">'+errorMessage+'</>',
            background: "#000000"
          });
          }
          console.log(error);
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.close-modal-class {
  margin-left: 460px;
  max-width: 5px;
}
</style>