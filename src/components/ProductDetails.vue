<template>
  <div class="container mt-4">
    <!-- Back to Products Button -->
    <button class="btn btn-secondary mb-4" @click="goBackToProducts">
      <i class="fas fa-arrow-left me-2"></i> Back to Products
    </button>

    <div class="row">
      <!-- Product Image -->
      <div class="col-md-6">
        <img :src="product.image_url" class="img-fluid" alt="Product Image" />
      </div>

      <!-- Product Details -->
      <div class="col-md-6">
        <h2>{{ product.product_name }}</h2>
        <p class="text-muted">R{{ product.price }}</p>
        <p>{{ product.description }}</p>

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
        <button class="btn btn-primary" @click="checkRegistration">
          Add to Cart
        </button>
      </div>
    </div>
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
          <p>You need to login </p>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" @click="closeModal">
            Close
          </button>
          <button
            class="btn btn-primary"
            @click="redirectToRegistration"
          >
            login
          </button>
        </div>
      </div>
    </div>
  </div>
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
.img-fluid {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
}

.btn-secondary {
  background-color: #6c757d;
  border-color: #6c757d;
}

.btn-secondary:hover {
  background-color: #5a6268;
  border-color: #545b62;
}

.text-danger {
  font-size: 0.875em;
  color: red;
}
.modal-dialog {
  max-width: 500px;
  margin: 100px auto;
}

.modal-content {
  border-radius: 8px;
  overflow: hidden;
}
</style>
