"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChefHat, ShoppingBag } from "lucide-react";

const links = [
  ["/", "Home"],
  ["/menu", "Menu"],
  ["/orders", "Orders"],
  ["/reservations", "Reservations"],
  ["/dashboard", "Dashboard"],
  ["/about", "About"]
];

export default function NavBar({ cartCount = 0, onCart }) {
  const pathname = usePathname();

  return (
    <header className="topbar">
      <Link className="brand" href="/">
        <span className="brand-icon"><ChefHat size={22} /></span>
        <span>Bright<span>Bite</span></span>
      </Link>

      <nav className="nav-links">
        {links.map(([href, label]) => (
          <Link key={href} className={pathname === href ? "active" : ""} href={href}>
            {label}
          </Link>
        ))}
      </nav>

      {onCart ? (
        <button className="cart-btn" onClick={onCart}>
          <ShoppingBag size={18} />
          Cart
          <span>{cartCount}</span>
        </button>
      ) : (
        <Link className="cart-btn" href="/menu">
          <ShoppingBag size={18} />
          Order now
        </Link>
      )}
    </header>
  );
}
