const ConfirmModal = ({
  open,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  confirmColor = "red",
  onConfirm,
  onClose,
}) => {

  if (!open) return null;

  const buttonColor = {
    red: "bg-red-600 hover:bg-red-700",
    green: "bg-green-600 hover:bg-green-700",
    orange: "bg-orange-600 hover:bg-orange-700",
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">

      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">

        <h2 className="text-xl font-bold text-slate-800">
          {title}
        </h2>

        <p className="text-gray-600 mt-3">
          {message}
        </p>

        <div className="flex justify-end gap-3 mt-8">

          <button
            onClick={onClose}
            className="
              px-5
              py-2
              rounded-xl
              bg-gray-100
              hover:bg-gray-200
            "
          >
            {cancelText}
          </button>

          <button
            onClick={onConfirm}
            className={`
              px-5
              py-2
              rounded-xl
              text-white
              transition
              ${buttonColor[confirmColor]}
            `}
          >
            {confirmText}
          </button>

        </div>

      </div>

    </div>
  );
};

export default ConfirmModal;