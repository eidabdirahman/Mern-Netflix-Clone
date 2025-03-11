import { useState } from "react";
import { Link } from "react-router-dom";
import { useauthStore } from "../store/AuthUser";

const SignUpPage = () => {
  const { searchParams } = new URL(document.location);
  const emailvalue = searchParams.get("email");
  const [email, setEmail] = useState(emailvalue || "");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); 

  const { signUp } = useauthStore();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");

    setLoading(true); 
    try {
      await signUp({ email, username, password }); 
      // Reset fields only if sign-up is successful
      setUsername("");
      setPassword("");
      setEmail("");
    } catch (err) {
      setError(err.message || "Sign-up failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-full hero-bg">
      <header className="max-w-6xl mx-auto flex items-center justify-between p-4">
        <Link to="/">
          <img src="/netflix-logo.png" alt="logo" className="w-52" />
        </Link>
      </header>

      <div className="flex justify-center items-center mt-20 mx-3 md:mx-0">
        <div className="w-full max-w-md p-8 space-y-6 bg-black/60 rounded-lg shadow-md">
          <h1 className="text-center text-white text-2xl font-bold mb-4">Sign Up</h1>
          {error && <div className="text-red-500 text-center">{error}</div>} {/* Display error message */}
          <form className="space-y-4" onSubmit={handleSignUp}>
            <div>
              <label htmlFor="email" className="text-sm font-medium text-gray-300 block">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring focus:ring-red-500 focus:border-red-500 placeholder-gray-500"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="username" className="text-sm font-medium text-gray-300 block">
                Username
              </label>
              <input
                type="text"
                id="username"
                className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring focus:ring-red-500 focus:border-red-500 placeholder-gray-500"
                placeholder="Eid Abdirahman"
                value ={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="password" className="text-sm font-medium text-gray-300 block">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring focus:ring-red-500 focus:border-red-500 placeholder-gray-500"
                placeholder="........"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className={`w-full py-2 ${loading ? 'bg-gray-500' : 'bg-red-600'} text-white font-semibold rounded-md hover:bg-red-700 transition duration-300 ease-in-out`}
              disabled={loading} // Disable button while loading
            >
              {loading ? 'Signing Up...' : 'Sign Up'}
            </button>
          </form>
          <div className="text-center text-gray-400">
            Already a member?{" "}
            <Link to={"/login"} className="text-red-500 hover:underline">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;