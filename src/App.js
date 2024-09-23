import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./Store/Store";
import Trader from "./Trader-Signup/Trader";
import TraderLogin from "./Trader-Login/Login";
import BuyerLogin from "./Buyer-Login/BuyerLogin";
import BuyerSignUp from "./Buyer-Signup/BuyerSignup";
import Otp from "./otp/Otp";
import TraderDashboard from "./Trader-Dashboard/TraderDashboard";
import BuyerDashboard from "./BuyerDashboard/BuyerDashboard";
import Home from "./HomePage/Home";
import HomeProduct from "./HomeProduct/HomeProduct";
import LoginAuthOptions from "./LoginAuthOptions/loginAuthOptions";
import SignUpAuthOptions from "./SignUpAuthOptions/SignUpAuthOptions";
import AdminLogin from "./Admin/AdminLogin/AdminLogin";
import AdminDashboard from "./Admin/AdminDashboard/AdminDashboard";
import LogisticsLogin from "./Logistics/LogisticsLogin/LogisticsLogin";
import LogisticsDashboard from "./Logistics/LogisticsDashboard/LogisticsDashboard";
import CustomerSupport from "./CustomerSupport/CustomerSupport";
import AboutUs from "./AboutUs/AboutUs";
import CheckOutOverview from "./CheckOutOverview/CheckOutOverview";
import Unscubscribe from "./Subscription/Unsubscribe/Unscubscribe";
import Subscribe from "./Subscription/Subscribe/Subscribe";
import TermsOfService from "./Terms/TermsOfService/TermsOfService";
import PrivacyPolicy from "./Terms/Policy/PrivacyPolicy";
import ReturnsPolicy from "./Terms/Policy/ReturnsPolicy";
import ShopHome from "./Shops/ShopHome";
import SellerVerification from "./SellerVerification/SellerVerification";
import PageNotFound from "./PageNotFound/PageNotFound";
import DeleteAccount from "./DeleteAccount/DeleteAccount";
import ViewCategory from "./ViewCategory/ViewCategory";
import Join from "./Join/Join";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product" element={<HomeProduct />} />
            <Route path="/traderdashboard" element={<TraderDashboard />} />
            <Route path="/buyerdashboard" element={<BuyerDashboard />} />
            <Route path="/otp" element={<Otp />} />
            <Route path="/signup" element={<Trader />} />
            <Route path="/login" element={<TraderLogin />} />
            <Route path="/buyerlogin" element={<BuyerLogin />} />
            <Route path="/buyersignup" element={<BuyerSignUp />} />
            <Route path="/loginoptions" element={<LoginAuthOptions />} />
            <Route path="/SignupOptions" element={<SignUpAuthOptions />} />
            <Route path="/adminlogin" element={<AdminLogin />} />
            <Route path="/admindashboard" element={<AdminDashboard />} />
            <Route path="/logisticslogin" element={<LogisticsLogin />} />
            <Route path="/support" element={<CustomerSupport />} />
            <Route path="/checkout" element={<CheckOutOverview />} />
            <Route
              path="/logisticsdashboard"
              element={<LogisticsDashboard />}
            />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/unsubscribe" element={<Unscubscribe />} />
            <Route path="/subscribe" element={<Subscribe />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/returns-policy" element={<ReturnsPolicy />} />
            <Route
              path="/seller-verification"
              element={<SellerVerification />}
            />
            <Route path="/shop" element={<ShopHome />} />
            <Route path="/delete-account" element={<DeleteAccount />} />
            <Route path="/category" element={<ViewCategory />} />
            <Route path="/join-us" element={<Join />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
