import { useSelector } from "react-redux";

import BackdropLoader from "../Layouts/BackdropLoader";
import MetaData from "../Layouts/MetaData";
import FormSidebar from "./FormSidebar";

const Terms = () => {
  const { loading } = useSelector((state) => state.profile);
  return (
    <>
      <MetaData title="Terms & Conditions | BossB's" />
      {loading && <BackdropLoader />}
      <main className="w-full mt-12 sm:pt-20 sm:mt-0 rounded-l-3xl">
        {/* <!-- row --> */}
        <div className="flex sm:w-4/6 sm:mt-4 m-auto mb-7 rounded-l-3xl bg-white shadow-lg ">
          <FormSidebar title="Boss B's Terms and Conditions" tag=" " />

          {/* <!-- signup column --> */}
          <div className="p-8 flex-1 overflow-hidden rounded-l-3xl">
            <h2 className="text-center text-l font-medium mt-6 text-gray-800">
              Before you start browsing and making purchases, we kindly ask you
              to read and understand the following terms and conditions
              carefully:
            </h2>
            {/* <!-- personal info procedure container --> */}
            <h3 className="text-justify text-xxs font-small mt-4 text-gray-800">
              1. Acceptance of Terms: By accessing or using Boss B's, you agree
              to be bound by these terms and conditions. If you do not agree
              with any part of these terms, you may not access the website or
              use any of its services.
            </h3>
            <h3 className="text-justify text-xxs font-small mt-4 text-gray-800">
              2. Product Information: We strive to provide accurate product
              descriptions, images, and specifications on our website. However,
              we do not guarantee the accuracy, completeness, or reliability of
              any information provided. It is your responsibility to verify the
              accuracy of product details before making a purchase.
            </h3>
            <h3 className="text-justify text-xxs font-small mt-4 text-gray-800">
              3. Ordering and Payment: Placing an order on Boss B's constitutes
              an offer to purchase the products listed in your order. All orders
              are subject to availability and acceptance by us. Payment must be
              made in full at the time of placing the order. We accept various
              payment methods, including credit/debit cards, PayPal, and bank
              transfers.
            </h3>
            <h3 className="text-justify text-xxs font-small mt-4 text-gray-800">
              4. Shipping and Delivery: We endeavor to ship orders in a timely
              manner and deliver them to the address provided during checkout.
              However, delivery times may vary depending on your location and
              other factors beyond our control. We will notify you of any delays
              or issues with your order as soon as possible.
            </h3>
            <h3 className="text-justify text-xxs font-small mt-4 text-gray-800">
              5. Returns and Refunds: We want you to be completely satisfied
              with your purchase. If for any reason you are not satisfied, you
              may return the product(s) within 7 days of receipt for a refund or
              exchange, subject to our returns policy. Please refer to our
              Returns Policy for detailed information on how to initiate a
              return.
            </h3>
            <h3 className="text-justify text-xxs font-small mt-4 text-gray-800">
              6. Intellectual Property: All content, including text, images,
              logos, and trademarks, displayed on Boss B's is the property of
              Boss B's or its licensors and is protected by copyright and other
              intellectual property laws. You may not use, reproduce, or
              distribute any content from our website without our prior written
              consent.
            </h3>
            <h3 className="text-justify text-xxs font-small mt-4 text-gray-800">
              7. Privacy and Security: We are committed to protecting your
              privacy and ensuring the security of your personal information.
              Please review our Privacy Policy to understand how we collect,
              use, and protect your data when you use our website or services.
            </h3>
            <h3 className=" text-xs font-small mt-4 text-gray-800">
              By continuing to use Boss B's, you acknowledge that you have read,
              understood, and agreed to these terms and conditions. If you have
              any questions or concerns about these terms and conditions, please
              contact us on Facebook. Thank you for choosing Boss B's!
            </h3>
            {/* <!-- personal info procedure container --> */}
          </div>
        </div>
        {/* <!-- row --> */}
      </main>
    </>
  );
};

export default Terms;
