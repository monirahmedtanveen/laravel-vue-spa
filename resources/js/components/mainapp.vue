<template>
  <div>
    <div v-if="authenticated">
      <!--========== ADMIN SIDE MENU one ========-->
      <div class="_1side_menu">
        <div class="_1side_menu_logo">
          <h3 style="text-align: center">Logo Image</h3>
          <!--<img src="/img/logo.jpg" style="width: 108px;margin-left: 68px;"/>-->
        </div>

        <!--~~~~~~~~ MENU CONTENT ~~~~~~~~-->
        <div class="_1side_menu_content">
          <div class="_1side_menu_img_name">
            <!-- <img class="_1side_menu_img" src="/pic.png" alt="" title=""> -->
            <p class="_1side_menu_name">{{ user.name }}</p>
          </div>

          <!--~~~ MENU LIST ~~~~~~-->
          <div class="_1side_menu_list">
            <ul class="_1side_menu_list_ul">
              <li>
                <router-link to="/"
                  ><Icon type="ios-speedometer" /> Dashboard</router-link
                >
              </li>
              <!-- <li>
                <router-link to="tags"
                  ><Icon type="ios-speedometer" /> Tags</router-link
                >
              </li>
              <li>
                <router-link to="categories"
                  ><Icon type="ios-speedometer" /> Category</router-link
                >
              </li> -->
              <li>
                <a href="#" @click.prevent="signOut"><Icon type="ios-speedometer" /> Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!--========== ADMIN SIDE MENU ========-->

      <!--========= HEADER ==========-->
      <div class="header">
        <div class="_2menu _box_shadow">
          <div class="_2menu_logo">
            <ul class="open_button">
              <li>
                <Icon type="ios-list" />
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!--========= HEADER ==========-->
    </div>
    <router-view />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      isLoggedIn: false,
    };
  },
  computed: {
    ...mapGetters({
      authenticated: "auth/authenticated",
      user: "auth/user",
    }),
  },
  methods: {
    ...mapActions({
      signOutAction: "auth/signOut"
    }),

    signOut() {
      this.signOutAction().then(() => {
        this.$router.replace({
          name: 'login'
        })
      })
    }
  }
};
</script>