import { useState } from "react";
import { BASE_URL } from "../services/api";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

const AdminLogin = () => {

  const navigate = useNavigate();

  const [showPassword, setShowPassword] =
    useState(false);

  const [form, setForm] =
    useState({
      email: "",
      password: "",
    });

  const [loading, setLoading] =
    useState(false);

  // ✅ HANDLE INPUT
  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]:
        e.target.value,
    });

  };

  // ✅ LOGIN
  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        setLoading(true);

        const res =
          await fetch(
            `${BASE_URL}/api/auth/login`,
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body:
                JSON.stringify(form),
            }
          );

        const data =
          await res.json();

        // ❌ LOGIN ERROR
        if (!res.ok) {

          alert(
            data.message
          );

          return;

        }

        console.log(
          "ADMIN LOGIN:",
          data
        );

        // ❌ NOT ADMIN
        if (
          data.user.role !== "admin" &&
          data.user.role !== "SUPER_ADMIN"
      ) {
          alert("Access denied");
          return;
      }

        // ✅ SAVE TOKEN
        localStorage.setItem(
          "token",
          data.token
        );

        localStorage.setItem(
          "user",
          JSON.stringify(
            data.user
          )
        );

        // ✅ GO DASHBOARD
        navigate("/dashboard");

      } catch (error) {

        console.error(error);

        alert(
          "Login failed"
        );

      } finally {

        setLoading(false);

      }

    };

  return (

    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee')",
      }}
    >

      {/* OVERLAY */}
      <div className="absolute inset-0 "></div>

      {/* LOGIN CARD */}
      <div className="relative z-10 w-full max-w-md text-white px-8">

        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 shadow-2xl">

          {/* TITLE */}
          <h1 className="text-4xl font-bold text-center mb-2">
            Welcome Back
          </h1>

          <p className="text-center text-white/70 mb-8">
            Tourism Booking Dashboard
          </p>

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            {/* EMAIL */}
            <div>

              <label className="block mb-2 text-sm">
                Email
              </label>

              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="admin@gmail.com"
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-400 placeholder-white/50"
              />

            </div>

            {/* PASSWORD */}
            <div className="relative">

              <label className="block mb-2 text-sm">
                Password
              </label>

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-400 placeholder-white/50"
              />

              {/* EYE BUTTON */}
              <button
                type="button"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
                className="absolute right-4 top-[45px] text-white/70 hover:text-white"
              >

                {showPassword
                  ? <Eye size={20} />
                  : <EyeOff size={20} />}

              </button>

            </div>

            {/* LOGIN BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-sky-500 hover:bg-sky-600 transition py-3 rounded-xl font-semibold"
            >

              {loading
                ? "Signing in..."
                : "Login"}

            </button>

          </form>

        </div>

      </div>

    </div>

  );

};

export default AdminLogin;