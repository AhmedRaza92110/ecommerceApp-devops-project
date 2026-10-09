import Link from "next/link";
import {
  ArrowRight, Clock3, Sparkles, Star, UtensilsCrossed, Bike, Leaf,
  BadgeCheck, CalendarDays, ChartNoAxesCombined
} from "lucide-react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import FoodArt from "../components/FoodArt";

const dishes = [
  { name: "Sunshine Burrata Pasta", desc: "Creamy tomato, basil, burrata & chili glow.", price: "$18.90", type: "pasta", tag: "Best seller" },
  { name: "Mango Garden Bowl", desc: "Avocado, mango, quinoa, herbs & citrus crunch.", price: "$15.50", type: "bowl", tag: "Fresh pick" },
  { name: "Firecracker Smash Burger", desc: "Double patty, cheddar, house sauce & pickles.", price: "$17.90", type: "burger", tag: "Chef's pick" }
];

export default function Home() {
  return (
    <>
      <NavBar />
      <main>
        <section className="hero shell">
          <div className="hero-copy">
            <div className="eyebrow"><Sparkles size={16}/> Eat bright. Feel happy.</div>
            <h1>Food that turns every <span>bite</span> into a celebration.</h1>
            <p>
              Discover colorful comfort food, seasonal ingredients, lightning-fast ordering,
              and a restaurant experience designed to feel as good as it tastes.
            </p>
            <div className="hero-actions">
              <Link href="/menu" className="btn primary">Explore the menu <ArrowRight size={18}/></Link>
              <Link href="/reservations" className="btn secondary">Book a table</Link>
            </div>
            <div className="social-proof">
              <div className="avatars"><b>AR</b><b>SK</b><b>MH</b><b>+2K</b></div>
              <div><strong>4.9/5</strong><span><Star size={14} fill="currentColor"/> loved by happy foodies</span></div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="sun sun-1"></div><div className="sun sun-2"></div>
            <FoodArt type="bowl" className="hero-food" />
            <div className="float-card fc-top">
              <span className="mini-icon yellow">★</span>
              <div><b>4.9 rating</b><small>2,340+ reviews</small></div>
            </div>
            <div className="float-card fc-bottom">
              <span className="mini-icon coral"><Clock3 size={17}/></span>
              <div><b>25 min</b><small>average delivery</small></div>
            </div>
          </div>
        </section>

        <section className="trust-strip">
          <div><Leaf/><span><b>Fresh daily</b><small>Seasonal ingredients</small></span></div>
          <div><Bike/><span><b>Fast delivery</b><small>Hot & fresh to you</small></span></div>
          <div><BadgeCheck/><span><b>Quality first</b><small>Made with care</small></span></div>
          <div><UtensilsCrossed/><span><b>40+ dishes</b><small>Something for everyone</small></span></div>
        </section>

        <section className="section shell">
          <div className="section-heading">
            <div><span className="kicker">CUSTOMER FAVORITES</span><h2>Made to make you smile.</h2></div>
            <Link href="/menu">See full menu <ArrowRight size={17}/></Link>
          </div>
          <div className="dish-grid">
            {dishes.map((d, i) => (
              <article className="dish-card" key={d.name}>
                <div className={`dish-visual dish-${i+1}`}><FoodArt type={d.type}/><span>{d.tag}</span></div>
                <div className="dish-content">
                  <h3>{d.name}</h3><p>{d.desc}</p>
                  <div><strong>{d.price}</strong><Link href="/menu" className="round-plus">+</Link></div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="experience shell">
          <div className="experience-card orange-card">
            <div className="big-icon"><CalendarDays/></div>
            <span>PLAN AHEAD</span>
            <h2>Your table, your moment.</h2>
            <p>Birthdays, date nights, brunch with friends — reserve in a few clicks.</p>
            <Link href="/reservations">Reserve a table <ArrowRight size={18}/></Link>
          </div>
          <div className="experience-card lime-card">
            <div className="big-icon"><ChartNoAxesCombined/></div>
            <span>SMART OPERATIONS</span>
            <h2>Manage the restaurant beautifully.</h2>
            <p>Track sales, orders, tables, staff and popular dishes in one cheerful dashboard.</p>
            <Link href="/dashboard">View dashboard <ArrowRight size={18}/></Link>
          </div>
        </section>

        <section className="cta shell">
          <div>
            <span className="kicker light">READY WHEN YOU ARE</span>
            <h2>Hungry for something wonderful?</h2>
            <p>Your next favorite meal is only a few clicks away.</p>
          </div>
          <Link href="/menu" className="btn white">Start your order <ArrowRight size={18}/></Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
