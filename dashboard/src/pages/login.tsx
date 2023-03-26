import { useState } from "react";
import { login } from "../api/api";
import Swal from "sweetalert2";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // handle form submit event and call login api
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const response = await login(email, password);
    // if login is successful, redirect to dashboard and store token in local storage
    console.dir(response);
    if (response.status === 200) {
        localStorage.setItem("token", response.data.access_token);
        // show success message
        Swal.fire({
            title: "Success!",
            text: "You have successfully logged in.",
            icon: "success",
            confirmButtonText: "Ok",
        });
        window.location.href = "/dashboard";

    }else{
        Swal.fire({
            title: "Error!",
            text: "Invalid credentials",
            icon: "error",
            confirmButtonText: "Ok",
        });
    }
    }


  return (
    <div className="flex h-full justify-center ">
      <form onSubmit={handleSubmit} className="flex flex-col">
        <div className="mb-4">
            <img src="https://uploads-ssl.webflow.com/6057e010b2aa08f0ce7ece0b/63603662fcc17aa70aec7523_Hero_Cover.png" alt="logo" className="w-60 h-20 mx-auto" />
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2 mt-3">
            Username
          </label>
          <input
            type="text"
            id="email"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Sign In
        </button>
      </form>
    </div>
  );
}

function LoginBox() {
  return (  
    <div className="w-96 h-96 mx-auto bg-white rounded-lg shadow-lg p-8 mt-24">
      <LoginForm />
    </div>
  );
}

export default LoginBox;
