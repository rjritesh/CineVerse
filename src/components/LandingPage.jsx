import { useEffect, useState } from "react";
import homeBg from "../assets/homeBg.png";
import Form from "../components/Form";
import { IoMdClose } from "react-icons/io";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/UserSlice";
import { useNavigate } from "react-router-dom";
import AppFeatures from "./AppFeatures";
import Footer from "./Footer";

const LandingPage = () => {
  // State to control whether the Sign In/Sign Up modal is visible
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Redux dispatch for storing/removing user data globally
  const dispatch = useDispatch();

  // React Router hook for programmatic navigation
  const navigate = useNavigate();

  // ------------------- Firebase Authentication Listener -------------------
  // useEffect runs once when the component mounts
  useEffect(() => {
    // onAuthStateChanged listens to changes in authentication state
    // It triggers every time a user logs in or logs out
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // ✅ User is logged in
        const { uid, email, displayName } = user;

        // Store user info in Redux global state
        dispatch(addUser({ uid, email, displayName }));

        // Redirect user to the main browsing page after login
        navigate("/browse");
      } else {
        // 🚫 User is logged out
        dispatch(removeUser());

        // Redirect user to the landing page
        navigate("/");
      }
    });

    // Cleanup function to unsubscribe from Firebase listener when component unmounts
    return () => unSubscribe();
  }, []);

  return (
    <div
      id="LandingPage"
      className="relative h-screen w-full text-white"
      style={{ fontFamily: "Montserrat, sans-serif" }} // global font
    >
      {/* ================= Background Section ================= */}
      {/* Full-screen background image */}
      <img
        src={homeBg}
        alt="Background"
        className="absolute top-0 left-0 w-full h-full object-cover -z-10"
      />
      {/* Semi-transparent overlay for better text readability */}
      <div className="absolute inset-0 bg-black/60 -z-10"></div>

      {/* ================= Logo Section ================= */}
      <div className="absolute top-4 sm:top-6 z-20 px-4 sm:px-10">
        {/* Gradient text logo */}
        <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent tracking-wide">
          CineVerse
        </h1>
      </div>

      {/* ================= Hero Section ================= */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 sm:px-6 lg:px-8">
        {/* Main heading, responsive for mobile/tablet/desktop */}
        <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 leading-none">
          Smarter movie recommendations<br />
          powered by AI
        </h2>


        {/* Subheading / tagline */}
        <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-8 sm:mb-10 max-w-3xl sm:max-w-4xl px-2 sm:px-0">
          Find new, popular & upcoming entertainment with CineVerse.
        </p>

        {/* "Get Started" button that opens the modal */}
        <button
          className="px-6 sm:px-10 py-2 sm:py-3 rounded-lg text-base sm:text-lg font-semibold bg-gradient-to-r from-pink-600 to-violet-600 hover:from-pink-700 hover:to-violet-700 transition duration-300 shadow-lg cursor-pointer"
          onClick={() => setIsFormOpen(true)}
        >
          Get Started
        </button>
      </div>

      {/* ================= Modal Form Section ================= */}
      {isFormOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Overlay behind modal, clicking closes the modal */}
          <div
            className="absolute inset-0 backdrop-blur-sm"
            onClick={() => setIsFormOpen(false)}
          ></div>

          {/* Modal container, responsive width */}
          <div className="relative z-50 w-72 sm:w-80 md:w-96 mx-4">
            {/* Close icon button */}
            <button
              className="absolute top-2 right-2 text-white text-2xl font-bold cursor-pointer"
              onClick={() => setIsFormOpen(false)}
            >
              <IoMdClose />
            </button>

            {/* Actual form component */}
            <Form />
          </div>
        </div>
      )}

      {/* ================= Additional Sections ================= */}
      <AppFeatures /> {/* Features section */}
      <Footer />      {/* Footer section */}
    </div>
  );
};

export default LandingPage;
