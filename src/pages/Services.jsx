import React from 'react';
import ColourService from '../components/ColourService';
import ColourClubService from '../components/ColourClubService';
import BlowDryClubService from '../components/BlowDryClubService';
import SpecialExperience from '../components/SpecialExperience';
import Cenik from '../components/Cenik';

const Services = () => {
  return (
    <div className="page-wrapper">
      <ColourService />
      <ColourClubService />
      <BlowDryClubService />
      <SpecialExperience />
      <Cenik />
    </div>
  );
};

export default Services;