<template>
  <div>
    <h2>Login</h2>
    <div class="row">
      <div class="card mx-auto">
        <div class="card-header text-white bg-primary">
          <h4>Login</h4>
        </div>
        <div class="card-body">
          <form @submit.prevent="loginUser">
            <div class="form-group">
              <label for="username">Username</label>
              <input
                id="username"
                type="text"
                placeholder="Username"
                name="username"
                class="form-control"
                :class="{
                  'is-invalid': $v.username.$dirty && !$v.username.required,
                }"
                v-model="username"
              />
              <div class="col-sm-3">
                <small
                  id="passwordHelp"
                  class="text-danger"
                  v-if="!$v.username.required && $v.username.$dirty"
                  >Username field is required
                </small>
              </div>
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input
                type="password"
                class="form-control"
                placeholder="Password"
                name="password"
                id="password"
                :class="{
                  'is-invalid': $v.password.$dirty && !$v.password.required,
                }"
                v-model="password"
              />
              <div class="col-sm-3">
                <small
                  id="passwordHelp"
                  class="text-danger"
                  v-if="!$v.password.required && $v.password.$dirty"
                  >Password field is required
                </small>
              </div>
            </div>
            <input type="submit" class="btn btn-primary" value="Login" />
            &nbsp;&nbsp;&nbsp;&nbsp;
            <router-link to="/register" class="card-link"
              >Need and account?</router-link
            >
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
export default {
  mixins: [validationMixin],
  data() {
    return {
      username: "",
      password: "",
    };
  },
  validations: {
    username: { required },
    password: { required },
  },
  methods: {
    ...mapActions(["login"]),
    loginUser() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      let user = {
        username: this.username,
        password: this.password,
      };
      this.login(user)
        .then((res) => {
          if (res.data.success) {
            this.$router.push("/profile");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="scss">
.card {
  width: 60%;
  border-radius: 0;
}
.btn {
  border-radius: 0;
}
.form-control {
  border-radius: 0;
}
</style>
