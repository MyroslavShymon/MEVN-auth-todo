<template>
  <div>
    <h2>Profile</h2>
    <div class="card">
      <ul class="list-group">
        <li class="list-group-item">
          Email address:
          {{ user.email }}
        </li>
        <li class="list-group-item">
          Username:
          {{ user.username }}
        </li>
        <li class="list-group-item">
          Name:
          {{ user.name }}
        </li>
      </ul>
      <h4>Add task</h4>
      <input
        type="title"
        name=""
        id=""
        v-model.trim="title"
        :class="{
          'is-invalid': $v.title.$dirty && !$v.title.required,
        }"
      />
      <div class="col-sm-3">
        <small
          id="passwordHelp"
          class="text-danger"
          v-if="!$v.title.required && $v.title.$dirty"
          >Title field is required
        </small>
      </div>
      <button @click="addTaskClick">Add</button>
      <div>
        <ul class="list-group">
          <li
            class="list-group-item"
            v-for="(story, storyIndex) of stories.length == 0
              ? storiesLoad
              : stories"
            :key="storyIndex"
          >
            {{ storyIndex + 1 }} {{ story.title }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
export default {
  mixins: [validationMixin],
  data() {
    return {
      title: "",
    };
  },
  validations: {
    title: { required },
  },
  computed: mapGetters(["user", "stories", "storiesLoad"]),
  methods: {
    ...mapActions(["getProfile", "addTask"]),
    addTaskClick() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      const profile = {
        title: this.title,
        username: this.user.username,
      };
      this.addTask(profile).catch((err) => {
        console.log(err);
      });
    },
  },
  created() {
    this.getProfile();
  },
};
</script>

<style lang="sass" scoped></style>
