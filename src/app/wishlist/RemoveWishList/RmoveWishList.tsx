"use client"
import { removeWishlist } from '@/services/wishlist.action';
import { Button } from '@base-ui/react';
import { Trash2, LoaderCircle } from 'lucide-react';
import { useState } from 'react';
import { useContext } from 'react';
import { WishListContext } from '@/Context/WishListContext';

export default function RmoveWishList({ id, onRemove }: { id: string, onRemove?: () => void }) {
  const [isRemoving, setIsRemoving] = useState(false);
  const { numberOfWishListItems, setNumberOfWishListItems } = useContext(WishListContext);

  async function removeItem() {
    setIsRemoving(true);
    const response = await removeWishlist(id);
    onRemove?.();
    setNumberOfWishListItems(response.data.length);
    setIsRemoving(false);
  }

  return (
    <Button
      onClick={removeItem}
      disabled={isRemoving}
      className={`group w-8 h-8 bg-gray-50 hover:bg-red-50 rounded-lg flex items-center justify-center transition cursor-pointer ${isRemoving ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {isRemoving ? (
        <LoaderCircle className="w-4 h-4 text-gray-400 animate-spin" />
      ) : (
        <Trash2 className="w-4 h-4 text-gray-400 group-hover:text-red-500" />
      )}
    </Button>
  );
}