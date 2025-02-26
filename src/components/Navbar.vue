<template>
  <nav class="navbar navbar-dark bg-brown">
    <div class="container-fluid">
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
              data-bs-target="#navbarToggleExternalContent"
              aria-controls="navbarToggleExternalContent"
              aria-expanded="false" aria-label="Toggle navigation"
              @click="toggleMenu">
        <span class="navbar-toggler-icon"></span>
      </button>
      <a class="navbar-brand" href="#">Thrifted Warmth</a>

      <!-- Cart Icon at Corner -->
      <router-link to="/cart" class="cart-icon">
        <i class="fas fa-shopping-cart"></i>
        <transition name="slide-up">
          <span class="cart-count" :key="cartCount">{{ cartCount }}</span>
        </transition>
      </router-link>
    </div>
  </nav>

  <div class="collapse" id="navbarToggleExternalContent" data-bs-theme="dark" v-bind:class="{ show: menuVisible }">
    <div align="center" class="bg-brown p-4">
      <h5 class="text-body-emphasis h4"></h5>
      <div class="links">
        <router-link class="nav-link" to="/" @click="hideMenu">Home</router-link>
        <br>
        <router-link to="/about" class="nav-link" @click="hideMenu">About Us</router-link>
        <br>
        <router-link to="/products" class="nav-link" @click="hideMenu">Our Winter Wear</router-link>
        <br>
        <router-link to="/cart" class="nav-link" @click="hideMenu">Cart</router-link>
        <br>
        <router-link v-if="!isAuthenticated" to="/login" class="nav-link" @click="hideMenu">Login</router-link>
        <button v-else class="btn btn-link nav-link" @click="logout">Logout</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      menuVisible: false,
      isAuthenticated: false,
    };
  },
  computed: {
    cartCount() {
      return this.$store.state.cart.reduce((total, item) => total + Number(item.quantity), 0);
    },
  },
  created() {
    this.checkAuth();
  },
  methods: {
    toggleMenu() {
      this.menuVisible = !this.menuVisible;
    },
    hideMenu() {
      this.menuVisible = false;
    },
    checkAuth() {
      this.isAuthenticated = !!localStorage.getItem("user_id");
    },
    logout() {
      localStorage.removeItem("user_id");
      this.isAuthenticated = false;
      this.$router.push({ name: "login" });
    }
  },
  watch: {
    "$route"() {
      this.checkAuth();
    }
  }
};
</script>

<style scoped>
/* Navbar styles */
.navbar {
background-color: #8B4513 !important; /* Brown color */
box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
padding: 1rem 2rem;
transition: background-color 0.3s ease, transform 0.3s ease;
position: fixed; /* Fixes the navbar at the top of the page */
top: 0; /* Positions it at the top of the page */
left: 0; /* Positions it at the left of the page */
width: 100%; /* Ensures the navbar spans the full width of the page */
padding: 10px 0; /* Adjust padding for your navbar */
z-index: 1000; /* Ensures it stays above other content */
 
}
/* Navbar brand styles */
.navbar-brand {
color: #fff;
font-weight: bold;
font-family: 'Playfair Display', serif;
transition: transform 0.3s ease;
}
/* Hover effect for navbar brand */
.navbar-brand:hover {
transform: scale(1.1);
}
/* Navbar links */
.links{
color: rgba(255, 255, 255, 0.7);
transition: color 0.3s ease-in-out, transform 0.3s ease;
font-family: 'Poppins', sans-serif;
text-decoration: none; /* Remove underline */
}
/* Navbar link hover and active styles */
.navbar-nav .nav-link:hover,
.navbar-nav .nav-link.active {
color: #fff;
transform: translateX(5px);
}
/* Navbar toggler (hamburger) */
.navbar-toggler {
transition: transform 0.3s ease;
}
.navbar-toggler-icon {
background-color:white; /* Toggler icon color */
}
/* Navbar toggler icon hover effect */
.navbar-toggler:hover {
transform: rotate(90deg);
}
/* Collapse dropdown styles */
.collapse {
background-color: #8B4513 !important; /* Brown background for dropdown */
}
/* Customize dropdown menu appearance */
.bg-brown {
background-color: #8B4513 !important; /* Custom brown color for dropdown menu */
}
.navbar-nav .nav-link.active {
color: #fff;
}
.logo {
width: 50px;
height: 50px;
object-fit: cover;
border-radius: 50%;
}
.cart-container {
  position: relative;
  display: inline-block;
}

.cart-icon {
  position: relative;
  font-size: 24px;
  color: #333;
  text-decoration: none;
}

.cart-count {
  position: absolute;
  top: -10px;
  right: -10px;
  background-color: #ff0000;
  color: white;
  border-radius: 50%;
  padding: 2px 6px;
  font-size: 12px;
  font-weight: bold;
  transition: transform 0.3s ease;
}

.cart-count-enter-active {
  transform: translateY(-10px);
  opacity: 0;
}

.cart-count-enter-to {
  transform: translateY(0);
  opacity: 1;
}

.cart-count-leave-active {
  transform: translateY(10px);
  opacity: 0;
}

</style>