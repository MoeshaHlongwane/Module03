<template>
  <div class="home section">
    <login-prompt-modal ref="loginModal" />
    <!-- Hero Section -->
    <section class="hero text-white d-flex align-items-center">
      <img :src="logo" class="logo" alt="">
      <div class="container text-center">
        <h1 class="hero-title">Thrifted Warmth</h1>
        <h4 class="hero-title">Stay Warm, Look Stylish</h4>
        <h1 class="hero-subtitle">Your Winter Wardrobe Essentials</h1>
        <p class="hero-description">Thrifted Winter wear with stories to tell.</p>
        <router-link to="/products" class="btn btn-warning">Shop Now</router-link>
      </div>
    </section>

    <!-- Our Journey to Warmth and Style -->
     <div class="our-journey-Color">
      <section class="our-journey container d-flex align-items-center">
        <video :src="journeyVideo" class="journey-video" autoplay loop muted></video>
      <!-- <img :src="journeyImage" class="journey-img" alt="Our Journey"> -->
      <div class="journey-text">
        <h2>Our Journey to Warmth and Style</h2>
        <p>At Thrifted Warmth, we specialize in high-quality imported European winter coats with a strong emphasis on reusing and recycling. Our collection features a wide range of options for men, women, and kids, including puffer jackets and leather coats, all offered at affordable prices ranging from R100 to R600. With a commitment to sustainability and style, we aim to provide warmth while protecting the environment.</p>
        <router-link to="/about" class="btn btn-warning">Learn More</router-link>
      </div>
    </section>
     </div>
   

    <section class="variety-section">
    <div class="category">
        <h2>Women's Collection</h2>
        <h3>Chic & Cozy</h3>
        <p>Indulge in our women's selection that combines elegance with comfort. Whether you're looking for a trendy puffer jacket or a classic leather coat, we have the perfect choice to keep you stylish and snug.</p>
        <router-link to="/products" class="btn btn-outline-warning">Shop Now</router-link>
    </div>
    <div class="category">
        <h2>Men's Collection</h2>
        <h3>Stylish & Practical</h3>
        <p>Discover our men's collection is selected to blend fashion with functionality. Our coats are crafted for durability and style, ensuring you stay warm and fashionable throughout the cold months.</p>
        <router-link to="/products" class="btn btn-outline-warning">Shop Now</router-link>
    </div>
    <div class="category">
        <h2>Kids' Corner</h2>
        <h3>Adorable & Warm</h3>
        <p>Explore our kids' corner for adorable winter coats that prioritize warmth and durability. Our collection ensures your little ones stay cozy and fashionable during the chilly months.</p>
        <router-link to="/products" class="btn btn-outline-warning">Shop Now</router-link>
    </div>
    </section>
    <!-- Footer -->
    <footer class="footer text-center text-white">
      <div class="container">
        <p>&copy; 2025 Thrifted Winter Coats | 123 Winter Lane, Cape Town</p>
        <div class="social-links">
          <a href="#"><i class="fab fa-twitter"></i></a>
          <a href="#"><i class="fab fa-facebook"></i></a>
          <a href="#"><i class="fab fa-instagram"></i></a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import LoginPromptModal from '@/components/LoginPromptModal.vue';

export default {
  components:{
    LoginPromptModal,

  },
  data() {
    return {
      heroImages: [
        require('../assets/Coat01.png'), // path to your image
        require('../assets/Coat02.png'),
        require('../assets/Coat03.png'),
        require('../assets/Coat04.png'),
        require('../assets/Coat05.png'),
        require('../assets/Coat06.png')
      ],
      logo: require("../assets/Thrifted_Warmth_Promo.jpg"),
      journeyImage: require('../assets/journeyImg.jpg'),
      journeyVideo: require('../assets/thrifted.mp4'),
      catalogues: [
        { name: "Women's Collection", subtitle:"Chic & Cozy", description: "Indulge in our women's selection that combines elegance with comfort. Whether you're looking for a trendy puffer jacket or a classic leather coat, we have the perfect choice to keep you stylish and snug.", image: require('../assets/Coat02.png') },
        { name: "Men's Collection", subtitle:" Stylish and Practical", description: "Sophisticated and warm, just for him.", image: require('../assets/Coat06.png')  },
        { name: "Kids' Corner",subtitle:"Adorable and warm ",  description: "Cute and cozy for the little ones.", image:require('../assets/Coat09.png')  }
      ]
    };
  },
  methods:{
    handleShopNow() {
      if (this.isLoggedIn()) {
        this.$router.push("/products");
      } else {
        this.$refs.loginModal.show();
      }
    },
    isLoggedIn() {
      // Check if the user is logged in (You might want to use Vuex or localStorage)
      return !!localStorage.getItem("userToken");
    }
  }
};
</script>

<style scoped>
/* Colors */
:root {
  --beige: #D2B48C;
  --brown: #8B4513;
  --dark-brown: #5C3317;
  --text-dark: #3B2F2F;
  --text-light: #F5F5DC;
}
/* Hero Section */
.hero {
  position: relative;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5));
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.logo {
  height: 150px;
  width: 160px;
  object-fit: cover;
  border-radius: 100%;
  animation: slideUp 1.5s ease-out;
}
.hero::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url("../assets/background01.jpg");
  background-size: repeat;
  background-position: center;
  filter: blur(3px);
  z-index: -1; /* Ensure the content is above the blurred background */
}

.hero-title {
  font-family: 'Playfair Display', serif;
  font-size: 4rem;
  font-weight: 700;
  color: #f0ad4e;
  animation: slideUp 1.5s ease-out;
}

.hero-subtitle {
  font-family: 'Poppins', sans-serif;
  font-size: 1.5rem;
  font-weight: 600;
  animation: slideUp 1.5s ease-out;
}

.hero-description {
  font-family: 'Poppins', sans-serif;
  font-size: 1.2rem;
  color: var(--dark-brown);
  margin-bottom: 20px;
  animation: slideUp 1.5s ease-out;
}

.journey-text {
    font-family: 'Playfair Display', serif; 
    text-align: center;
    padding: 40px;
    margin-top: 30px;
    background-color: #fff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border: 1px solid #e0e0e0;
    width: 80%;
    margin-left: auto;
    margin-right: auto;
    animation: slideUp 1.5s ease-out;
    transition: transform 0.3s;
}
.journey-video {
  width: 350px;
  height: 350px;
  /* border-radius: 10px; */
  object-fit: cover;
  display: flex;
}

.journey-text h2 {
    font-family: 'Playfair Display', serif;
    font-size: 28px;
    color: #333;
    /* animation: slideUp 2.5s ease-out; */
}

.journey-text p {
    font-family: 'Poppins', sans-serif;
    font-size: 16px;
    color: #555;
    line-height: 1.6;
    margin-bottom: 20px;
}

.btn-warning {
    background-color: #f0ad4e;
    border: none;
    color: white;
    padding: 10px 20px;
    text-align: center;
    font-size: 16px;
    cursor: pointer;
    border-radius: 4px;
    text-decoration: none;
    animation: slideUp 1.5s ease-out;
    font-family: 'Poppins', sans-serif;
}

.btn-warning:hover {
    background-color: #ec971f;
}
.our-journey {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 50px 0;
  transition: transform 0.3s;
  flex-wrap: wrap;
}
.journey-img {
  width: 350px;
  height: 350px;
  border-radius: 10px;
}
.journey-text {
  width: 50%;
  text-align: center;
  padding: 40px;
  margin-top: 30px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #e0e0e0;
  animation: slideUp 1.5s ease-out;
  transition: transform 0.3s;
}
.journey-text h2 {
  color: var(--brown);
}
.journey-text p {
  color: var(--text-dark);
}

.variety-section {
    display: flex;
    justify-content: space-around;
    text-align: center;
    padding: 50px;
    background-color: #f7f2eb;
}

.category {
    width: 30%;
    border: 1px solid #e0e0e0;
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background-color: #fff;
    transition: transform 0.3s;
}

.category:hover {
    transform: translateY(-10px);
}

h2 {
    font-family: 'Playfair Display', serif; 
    font-size: 24px;
    color: #333;
}

h3 {
    font-family: 'Playfair Display', serif;
    font-size: 18px;
    color: #777;
    margin-bottom: 10px;
}
p {
   font-family: 'Poppins', sans-serif;
    font-size: 16px;
    color: #555;
    line-height: 1.6;
}
.shop-now-btn {
  background: var(--brown);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  transition: background 0.3s ease;
}
.shop-now-btn:hover {
  background: var(--dark-brown);
}

/* Footer */
.footer {
  background: #8B4513;
  padding: 20px;
  color:black;
  bottom: 0;
  left: 0;
  width: 100%;
}
.footer p {
  color: var(--text-light);
}
.social-links a {
  color: var(--text-light);
  font-size: 20px;
  margin: 0 10px;
}

/* Slide Up Animation */
@keyframes slideUp {
  0% {
    opacity: 0;
    transform: translateY(100px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Staggered Animation Delays */
/* .hero {
  animation-delay: 0.5s;
}
.our-journey {
  animation-delay: 1s;
  transition: transform 0.3s;
}
.variety-section {
  animation-delay: 1.5s;
} */
.footer {
  animation-delay: 2s;
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }
  .journey-text {
    width: 100%;
    padding: 20px;
  }
  .variety-section {
    flex-direction: column;
    padding: 20px;
  }
  .category {
    width: 100%;
    margin-bottom: 20px;
  }
}

</style>
