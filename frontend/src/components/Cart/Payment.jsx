import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import PriceSidebar from "./PriceSidebar";
import Stepper from "./Stepper";
//import {
//  CardNumberElement,
//  CardCvcElement,
// CardExpiryElement,
//  useStripe,
//  useElements,
//} from "@stripe/react-stripe-js";
import { clearErrors } from "../../actions/orderAction";
import { useSnackbar } from "notistack";
import { post } from "../../utils/paytmForm";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import MetaData from "../Layouts/MetaData";

const Payment = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  // const stripe = useStripe();
  // const elements = useElements();
  //const paymentBtn = useRef(null);

  const [paymentMethod, setPaymentMethod] = useState("paytm");

  const [payDisable, setPayDisable] = useState(false);

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.newOrder);

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const paymentData = {
    amount: Math.round(totalPrice),
    email: user.email,
    phoneNo: shippingInfo.phoneNo,
  };

  const order = {
    shippingInfo,
    orderItems: cartItems,
    totalPrice,
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    setPayDisable(true);

    if (paymentMethod === "paytm") {
      try {
        console.log("COD selected");

        const order = {
          shippingInfo,
          orderItems: cartItems,
          totalPrice,
          paymentInfo: {
            id: "COD",
            status: "pending",
          },
        };

        dispatch({ type: "CREATE_ORDER_SUCCESS", payload: order });
        dispatch({ type: "EMPTY_CART" });

        enqueueSnackbar("Order placed successfully!", { variant: "success" });
        setPayDisable(false); // Re-enable button after success
        navigate("/order/success");
      } catch (error) {
        console.error("Error placing COD order:", error);
        setPayDisable(false); // Re-enable button on error
        enqueueSnackbar("Failed to place order. Please try again.", {
          variant: "error",
        });
      }
    } else {
      try {
        console.log("Processing Paytm payment");
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };

        const { data } = await axios.post(
          "/api/v1/payment/process",
          paymentData,
          config
        );

        let info = {
          action: "https://securegw-stage.paytm.in/order/process",
          params: data.paytmParams,
        };

        post(info);
        // Consider re-enabling the button if payment processing is handled externally
      } catch (error) {
        console.error("Error processing payment:", error);
        setPayDisable(false); // Re-enable button on error
        enqueueSnackbar(error.message, { variant: "error" });
      }
    }
  };

  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
      enqueueSnackbar(error, { variant: "error" });
    }
  }, [dispatch, error, enqueueSnackbar]);

  return (
    <>
      <MetaData title="BossB's: Secure Payment" />

      <main className="w-full mt-20">
        {/* <!-- row --> */}
        <div className="flex flex-col sm:flex-row gap-3.5 w-full sm:w-11/12 mt-0 sm:mt-4 m-auto sm:mb-7">
          {/* <!-- cart column --> */}
          <div className="flex-1">
            <Stepper activeStep={3}>
              <div className="w-full bg-white">
                <form
                  onSubmit={(e) => submitHandler(e)}
                  autoComplete="off"
                  className="flex flex-col justify-start gap-2 w-full mx-8 my-4 overflow-hidden"
                >
                  <FormControl>
                    <RadioGroup
                      aria-labelledby="payment-radio-group"
                      defaultValue="paytm"
                      name="payment-radio-button"
                    >
                      <FormControlLabel
                        value="paytm"
                        control={<Radio />}
                        label={
                          <div className="flex items-center gap-4">
                            <img
                              draggable="false"
                              className="h-6 w-6 object-contain"
                              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2OgI3xJzLA95Bcn9ZnUhZchEkJ4BuwhiUMQ&s"
                              alt="COD"
                            />
                            <span>Cash on Delivery</span>
                          </div>
                        }
                      />
                    </RadioGroup>
                  </FormControl>

                  <input
                    type="submit"
                    value={`Pay ₱${totalPrice.toLocaleString()}`}
                    disabled={payDisable ? true : false}
                    className={`${
                      payDisable
                        ? "bg-primary-grey cursor-not-allowed"
                        : "bg-primary-orange cursor-pointer"
                    } w-1/2 sm:w-1/4 my-2 py-3 font-medium text-white shadow hover:shadow-lg rounded-sm uppercase outline-none`}
                  />
                </form>

                {/* stripe form */}
                {/*
                {paymentMethod === "stripe" && (
                  <form
                    onSubmit={(e) => submitHandler(e)}
                    autoComplete="off"
                    className="flex flex-col justify-start gap-3 w-full sm:w-3/4 mx-8 my-4"
                  >
                    <div>
                      <CardNumberElement />
                    </div>
                    <div>
                      <CardExpiryElement />
                    </div>
                    <div>
                      <CardCvcElement />
                    </div>
                    <input
                      ref={paymentBtn}
                      type="submit"
                      value="Pay"
                      className="bg-primary-orange w-full sm:w-1/3 my-2 py-3.5 text-sm font-medium text-white shadow hover:shadow-lg rounded-sm uppercase outline-none cursor-pointer"
                    />
                  </form>
                )}
                */}
                {/* stripe form */}
              </div>
            </Stepper>
          </div>

          <PriceSidebar cartItems={cartItems} />
        </div>
      </main>
    </>
  );
};

export default Payment;
