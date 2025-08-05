import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/config";
import { postProduct } from "../services/api";

export default function MultiStepForm() {
  const [step, setStep] = useState(1);
  const [formInputs, setFormInputs] = useState({
    name: "",
    sku: "",
    category: "",
    price: "",
    description: "",
    tags: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (!user) navigate("/login");
    });
    return () => unsub();
  }, [navigate]);

  const handleNext = () => {
    if (step === 1 && (!formInputs.name.trim() || !formInputs.sku.trim())) {
      alert("Please fill out Product Name and SKU.");
      return;
    }

    if (
      step === 2 &&
      (!formInputs.category.trim() || !formInputs.price.trim())
    ) {
      alert("Please fill out Category and Price.");
      return;
    }

    setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setStep((prev) => prev - 1);
  };

  const handleSubmit = async () => {
    if (!formInputs.description.trim() || !formInputs.tags.trim()) {
      alert("Please fill out Description and Tags.");
      return;
    }

    setIsSubmitting(true);
    try {
      await postProduct(formInputs);
      alert("Submitted successfully");
      navigate("/dashboard");
    } catch (error) {
      alert("Submission failed. Are you logged in?");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInputs((prev) => ({ ...prev, [name]: value }));
  };

  const renderInput = (label, name, type = "text", placeholder = "") => (
    <div className="flex flex-col gap-1 mb-4">
      <label className="text-sm font-medium text-gray-300">{label}</label>
      <input
        type={type}
        name={name}
        value={formInputs[name]}
        placeholder={placeholder}
        className="border border-[#27272A] rounded-lg px-4 py-2 bg-[#232329] text-white focus:outline-none focus:ring-2 focus:ring-[#18181B] transition"
        autoComplete="off"
        onChange={handleChange}
      />
    </div>
  );

  const renderTextarea = (label, name, placeholder = "") => (
    <div className="flex flex-col gap-1 mb-4">
      <label className="text-sm font-medium text-gray-300">{label}</label>
      <textarea
        name={name}
        value={formInputs[name]}
        rows="3"
        placeholder={placeholder}
        className="border border-[#27272A] rounded-lg px-4 py-2 bg-[#232329] text-white focus:outline-none focus:ring-2 focus:ring-[#18181B] transition"
        onChange={handleChange}
      />
    </div>
  );

  const progress = (step / 3) * 100;

  return (
    <div className="min-h-screen bg-[#18181B] p-8">
      <div className="max-w-2xl mx-auto mt-16 bg-[#18181B] shadow-2xl rounded-2xl p-10 border border-[#27272A]">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-bold text-white">Product Wizard</h2>
            <span className="text-sm text-gray-400">Step {step} of 3</span>
          </div>
          <div className="w-full bg-[#232329] rounded-full h-2.5">
            <div
              className="bg-white h-2.5 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        <form className="space-y-6">
          {step === 1 && (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {renderInput(
                  "Product Name",
                  "name",
                  "text",
                  "Enter product name"
                )}
                {renderInput("Product SKU", "sku", "text", "Enter product SKU")}
              </div>
              <div className="flex justify-end mt-8">
                <button
                  type="button"
                  onClick={handleNext}
                  className="bg-white text-black px-8 py-2 rounded-lg shadow hover:bg-gray-200 transition"
                >
                  Next &rarr;
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {renderInput(
                  "Category",
                  "category",
                  "text",
                  "e.g. Electronics"
                )}
                {renderInput("Price", "price", "number", "Enter price")}
              </div>
              <div className="flex justify-between mt-8">
                <button
                  type="button"
                  onClick={handleBack}
                  className="bg-[#232329] text-gray-300 px-8 py-2 rounded-lg shadow hover:bg-[#232329] transition border border-[#27272A]"
                >
                  &larr; Back
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="bg-white text-black px-8 py-2 rounded-lg shadow hover:bg-gray-200 transition"
                >
                  Next &rarr;
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              {renderTextarea(
                "Description",
                "description",
                "Write product description"
              )}
              {renderInput(
                "Tags (comma-separated)",
                "tags",
                "text",
                "e.g. tech, gadget"
              )}

              <div className="bg-[#232329] border border-[#27272A] p-6 mt-8 rounded-xl shadow-inner">
                <h3 className="font-semibold mb-4 text-white">
                  Review your input
                </h3>
                <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-sm">
                  <div>
                    <dt className="font-medium text-gray-400">Name</dt>
                    <dd className="text-white">{formInputs.name}</dd>
                  </div>
                  <div>
                    <dt className="font-medium text-gray-400">SKU</dt>
                    <dd className="text-white">{formInputs.sku}</dd>
                  </div>
                  <div>
                    <dt className="font-medium text-gray-400">Category</dt>
                    <dd className="text-white">{formInputs.category}</dd>
                  </div>
                  <div>
                    <dt className="font-medium text-gray-400">Price</dt>
                    <dd className="text-white">{formInputs.price}</dd>
                  </div>
                  <div className="md:col-span-2">
                    <dt className="font-medium text-gray-400">Description</dt>
                    <dd className="text-white">{formInputs.description}</dd>
                  </div>
                  <div className="md:col-span-2">
                    <dt className="font-medium text-gray-400">Tags</dt>
                    <dd className="text-white">{formInputs.tags}</dd>
                  </div>
                </dl>
              </div>

              <div className="flex justify-between mt-8">
                <button
                  type="button"
                  onClick={handleBack}
                  className="bg-[#232329] text-gray-300 px-8 py-2 rounded-lg shadow hover:bg-[#232329] transition border border-[#27272A]"
                  disabled={isSubmitting}
                >
                  &larr; Back
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className={`bg-white text-black px-8 py-2 rounded-lg shadow hover:bg-gray-200 transition ${
                    isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
