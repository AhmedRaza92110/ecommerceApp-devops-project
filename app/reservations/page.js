"use client";

import { useState } from "react";
import { CalendarDays, CheckCircle2, Clock3, UsersRound, Sparkles } from "lucide-react";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";

export default function Reservations(){
  const [submitted,setSubmitted]=useState(false);
  return <>
    <NavBar/>
    <main>
      <section className="page-hero reserve-hero">
        <span className="kicker">RESERVATIONS</span>
        <h1>Save your <span>seat.</span></h1>
        <p>Plan a dinner, brunch or celebration in less than a minute.</p>
      </section>

      <section className="booking-wrap shell">
        <div className="booking-copy">
          <div className="eyebrow"><Sparkles size={16}/> A table made for your moment</div>
          <h2>Good food tastes even better together.</h2>
          <p>Pick your date, time and party size. Our team will prepare a bright little corner just for you.</p>
          <div className="booking-benefits">
            <div><CalendarDays/><span><b>Flexible booking</b><small>Reserve up to 30 days ahead</small></span></div>
            <div><Clock3/><span><b>Open every day</b><small>11:00 AM — 11:00 PM</small></span></div>
            <div><UsersRound/><span><b>Groups welcome</b><small>Tables for 1 to 12 guests</small></span></div>
          </div>
        </div>

        <form className="booking-form" onSubmit={e=>{e.preventDefault();setSubmitted(true)}}>
          {submitted ? <div className="booking-success"><CheckCircle2 size={60}/><h2>You're booked!</h2><p>Your demo reservation has been confirmed. We can't wait to welcome you.</p><button type="button" className="btn primary" onClick={()=>setSubmitted(false)}>Make another</button></div> : <>
            <div><label>Your name</label><input required placeholder="Alex Morgan"/></div>
            <div><label>Email address</label><input required type="email" placeholder="alex@example.com"/></div>
            <div className="form-two">
              <div><label>Date</label><input required type="date"/></div>
              <div><label>Time</label><select><option>6:00 PM</option><option>6:30 PM</option><option>7:00 PM</option><option>7:30 PM</option><option>8:00 PM</option></select></div>
            </div>
            <div><label>Party size</label><select><option>2 guests</option><option>3 guests</option><option>4 guests</option><option>5 guests</option><option>6+ guests</option></select></div>
            <div><label>Special request</label><textarea placeholder="Birthday, window seat, dietary note..."></textarea></div>
            <button className="btn primary full">Confirm reservation</button>
          </>}
        </form>
      </section>
    </main>
    <Footer/>
  </>
}
