import Link from "next/link";
import { ChefHat, Instagram, Facebook, MapPin, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="footer">
      <div>
        <div className="brand footer-brand">
          <span className="brand-icon"><ChefHat size={22} /></span>
          <span>Bright<span>Bite</span></span>
        </div>
        <p>Fresh food, joyful colors, and a smoother restaurant experience.</p>
      </div>
      <div>
        <h4>Explore</h4>
        <Link href="/menu">Menu</Link>
        <Link href="/reservations">Reservations</Link>
        <Link href="/orders">Track order</Link>
      </div>
      <div>
        <h4>Visit</h4>
        <p><MapPin size={15}/> 24 Sunshine Avenue, Food District</p>
        <p><Phone size={15}/> +1 (555) 014-2026</p>
        <p className="socials"><Instagram size={18}/><Facebook size={18}/></p>
      </div>
    </footer>
  );
}
