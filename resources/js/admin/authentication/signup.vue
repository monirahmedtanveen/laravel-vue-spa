<template>
  <div>
    <div class="container">
      <!--~~~~~~~ TABLE ONE ~~~~~~~~~-->
      <div
        class="_1adminOverveiw_table_recent _box_shadow _border_radious _mar_b30 _p20 col-md-4"
      >
        <div class="signup_header">
          <h1>Account Register</h1>
        </div>

        <div class="space">
          <Input v-model="data.name" type="text" placeholder="Enter Name" />
        </div>

        <div class="space">
          <Input v-model="data.email" type="text" placeholder="Enter Email" />
        </div>

        <div class="space">
          <Input
            v-model="data.password"
            type="password"
            placeholder="Enter Password"
          />
        </div>

        <div class="signup_footer">
          <Button type="primary" @click="register" :loading="isRegistering"
            >Register</Button
          >
        </div>

        <div class="_p20 col-md-12">
          <div class="footer_login_panel">
            <router-link to="login"
              ><Icon type="ios-speedometer" /> Already Have an Account? Login</router-link
            >
          </div>

          <div class="space"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isRegistering: false,
      data: {
        name: "",
        email: "",
        password: "",
      },
    };
  },
  methods: {
    async register() {
      this.isRegistering = true;
      if (this.data.name.trim() == "") {
        this.isRegistering = false;
        return this.e("Name is required.");
      }
      if (this.data.email.trim() == "") {
        this.isRegistering = false;
        return this.e("Email is required.");
      }
      if (this.data.password.trim() == "") {
        this.isRegistering = false;
        return this.e("Password is required.");
      }

      const res = await this.callApi("post", "register", this.data);
      if (res.status === 200 && res.data.code === 200) {
        if (res.data.messages) {
          for (const key in res.data.messages) {
            this.s(res.data.messages[key]);
          }
        } else {
          this.s("Account Creation Successful.");
        }
        
        this.data.name = ""
        this.data.email = ""
        this.data.password = ""
      } else {
        if (res.data.messages) {
          for (const key in res.data.messages) {
            this.e(res.data.messages[key]);
          }
        } else {
          this.swr();
        }
      }
      this.isRegistering = false;
    },
  },
};
</script>

<style scoped>
._1adminOverveiw_table_recent {
  margin: 0 auto;
  margin-top: 20%;
}
.signup_header {
  text-align: center;
  margin-bottom: 10px;
}
.signup_footer {
  text-align: center;
}
.footer_login_panel {
  text-align: left;
}
</style>