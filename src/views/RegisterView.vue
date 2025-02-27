<template>
  <div class="container mt-5">
    <h1>Sign Up</h1>
    <form @submit.prevent="handleRegister">
      <div class="mb-3">
        <label for="fullname" class="form-label">Full Name</label>
        <input
          type="text"
          class="form-control"
          id="fullname"
          v-model="fullname"
          placeholder="Enter your full name"
          required
        />
      </div>
      <div class="mb-3">
        <label for="email" class="form-label">Email address</label>
        <input
          type="email"
          class="form-control"
          id="email"
          v-model="email"
          placeholder="example@example.com"
          required
        />
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <input
          type="password"
          class="form-control"
          id="password"
          v-model="password"
          placeholder="Enter your password"
          required
        />
      </div>
      <div class="mb-3">
        <label for="phone" class="form-label">Phone Number</label>
        <input
          type="tel"
          class="form-control"
          id="phone"
          v-model="phone"
          placeholder="Enter your phone number"
          required
        />
      </div>
      <div class="mb-3">
        <label for="address" class="form-label">Address</label>
        <textarea
          class="form-control"
          id="address"
          v-model="address"
          placeholder="Enter your address"
          required
        ></textarea>
      </div>
      <div class="col-auto">
        <button type="submit" class="btn btn-primary">Register</button>
      </div>
    </form>
    <p class="mt-3">
      Already have an account? <router-link to="/login">Login here</router-link>
    </p>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
      phone: '',
      address: '',
      message: ''
    };
  },
  methods: {
      async registerUser() {
    try {
      const response = await axios.post('http://localhost:5050/api/auth/register', {
        name: this.name,
        email: this.email,
        password: this.password,
        phone: this.phone,
        address: this.address
      });
      this.message = response.data.message || "Registered successful!";
      console.log(response.data);
    } catch (error) {
      console.error("Error registering user:", error);
      this.message = error.response?.data?.error || "Invalid registration input, try again.";
    }
  }
}
};
</script>