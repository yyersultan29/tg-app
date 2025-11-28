import { motion } from "framer-motion";
import type { MenuEntity } from "@/features/menu/entities";
import { BottomSheet, Badge } from "@core/ui";
import { useTheme } from "@core/providers";
import { CartButton } from "@/core/controllers";

interface ProductDetailSheetProps {
  product: MenuEntity | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProductDetailSheet = ({
  product,
  isOpen,
  onClose,
}: ProductDetailSheetProps) => {
  const theme = useTheme();

  if (!product) return null;

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose}>
      <div className="px-5">
        {/* Product Image/Emoji */}
        <div className="flex justify-center mb-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="w-40 h-40 rounded-3xl bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 flex items-center justify-center shadow-2xl"
          >
            <motion.span
              animate={{
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 1,
              }}
              className="text-8xl"
            >
              {product.emoji}
            </motion.span>
          </motion.div>
        </div>

        {/* Product Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-2 text-[var(--text-color)]">
                {product.name}
              </h2>
              <p className="text-3xl font-extrabold text-[var(--link-color)]">
                ${product.price.toFixed(2)}
              </p>
            </div>
            <Badge variant="accent" icon="🔥" className="mt-1">
              Popular
            </Badge>
          </div>

          <p className="text-sm leading-relaxed text-[var(--hint-color)] mb-4">
            {product.description}
          </p>

          {/* Category Badge */}
          <div className="flex gap-2">
            <Badge variant="outline" className="capitalize">
              {product.category}
            </Badge>
            {product.price < 3 && (
              <Badge variant="success" icon="💰">
                Great Value
              </Badge>
            )}
          </div>
        </motion.div>

        {/* Add to Cart Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="border-t pt-5 flex items-center justify-between gap-3"
          style={{ borderColor: `${theme.hintColor}20` }}
        >
          <span className="text-lg font-bold text-[var(--link-color)]">
            Total: ${product.price.toFixed(2)}
          </span>
          <CartButton item={product} />
        </motion.div>
      </div>
    </BottomSheet>
  );
};
