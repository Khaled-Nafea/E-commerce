"use client"
import { addToCart, updateCart } from '@/services/cart.action';
import { Button } from '@base-ui/react'
import { Check, LoaderCircle, X, LogIn } from 'lucide-react';
import { useContext, useState } from 'react';
import { CartContext } from '@/Context/CartContext';
import { useSession, signIn } from 'next-auth/react';

function LoginModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={onClose}>
      <div className="bg-white rounded-2xl p-8 shadow-xl w-full max-w-sm mx-4 flex flex-col items-center gap-5" onClick={(e) => e.stopPropagation()}>
        <Button className="self-end text-gray-400 hover:text-gray-600 transition cursor-pointer" onClick={onClose}>
          <X size={20} />
        </Button>

        <div className="bg-green-100 p-4 rounded-full">
          <LogIn className="text-green-600" size={32} />
        </div>

        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-800 mb-1">Sign in Required</h2>
          <p className="text-gray-500 text-sm">You need to sign in first to add products to your cart</p>
        </div>

        <Button onClick={() => signIn()}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl transition cursor-pointer">
          Sign In
        </Button>

        <Button onClick={onClose} className="text-sm text-gray-400 hover:text-gray-600 transition cursor-pointer">
          Not now
        </Button>
      </div>
    </div>
  )
}

export default function AddButton({ className, icon, word, id, onSuccess, count }: {
  className?: string;
  icon?: React.ReactNode;
  word?: string;
  id: string;
  onSuccess?: () => void;
  count?: number;
}) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { setNumberOfCartItems } = useContext(CartContext);
  const { status } = useSession();

  const AddProductToCart = async () => {
    if (status !== "authenticated") {
      setShowLoginModal(true);
      return;
    }

    setLoading(true);
    const response = await addToCart(id);
    if (count && count > 1) {
      const updated = await updateCart(id, count);
      setNumberOfCartItems(updated.numOfCartItems);
    } else {
      setNumberOfCartItems(response.numOfCartItems);
    }

    setLoading(false);
    setSuccess(true);
    onSuccess?.();
    setTimeout(() => setSuccess(false), 2000);
  }

  const renderIcon = () => {
    if (loading) return <LoaderCircle className="animate-spin" />;
    if (success) return <Check className="text-white" />;
    return icon;
  }

  return (
    <>
      {showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} />}

      <Button className={className} type="button" onClick={AddProductToCart} disabled={loading}>
        {renderIcon()}
        {word}
      </Button>
    </>
  )
}