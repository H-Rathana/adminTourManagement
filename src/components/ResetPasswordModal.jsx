import { useState } from "react";
import { Eye, EyeOff, LockKeyhole } from "lucide-react";

const ResetPasswordModal = ({
  open,
  user,
  onClose,
  onConfirm,
  loading = false,
}) => {

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [error, setError] = useState("");

  if (!open || !user) {
    return null;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");

    // Password required
    if (!password || !confirmPassword) {
      setError("Please enter both passwords.");
      return;
    }

    // Minimum password length
    if (password.length < 8) {
      setError(
        "Password must be at least 8 characters."
      );
      return;
    }

    // Password confirmation
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    onConfirm({
      password,
      confirmPassword,
    });
  };

  const handleClose = () => {
    setPassword("");
    setConfirmPassword("");
    setError("");
    setShowPassword(false);
    setShowConfirmPassword(false);

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-6">

        {/* HEADER */}
        <div className="flex items-center gap-3 mb-5">

          <div className="p-3 rounded-xl bg-sky-100 text-sky-600">
            <LockKeyhole size={22} />
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-800">
              Reset Password
            </h2>

            <p className="text-sm text-gray-500">
              Reset password for{" "}
              <span className="font-medium text-gray-700">
                {user.name}
              </span>
            </p>
          </div>

        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          {/* NEW PASSWORD */}
          <div>

            <label className="block text-sm font-medium text-gray-700 mb-2">
              New Password
            </label>

            <div className="relative">

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                placeholder="Enter new password"
                disabled={loading}
                className="
                  w-full
                  border
                  border-gray-200
                  rounded-xl
                  px-4
                  py-3
                  pr-12
                  focus:outline-none
                  focus:ring-2
                  focus:ring-sky-400
                "
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
                className="
                  absolute
                  right-3
                  top-1/2
                  -translate-y-1/2
                  text-gray-400
                  hover:text-gray-600
                "
              >
                {showPassword ? (
                  <Eye size={20} />
                ) : (
                  <EyeOff size={20} />
                )}
              </button>

            </div>

          </div>

          {/* CONFIRM PASSWORD */}
          <div>

            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirm Password
            </label>

            <div className="relative">

              <input
                type={
                  showConfirmPassword
                    ? "text"
                    : "password"
                }
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(
                    e.target.value
                  )
                }
                placeholder="Confirm new password"
                disabled={loading}
                className="
                  w-full
                  border
                  border-gray-200
                  rounded-xl
                  px-4
                  py-3
                  pr-12
                  focus:outline-none
                  focus:ring-2
                  focus:ring-sky-400
                "
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(
                    !showConfirmPassword
                  )
                }
                className="
                  absolute
                  right-3
                  top-1/2
                  -translate-y-1/2
                  text-gray-400
                  hover:text-gray-600
                "
              >
                {showConfirmPassword ? (
                  <Eye size={20} />
                ) : (
                  <EyeOff size={20} />
                )}
              </button>

            </div>

          </div>

          {/* ERROR */}
          {error && (
            <div className="
              rounded-xl
              bg-red-50
              border
              border-red-100
              px-4
              py-3
              text-sm
              text-red-600
            ">
              {error}
            </div>
          )}

          {/* WARNING */}
          <div className="
            rounded-xl
            bg-amber-50
            border
            border-amber-100
            px-4
            py-3
            text-sm
            text-amber-700
          ">
            The user will need to use this new
            password the next time they log in.
          </div>

          {/* BUTTONS */}
          <div className="flex justify-end gap-3 pt-2">

            <button
              type="button"
              onClick={handleClose}
              disabled={loading}
              className="
                px-5
                py-2.5
                rounded-xl
                bg-gray-100
                text-gray-700
                hover:bg-gray-200
                transition
                disabled:opacity-50
              "
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="
                px-5
                py-2.5
                rounded-xl
                bg-sky-500
                text-white
                hover:bg-sky-600
                transition
                font-medium
                disabled:opacity-50
              "
            >
              {loading
                ? "Updating..."
                : "Confirm"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default ResetPasswordModal;