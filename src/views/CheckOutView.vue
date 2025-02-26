<template>
 <div class="body">
  <div class="checkout">
    <h2>Checkout</h2>
    <div v-if="userDetails">
      <h3>User Information</h3>
      <p><strong>Name:</strong> {{ userDetails.name }}</p>
      <p><strong>Email:</strong> {{ userDetails.email }}</p>
      
      <h3>Shipping Address</h3>
      <div v-if="userDetails.shipping_address">
       <p><strong>Address:</strong> {{ userDetails.shipping_address }}</p>
       <p><strong>City:</strong> {{ userDetails.city }}</p>
       <p><strong>Postal Code:</strong> {{ userDetails.zipcode }}</p>
       <p><strong>Country:</strong> {{ userDetails.country }}</p>
      </div>
      <div v-else>
        <p class="error">Please add your shipping details below.</p>
        <input v-model="shipping.name" placeholder="Name" required />
        <input v-model="shipping.address" placeholder="Address" required />
        <input v-model="shipping.city" placeholder="City" required />
        <input v-model="shipping.zipcode" placeholder="Zip Code" required />
        <input v-model="shipping.country" placeholder="Country" required />
      </div>
    </div>
    <h3>Order Items</h3>
    <div v-for="item in order_items" :key="item.product_id">
      <img :src="item.image_url || 'path/to/placeholder-image.jpg'" alt="Product Image" />

      <p>{{ item.quantity }} x Product {{ item.product_id }} - R{{ item.price }}</p>
    </div>
    <h3 align="center">Cart Total: R{{ totalPrice }}</h3>
    <h3 align="center">Delivery Fee: R{{ deliveryFee }}</h3>
    <h2>Total: R{{ totalPrice + deliveryFee }} </h2>
    <button @click="placeOrder">Place Order</button>
  </div>
 </div>
  
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      userDetails: null,
      order_items: [],
      totalPrice: 0,
      deliveryFee: 0,
      total: 0,
      shipping: {
        address: "",
        city: "",
        postal_code: "",
        country: "",
      },
    };
  },
  async created() {
  const userId = localStorage.getItem("user_id");
  try {
    const response = await axios.get(`${process.env.VUE_APP_API_URL}/api/checkout/${userId}`);
    this.userDetails = response.data.userDetails;
    this.order_items = response.data.cartItems;

    // Update image URLs similar to getData method
    this.order_items = this.order_items.map((item) => {
      let baseUrl = "https://raw.githubusercontent.com/awonkenkibi/images/main/";
      if (item.category_name === "Women") {
        baseUrl += "WomenProducts/";
      } else if (item.category_name === "Men") {
        baseUrl += "MenProducts/";
      } else if (item.category_name === "Kids") {
        baseUrl += "KidsProducts/";
      } else {
        baseUrl += "OtherProducts/";
      }
      const imageUrl = `${baseUrl}${item.image_url.split('/').pop()}`;
  console.log("Generated Image URL:", imageUrl);  // Log the URL to check if it’s correct

  return {
    ...item,
    image_url: imageUrl,
  };
});

    this.deliveryFee = 100;
    this.totalPrice = this.order_items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  } catch (error) {
    console.error("Error fetching checkout data:", error);
  }
},
  methods: {
    async placeOrder() {
      const userId = localStorage.getItem("user_id");
      try {
        const response = await axios.post(`${process.env.VUE_APP_API_URL}/api/checkout`, {
          user_id: userId,
          items: this.order_items,
          total_price: this.totalPrice,
          shipping_details: this.userDetails.address
            ? this.userDetails
            : this.shipping,
        });
        if (response.data.success) {
          this.$router.push({ name: "Payment", params: { orderId: response.data.order_id } });
        } else {
          alert("Failed to place order.");
        }
      } catch (error) {
        console.error(error);
        alert("An error occurred while placing the order.");
      }
    },
  },
};
</script>
<style scoped>
.error {
  color: red;
}
.checkout {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f4ece0;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  font-family: Arial, sans-serif;
  color: #4e3629;
}

h2, h3 {
  color: #6b4f35;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

h3 {
  margin-top: 20px;
}

p {
  margin: 5px 0;
}

strong {
  color: #8a5a44;
}

.error {
  color: #d9534f;
  font-weight: bold;
}

input {
  display: block;
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #c4a484;
  border-radius: 5px;
  box-sizing: border-box;
}

input:focus {
  border-color: #8a5a44;
  outline: none;
}

img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
  margin-right: 10px;
}

button {
  display: block;
  width: 100%;
  padding: 15px;
  background-color: #8a5a44;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #6b4f35;
}
</style>









