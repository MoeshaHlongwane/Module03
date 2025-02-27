<template>
    <div class="about section">
      <section class="about-header text-white d-flex align-items-center">
        <div class="container text-center">
          <h1 class="about-title">About Us</h1>
          <h4 class="about-subtitle">Stay Warm, Look Stylish</h4>
          <p class="about-description">
            At <strong>Thrifted Warmth</strong>, we believe in keeping you warm while keeping the planet cool. 
          Our journey started with a simple idea: offering high-quality, pre-loved winter wear that combines 
          affordability, style, and sustainability. We source our premium coats from 
          <a href="https://overcoats.co.za/" target="_blank">Overcoat Exporter</a>, ensuring that every 
          piece gets a second life, reducing textile waste and promoting eco-friendly fashion.
          </p>
          <p >
            <p class="about-description">
          But we don’t stop at thrifted warmth—we take extra steps to ensure every coat feels brand new. 
          Each item is carefully washed, refreshed, and made ready for you. Plus, we offer 
          <strong>customization services</strong>, making our coats perfect for gifting with a unique, personal touch.
        </p>
          </p>
          <!-- Create Account Button -->
          <div class="about-buttons">
            <router-link to="/register" class="btn btn-warning">Sign Up</router-link>
          </div>
        </div>
      </section>

      <!-- What Makes Us Stand Out -->
      <section class="standout">
      <h3 align="center">Why choose us?</h3>
      <br>
      <div class="card-container">
        <div class="card">
          <h4>Eco-Friendly Approach</h4>
          <p>By choosing second-hand, we help reduce waste and lower the carbon footprint of fashion.</p>
        </div>
        <div class="card">
          <h4>High-Quality Selection</h4>
          <p>We handpick durable, stylish coats to ensure warmth without compromising on style.</p>
        </div>
        <div class="card">
          <h4>Affordable Luxury</h4>
          <p>Premium winter wear at a fraction of the cost of new retail alternatives.</p>
        </div>
        <div class="card">
          <h4>Customization Services</h4>
          <p>Personalize your coat to make it one-of-a-kind—perfect for gifting.</p>
        </div>
        <div class="card">
          <h4>Hygiene First</h4>
          <p>Every coat is thoroughly cleaned before reaching our customers.</p>
        </div>
      </div>
      <div class="standoutbutton">
        <button @click="openModal" class="btn btn-warning">Get In Touch</button>
      </div>
    </section>

      <!-- Modal -->
      <div v-if="showModal" class="modal-overlay" @click="closeModal">
        <div class="modal-content" @click.stop>
          <button @click="closeModal" class="close-button">&times;</button>
          <h4>Contact Us</h4>
          <p><i class="fas fa-envelope"></i> Email: contact@thriftedwarmth.com</p>
          <p><i class="fas fa-phone"></i> Phone: +27 123 456 789</p>
          <p><i class="fas fa-map-marker-alt"></i> Address: 123 Winter Lane, Cape Town</p>
        </div>
      </div>
  
      <!-- Shop Now Section -->
      <section class="shop-now">
        <h3>Discover Our Collection</h3>
        <p>Browse our carefully curated selection of winter wear and stay warm in style. Our collection is just a click away!</p>
        <router-link to="/products" class="btn btn-info">Shop Now</router-link>
      </section>
      <br>
  
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
  export default {
    data() {
      return {
        showModal: false,
        milestones: [
          { 
            id: 1,
            title: 'Our First Collection',
            description: 'We launched our first collection of winter wear in 2023, focused on bringing affordable and stylish coats to our community.',
            date: 'March 2023'
          },
          { 
            id: 2,
            title: 'Sustainability Commitment',
            description: 'In 2024, we made a commitment to sustainability by ensuring all of our winter wear is either upcycled or made from eco-friendly materials.',
            date: 'January 2024'
          },
          { 
          id: 3,
          title: 'Community Giveback Initiative',
          description: 'We started donating 10% of our profits to shelters to help those in need stay warm during winter.',
          date: 'November 2024'
          },
          { 
          id: 4,
          title: 'Eco-Friendly Packaging Launch',
          description: 'Introduced 100% biodegradable and reusable packaging to reduce our carbon footprint.',
          date: 'August 2025'
        },
        ]
      };
    },
    methods: {
      openModal() {
        this.showModal = true;
      },
      closeModal() {
        this.showModal = false;
      }
    }
  };
</script>
    
<style scoped>
body{
  color: rgb(165, 120, 42);
}
.card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
}

.card {
  background-color: var(--text-light);
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 300px;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
}

.card h4 {
  font-size: 1.5rem;
  color: var(--text-dark);
  font-family: 'Poppins', sans-serif;
}

.card p {
  font-size: 1rem;
  color: var(--text-dark);
  font-family: 'Poppins', sans-serif;
}

.card:hover {
  transform: translateY(-10px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
}
/*Modal styling*/
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: fadeIn 0.3s ease-in-out;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 300px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  animation: slideIn 0.3s ease-out;
}

.close-button {
  background: none;
  border: none;
  font-size: 1.5rem;
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
}
.btn{
    font-family: 'Playfair Display', serif;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideIn {
  from {
    transform: translateY(-50%);
  }
  to {
    transform: translateY(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.shop-now {
  border: 10px solid black;
  animation: fadeInUp 1s ease-out;
  font-family: 'Playfair Display', serif;
}

 /* About Section */
.about-header {
    position: relative;
    background-image: url("../assets/coatsDisplay.jpg");
    background-repeat: repeat;
    height: 70vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.about-header::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right:0;
    bottom:0;
    height: 100%;
    background: inherit;
    filter: blur(2px); /* Adjust the blur level as needed */
    z-index: -1;
}

.about-header .container {
    position: relative;
    z-index: 1; /* Ensures text stays clear above the blurred background */
    text-align: center;
}
 
.about-title {
    font-size: 4rem;
    font-weight: 700;
    color: var(--text-light);
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    animation: fadeInUp 1s ease-out;
  }
  
.about-subtitle {
    font-size: 2rem;
    font-weight: 400;
    color: var(--text-light);
    animation: fadeInUp 1s ease-out;
}
.about-us h3, .standout h3{
  font-family: 'Playfair Display', serif;
  animation: fadeInUp 1s ease-out;
}
  
.about-description {
    font-size: 1.2rem;
    margin-top: 15px;
    color: var(--text-light);
    animation: fadeInUp 1s ease-out;
}
  
.about-buttons {
    margin-top: 30px;
    color: #28a745;
}
  
.about-buttons .btn {
    margin: 10px;
    padding: 12px 25px;
    font-size: 1.1rem;
    border-radius: 5px;
    transition: background-color 0.3s;
} 
/* Shop Now Section */
.shop-now {
    background-color: var(--brown);
    padding: 4rem 0;
    text-align: center;
    color: var(--text-light);
}
  
.shop-now h3 {
    font-size: 2rem;
    margin-bottom: 15px;
}
  
.shop-now p {
    font-size: 1.2rem;
    margin-bottom: 20px;
}
  
.shop-now .btn-info {
    background-color: #17a2b8;
    padding: 12px 25px;
    font-size: 1.1rem;
    border-radius: 5px;
    transition: background-color 0.3s;
}
  
.shop-now .btn-info:hover {
    background-color: #138496;
    transition: ease-in-out 0.3s;
}
  
/* Footer */
.footer {
    background-color: black;
    padding: 20px 0;
  }
  
.footer p {
    font-size: 1rem;
    color: var(--text-light);
  }
  
.footer .social-links a {
    margin: 0 10px;
    color: var(--text-light);
    font-size: 1.5rem;
}
/* About Us Section */
.about-us,
.standout,
.milestones,
.shop-now {
  padding: 3rem;
  margin: 20px 0;
  border-radius: 10px;
  font-family: 'Poppins', sans-serif;  
}
.about-us{
  border: #5A3E2B 2px bolder;
}

/* Header Section */
.about-header {
  padding: 100px 0;
  font-family: 'Poppins', sans-serif;
}

.about-title {
  font-size: 2.5rem;
  font-weight: bold;
  font-family: 'Playfair Display', serif;
}

.about-subtitle {
  font-size: 1.5rem;
  margin-bottom: 10px;
}

.about-description {
  font-size: 1.1rem;
}

/* Standout Section */
.standoutbutton{
  display: grid;
  margin-top: 30px;
}
.standout ul {
  list-style-type: none;
  padding: 0;
  text-align: center;
}
.standout ul li {
  margin: 10px 0;
  font-size: 1.1rem;
}

/* Milestones */
.milestone-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

</style>
  