<template>
  <div class="container mt-4">
    <h1 class="text-center mb-4">Products</h1>
    <!-- Filters Section -->
    <div class="d-flex justify-content-between align-items-center mb-4">
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
                <p class="card-text">R{{ product.price }}</p>
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
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  transition: box-shadow 0.3s ease;
}
.card:hover {
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
}
.card-body {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.card-title {
  font-size: 1.1rem;
  font-weight: bold;
}
.card-text {
  color: #333;
  font-size: 1rem;
}
.g-4 {
  --bs-gutter-y: 1.5rem;
}
</style>






