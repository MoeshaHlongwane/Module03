import { createStore } from "vuex";

export default createStore({
  state: {
    All_Products: null,
    Single_Product: null,
    cart: [],
    cartTotal: 0,
    user_id: localStorage.getItem("user_id")||null, // Assuming a user ID is needed, adjust as needed
  },
  mutations: {
    // items / products
    setAll_Products(state, payload) {
      state.All_Products = payload;
    },
    setSingle_Product(state, payload) {
      state.Single_Product = payload;
    },
    // cart
    SET_CART_ITEMS(state, cartItems) {
      state.cart = cartItems;
    },
    SET_CART_TOTAL(state, total) {
      state.cartTotal = total;
    },
    REMOVE_ITEM_FROM_CART(state, productId) {
      state.cart = state.cart.filter(item => item.product_id !== productId);
    },
    UPDATE_ITEM_QUANTITY(state, { cart_id, newQuantity }) {
      const item = state.cart.find(item => item.cart_id === cart_id);
      if (item) {
        item.quantity = newQuantity;
      }
    },
    SET_USER_ID(state, user_id){
      state.user_id = user_id;
      localStorage.setItem("user_id", user_id); // Store in localStorage
    },
    CLEAR_USER_ID(state) {
      state.user_id = null;
      localStorage.removeItem("user_id"); // Clear from localStorage
    },
  },
  actions: {
    async getData({ commit }) {
      try {
        const response = await fetch("http://localhost:5050/products");
        const { All_Products } = await response.json();
        const updatedProducts = All_Products.map((product) => {
          let baseUrl = "https://raw.githubusercontent.com/awonkenkibi/images/main/";
          if (product.category_name === "Women") {
            baseUrl += "WomenProducts/";
          } else if (product.category_name === "Men") {
            baseUrl += "MenProducts/";
          } else if (product.category_name === "Kids") {
            baseUrl += "KidsProducts/";
          } else {
            baseUrl += "OtherProducts/";
          }
          return {
            ...product,
            image_url: `${baseUrl}${product.image_url.split("/").pop()}`,
          };
        });
        commit("setAll_Products", updatedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    },
    async getSingleProduct({ commit }, product_id) {
      try {
        const response = await fetch(`http://localhost:5050/products/${product_id}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const { single_product } = await response.json();
        console.log("API Response:", single_product);
        let baseUrl = "https://raw.githubusercontent.com/awonkenkibi/images/main/";
        if (single_product.category_name === "Women") {
          baseUrl += "WomenProducts/";
        } else if (single_product.category_name === "Men") {
          baseUrl += "MenProducts/";
        } else if (single_product.category_name === "Kids") {
          baseUrl += "KidsProducts/";
        } else {
          baseUrl += "OtherProducts/";
        }
        single_product.image_url = `${baseUrl}${single_product.image_url.split("/").pop()}`;
        commit("setSingle_Product", single_product);
      } catch (error) {
        console.error("Error fetching single product:", error);
      }
    },
    async fetchCart({ commit, state, dispatch }) {
      try {
        // Ensure that the products are loaded before fetching the cart
        if (!state.All_Products) {
          await dispatch("getData");
        }
    
        const response = await fetch(`http://localhost:5050/cart/${state.user_id}`);
        if (!response.ok) throw new Error("Error fetching cart");
        const cartData = await response.json();

        // Add image URLs for each cart item
        const updatedCart = cartData.map((item) => {
          let baseUrl = "https://raw.githubusercontent.com/awonkenkibi/images/main/";
          const product = state.All_Products.find(product => product.product_id === item.product_id);
          if (product) {
            if (product.category_name === "Women") {
              baseUrl += "WomenProducts/";
            } else if (product.category_name === "Men") {
              baseUrl += "MenProducts/";
            } else if (product.category_name === "Kids") {
              baseUrl += "KidsProducts/";
            } else {
              baseUrl += "OtherProducts/";
            }
            item.image_url = `${baseUrl}${product.image_url.split("/").pop()}`;
          }
          return item;
        });
    
        commit("SET_CART_ITEMS", updatedCart);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    },
    async fetchCartTotal({ commit, state }) {
      try {
        const response = await fetch(`http://localhost:5050/cart/total/${state.user_id}`);
        if (!response.ok) throw new Error("Error fetching cart total");
        const { total } = await response.json();
        commit("SET_CART_TOTAL", total);
      } catch (error) {
        console.error("Error fetching cart total:", error);
      }
    },

    //dispatch this on the add tp button to add to cart
    async addToCart({ dispatch, state }, { product_id, quantity, size }) {
      try {
        // Store user_id in localStorage if not already stored
        if (!state.user_id) {
          console.error("User ID is required but not found in state.");
          return;
        }

        const response = await fetch("http://localhost:5050/cart", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: state.user_id,
            product_id,
            quantity,
            size, // Ensure size is included
          }),
        });
        if (!response.ok) throw new Error("Error adding item to cart");
        await dispatch("fetchCart");
      } catch (error) {
        console.error("Error adding to cart:", error);
      }
    },

    async updateCartItem({ dispatch }, { cart_id, quantity }) {
      if (!cart_id) {
        console.error("cart_id is required but is missing");
        return;
      }
      try {
        const response = await fetch("http://localhost:5050/cart", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ cart_id, quantity }), // Only sending cart_id and quantity
        });
        if (!response.ok) throw new Error("Error updating cart item");
        await dispatch("fetchCart"); // Refresh cart after update
      } catch (error) {
        console.error("Error updating cart item:", error);
      }
    },
    
    async removeFromCart({ dispatch }, cart_id) {
      try {
        const response = await fetch(`http://localhost:5050/cart/${cart_id}`, {
          method: "DELETE",
        });
        if (!response.ok) throw new Error("Error removing item from cart");
        await dispatch("fetchCart"); // Refresh cart after removal
      } catch (error) {
        console.error("Error removing from cart:", error);
      }
    },

    async clearCart({ dispatch, state }) {
      try {
        const response = await fetch(`http://localhost:5050/cart/drop/${state.user_id}`, {
          method: "DELETE",
        });
        if (!response.ok) throw new Error("Error clearing cart");
        await dispatch("fetchCart"); // Refresh cart after clearing
      } catch (error) {
        console.error("Error clearing cart:", error);
      }
    },
    setUserId({ commit }, user_id) {
      commit("SET_USER_ID", user_id);
    },
      clearUserId({ commit }) {
        commit("CLEAR_USER_ID");
    },
  },
});
