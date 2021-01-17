import React from 'react';

import useHealth from '../hooks/useHealth'
import Header from './header';
import Docs from './docs';
import Status from './status';

export default function App() {
  const health = useHealth()

  console.log('+++health:', health)

  return (
    <div className="container">
      <Header />
      <Status {...health} />
      <Docs />
      <section className="section">
        <footer className="footer">
          &copy; Copyright 2021 <a href="https://mikeshultz.com/">Mike Shultz</a>
        </footer>
      </section>
    </div>
  )
}
