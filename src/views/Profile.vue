<template>
  <div class="products">
      <div class="container">
          
        <div class="intro h-100">
            <div class="row h-100 align-items-center">
              <div class="col-md-6 ml-3">
                    <h3>Profile settings</h3>
                    
                 <p>
                   Change your profile settings here
                 </p>
              </div>
              <div class="col-md-5">
                  <img src="/img/svg/profile.svg" width="400" alt="" class="img-fluid">
              </div>
            </div>
          </div>
          

          <div class="profile-content">

          <ul class="nav nav-pills ml-3" id="myTab" role="tablist">

            <li class="nav-item">
              <a class="nav-link active" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="true">Profile</a>
            </li>

            <li class="nav-item">
              <a class="nav-link"  id="account-tab" data-toggle="tab" href="#account" role="tab" aria-controls="account" aria-selected="false">Account settings</a>
            </li>
           
          </ul>
            
            <div class="tab-content" id="myTabContent">
                <div class="tab-pane fade show active pt-3" id="profile" role="tabpanel" aria-labelledby="profile-tab">

                  <div class="container">
                      <div class="row">
                        
                        <div class="col-md-4">
                          <div class="form-group">
                            <input type="text" name="" v-model="profile.first" placeholder="First name" class="form-control">
                          </div>
                        </div>

                        <div class="col-md-4">
                          <div class="form-group">
                            <input type="text" name="" v-model="profile.last" placeholder="Last name" class="form-control">
                          </div>
                        </div>

                        <div class="col-md-4">
                          <div class="form-group">
                            <input type="text"  v-model="profile.phone" placeholder="Phone" class="form-control">
                          </div>
                        </div>

                        <div class="col-md-12">
                          <div class="form-group">
                            <input type="text"  v-model="profile.address" placeholder="Address" class="form-control">
                          </div>
                        </div>

                        <div class="col-md-12">
                          <select v-model="selectedCountry" class="form-control form-group">
                              <option :value="null" hidden v-if="profile.country == null">Select a Country</option>
                              <option :value="null" hidden default>{{profile.country}}</option>
                              <option v-for="(country_obj, country) in places" :value="country" :key="country">{{places[country].name}}</option>
                          </select>
                        </div>

                        <div class="col-md-6">
                          <select name="myState" :disabled="countries && countries.length == 0" v-model="selectedState" class="form-control form-group">
                              <option :value="selectedState" hidden v-if="profile.state == null && selectedState == ''">Select a State</option>
                              <option v-else default>{{profile.state}}</option>
                              <option v-for="(state_obj, state) in countries"  :key="state">{{ state }}</option>
                          </select>
                        </div>

                        <div class="col-md-6">
                            <select id="myCity" :disabled="cities && cities.length == 0" v-model="selectedCity" class="form-control form-group">
                                <option :value="selectedCity" hidden v-if="profile.city == null && selectedCity == ''">Select a City</option>
                                <option v-else default>{{profile.city}}</option>
                                <option v-for="city in cities" :key="city">{{city}}</option>
                            </select>
                        </div>

                        <div class="col-md-8">
                          <div class="form-group">
                            <input type="text"  v-model="profile.postCode" placeholder="Postcode" class="form-control">
                          </div>
                        </div>

                        <div class="col-md-4">
                          <div class="form-group">
                              <input type="submit" @click="updateProfile" value="Save Changes" class="btn btn-primary w-100">
                          </div>
                        </div>

                      </div>
                  </div>
                
                </div>

                <div class="tab-pane fade pt-3" id="account" role="tabpanel" aria-labelledby="account-tab">
                  <div class="container">
                      <div class="row">
                        <div class="col-md-">
                            <div class="alert alert-info">
                              Please use the Reset password email button for reseting the password. The form doens't work currently
                            </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <input type="text"  v-model="account.name" placeholder="User name" class="form-control">
                          </div>
                        </div>

                        <div class="col-md-6">
                          <div class="form-group">
                            <input type="text"  v-model="account.email" placeholder="Email address" class="form-control">
                          </div>
                        </div>

                        <div class="col-md-6">
                          <div class="form-group">
                            <input type="text"  v-model="account.password" placeholder="New password" class="form-control">
                          </div>
                        </div>

                        <div class="col-md-6">
                          <div class="form-group">
                            <input type="text" v-model="account.confirmPassword"  placeholder="Confirm password" class="form-control">
                          </div>
                        </div>

                        <div class="col-md-4">
                          <div class="form-group">
                              <input type="file" @change="uploadImage" class="form-control">
                           </div>
                        </div>

                        <div class="col-md-4">
                          <div class="form-group">
                              <input type="submit" value="Save Changes" class="btn btn-primary w-100">
                          </div>
                        </div>

                        <div class="col-md-4">
                          <div class="form-group">
                              <input type="button" @click="resetPassword" value="Reset password email" class="btn btn-success w-100">
                          </div>
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
import { VueEditor } from "vue2-editor";
import { fb, db} from '../firebase';
import { setImmediate } from 'timers';

export default {
  name: "profile",
  components: {
    VueEditor
  },
  props: {
    msg: String
  },
  data(){
    return {
        profile: {
          name:null,
          first:null,
          last:null,
          phone:null,
          address:null,
          postcode:null
        },
        account:{
            name:null,
            email:null,
            photoUrl:null,
            emailVerified:null,
            password:null,
            confirmPassword:null,
            uid:null
        }, 
        places: [],
        countries: [],
        cities: [],
        name: null,
        country: null,
        state: null,
        city: null,
        states: null,
        selectedCountry: null,
        selectedState: '',
        selectedCity: '',
    }
  },

  created() {
        var _this = this;
        $.getJSON('https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master/countries+states+cities.json', function (json) {
            _this.places = json; 
        });
  },
  firestore(){
      const user = fb.auth().currentUser;
      return {
        profile: db.collection('profiles').doc(user.uid),
      }
  },
  methods:{
      resetPassword(){
          const auth = fb.auth();          
          auth.sendPasswordResetEmail(auth.currentUser.email).then(() =>  {
               Toast.fire({
                type: 'success',
                title: 'Email sent'
              })
          }).catch((error) =>  {
              console.log(error);
          });
      },
      updateProfile(){
          this.profile.country = this.places[this.selectedCountry].name
          this.profile.state = this.selectedState
          this.profile.city = this.selectedCity

          this.$firestore.profile.update(this.profile);
      },
      uploadImage(){},
        
  },
  watch: {
        selectedCountry(country) {
            // Clear previously selected values
            
            this.countries = [];
            this.cities = [];
            this.selectedState = "";
            this.selectedCity = "";
            this.profile.state = null
            this.profile.city = null
            // Populate list of States in the second dropdown
            if(this.places[country].name) {
            //    this.countries = this.places[this.selectedContinent] 
                this.countries = this.places[country].states
            }  
        },
        selectedState(state) {
            // Clear previously selected values 
            this.cities = [];
            this.selectedCity = "";
            this.profile.city = null
            // Populate list of cities in the third dropdown
            if (state) {
                this.cities = this.countries[state]
            } 
        },
        
    },
    
    
        
   


  
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.dropdown {
    margin: 10px 0;
    padding: 10px 0;
    border-bottom: 1px solid #DDD;
}

.dropdown span {
    display:inline-block;
    width: 80px;
}
.text-muted {
  color: #ddd
}

</style>