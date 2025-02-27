<template>
  <div class="container mt-4">
    <h1 class="text-center mb-4">Our Winter Wear</h1>
    <!-- Filters Section -->
    <div align="center" class="d-flex justify-content-between align-items-center mb-4">
      <!-- Category Dropdown -->
      <select v-model="selectedCategory" class="form-select w-auto" @change="filterProducts">
        <option value="All">All</option>
        <option value="Men">Men</option>
        <option value="Women">Women</option>
        <option value="Kids">Kids</option>
      </select>
    </div>
    
    <!-- Products Grid -->
    <div class="row">
      <template v-if="All_Products && All_Products.length">
        <div v-for="product in filteredProducts" :key="product.product_id" class="col-md-4 mb-4">
          <div class="card" @click="viewProductDetails(product)">
            <img :src="product.image_url" class="card-img-top" alt="Product Image" />
            <div class="card-body d-flex justify-content-between align-items-center">
              <div>
                <h5 class="card-title">{{ product.product_name }}</h5>
                <p class="card-text">{{ product.description }}</p>
                <p class="card-price">R{{ product.price }}</p>
              </div>
              <div class="d-flex mt-auto">
                <i
                  :class="isFavorite(product.product_id) ? 'fas fa-heart text-danger' : 'far fa-heart text-muted'"
                  class="icon favorite-icon me-3"
                  @click.stop="toggleFavorite(product.product_id)"
                ></i>
              </div>
            </div>
          </div>
        </div>
      </template>
      <div v-else class="col-12">
        <p>No products available.</p>
      </div>
    </div>
  </div>
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
</template>
<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      selectedCategory: "All",
      favorites: [],
      cart: [],
    };
  },
  computed: {
    ...mapState(["All_Products"]),
    filteredProducts() {
      if (!this.All_Products) return [];
      return this.All_Products.filter((product) => {
        return (
          this.selectedCategory === "All" ||
          product.category_name === this.selectedCategory
        );
      });
    },
  },
  methods: {
    toggleFavorite(productId) {
      if (this.favorites.includes(productId)) {
        this.favorites = this.favorites.filter((id) => id !== productId);
      } else {
        this.favorites.push(productId);
      }
    },
    isFavorite(productId) {
      return this.favorites.includes(productId);
    },
    toggleCart(productId) {
      if (this.cart.includes(productId)) {
        this.cart = this.cart.filter((id) => id !== productId);
      } else {
        this.cart.push(productId);
      }
    },
    isInCart(productId) {
      return this.cart.includes(productId);
    },
    viewProductDetails(product) {
      // Navigate to the product details page
      this.$router.push({
        name: "ProductDetails",
        params: { id: product.product_id },
        query: { product: JSON.stringify(product) },
      });
    },
  },
  mounted() {
    this.$store.dispatch("getData");
  },
};
</script>
<style scoped>
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
.container{
  max-width: 1300px;
}
h1 {
  font-size: 2.5rem;
  font-weight: 600;
  color: #333;
  font-family: 'Poppins', sans-serif;
}
.card-img-top {
  width: 400px;
  height: 600px;
  object-fit: cover;
}
.icon {
  font-size: 1.5rem;
  cursor: pointer;
  transition: color 0.3s;
}
.favorite-icon {
  margin-right: 10px;
}
.cart-icon {
  transition: color 0.3s;
}
.card {
  transition: box-shadow 0.3s ease;
  border: 1px solid #ddd;
  border-radius: 10px;
  overflow: hidden;
  transition: box-shadow 0.7s ease, transform 0.1s ease;
  
}
.card:hover {
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
  transform: translateY(-10px);
}
.card-img-top {
  width: 100%;
  height: 450px;
  object-fit: cover;
  border-bottom: 1px solid #ddd;
}
.card-body {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.card-title {
  font-size: 1.1rem;
  font-weight: bold;
  display:flex;

}
.card-price{
  font-family: 'Poppins', sans-serif;
  font-size: 20px;

}
.card-text {
  color: #333;
  font-size: 1rem;
  /* font-weight: bold; */
  /* color: #333; */
  cursor: pointer;
  transition: color 0.3s;
  font-family: 'Poppins', sans-serif;
}

.cart-text:hover {
  color: #007bff;
}
.g-4 {
  --bs-gutter-y: 1.5rem;
}
</style>






