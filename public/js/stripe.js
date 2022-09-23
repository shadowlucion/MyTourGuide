const stript = Stripe(
  "pk_test_51KsOXMSCrXTMrsPh538hllEIbM9vkCIfrBOY21T6HeapnfTJktXGgWnq5Au6TJdbxrQq3MOEqcAnTx8y2p1GrYSl00m5fmNKAD"
);
import axios from "axios";

export const bookTour = async (tourId) => {
  // 1) Get the session from server
  const session = await axios(
    `localhost:3000/api/v1/bookings/checkout-session/${tourId}`
  );

  console.log(session);

  // 2) Create checkout form + charge credit card
};
