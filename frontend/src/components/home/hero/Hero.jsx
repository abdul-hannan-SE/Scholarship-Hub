import React from "react"
import Heading from "../../common/heading/Heading"
import "./Hero.css"

const Hero = () => {
  return (
    <>
      <section className='hero'>
        <div className='container'>
          <div className='row'>
            <Heading subtitle='Welcome to Pak Opporunity Hub' title='Best Online consultants' />
            <p>"Beyond the chaos, within the reach of opportunities, Pak Opportunity Hub unveils a path for all aspiring hearts."</p>
            <div className='button'>
              <button className='primary-btn'>
                GET STARTED NOW <i className='fa fa-long-arrow-alt-down'></i>
              </button>
              <button className="viewcourse" >
                VIEW COURSE <i className='fa fa-long-arrow-alt-down'></i>
              </button>
            </div>
          </div>
        </div>
      </section>
      <div className='margin'></div>
    </>
  )
}

export default Hero
