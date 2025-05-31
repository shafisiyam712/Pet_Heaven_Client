import React from 'react';
import Banner from '../Components/Banner';
import Heading from '../Components/Heading';
import BannerDescription from '../Components/BannerDescription';
import Newsletter from '../Components/Newsletter';

const Home = () => {
    return (
        <div>
            <Heading></Heading>
            <Banner></Banner>
            <BannerDescription></BannerDescription>
            <Newsletter></Newsletter>
        </div>
    );
};

export default Home;