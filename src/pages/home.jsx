// Home.js
import React from 'react';
import '../style/home.css';

export default function Home() {
  return (
    <div className="split-screen">
      <div className="left-side">
        {/* חלק השמאלי - רקע סגול */}
      </div>
      <div className="right-side">
        <div className="center-content">
          <div className="main-heading">Managment tasks</div>
          <div className="sub-text">manage your shared tasks</div>
        </div>
      </div>
    </div>
  );
}
