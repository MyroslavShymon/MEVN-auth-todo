<template>
  <div>
    <h2>Register</h2>
    <div class="row">
      <div class="card mx-auto">
        <div class="card-header text-white bg-primary">
          <h4>Login</h4>
        </div>
        <div class="card-body">
          <form @submit.prevent="registerUser">
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
                  'is-valid': $v.username.$dirty && $v.username.required,
                }"
                v-model.trim="username"
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
              <label for="name">Name</label>
              <input
                id="name"
                type="text"
                placeholder="name"
                name="name"
                class="form-control"
                :class="{
                  'is-invalid': $v.name.$dirty && !$v.name.required,
                  'is-valid': $v.name.$dirty && $v.name.required,
                }"
                v-model.trim="name"
              />
              <div class="col-sm-3">
                <small
                  id="passwordHelp"
                  class="text-danger"
                  v-if="!$v.name.required && $v.name.$dirty"
                  >Name field is required
                </small>
              </div>
            </div>
            <div class="form-group">
              <label for="email">Email</label>
              <input
                id="email"
                type="text"
                placeholder="email"
                name="email"
                class="form-control"
                :class="{
                  'is-invalid':
                    ($v.email.$dirty && !$v.email.required) ||
                    ($v.email.$dirty && !$v.email.email),
                  'is-valid':
                    ($v.email.$dirty && $v.email.required) ||
                    ($v.email.$dirty && $v.email.email),
                }"
                v-model.trim="email"
              />
              <div class="col-sm-3">
                <small
                  id="passwordHelp"
                  class="text-danger"
                  v-if="!$v.email.required && $v.email.$dirty"
                  >Email field is required
                </small>
                <small
                  id="passwordHelp"
                  class="text-danger"
                  v-if="!$v.email.email && $v.email.$dirty"
                  >Is not email
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
                  'is-invalid':
                    ($v.password.$dirty && !$v.password.required) ||
                    ($v.password.$dirty && !$v.password.minLength),
                  'is-valid':
                    ($v.password.$dirty && $v.password.required) ||
                    ($v.password.$dirty && $v.password.minLength),
                }"
                v-model.trim="password"
              />
              <div class="col-sm-3">
                <small
                  id="passwordHelp"
                  class="text-danger"
                  v-if="!$v.password.required && $v.password.$dirty"
                  >Password field is required
                </small>
                <small
                  id="passwordHelp"
                  class="text-danger"
                  v-if="!$v.password.minLength && $v.password.$dirty"
                  >Length of password is {{ $v.password.$model.length }} of
                  {{ $v.password.$params.minLength.min }}
                </small>
              </div>
            </div>
            <div class="form-group">
              <label for="confirm_password">Confirm password</label>
              <input
                id="confirm_password"
                type="text"
                placeholder="confirm_password"
                name="confirm_password"
                class="form-control"
                :class="{
                  'is-invalid':
                    ($v.confirm_password.$dirty &&
                      !$v.confirm_password.required) ||
                    ($v.confirm_password.$dirty &&
                      !$v.confirm_password.minLength),
                  'is-valid':
                    ($v.confirm_password.$dirty &&
                      $v.confirm_password.required) ||
                    ($v.confirm_password.$dirty &&
                      $v.confirm_password.minLength),
                }"
                v-model.trim="confirm_password"
              />
              <div class="col-sm-3">
                <small
                  id="passwordHelp"
                  class="text-danger"
                  v-if="
                    !$v.confirm_password.required && $v.confirm_password.$dirty
                  "
                  >Confirm password field is required
                </small>
                <small
                  id="passwordHelp"
                  class="text-danger"
                  v-if="
                    !$v.confirm_password.minLength && $v.confirm_password.$dirty
                  "
                  >Length of confirm password is
                  {{ $v.confirm_password.$model.length }} of
                  {{ $v.confirm_password.$params.minLength.min }}
                </small>
              </div>
            </div>
            <input type="submit" class="btn btn-primary" value="Register" />
            &nbsp;&nbsp;&nbsp;&nbsp;
            <router-link to="/login" class="card-link"
              >Have an account???</router-link
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
import { email, required, minLength } from "vuelidate/lib/validators";
export default {
  mixins: [validationMixin],
  data() {
    return {
      email: "",
      password: "",
      confirm_password: "",
      name: "",
      username: "",
    };
  },
  validations: {
    email: { email, required },
    password: { required, minLength: minLength(6) },
    confirm_password: { required, minLength: minLength(6) },
    name: { required },
    username: { required },
  },
  methods: {
    ...mapActions(["register"]),
    registerUser() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      const user = {
        email: this.email,
        password: this.password,
        confirm_password: this.confirm_password,
        name: this.name,
        username: this.username,
      };
      console.log(user);
      this.register(user)
        .then((res) => {
          if (res.data.success) {
            this.$router.push("/login");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="sass" scoped></style>
