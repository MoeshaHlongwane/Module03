<template>
  <div class="container mt-4">
    <!-- Back to Products Button -->
    <button class="btn btn-secondary mb-4" @click="goBackToProducts">
      <i class="fas fa-arrow-left me-2"></i> Back to Products
    </button>

    <div class="row">
      <!-- Product Image -->
      <div class="col-md-6">
        <img :src="product.image_url" class="img-fluid product-image" alt="Product Image" />
      </div>

      <!-- Product Details -->
      <div class="col-md-6">
        <h2 class="product-name">{{ product.product_name }}</h2>
        <p class="product-description">{{ product.description }}.</p>
        <p class="text-muted product-price">R{{ product.price }}</p>

        <!-- Size Selection -->
        <div class="mb-3">
          <label for="size" class="form-label">Select Size</label>
          <select v-model="selectedSize" class="form-select" id="size" required>
            <option value="">Choose Size</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
            <option value="XXL">XXL</option>
            <option v-for="(size, index) in product.sizes" :key="index" :value="size">{{ size }}</option>
          </select>
          <span v-if="errors.size" class="text-danger">{{ errors.size }}</span>
        </div>

        <!-- Quantity Selection -->
        <div class="mb-3">
          <label for="quantity" class="form-label">Quantity</label>
          <input
            type="number"
            v-model="quantity"
            min="1"
            class="form-control"
            id="quantity"
            required
          />
          <span v-if="errors.quantity" class="text-danger">{{ errors.quantity }}</span>
        </div>

        <!-- Add to Cart Button -->
        <button class="btn btn-primary btn-add-to-cart" @click="checkRegistration">
          Add to Cart
        </button>
      </div>
    </div>
  </div>
  <!-- Success Popup -->
<div v-if="showPopup" class="success-popup">
  <span>👍 Item successfully added to cart</span>
</div>

  <!-- Registration Modal -->
  <div
    v-if="showRegistrationModal"
    class="modal fade show"
    style="display: block; background: rgba(0,0,0,0.5);"
    tabindex="-1"
    role="dialog"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Register to Continue</h5>
          <button
            type="button"
            class="btn-close"
            @click="closeModal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <p>You need to login to continue.</p>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" @click="closeModal">
            Close
          </button>
          <button
            class="btn btn-primary"
            @click="redirectToRegistration"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  </div>
  <br><br>
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
export default {
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isAdding:false,
      cart: [],
      selectedSize: "", // Selected size
      quantity: 1, // Default quantity
      showRegistrationModal: false, // Modal visibility
      errors: {
        size: "",
        quantity: "",
      },
    };
  },
  methods: {
    validateForm() {
      this.errors.size = this.selectedSize ? "" : "Please select a size.";
      this.errors.quantity = this.quantity > 0 ? "" : "Please enter a valid quantity.";
      return !this.errors.size && !this.errors.quantity;
    },
    checkRegistration() {
      const user_id = localStorage.getItem("user_id");
      if (!user_id) {
        this.$router.push({ name: "login" });
      } else {
        if (this.validateForm()) {
          this.addToCart();
        }
      }
    },
  
    addToCart() {
      this.isAdding = true;
      const user_id = localStorage.getItem("user_id");
      const productToAdd = {
        user_id: user_id,
        product_id: this.product.product_id,
        quantity: this.quantity,
        size: this.selectedSize,
      };
      this.$store
        .dispatch("addToCart", productToAdd)
        .then(() => {
          console.log("Product added to cart successfully.");
        })
        .catch((error) => {
          console.error("Failed to add product to cart:", error);
        });
    },
    closeModal() {
      this.showRegistrationModal = false;
    },
    redirectToRegistration() {
      this.closeModal();
      this.$router.push("/login");
    },
    goBackToProducts() {
      this.$router.push("/products");
    },
  },
  mounted() {
    // Ensure product.sizes is an array and set default size
    if (this.product.sizes && typeof this.product.sizes === "string") {
      try {
        this.product.sizes = JSON.parse(this.product.sizes);
      } catch (e) {
        console.error("Invalid JSON format for sizes", e);
        this.product.sizes = [];
      }
    }
    if (this.product.sizes && this.product.sizes.length > 0) {
      this.selectedSize = this.product.sizes[0];
    }
  },
};
</script>

<style scoped>

.btn-add-to-cart {
  width: 100%;
  margin-top: 20px;
  font-family: 'Poppins', sans-serif;
  transition: background-color 0.3s;
  cursor: pointer;
}

.btn-add-to-cart:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.success-popup {
  position: fixed;
  top: 20px;
  right: 20px;
  background-color: #28a745;
  color: white;
  padding: 10px;
  border-radius: 5px;
  font-family: 'Poppins', sans-serif;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  animation: fadeOut 0.2s ease-in-out forwards;
}

@keyframes fadeOut {
  0% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateY(-20px);
  }
}

.btn-secondary{
  font-family: 'Poppins', sans-serif;
}
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
  font-family: 'Poppins', sans-serif;
}
.social-links a {
  color: var(--text-light);
  font-size: 20px;
  margin: 0 10px;
}
.img-fluid {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
}

.product-image {
  box-shadow: 0 7px 40px rgba(10, 10, 10, 0.1);
  border-radius: 8px;
  margin-bottom: 20px;
  height: 400px;
  width: 400px;
}

.product-name {
  font-size: 2em;
  font-weight: bold;
  color: #333;
  font-family: 'Poppins', sans-serif;
}

.product-price {
  font-size: 30px ;
  /* margin-bottom: 20px; */
  font-family: 'Poppins', sans-serif;
}

.product-description {
  color: #777;
  font-size: 20px;
  /* margin-bottom: 30px; */
  font-family: 'Poppins', sans-serif;
}

.form-label {
  font-size: 1.1em;
  font-weight: 600;
  font-family: 'Poppins', sans-serif;
}

.form-select, .form-control {
  padding: 12px;
  font-size: 1em;
  border-radius: 6px;
  border: 1px solid #ddd;
  margin-bottom: 15px;
  width: 100%;
  font-family: 'Poppins', sans-serif;
}

.text-danger {
  font-size: 0.875em;
  color: red;
}

.btn-secondary {
  background-color: #6c757d;
  border-color: #6c757d;
}

.btn-secondary:hover {
  background-color: #5a6268;
  border-color: #545b62;
}

.btn-primary {
  background-color: #8B4513;
  border-color: #3498db;
  padding: 10px 20px;
  font-size: 1.1em;
  font-weight: 600;
}

.btn-primary:hover {
  background-color: #2980b9;
  border-color: #2980b9;
  transform: unset;
}

.btn-add-to-cart {
  width: 100%;
  margin-top: 20px;
  font-family: 'Poppins', sans-serif;
  
}

.modal-dialog {
  max-width: 500px;
  margin: 100px auto;
}

.modal-content {
  border-radius: 8px;
  overflow: hidden;
}

.modal-header {
  background-color: #3498db;
  color: white;
  padding: 20px;
}

.modal-footer {
  padding: 20px;
  justify-content: space-between;
}

.btn-close {
  color: #3498db;
}

.modal-body p {
  font-size: 1.1em;
  color: #333;
}
</style>
