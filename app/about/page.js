import { Heart, Leaf, Smile, Sparkles, UsersRound } from "lucide-react";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import FoodArt from "../../components/FoodArt";

export default function About(){
  return <>
    <NavBar/>
    <main>
      <section className="page-hero about-hero"><span className="kicker">OUR STORY</span><h1>Made with <span>joy.</span></h1><p>A neighborhood restaurant with sunshine in its soul.</p></section>
      <section className="shell story">
        <div className="story-art"><FoodArt type="pizza"/><div className="story-badge"><Heart/> Made fresh, every day</div></div>
        <div className="story-copy"><div className="eyebrow"><Sparkles size={16}/> Since 2018</div><h2>We believe good food should brighten your day.</h2><p>BrightBite started with one simple idea: serve familiar comfort food with better ingredients, bold colors and warm hospitality.</p><p>Today, our kitchen mixes local produce, global inspiration and a little playful magic to create food people genuinely look forward to.</p></div>
      </section>
      <section className="values shell">
        <div><span><Leaf/></span><h3>Fresh first</h3><p>Seasonal produce and thoughtful ingredients.</p></div>
        <div><span><Smile/></span><h3>Joyful service</h3><p>Hospitality that feels easy, warm and human.</p></div>
        <div><span><UsersRound/></span><h3>Made for community</h3><p>A colorful place for people to connect.</p></div>
      </section>
    </main>
    <Footer/>
  </>
}
