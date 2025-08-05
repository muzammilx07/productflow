import { useEffect, useState } from "react";
import { fetchProducts } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts().then((res) => setProducts(res.data));
  }, []);

  return (
    <div className="min-h-screen bg-[#18181B] p-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-white">Dashboard</h2>

        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 gap-4">
          <h3 className="text-xl font-semibold text-gray-300">
            Submitted Products
          </h3>
          <button
            className="bg-white text-black px-5 py-2 rounded border border-[#27272A] hover:bg-gray-200 transition font-medium shadow"
            onClick={() => navigate("/form")}
          >
            + Add Product
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p) => (
            <div
              key={p._id}
              className="bg-[#232329] border border-[#27272A] rounded-lg p-6 shadow hover:bg-[#2e2e33] transition group"
            >
              <h4 className="text-lg font-bold text-white mb-2">{p.name}</h4>
              <p className="text-sm text-gray-400 mb-4">
                Category: <span className="text-gray-300">{p.category}</span>
              </p>
              <button
                className="mt-2 text-sm text-white bg-[#27272A] px-4 py-1 rounded hover:bg-white hover:text-black transition font-medium border border-[#27272A]"
                onClick={() => setSelectedProduct(p)}
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 backdrop-blur-sm">
          <div className="bg-[#232329] rounded-lg p-8 w-full max-w-md shadow-lg relative">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-white text-xl"
              onClick={() => setSelectedProduct(null)}
            >
              &times;
            </button>
            <h3 className="text-2xl font-bold text-white mb-4">
              {selectedProduct.name}
            </h3>
            <div className="text-gray-300 space-y-2">
              <div>
                <span className="font-semibold">SKU:</span> {selectedProduct.sku}
              </div>
              <div>
                <span className="font-semibold">Category:</span> {selectedProduct.category}
              </div>
              <div>
                <span className="font-semibold">Price:</span> {selectedProduct.price}
              </div>
              <div>
                <span className="font-semibold">Description:</span> {selectedProduct.description}
              </div>
              <div>
                <span className="font-semibold">Tags:</span> {selectedProduct.tags}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
