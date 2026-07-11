"use client";

import Link from "next/link";
import {
  Monitor,
  Image,
  LayoutGrid,
  Zap,
  Package,
  Columns2,
  Sparkles,
  Megaphone,
  Heart,
  Bell,
} from "lucide-react";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

interface NavItem {
  label: string;
  href: string;
  icon: ReactNode;
}

interface NavGroup {
  label: string;
  icon: ReactNode;
  items: NavItem[];
  isOpen?: boolean;
}

interface NavItem {
  label: string;
  href: string;
  icon: ReactNode;
}

const navItems: NavItem[] = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: <Monitor className="w-5 h-5" />,
  },
  {
    label: "Category Navbar",
    href: "/admin/navbar-category",
    icon: <Monitor className="w-5 h-5" />,
  },
  {
    label: "Hero",
    href: "/admin/hero",
    icon: <Image className="w-5 h-5" />,
  },
  {
    label: "Category",
    href: "/admin/category",
    icon: <LayoutGrid className="w-5 h-5" />,
  },
  {
    label: "Flash Deal",
    href: "/admin/flash-deal",
    icon: <Zap className="w-5 h-5" />,
  },
  {
    label: "Flash Products",
    href: "/admin/flash-products",
    icon: <Package className="w-5 h-5" />,
  },
  {
    label: "Two Column Section",
    href: "/admin/two-column",
    icon: <Columns2 className="w-5 h-5" />,
  },
  {
    label: "New Arrivals",
    href: "/admin/new-arrivals",
    icon: <Sparkles className="w-5 h-5" />,
  },
  {
    label: "Detailed Callout",
    href: "/admin/detailed-callout",
    icon: <Megaphone className="w-5 h-5" />,
  },
  {
    label: "Most Loved Products",
    href: "/admin/featured-collection",
    icon: <Heart className="w-5 h-5" />,
  },
  {
    label: "Callout",
    href: "/admin/callout",
    icon: <Bell className="w-5 h-5" />,
  },
  {
    label: "Add Product",
    href: "/admin/add-product",
    icon: <Bell className="w-5 h-5" />,
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  //   const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});

  // Initialize open groups with Create Section open by default
  //   useEffect(() => {
  //     setOpenGroups({
  //       "Create Section": true,
  //     });
  //   }, []);

  //   const toggleGroup = (label: string) => {
  //     setOpenGroups((prev) => ({
  //       ...prev,
  //       [label]: !prev[label],
  //     }));
  //   };

  const isItemActive = (href: string) => {
    if (href === "/admin") {
      return pathname === "/admin";
    }
    return pathname?.startsWith(href);
  };

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    window.location.href = "/";
  };

  return (
    <aside className="w-64 bg-white border-r border-gray-200 overflow-y-auto fixed h-screen flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <Link href="/admin" className="flex items-center gap-2">
          <div className="w-10 h-10  rounded-lg flex items-center justify-center">
            <img src="/color-logo.png" alt="Dazzling Diva Logo" />
          </div>
          <div>
            <p className="font-bold text-gray-900">Dazzling Diva </p>
            <p className="text-xs text-gray-600">AdminPanel-v1.0</p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      {/* <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        {defaultNavGroups.map((group) => {
          const isGroupOpen = openGroups[group.label];
          const hasMultipleItems = group.items.length > 1;
          const firstItemActive =
            group.items.length > 0 && isItemActive(group.items[0].href);
          const anyItemActive = group.items.some((item) =>
            isItemActive(item.href),
          );

          return (
            <div key={group.label} className="mb-1">
              {hasMultipleItems ? (
                // Collapsible Group
                <>
                  <button
                    onClick={() => toggleGroup(group.label)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors font-medium group ${
                      anyItemActive
                        ? "bg-blue-50 text-blue-700"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <span
                      className={`${anyItemActive ? "text-blue-600" : "text-gray-600 group-hover:text-blue-600"}`}
                    >
                      {group.icon}
                    </span>
                    <span className="flex-1 text-left">{group.label}</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${isGroupOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {isGroupOpen && (
                    <div className="mt-1 ml-4 pl-4 border-l-2 border-gray-200 space-y-1">
                      {group.items.map((item) => {
                        const isActive = isItemActive(item.href);
                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 px-4 py-2 text-sm rounded-lg transition-colors ${
                              isActive
                                ? "text-blue-700 bg-blue-50 font-medium"
                                : "text-gray-700 hover:bg-gray-50"
                            }`}
                          >
                            {item.icon}
                            {item.label}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </>
              ) : (
                // Single Item (no dropdown)
                <Link
                  href={group.items[0].href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors font-medium group ${
                    firstItemActive
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <span
                    className={`${firstItemActive ? "text-blue-600" : "text-gray-600 group-hover:text-blue-600"}`}
                  >
                    {group.icon}
                  </span>
                  {group.label}
                </Link>
              )}
            </div>
          );
        })}
      </nav> */}

      <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-2">
        {navItems.map((item) => {
          const isActive = isItemActive(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-4 py-3 transition-colors font-medium ${
                isActive
                  ? "bg-blue-50 text-blue-700"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              <span className={isActive ? "text-blue-600" : "text-gray-600"}>
                {item.icon}
              </span>

              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Links */}
      <div className="p-4 border-t border-gray-200 space-y-2">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-700 hover:bg-red-50 rounded-lg transition-colors font-medium"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          Logout
        </button>
      </div>
    </aside>
  );
}
