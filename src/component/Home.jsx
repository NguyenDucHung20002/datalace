import React, { useEffect, useState } from "react";
import {
  Routes,
  Route,
  Navigate,
  Outlet,
  useLocation,
} from "react-router-dom";
import HomePage from "./homepage/homepage";
import App from "./../App";
import Login from "./homepage/Login/loginPage";
import SignUp from "./homepage/SignUp/SignUp";
import ForgotPassword from "./homepage/ForgotPassword/ForgotPassword";
import Cookies from "js-cookie";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Profile from "./chat/ProfileUser";
import ContactUs from "./homepage/ContactUs";
import LayoutHomepage from "./homepage/LayoutHomepage";
import LearnMore from "./homepage/LearnMore";
import AboutUs from "./homepage/AboutUs";
import Blogs from "./homepage/Blogs";
import Testimonials from "./homepage/Testimonials";
import Product from "./homepage/OurProcess";
import BlogDetail from "./homepage/BlogDetail";
import BlogDetail_v1 from "./homepage/BlogDetail_v1";
import BlogDetail_v2 from "./homepage/BlogDetail_v2";
import BlogDetail_v3 from "./homepage/BlogDetail_v3";
import TestimonialsV2 from "./homepage/TestimonialsV2";
import AddNewBlog from "./homepage/AddNewBlog";
import PrivacyPolicy from "./homepage/PrivacyPolicy";
import RequestADemo from "./homepage/RequestADemo";

export const userContext = React.createContext();
export const chatContext = React.createContext();
export const menuContext = React.createContext();
export const languageContext = React.createContext();

const ScrollToTop = () => {
  // Extracts pathname property(key) from an object
  const { pathname } = useLocation();

  // Automatically scrolls to top whenever pathname changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
}

export default function Home() {
  const [user, setUser] = useState('');
  const [chatTabs, setChatTabs] = useState(["chat"]);
  const [chatHistory, setchatHistory] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [colMenu, setColMenu] = useState(0);
  const [filename, setfilename] = useState("");
  const [typefile, settypefile] = useState("");
  const [language, setLanguage] = useState("en");
  const PrivateLogin = () => {
    return !!Cookies.get("accessToken") ? <Navigate to="/chat" /> : <Outlet />;
  };
  const PrivateLogout = () => {
    return !!Cookies.get("accessToken") ? <Outlet /> : <Navigate to="/login" />;
  };
  return (
    <userContext.Provider value={{ user, setUser }}>
      <chatContext.Provider
        value={{
          chatHistory,
          setchatHistory,
          filename,
          setfilename,
          typefile,
          settypefile,
        }}
      >
        <menuContext.Provider
          value={{ menuOpen, setMenuOpen, colMenu, setColMenu }}
        >
          <GoogleOAuthProvider clientId="681330699227-e9l3m65f3n6cu7vm4o5i3c207pppg164.apps.googleusercontent.com">
    <languageContext.Provider value={{language, setLanguage}}>
            <Routes>
              <Route path="/" element={<LayoutHomepage />}>
                <Route index element={<HomePage />} />
                <Route path="/contact-us" element={<ContactUs />} />
                <Route path="/learn-more" element={<LearnMore />} />
                <Route path="/about-us" element={<AboutUs />} />
                <Route path="/blogs" element={<Blogs />} />
                <Route path="/testimonials" element={<Testimonials />} />
                <Route path="/product" element={<Product />} />
                <Route path="/blog-detail" element={<BlogDetail />} />
                <Route path="/blog-detail-v1" element={<BlogDetail_v1 />} />
                <Route path="/blog-detail-v2" element={<BlogDetail_v2 />} />
                <Route path="/blog-detail-v3" element={<BlogDetail_v3 />} />
                <Route path="/testimonial" element={<TestimonialsV2/>} />
                <Route path="/add-new-blog" element={<AddNewBlog/>}/>
                <Route path="/privacy-policy" element={<PrivacyPolicy/>}/>
                <Route path="/request-a-demo" element={<RequestADemo/>}/>
              </Route>
              <Route path="/login" element={<PrivateLogin />}>
                <Route index element={<Login />} />
              </Route>
              <Route path="/signup" element={<PrivateLogin />}>
                <Route index element={<SignUp />} />
              </Route>
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/chat" element={<PrivateLogout />}>
                <Route index element={<App />} />
                <Route path="profile" element={<Profile />} />
                
              </Route>
            </Routes>
            <ScrollToTop/>
            </languageContext.Provider>
          </GoogleOAuthProvider>
        </menuContext.Provider>
      </chatContext.Provider>
    </userContext.Provider>

    // test
  );
}
