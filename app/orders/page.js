"use client";

import { useState } from "react";
import { Bike, CheckCircle2, ChefHat, ClipboardCheck, MapPin, Search, Timer } from "lucide-react";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";

export default function Orders(){
  const [id,setId]=useState("");
  const [shown,setShown]=useState(true);
  const steps=[
    {icon:<ClipboardCheck/>,title:"Order confirmed",time:"7:05 PM",done:true},
    {icon:<ChefHat/>,title:"Preparing your food",time:"7:10 PM",done:true,current:true},
    {icon:<Bike/>,title:"Out for delivery",time:"~7:24 PM",done:false},
    {icon:<MapPin/>,title:"Delivered",time:"~7:32 PM",done:false}
  ];
  return <>
    <NavBar/>
    <main>
      <section className="page-hero orders-hero">
        <span className="kicker">ORDER TRACKING</span><h1>Where's my <span>food?</span></h1>
        <p>Follow every tasty step from our kitchen to your door.</p>
      </section>
      <section className="shell tracking-layout">
        <div className="track-search">
          <h2>Track an order</h2><p>Enter your order number to view the latest status.</p>
          <div className="track-input"><Search/><input value={id} onChange={e=>setId(e.target.value)} placeholder="Try BB-2048"/><button onClick={()=>setShown(true)}>Track</button></div>
        </div>

        {shown&&<div className="track-card">
          <div className="track-top">
            <div><span className="kicker">ORDER #BB-2048</span><h2>It's cooking! 🔥</h2><p>2 items · $37.30 · Card payment</p></div>
            <div className="eta"><Timer/><span><small>Estimated arrival</small><b>24 min</b></span></div>
          </div>
          <div className="progress-line"><i style={{width:"43%"}}></i></div>
          <div className="track-steps">
            {steps.map((s,i)=><div className={`track-step ${s.done?"done":""} ${s.current?"current":""}`} key={s.title}>
              <div className="step-icon">{s.done&&!s.current?<CheckCircle2/>:s.icon}</div>
              <div><b>{s.title}</b><small>{s.time}</small></div>
            </div>)}
          </div>
          <div className="order-summary">
            <div><span>1×</span><b>Sunshine Burrata Pasta</b><strong>$18.90</strong></div>
            <div><span>1×</span><b>Mango Garden Bowl</b><strong>$15.50</strong></div>
            <div><span></span><b>Delivery</b><strong>$2.90</strong></div>
            <div className="summary-total"><span></span><b>Total</b><strong>$37.30</strong></div>
          </div>
        </div>}
      </section>
    </main>
    <Footer/>
  </>
}
