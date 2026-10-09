export default function FoodArt({ type = "bowl", className = "" }) {
  const emoji = {
    bowl: "🥗",
    burger: "🍔",
    pizza: "🍕",
    pasta: "🍝",
    taco: "🌮",
    dessert: "🧁",
    drink: "🍹",
    curry: "🍛"
  }[type] || "🍽️";

  return (
    <div className={`food-art ${className}`}>
      <span className="blob blob-a" />
      <span className="blob blob-b" />
      <span className="food-emoji">{emoji}</span>
    </div>
  );
}
