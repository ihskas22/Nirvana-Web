<template>
  <v-container fluid>
    <div class="my-text">
      <h1>Get ready to explore your passion</h1>

      <br />
      <h2 class="text-center">Sign Up</h2>

      <v-row>
        <v-col cols="10" offset="1">
          <v-card-text>
            <p class="text-h4 text--primary"></p>

            <v-col cols="72" sm="100" md="100">
              <v-text-field
                label="Email"
                v-model="email"
                outlined
                color="secondary"
              ></v-text-field>
              <v-text-field
                label="username"
                v-model="username"
                outlined
                color="secondary"
              ></v-text-field>
              <v-text-field
                label="password"
                type="password"
                v-model="password"
                outlined
              ></v-text-field>
              <v-text-field
                label="confirm password"
                outlined
                color="secondary"
              ></v-text-field>
            </v-col>
            <div class="text-colour">
              <a href="#">Forgot Password?</a>
            </div>
            <v-col cols="72" sm="100" md="100"></v-col>
            <br /><br />
            <v-btn
              large
              color="secondary"
              class="btn-black-text"
              width="250px"
              block
              elevation="5"
              @click="auth()"
            >
              Sign Up
            </v-btn>
            <br />
          </v-card-text>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { collection, doc, setDoc } from 'firebase/firestore';
import { db } from '@/main';


export default {
  data() {
    return {
      email: "",
      username: "",
      password: "",
    };
  },
  methods: {
    auth() {
      const data = {
        email: this.email,
        username: this.username
      }

      const auth = getAuth();
      createUserWithEmailAndPassword(auth, this.email, this.password)
      .then(() => { 
        setDoc(doc(db, "users", getAuth().currentUser.uid), data);
        this.$router.push('/home')
      }).catch(error => {
        alert(error.message)
      })
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: url("../assets/BACKG.png");
  height: 100%;

  /* Center and scale the image nicely */
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.my-text {
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
  font-size: 20px;
  font-weight: 150;
}
.text-center {
  text-align: center;
}

.login-txt {
  text-align: center;
  text-decoration: underline;
  color: #d9d9d9;
}
</style>
