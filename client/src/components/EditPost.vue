<template>
  <transition name="fade">
  
    <div id="app">

      <div class="row">

        <div class="col-sm-3"></div>

        <div class="col-sm-6">

          <form @submit.prevent="handleSubmit">

            <div>
              <!-- <input type="text" name="title" placeholder="TITLE" v-model="title"> -->
              <div class="form-group">
                <label for="title">First Name</label>
                <input type="text" v-model="form.title" v-validate="'required'" placeholder="TITLE" name="title" class="form-control"
                  :class="{ 'is-invalid': submitted && errors.has('title') }" />
                <div v-if="submitted && errors.has('title')" class="invalid-feedback">{{
                  errors.first('title') }}</div>
              </div>
            </div>

            <!-- <textarea rows="15" cols="15" placeholder="DESCRIPTION" v-model="description"></textarea> -->
            <div class="form-group">
              <label for="description">Description</label>
              <input type="text" v-model="form.description" v-validate="'required'" placeholder="DESCRIPTION" name="description"
                class="form-control" :class="{ 'is-invalid': submitted && errors.has('description') }" />
              <div v-if="submitted && errors.has('description')" class="invalid-feedback">{{
                errors.first('description') }}</div>
            </div>

            <div class="form-group">
              <label for="email">Email</label>
              <input type="email" v-model="form.email" v-validate="'required|email'" placeholder="EMAIL" name="email"
                class="form-control" :class="{ 'is-invalid': submitted && errors.has('email') }" />
              <div v-if="submitted && errors.has('email')" class="invalid-feedback">{{ errors.first('email') }}</div>
            </div>

            <div class="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" v-model="form.password" v-validate="{ required: true, min: 6 }" placeholder="PASSWORD"
                name="password" class="form-control" :class="{ 'is-invalid': submitted && errors.has('password') }" />
              <div v-if="submitted && errors.has('password')" class="invalid-feedback">{{
                errors.first('password') }}</div>
            </div>

            <div class="form-group">
              <label for="formCoupon">Coupon:</label>
              <input type="text" name="coupon" id="formCoupon" v-model="form.coupon" placeholder="COUPON CODE" v-validate="'required|verify_coupon'"
                v-bind:class="{'form-control': true, 'error': errors.has('coupon') }">
              <span v-show="errors.has('coupon')" class="text-danger">{{ errors.first('coupon') }}</span>
            </div>

            <div class="form-group" style="padding-top:20px">
              <button class="app_post_btn">Update</button>
            </div>

            <div>
              <div class="row">
                <div class="col-sm-3">
                </div>
                <div class="col-sm-6">
                  <router-link v-bind:to="{ name: 'Posts' }" class="add_post_link"> Back to Posts</router-link>
                </div>
              </div>
            </div>

          </form>

        </div>
      </div>

    </div>

  </transition>
</template>

<script>
  import PostsService from '@/services/PostsService'
export default {
  name: 'EditPost',
  data () {
    return {
      title: '',
      description: '',

      form: {
        title: '',
        description: '',
        email: '',
        password: '',
        coupon: '',
      },
      submitted: false,
    }
  },
  mounted () {
    this.getPost()
  },
  methods: {

    handleSubmit(e) {
            this.submitted = true;
            this.$validator.validate().then(valid => {
                if (valid) {
                    this.updatePost();
                }
            });
        },

    async getPost () {
      const response = await PostsService.getPost({
        id: this.$route.params.id
      })
      this.form.title = response.data.title
      this.form.description = response.data.description
      this.form.email = response.data.email
      this.form.password = response.data.password
      this.form.coupon = response.data.coupon
    },

    async updatePost () {
      await PostsService.updatePost({
        id: this.$route.params.id,
        title: this.form.title,
        description: this.form.description,
        email: this.form.email,
        password: this.form.password,
        coupon: this.form.coupon,
      })
      this.$router.push({ name: 'Posts' })
    }
  }
}
</script>
<style type="text/css">
  .form input,
  .form textarea {
    width: 500px;
    padding: 10px;
    border: 1px solid #e0dede;
    outline: none;
    font-size: 12px;
  }

  .form div {
    margin: 20px;
  }

  .app_post_btn {
    background: #4d7ef7;
    color: #fff;
    padding: 10px 80px;
    text-transform: uppercase;
    font-size: 12px;
    font-weight: bold;
    width: 520px;
    border: none;
    cursor: pointer;
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
