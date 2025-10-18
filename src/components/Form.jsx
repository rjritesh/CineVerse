import { useRef, useState } from "react";
import { checkValidate } from "../utils/checkValidate";
import { auth } from "../utils/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/UserSlice";
import { LuLoaderPinwheel } from "react-icons/lu";

const Form = () => {
  // State to toggle between Sign In and Sign Up
  const [isSignIn, setIsSignIn] = useState(true);

  // State to show loading spinner during Firebase requests
  const [isLoading, setisLoading] = useState(false);

  // State to display error messages
  const [errorMessage, seterrorMessage] = useState(null);

  // State to toggle password visibility
  const [showPassword, setShowPassword] = useState(false);

  // Redux dispatch to update global user state
  const dispatch = useDispatch();

  // Refs to access input values directly
  const email = useRef(null);
  const name = useRef(null);
  const password = useRef(null);

  // Function to handle form submission
  const handleFormSubmit = () => {
    // ===================== Validation =====================
    // Check if email or password is empty
    if (!email.current.value || !password.current.value) {
      seterrorMessage("Please enter all the fields");
      return;
    }

    // Custom validation (like email format, password length)
    const message = checkValidate(email.current.value, password.current.value);
    seterrorMessage(message);

    if (message) return; // Stop submission if validation fails

    // ===================== Firebase Authentication =====================
    setisLoading(true); // Show spinner during request

    if (!isSignIn) {
      // ===== Sign Up Flow =====
      createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          const user = userCredential.user;

          // Update the display name after account creation
          updateProfile(user, {
            displayName: name.current.value
          }).then(() => {
            const { uid, email, displayName } = auth.currentUser;

            // Store user info in Redux global state
            dispatch(addUser({ uid, email, displayName }));
          }).catch(() => {
            // Error while updating profile
            seterrorMessage("Something went wrong. Please try again.");
          });
        })
        .catch((error) => {
          // Error during Firebase signup (e.g., email already exists)
          seterrorMessage(error.message);
        })
        .finally(() => setisLoading(false));
    } else {
      // ===== Sign In Flow =====
      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          // User signed in successfully
          const user = userCredential.user;
          // Redux update or navigation handled in LandingPage
        })
        .catch(() => {
          // Error during Firebase sign in (invalid credentials)
          seterrorMessage("User not found");
        })
        .finally(() => setisLoading(false));
    }
  };

  return (
    <form
      onSubmit={(e) => e.preventDefault()} // Prevent page reload
      className="bg-black rounded-md shadow-xl p-6 sm:p-8 w-72 sm:w-96 md:w-96 lg:w-96 flex flex-col gap-5 text-white"
    >
      {/* ===================== Form Title ===================== */}
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-center">
        {isSignIn ? "Sign In" : "Sign Up"}
      </h2>

      {/* ===================== Name Input (Sign Up only) ===================== */}
      {!isSignIn && (
        <input
          type="text"
          ref={name}
          required
          placeholder="Name"
          className="border border-gray-600 rounded-lg px-4 py-3 bg-transparent placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
      )}

      {/* ===================== Email Input ===================== */}
      <input
        ref={email}
        type="email"
        required
        placeholder="Email"
        onChange={() => seterrorMessage(null)} // Clear error on typing
        className="border border-gray-600 rounded-lg px-4 py-3 bg-transparent placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
      />

      {/* ===================== Password Input with Show/Hide ===================== */}
      <div className="relative">
        <input
          ref={password}
          type={showPassword ? "text" : "password"} // Toggle password visibility
          required
          placeholder="Password"
          onChange={() => seterrorMessage(null)} // Clear error on typing
          className="border border-gray-600 rounded-lg px-4 py-3 bg-transparent placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500 w-full"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-200 cursor-pointer"
        >
          {showPassword ? <IoEye size={20} /> : <IoEyeOff size={20} />}
        </button>
      </div>

      {/* ===================== Error Message ===================== */}
      <p className="text-red-500 text-sm font-semibold">
        {errorMessage}
      </p>

      {/* ===================== Submit Button ===================== */}
      <button
        className="bg-gradient-to-r from-pink-600 to-violet-600 text-white rounded-lg py-3 font-semibold hover:from-pink-700 hover:to-violet-700 transition cursor-pointer flex justify-center items-center gap-2"
        onClick={handleFormSubmit}
        disabled={isLoading} // Prevent multiple clicks
      >
        {isLoading ? <LuLoaderPinwheel size={23} className="animate-spin" /> : (isSignIn ? "Sign In" : "Sign Up")}
      </button>

      {/* ===================== Toggle Form Link ===================== */}
      <p className="mt-2 text-sm text-gray-300 text-center">
        {isSignIn ? "New to CineVerse?" : "Already have an account?"}{" "}
        <span
          className="font-semibold cursor-pointer"
          onClick={() => setIsSignIn(!isSignIn)}
        >
          {isSignIn ? "Sign Up" : "Sign In"}
        </span>
      </p>
    </form>
  );
};

export default Form;
