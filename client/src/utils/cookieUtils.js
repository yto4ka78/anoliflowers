import Cookies from "js-cookie";

export const getCart = () => {
  const cookie = Cookies.get("cart");
  return cookie ? JSON.parse(cookie) : [];
};

export const saveCart = (cart) => {
  Cookies.set("cart", JSON.stringify(cart), { expires: 7 });
};

export const addToCart = (productId, price) => {
  const cart = getCart();
  const existing = cart.find((item) => item.id === productId);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ id: productId, quantity: 1, price: price });
  }

  saveCart(cart);
};
