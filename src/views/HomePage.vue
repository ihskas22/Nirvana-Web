<template>
  <div>
    <v-container fluid class="container">
      <v-app-bar app color="secondary" dark>
        <div class="d-flex align-center">
          <v-img
            alt="Nirvana logo"
            class="shrink mr-2"
            contain
            src="@/assets/nirvanalogo.png"
            transition="scale-transition"
            width="30"
          />

          <h2>Nirvana</h2>
        </div>

        <v-spacer></v-spacer>
        <v-btn text @click="$router.push('/MySessions')">My Sessions</v-btn>
        <v-btn text @click="$router.push('/myProfilePage')">
          <v-icon size="24px"> mdi-account-circle-outline </v-icon>
        </v-btn>
      </v-app-bar>
      <Carousel></Carousel>

      <div class="txt-near-places">
        <h1>What’s happening in your city !</h1>

        <!-- displaying all sessions -->

        <v-row class="near-places-card">
          <v-col v-for="(session, index) in sessionList" :key="index">
            <v-card elevation="2" height="400" width="300">
              <v-img
                lazy-src="https://picsum.photos/id/11/10/6"
                max-height="170"
                max-width="300"
                :src="session.imageLink"
              ></v-img>

              <v-col>
                <v-row class="card-row">
                  <v-icon>
                    <template v-if=" session.eventType === 'music' "> mdi-music </template>
                    <template v-else-if="session.eventType === 'sports'"> mdi-cricket </template>
                    <template v-else-if=" session.eventType === 'photography' "> mdi-music </template>
                    <template v-else-if="session.eventType === 'petting'"> mdi-cricket </template>
                  
                  </v-icon>
                  <h2 class="card-txt">{{ session.title }}</h2>
                </v-row>
                <v-row class="card-row">
                  <v-icon color="#000">mdi-calendar-range</v-icon>
                  <h3 class="card-txt">
                    {{ session.eventDate }} - {{ session.eventTime }}
                  </h3>
                </v-row>

                <v-row class="card-row">
                  <v-icon color="#000">mdi-map-marker-radius</v-icon>
                  <h3 class="card-txt">{{ session.eventArea }}</h3>
                </v-row>
                <v-card-actions>
                  <v-btn
                    block
                    color="accent"
                    class="my-btn"
                    @click="getDetails(session.title)"
                  >
                    Get Details
                  </v-btn>
                </v-card-actions>

                <v-dialog v-model="showDialog" persistent max-width="500">
                  <v-card
                    v-for="(session, index) in getDetailsList"
                    :key="index"
                  >
                    <v-card-title>Session Details</v-card-title>
                    <v-card-text>
                      <div>Event Name: {{ session.title }}</div>
                      <div>Host Name: {{ session.fullName }}</div>
                      <div>
                        Event Description: {{ session.eventDescription }}
                      </div>
                      <div>Event Type: {{ session.eventType }}</div>

                      <div>Event Address: {{ session.eventAddress }}</div>
                      <div>Event Area: {{ session.eventArea }}</div>

                      <div>Event Date: {{ session.eventDate }}</div>
                      <div>Event Time: {{ session.eventTime }}</div>
                      <br /><br />
                      <h3>Contact Number: {{ session.phoneNumber }}</h3>
                    </v-card-text>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn text @click="closeDialogue()">Close</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-col>
            </v-card>
          </v-col>
        </v-row>
      </div>

      <div class="txt-near-places">
        <h1>Categories</h1>
        <v-row>
          <category-card
            v-on:click.native="goToCategory(index)"
            v-for="(card, index) in cards"
            :key="index"
            :image-src="card.img"
            @click="navigateToPage(card.route)"
          />
        </v-row>
      </div>
      <div class="txt-near-places">
        <h1>Top Locations</h1>
        <location-chips />
      </div>
    </v-container>
    <!-- <location-dialog /> -->
  </div>
</template>

<script>
import CategoryCard from "@/components/CategoryCard.vue";
import LocationChips from "@/components/LocationChips.vue";
import Carousel from "@/components/Carousel.vue";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/main";

export default {
  components: { CategoryCard, LocationChips, Carousel },

  async created() {
    console.log(this.sessionList);

    const querySnapshot = await getDocs(collection(db, "all_events"));

    querySnapshot.forEach((doc) => {
      this.sessionList.push(doc.data());
    });
  },

  methods: {
    goToCategory(id) {
      this.$router.push(`/categoryList/${id}`);
    },

    async getDetails(title) {
      this.showDialog = true;

      console.log(title);

      const q = query(
        collection(db, "all_events"),
        where("title", "==", title)
      );
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        this.getDetailsList.push(doc.data());
      });
    },

    closeDialogue() {
      this.showDialog = false;
      while (this.getDetailsList.length > 0) {
        this.getDetailsList.pop();
      }
    },
  },

  data() {
    return {
      showDialog: false,
      cards: [
        {
          category: "Music",
          img: require("@/assets/category-music.png"),
        },
        {
          category: "Sports and fitness",
          img: require("@/assets/category-sports.png"),
        },
        {
          category: "Photography",
          img: require("@/assets/category-photography.png"),
        },
        {
          category: "Pet Sitting",
          img: require("@/assets/category-pets.png"),
        },
      ],
      sessionList: [],
      getDetailsList: [],
    };
  },
};
</script>

<style>
.container {
  background-image: url("../assets/BACKG.png");

  /* Center and scale the image nicely */
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
.txt-near-places {
  margin: 3rem;
}

.near-places-card {
  margin: 1rem;
}

.card-row {
  margin: 1rem;
}
.card-txt {
  margin-left: 1rem;
}
</style>
