<template>
  <div>
    <div class="container">
      <!--~~~~~~~ TABLE ONE ~~~~~~~~~-->
      <div
        v-if="forgotPasswordPanel"
        class="_1adminOverveiw_table_recent _box_shadow _border_radious _mar_b30 _p20 col-md-4"
      >
        <div class="forgot_password_header">
          <h1>Forgot Password</h1>
        </div>

        <div class="space">
          <Input v-model="data.email" type="text" placeholder="Enter Email" />
        </div>

        <div class="forgot_password_footer">
          <Button type="primary" @click="generateOTP" :loading="isUpdating"
            >Submit</Button
          >
        </div>

        <div class="_p20 col-md-12">
          <div class="footer_login_panel">
            <router-link to="login"
              ><Icon type="ios-speedometer" /> Go back to Login</router-link
            >
          </div>

          <div class="space"></div>
        </div>
      </div>
      <div
        v-else
        class="_1adminOverveiw_table_recent _box_shadow _border_radious _mar_b30 _p20 col-md-4"
      >
        <div class="forgot_password_header">
          <h1>Forgot Password OTP</h1>
        </div>

        <div class="space">
          <Input
            v-model="data.password"
            type="password"
            placeholder="Enter Password"
          />
        </div>

        <div class="space">
          <Input
            v-model="data.password_confirmation"
            type="password"
            placeholder="Confirm Password"
          />
        </div>

        <div class="space">
          <Input v-model="data.otp" type="text" placeholder="Enter OTP" />
        </div>

        <div class="forgot_password_footer">
          <Button type="primary" @click="forgotPasswordOtpVerify" :loading="isUpdating"
            >Submit</Button
          >
        </div>

        <div class="_p20 col-md-12">
          <div class="footer_login_panel">
            <router-link to="login"
              ><Icon type="ios-speedometer" /> Go back to Login</router-link
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
      forgotPasswordPanel: true,
      isUpdating: false,
      data: {
        email: "",
        password: "",
        password_confirmation: "",
        otp: "",
      },
    };
  },
  methods: {
    async generateOTP() {
      this.isUpdating = true;
      if (this.data.email.trim() == "") {
        this.isUpdating = false;
        return this.e("Email is required.");
      }

      const res = await this.callApi(
        "post",
        "forgot-password/otp-generate",
        this.data
      );
      if (res.status === 200 && res.data.code === 200) {
        this.forgotPasswordPanel = false;
        if (res.data.messages) {
          for (const key in res.data.messages) {
            this.s(res.data.messages[key]);
          }
        } else {
          this.s("Forgot password OTP is sent to your email.");
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
      this.isUpdating = false;
    },

    async forgotPasswordOtpVerify() {
      this.isUpdating = true;
      if (this.data.password.trim() == "") {
        this.isUpdating = false;
        return this.e("Password is required.");
      }
      if (this.data.password_confirmation.trim() == "") {
        this.isUpdating = false;
        return this.e("Confirm password is required.");
      }
      if (this.data.otp.trim() == "") {
        this.isUpdating = false;
        return this.e("OTP is required.");
      }

      const res = await this.callApi(
        "post",
        "forgot-password/otp-verify",
        this.data
      );
      if (res.status === 200 && res.data.code === 200) {
        if (res.data.messages) {
          for (const key in res.data.messages) {
            this.s(res.data.messages[key]);
          }
        } else {
          this.s("Your password is updated successfully.");
        }

        this.$router.replace({
          name: "login",
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

      this.isUpdating = false;
    },
  },
};
</script>

<style scoped>
._1adminOverveiw_table_recent {
  margin: 0 auto;
  margin-top: 20%;
}
.forgot_password_header {
  text-align: center;
  margin-bottom: 10px;
}
.forgot_password_footer {
  text-align: center;
}
.footer_login_panel {
  text-align: left;
}
</style>