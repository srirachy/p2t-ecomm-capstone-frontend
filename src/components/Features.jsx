import React from 'react';
import featureImg from '../assets/feature-img.png'
import { nanoid } from 'nanoid';
import '../styles/Features.css';

const Features = () => {
  const featureArr = [{fHeader: 'Personal AI Advisor', fText: 'Get personalized deck advice through an intuitive AI chat interface.'}, {fHeader: 'Personal AI Advisor', fText: 'Get personalized deck advice through an intuitive AI chat interface.'}, {fHeader: 'Personal AI Advisor', fText: 'Get personalized deck advice through an intuitive AI chat interface.'}];
  return (
    <section id='feature-section'>
      <figure id='feature-img-container'>
        <img src={featureImg} alt=''/>
      </figure>
      <div id='features-container'>
        <h2>Your trades on auto-pilot</h2>
        <p>Ace is your personal trade manager on the clock 24/7, freeing you from the daily grind of card management.</p>
        {featureArr.map(({fHeader, fText}) => 
          <React.Fragment key={nanoid()}>
            <h3>{fHeader}</h3>
            <p>{fText}</p>
          </React.Fragment>
        )}
      </div>
    </section>
  )
}

export default Features;
