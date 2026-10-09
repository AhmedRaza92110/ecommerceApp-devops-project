"use client";

import { useState } from "react";
import {
  BarChart3, Bell, ChevronDown, CircleDollarSign, Clock3, LayoutDashboard,
  ShoppingBag, Star, TrendingUp, UsersRound, UtensilsCrossed, CalendarDays,
  ArrowUpRight, MoreHorizontal, ChefHat
} from "lucide-react";
import NavBar from "../../components/NavBar";

const orders=[
  ["#2048","Alex M.","Burrata Pasta + Bowl","$37.30","Preparing","pink"],
  ["#2047","Mia L.","Smash Burger × 2","$35.80","Ready","green"],
  ["#2046","Noah K.","Garden Pizza","$19.50","Delivered","blue"],
  ["#2045","Sara J.","Tacos + Tropical Pop","$21.80","Preparing","pink"],
  ["#2044","Daniel R.","Coconut Curry","$18.20","Delivered","blue"]
];

export default function Dashboard(){
  const [period,setPeriod]=useState("Today");
  return <>
    <NavBar/>
    <main className="dashboard-bg">
      <section className="dashboard-shell">
        <aside className="sidepanel">
          <div className="side-title"><span><ChefHat/></span><div><b>BrightBite</b><small>Restaurant Admin</small></div></div>
          <nav>
            <a className="side-active"><LayoutDashboard/>Overview</a>
            <a><ShoppingBag/>Orders <em>12</em></a>
            <a><UtensilsCrossed/>Menu</a>
            <a><CalendarDays/>Reservations</a>
            <a><UsersRound/>Customers</a>
            <a><BarChart3/>Reports</a>
          </nav>
          <div className="manager-card"><div>AR</div><span><b>Alex Rivera</b><small>Restaurant Manager</small></span><ChevronDown/></div>
        </aside>

        <div className="dash-main">
          <div className="dash-header">
            <div><span className="kicker">FRIDAY, OCTOBER 9</span><h1>Good evening, Alex! <span>👋</span></h1><p>Here's what's happening at BrightBite today.</p></div>
            <button className="notify"><Bell/><i>3</i></button>
          </div>

          <div className="stat-grid">
            <div className="stat-card stat-yellow"><div className="stat-icon"><CircleDollarSign/></div><span>Today's revenue</span><h2>$4,286</h2><small><TrendingUp/> 18.4% <i>vs yesterday</i></small></div>
            <div className="stat-card stat-coral"><div className="stat-icon"><ShoppingBag/></div><span>Total orders</span><h2>128</h2><small><TrendingUp/> 12.1% <i>vs yesterday</i></small></div>
            <div className="stat-card stat-green"><div className="stat-icon"><UsersRound/></div><span>Reservations</span><h2>34</h2><small>84 guests expected</small></div>
            <div className="stat-card stat-purple"><div className="stat-icon"><Clock3/></div><span>Avg. prep time</span><h2>18m</h2><small><TrendingUp/> 6% faster <i>today</i></small></div>
          </div>

          <div className="dash-grid">
            <section className="panel sales-panel">
              <div className="panel-head"><div><h3>Sales overview</h3><p>Revenue throughout the day</p></div>
                <select value={period} onChange={e=>setPeriod(e.target.value)}><option>Today</option><option>This week</option><option>This month</option></select>
              </div>
              <div className="chart-area">
                <div className="ylabels"><span>$1.2k</span><span>$900</span><span>$600</span><span>$300</span><span>$0</span></div>
                <div className="chart-canvas">
                  <div className="gridline g1"></div><div className="gridline g2"></div><div className="gridline g3"></div><div className="gridline g4"></div>
                  <svg viewBox="0 0 600 190" preserveAspectRatio="none">
                    <defs><linearGradient id="fill" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#ff6b5f" stopOpacity=".35"/><stop offset="100%" stopColor="#ff6b5f" stopOpacity=".02"/></linearGradient></defs>
                    <path d="M0 160 C45 145,55 130,90 142 S150 90,190 106 S255 142,300 91 S370 48,410 80 S470 28,515 55 S565 15,600 32 L600 190 L0 190 Z" fill="url(#fill)"/>
                    <path d="M0 160 C45 145,55 130,90 142 S150 90,190 106 S255 142,300 91 S370 48,410 80 S470 28,515 55 S565 15,600 32" fill="none" stroke="#ff6b5f" strokeWidth="5" strokeLinecap="round"/>
                  </svg>
                  <div className="xlabels"><span>11am</span><span>1pm</span><span>3pm</span><span>5pm</span><span>7pm</span><span>9pm</span></div>
                </div>
              </div>
            </section>

            <section className="panel popular-panel">
              <div className="panel-head"><div><h3>Popular dishes</h3><p>Top sellers today</p></div><button><MoreHorizontal/></button></div>
              <div className="popular-list">
                <div><span className="rank r1">1</span><b>🔥 Smash Burger</b><small>42 orders</small><strong>$751</strong></div>
                <div><span className="rank r2">2</span><b>🍝 Burrata Pasta</b><small>36 orders</small><strong>$680</strong></div>
                <div><span className="rank r3">3</span><b>🥗 Mango Bowl</b><small>31 orders</small><strong>$480</strong></div>
                <div><span className="rank r4">4</span><b>🍕 Garden Pizza</b><small>28 orders</small><strong>$546</strong></div>
              </div>
            </section>
          </div>

          <section className="panel orders-panel">
            <div className="panel-head"><div><h3>Recent orders</h3><p>Live kitchen and delivery activity</p></div><button className="text-btn">View all <ArrowUpRight/></button></div>
            <div className="order-table">
              <div className="table-row table-head"><span>ORDER</span><span>CUSTOMER</span><span>ITEMS</span><span>TOTAL</span><span>STATUS</span></div>
              {orders.map(o=><div className="table-row" key={o[0]}><b>{o[0]}</b><span>{o[1]}</span><span>{o[2]}</span><strong>{o[3]}</strong><span><i className={`status ${o[5]}`}></i>{o[4]}</span></div>)}
            </div>
          </section>
        </div>
      </section>
    </main>
  </>
}
