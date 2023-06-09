import React, { useState, useEffect } from 'react';
import './style.css';
import gad from '../../images/gad-nadjar.jpeg';
import rudy from '../../images/rudy-haddad.jpeg';
import guy from '../../images/guy-shabtay.jpeg';
import nitzan from '../../images/nitzan.jpeg';
import zaccharie from '../../images/zaccharie.jpeg';
import Header from '../../components/header';
import Loading from '../../functions/loading';

export default function About(getAllPosts) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000); // simule un temps de chargement de 1 seconde
  }, []);

  const teamMembers = [
    {
      name: 'Nitzan Tomer',
      image: nitzan,
      linkedin: 'https://www.linkedin.com/in/nitzan-tomer/',
    },
    {
      name: 'Gad Nadjar',
      image: gad,
      linkedin: 'https://www.linkedin.com/in/gad-nadjar-810028241/',
    },
    {
      name: 'Zaccharie Attias',
      image: zaccharie,
      linkedin: 'https://www.linkedin.com/in/zaccharie-attias-883b08250/',
    },
    {
      name: 'Rudy Haddad',
      image: rudy,
      linkedin: 'https://www.linkedin.com/in/rudy-haddad-749999189/',
    },
    {
      name: 'Guy Shabtay',
      image: guy,
      linkedin: 'https://www.linkedin.com/in/software-engineering-student/',
    },
  ];

  return (
    <div className='head'>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Header page='profile' getAllPosts={getAllPosts} />
          <div className='about-wrapper'>
            <h1>About Us</h1>
            <p>
              Welcome to MyTrip, your ultimate guide to the world of travel and
              exploration! We're a passionate team of globetrotters, dedicated
              to sharing our love for discovering new places, cultures, and
              experiences with our ever-growing community of fellow adventurers.
              Our journey began in 2018 when a group of friends, bitten by the
              travel bug, decided to document and share their experiences with
              the world. Today, our family has expanded to include travel
              enthusiasts from all walks of life, who come together to inspire
              and support each other in exploring the wonders of our planet. At
              MyTrip, we believe that travel is more than just a hobby or a
              pastime – it's a way of life. We strive to provide our community
              with a wealth of engaging content, ranging from travel tips and
              destination guides to personal stories and inspiring visuals, all
              aimed at igniting the wanderlust within you. Our mission is to
              empower you to step out of your comfort zone and embrace the joy
              of discovery. We're committed to promoting responsible,
              sustainable, and inclusive travel that respects local communities,
              cultures, and the environment. Join our tribe of wanderers as we
              embark on a never-ending journey to uncover the hidden gems and
              breathtaking beauty of our world. Let us be your trusted
              companions, guiding you through the winding roads and uncharted
              territories of your next adventure. Follow us on social media and
              stay connected with our latest updates, travel tips, and stories
              that will fuel your wanderlust. Happy travels and let the
              adventure begin! Yours truly, The MyTrip Team
            </p>
            <div className='team-container'>
              {teamMembers.map((member, index) => (
                <div className='team-member' key={index}>
                  <a
                    href={member.linkedin}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <img src={member.image} alt={member.name} />
                    <h3>{member.name}</h3>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
