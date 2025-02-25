<template>
  <div class="cart-container">
    <router-link to="/cart" class="cart-icon">
      <i class="fas fa-shopping-cart"></i>
      <span class="cart-count" :key="cartCount">{{ cartCount }}</span>
    </router-link>
  </div>
</template>


<script>
export default {
  name: "Cart",
  computed: {
    cartCount() {
      return this.$store.state.cart.reduce((total, item) => total + Number(item.quantity), 0);
    },
  },
};
</script>
<style>
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
