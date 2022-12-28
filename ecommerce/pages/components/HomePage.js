import React from 'react'
import Footer from './Footer'
import Imagegallery from './Imagegallery'
import Navbar from './Navbar'
import Services from './Services'
import SliderComponent from './SliderComponent'
import Trendingcollection from './Trendingcollection'

const HomePage = () => {
  return (
    <div>
{/* <SliderComponent/> */}
<Imagegallery/>
<Trendingcollection/>
<Services/>
<Footer/>

    </div>
  )
}

export default HomePage