import { ShoppingBag } from "lucide-react";

const FLASH_DEAL_PRODUCTS = [
  {
    name: "Cotton Sharee",
    img: "/images/fs4_2_1.png",
    price: 1450,
    oldPrice: 2100,
    discount: "30%",
  },
  {
    name: "Silk Blouse",
    img: "/images/fs4_1_2.png",
    price: 890,
    oldPrice: 1200,
    discount: "26%",
  },
  {
    name: "Co-Ord Set",
    img: "/images/fs4_3_1.png",
    price: 2100,
    oldPrice: 2800,
    discount: "25%",
  },
  {
    name: "Kamiz Set",
    img: "/images/fs4_7_2.png",
    price: 1650,
    oldPrice: 2400,
    discount: "31%",
  },
];

export default function FlashDealsProducts() {
  return (
    <>
      <section>
        {/* Flash deal products */}
        <div className="grid w-full max-w-[1312px] grid-cols-2 gap-3 sm:grid-cols-4">
          {FLASH_DEAL_PRODUCTS.map((p) => (
            <div key={p.name} className="flex flex-col gap-3">
              <div
                className="relative h-[220px] rounded-xl bg-cover bg-center sm:h-[320px]"
                style={{ backgroundImage: `url(${p.img})` }}
              >
                <span className="absolute left-0 top-0 rounded-tl-xl rounded-br-lg bg-[#FF0000] px-3 py-1 text-[12px] font-bold capitalize text-white sm:text-[14px]">
                  -{p.discount}
                </span>
                <button
                  aria-label="Add to cart"
                  className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border border-black/20 bg-white sm:h-10 sm:w-10"
                >
                  <ShoppingBag className="h-4 w-4" strokeWidth={1.3} />
                </button>
                <div className="absolute inset-x-2 bottom-2 flex items-center justify-center rounded-md bg-white py-2 text-[13px] capitalize sm:text-[14px]">
                  Options
                </div>
              </div>
              <p className="text-[15px] capitalize text-white sm:text-[18px]">
                {p.name}
              </p>
              <div className="flex items-center gap-3">
                <span className="text-[16px] font-semibold capitalize text-white sm:text-[18px]">
                  ৳{p.price}
                </span>
                <span className="text-[13px] capitalize text-white/50 line-through sm:text-[14px]">
                  ৳{p.oldPrice}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
