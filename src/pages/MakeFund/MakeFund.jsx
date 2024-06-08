import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

// TODO: add publishable key
const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);
const MakeFund = () => {
  //     const makeDonation = (e)=> {
  // e.preventDefault();
  // const amount = e.target.value
  // console.log(amount);
  //     }
  return (
    <div>
      <div className="card-body">
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      </div>
    </div>
  );
};

export default MakeFund;
