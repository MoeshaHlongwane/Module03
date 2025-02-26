<template>
  
  <div v-if="cartItems.length > 0" class="cart-container">
    <div class="cart-header">
      <div class="user-name">Hello, Guest!</div>
      <div class="cart-summary">
        <div class="total-price">Total: R{{ cartTotal | currency }}</div>
      </div>
    </div>
    <transition-group name="fade" tag="ul" class="cart-items-list">
      <li v-for="item in cartItems" :key="item.cart_id" class="cart-item">
        <div class="cart-item-details">
          <img :src="item.image_url" alt="Product Image" class="cart-item-image" />
          <div class="item-info">
            <div class="item-name">{{ item.product_name }}</div>
            <div class="item-description">{{ item.description }}</div>
            <div class="item-price">R{{ item.price }}</div>
            <div class="item-quantity">Quantity: {{ item.quantity }}</div>
          </div>
        </div>
        <div class="item-actions">
          <button @click="removeFromCart(item.cart_id)" class="action-button remove">
            <i class="fas fa-trash"></i> 
          </button>
          <button @click="increaseQuantity(item.cart_id)" class="action-button increase">
            <i class="fas fa-plus-circle"></i> 
          </button>
          <button @click="decreaseQuantity(item.cart_id)" class="action-button decrease">
            <i class="fas fa-minus-circle"></i> 
          </button>
        </div>
      </li>
    </transition-group>
    <div class="checkout-container">
      <router-link to="/checkout" class="checkout-btn">Proceed to Checkout</router-link>
    </div>
    
  </div>
  <div v-else class="empty-cart">
    <p>Your cart is empty.</p>
  </div>
</template>


<script>
export default {
  computed: {
    cartItems() {
      return this.$store.state.cart;
    },
    cartTotal() {
      return this.$store.state.cartTotal;
    },
  },
  methods: {
    async removeFromCart(cart_id) {
      await this.$store.dispatch("removeFromCart", cart_id);
      this.$store.dispatch("fetchCartTotal");
    },
    async increaseQuantity(cart_id) {
      const item = this.cartItems.find((item) => item.cart_id === cart_id);
      if (item) {
        await this.$store.dispatch("updateCartItem", {
          cart_id: item.cart_id,
          quantity: Number(item.quantity) + 1,
        });
      }
      await this.$store.dispatch("fetchCartTotal");
    },
    async decreaseQuantity(cart_id) {
      const item = this.cartItems.find((item) => item.cart_id === cart_id);
      if (item && item.quantity > 1) {
        await this.$store.dispatch("updateCartItem", {
          cart_id: item.cart_id,
          quantity: Number(item.quantity) - 1,
        });
      }
      await this.$store.dispatch("fetchCartTotal");
    }
  },
  created() {
    this.$store.dispatch("fetchCart");
    this.$store.dispatch("fetchCartTotal");
  },
  watch: {
    cartTotal(newTotal) {
      console.log("Updated Cart Total:", newTotal);
    }
  }
};
</script>

<style scoped>
.cart-container {
  font-family: 'Helvetica Neue', Arial, sans-serif;
  background-color: #fafafa;
  padding: 30px;
  border-radius: 10px;
  max-width: 1200px;
  margin: 0 auto;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.cart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #2C3E50;
  color: #fff;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 30px;
}

.cart-items-list {
  list-style-type: none;
  padding: 0;
}

/* Transition for cart items */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease, transform 0.3s ease;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

.cart-item {
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  margin-bottom: 15px;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.cart-item-details {
  display: flex;
  flex: 1;
}

.cart-item-image {
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 8px;
  margin-right: 20px;
}

.item-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
}

.item-name {
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 10px;
}

.item-description {
  font-size: 14px;
  color: #777;
  margin-bottom: 10px;
}

.item-price {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 5px;
}

.item-quantity {
  color: #555;
  font-size: 14px;
}

.item-actions {
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: space-between;
  align-items: flex-end;
}

.action-button {
  padding: 10px 15px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.remove {
  background-color: #e74c3c;
  color: white;
}

.increase {
  background-color: #27ae60;
  color: white;
}

.decrease {
  background-color: #f39c12;
  color: white;
}

.action-button:hover {
  opacity: 0.9;
}

/* Container to center the checkout button */
.checkout-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.checkout-btn {
  display: inline-block;
  padding: 15px 30px;
  background-color: #3498db;
  color: white;
  font-size: 18px;
  border-radius: 8px;
  text-decoration: none;
  margin-top: 30px;
  text-align: center;
}

.checkout-btn:hover {
  background-color: #2980b9;
}

.empty-cart {
  text-align: center;
  font-size: 18px;
  color: #888;
}

</style>
