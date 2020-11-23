<template>
  <div>
    <div class="container">
      <!--~~~~~~~ TABLE ONE ~~~~~~~~~-->
      <div
        v-if="loginPanel"
        class="_1adminOverveiw_table_recent _box_shadow _border_radious _mar_b30 _p20 col-md-4"
      >
        <div class="login_header">
          <h1>Login to the dashboard</h1>
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

        <div class="login_footer">
          <Button type="primary" @click="generateOTP" :loading="isLogging"
            >Login</Button
          >
        </div>

        <div class="_p20 col-md-12">
          <div class="footer_account_creation">
            <router-link to="signup"><Icon type="ios-speedometer" /> Dont Have Account?</router-link>
          </div>

          <div class="footer_forgot_password">
            <router-link to="forgot-password"><Icon type="ios-speedometer" /> Forgot Password?</router-link>
          </div>

          <div class="space"></div>
        </div>
      </div>
      <div
        v-else
        class="_1adminOverveiw_table_recent _box_shadow _border_radious _mar_b30 _p20 col-md-4"
      >
        <div class="login_header">
          <h1>Login OTP</h1>
        </div>

        <div class="space">
          <Input v-model="data.otp" type="text" placeholder="Enter OTP" />
        </div>

        <div class="login_footer">
          <Button type="primary" @click="loginOtpVerify" :loading="isLogging"
            >Submit</Button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      loginPanel: true,
      isLogging: false,
      data: {
        email: "",
        password: "",
        otp: "",
      },
    };
  },
  methods: {
    ...mapActions({
      signIn: "auth/signIn",
    }),

    async generateOTP() {
      this.isLogging = true;
      if (this.data.email.trim() == "") {
        this.isLogging = false;
        return this.e("Email is required.");
      }
      if (this.data.password.trim() == "") {
        this.isLogging = false;
        return this.e("Password is required.");
      }

      const res = await this.callApi("post", "login/otp-generate", this.data);
      if (res.status === 200 && res.data.code === 200) {
        this.loginPanel = false;
        if (res.data.messages) {
          for (const key in res.data.messages) {
            this.s(res.data.messages[key]);
          }
        } else {
          this.s("Login OTP is sent to your email.");
        }
      } else {
        if (res.data.messages) {
          for (const key in res.data.messages) {
            this.e(res.data.messages[key]);
          }
        } else {
          this.swr();
        }
      }
      this.isLogging = false;
    },

    async loginOtpVerify() {
      this.isLogging = true;
      if (this.data.otp.trim() == "") {
        this.isLogging = false;
        return this.e("OTP is required.");
      }

      const res = await this.callApi("post", "login/otp-verify", this.data);
      if (res.status === 200 && res.data.code === 200) {
        /** VUEX SIGNIN FUNCTION FOR STORING TOKEN & USER */
        this.signIn(res.data.data).then(() => {
          this.$router.replace({
            name: "dashboard",
          });
        });
      } else {
        if (res.data.messages) {
          for (const key in res.data.messages) {
            this.e(res.data.messages[key]);
          }
        } else {
          this.swr();
        }
      }

      this.isLogging = false;
    },
  },
};
</script>

<style scoped>
._1adminOverveiw_table_recent {
  margin: 0 auto;
  margin-top: 20%;
}
.login_header {
  text-align: center;
  margin-bottom: 10px;
}
.login_footer {
  text-align: center;
}
.account_footer{
  margin-top: 10px;
  bottom: 15px;
}
.footer_account_creation {
  float: left;
  text-align: left;
}
.footer_forgot_password {
  float: right;
  text-align: right;
}
</style>