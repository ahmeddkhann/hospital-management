"use client"

import React from 'react'
import urologyImage from '../../../images/urology.jpeg';
import cardiologyImage from '../../../images/cardiology.jpeg';
import endocrinologyImage from '../../../images/endocrinology.jpeg';
import orthopedicsImage from '../../../images/orthopedics.jpeg';
import gynecologyImage from '../../../images/gynecology.jpeg';
import neurologyImage from '../../../images/neurlogy.jpeg';
import pediatricsImage from "../../../images/pediatrics.jpeg";
import radiologyImage from "../../../images/radiology.jpeg";
import Image from 'next/image';


const departments = [
    {
      name: "Cardiology",
      details: "Expert care for heart-related conditions.",
      image: cardiologyImage,
    },
    {
      name: "Pediatrics",
      details: "Specialized healthcare for children.",
      image: pediatricsImage,
    },
    {
      name: "Orthopedics",
      details: "Treatment of musculoskeletal issues.",
      image: orthopedicsImage,
    },
    {
      name: "Neurology",
      details: "Comprehensive care for neurological conditions.",
      image: neurologyImage,
    },
  
    {
      name: "Radiology",
      details: "Advanced imaging and diagnostic services.",
      image: radiologyImage,
    },
  
    {
      name: "Gynecology",
      details: "Women’s health and reproductive services.",
      image: gynecologyImage,
    },
    {
      name: "Endocrinology",
      details: "Hormonal and metabolic health.",
      image: endocrinologyImage,
    },
    {
      name: "Urology",
      details: "Urinary tract and male reproductive health.",
      image: urologyImage,
    },
  ];

const Departments = () => {
  return (
    <div  className="bg-blue-50 min-h-screen flex items-center justify-center" >
       <div className="mt-20">
  <h2 className="text-3xl font-bold text-blue-600 mb-8 text-center">Our Departments</h2>
  <div className="flex flex-wrap justify-center md:justify-between">
    {departments.map((dept, index) => (
      <div key={index} className="flex flex-col items-center mb-4 mt-4 w-full sm:w-1/2 md:w-1/4 lg:w-1/4">
        <Image
          src={dept.image}
          alt={dept.name}
          className="rounded-lg shadow-lg mb-4"
          width={250}
          height={150}
          objectFit="cover"
        />
        <h3 className="text-xl font-semibold text-green-600 mb-2">{dept.name}</h3>
        <p className="text-gray-700 text-center">{dept.details}</p>
      </div>
    ))}
  </div>
</div>


</div>
  ) }

export default Departments
