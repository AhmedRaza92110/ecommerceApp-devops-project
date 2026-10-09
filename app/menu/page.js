"use client";

import { useMemo, useState } from "react";
import { Minus, Plus, Search, ShoppingBag, Trash2, X, CheckCircle2 } from "lucide-react";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import FoodArt from "../../components/FoodArt";

const items = [
  {id:1,name:"Mango Garden Bowl",cat:"Bowls",desc:"Quinoa, avocado, mango, cucumber, herbs & citrus sesame dressing.",price:15.5,type:"bowl",badge:"Fresh pick"},
  {id:2,name:"Firecracker Smash Burger",cat:"Burgers",desc:"Double beef patty, cheddar, crispy onion, pickles & firecracker sauce.",price:17.9,type:"burger",badge:"Chef's pick"},
  {id:3,name:"Sunshine Burrata Pasta",cat:"Pasta",desc:"Rigatoni, roasted tomato cream, burrata, basil oil & parmesan.",price:18.9,type:"pasta",badge:"Best seller"},
  {id:4,name:"Garden Glow Pizza",cat:"Pizza",desc:"Mozzarella, cherry tomato, peppers, pesto drops & fresh basil.",price:19.5,type:"pizza",badge:"Vegetarian"},
  {id:5,name:"Crispy Fiesta Tacos",cat:"Tacos",desc:"Spiced chicken, corn salsa, slaw, avocado crema & lime.",price:14.9,type:"taco",badge:"Popular"},
  {id:6,name:"Golden Coconut Curry",cat:"Mains",desc:"Creamy coconut curry, roasted vegetables, jasmine rice & herbs.",price:18.2,type:"curry",badge:"Cozy"},
  {id:7,name:"Berry Cloud Cupcake",cat:"Dessert",desc:"Vanilla sponge, berry center, whipped cream & sparkle crunch.",price:8.5,type:"dessert",badge:"Sweet"},
  {id:8,name:"Tropical Pop",cat:"Drinks",desc:"Passion fruit, pineapple, lime, mint and fizzy soda.",price:6.9,type:"drink",badge:"Refreshing"}
];
const cats=["All","Bowls","Burgers","Pasta","Pizza","Tacos","Mains","Dessert","Drinks"];

export default function Menu(){
  const [cat,setCat]=useState("All");
  const [query,setQuery]=useState("");
  const [cart,setCart]=useState([]);
  const [open,setOpen]=useState(false);
  const [done,setDone]=useState(false);

  const filtered=useMemo(()=>items.filter(x=>(cat==="All"||x.cat===cat)&&x.name.toLowerCase().includes(query.toLowerCase())),[cat,query]);
  const count=cart.reduce((a,x)=>a+x.qty,0);
  const subtotal=cart.reduce((a,x)=>a+x.price*x.qty,0);

  const add=(item)=>{
    setCart(c=>{
      const old=c.find(x=>x.id===item.id);
      return old?c.map(x=>x.id===item.id?{...x,qty:x.qty+1}:x):[...c,{...item,qty:1}]
    });
  };
  const change=(id,d)=>setCart(c=>c.map(x=>x.id===id?{...x,qty:x.qty+d}:x).filter(x=>x.qty>0));

  return (
    <>
      <NavBar cartCount={count} onCart={()=>setOpen(true)} />
      <main>
        <section className="page-hero menu-hero">
          <span className="kicker">OUR MENU</span>
          <h1>Pick your <span>happy.</span></h1>
          <p>Big flavor, bright ingredients, and food made fresh for every mood.</p>
        </section>

        <section className="shell menu-section">
          <div className="menu-toolbar">
            <div className="category-row">
              {cats.map(c=><button className={cat===c?"selected":""} onClick={()=>setCat(c)} key={c}>{c}</button>)}
            </div>
            <label className="search-box"><Search size={18}/><input placeholder="Search dishes..." value={query} onChange={e=>setQuery(e.target.value)}/></label>
          </div>

          <div className="menu-grid">
            {filtered.map((d,i)=>(
              <article className="menu-card" key={d.id}>
                <div className={`menu-card-art tone-${(d.id%4)+1}`}><FoodArt type={d.type}/><span>{d.badge}</span></div>
                <div className="menu-card-body">
                  <small>{d.cat}</small><h3>{d.name}</h3><p>{d.desc}</p>
                  <div className="menu-card-footer"><strong>${d.price.toFixed(2)}</strong><button onClick={()=>add(d)}><Plus size={18}/> Add</button></div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      {open&&<div className="drawer-backdrop" onClick={()=>setOpen(false)}>
        <aside className="cart-drawer" onClick={e=>e.stopPropagation()}>
          <div className="drawer-head"><div><span className="kicker">YOUR ORDER</span><h2>Good choices!</h2></div><button className="icon-btn" onClick={()=>setOpen(false)}><X/></button></div>
          {done ? (
            <div className="order-success"><CheckCircle2 size={64}/><h2>Order placed!</h2><p>Your order <b>#BB-2048</b> is being prepared. Estimated time: 24 minutes.</p><button className="btn primary" onClick={()=>{setDone(false);setCart([]);setOpen(false)}}>Awesome</button></div>
          ) : cart.length===0 ? (
            <div className="empty-cart"><ShoppingBag size={48}/><h3>Your cart is empty</h3><p>Add something delicious from the menu.</p></div>
          ) : <>
            <div className="cart-list">
              {cart.map(x=><div className="cart-item" key={x.id}>
                <div className="cart-thumb"><FoodArt type={x.type}/></div>
                <div className="cart-info"><h4>{x.name}</h4><b>${(x.price*x.qty).toFixed(2)}</b>
                  <div className="qty"><button onClick={()=>change(x.id,-1)}><Minus/></button><span>{x.qty}</span><button onClick={()=>change(x.id,1)}><Plus/></button></div>
                </div>
                <button className="trash" onClick={()=>setCart(c=>c.filter(i=>i.id!==x.id))}><Trash2 size={18}/></button>
              </div>)}
            </div>
            <div className="checkout-box">
              <div><span>Subtotal</span><b>${subtotal.toFixed(2)}</b></div>
              <div><span>Delivery</span><b>$2.90</b></div>
              <div className="total"><span>Total</span><b>${(subtotal+2.9).toFixed(2)}</b></div>
              <button className="btn primary full" onClick={()=>setDone(true)}>Place demo order <ShoppingBag size={18}/></button>
              <small>This is a static demo — no payment is processed.</small>
            </div>
          </>}
        </aside>
      </div>}
      <Footer />
    </>
  )
}
