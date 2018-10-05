<template>
  <transition name="fade">
    <div class="hello">
      <h1>{{ msg }}</h1>
      <h2>Essential Links</h2>
      <ul>
        <li>
          <router-link v-bind:to="{ name: 'Posts' }" class="add_post_link">List Posts</router-link>
        </li>
        <li>
          
          <router-link v-bind:to="{ name: 'NewPost' }" class="add_post_link">Add Post</router-link>          
        </li>
      </ul>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'hello',
    data() {
      return {
        msg: 'Welcome to Your Vue.js Demo CRUD MEVN Stack App'
      }
    },

    methods: {
      
    },
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1,
  h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #eeccee;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity .5s;
  }

  .fade-enter,
  .fade-leave-to

  /* .fade-leave-active below version 2.1.8 */
    {
    opacity: 0;
  }

</style>
