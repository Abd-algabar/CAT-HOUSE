import React from 'react'
import Hero from '../components/02-Hero/Hero'
import Cats from '../components/03-Cats available/Cats'
import About from '../components/05-About/About'
import Why from '../components/06-Why/Why'

const Home = () => {
  return (
    <>
      <Hero/>
      <Cats/>
      <About/>
      <Why/>
    </>
  )
}

export default Home
