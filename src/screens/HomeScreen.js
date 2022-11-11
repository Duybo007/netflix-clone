import React from 'react'
import Banner from '../Banner'
import "./HomeScreen.css"
import Nav from '../Nav'
import requests from '../Requests'
import Row from '../Row'


function HomeScreen() {

  return (
    <div className='HomeScreen'>
        <Nav/>
    
        <Banner/>


        <Row
          title="NETFLIX ORIGINAL"
          fetchUrl={requests.fetchNetflixOriginals}
          isLargeRow
        />
        <Row title="Trending Now" fetchUrl={requests.fetchTrending} isLargeRow/>
        <Row title="Top Rated" fetchUrl={requests.fetchToprated} isLargeRow/>
        <Row title="Animation Movies" fetchUrl={requests.fetchAnimationMovies} isLargeRow/>
        <Row title="War Movies" fetchUrl={requests.fetchWarMovies} isLargeRow/>
        <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMoviews} isLargeRow/>
        <Row title="Romance Movies" fetchUrl={requests.fetchRomanceMoviews} isLargeRow/>
        <Row title="Documentaries" fetchUrl={requests.fetchDocumentaries} isLargeRow/>
    </div>
  )
}

export default HomeScreen