"use client";
import Image from 'next/image';
import doctorImage from '../../images/doctorImage.png';
import hospitalBiographyImage from '../../images/hospitalBiography.jpeg';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import urologyImage from '../../images/urology.jpeg';
import cardiologyImage from '../../images/cardiology.jpeg';
import dermatologyImage from '../../images/dermatology.jpeg';
import gastroenterologyImage from '../../images/gastroentrology.jpeg';
import endocrinologyImage from '../../images/endocrinology.jpeg';
import orthopedicsImage from '../../images/orthopedics.jpeg';
import oncologyImage from '../../images/oncology.jpeg';
import gynecologyImage from '../../images/gynecology.jpeg';
import neurologyImage from '../../images/neurlogy.jpeg';
import pediatricsImage from "../../images/pediatrics.jpeg";
import radiologyImage from "../../images/radiology.jpeg";
import PsychiatryImage from "../../images/psychatiry.jpeg";

// Example Department Data
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

export default function Home() {
  return (
    <div className="bg-blue-50 min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4 py-8">
        {/* Main Section */}
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Text Section */}
          <div className="md:w-1/2 text-left mb-6 md:mb-0">
            <h1 className="text-4xl font-bold text-blue-600 mb-10">
              Welcome to <br /> EverCare Medical Centre <br />
              <span className='text-green-600'>Your Trusted Healthcare Provider</span>
            </h1>
            <p className="text-gray-700 text-lg leading-relaxed">
              <span className="font-semibold text-blue-600">EverCare Medical Centre</span> is a <span className="italic">state-of-the-art facility</span> dedicated to providing <span className="text-blue-500 font-medium">comprehensive healthcare services</span> with compassion and expertise.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed">
              At <span className="font-semibold text-blue-600">EverCare</span>, we prioritize your well-being, ensuring a harmonious journey towards <span className="font-medium text-blue-500">optimal health and wellness</span>.
            </p>
          </div>

          {/* Image Section */}
          <div className="md:w-1/2 flex justify-center">
            <Image
              src={doctorImage}
              alt="Doctor"
              className="rounded-lg shadow-lg animate-float"
              width={500}
              height={300}
              objectFit="cover"
            />
          </div>
        </div>

        {/* Biography Section */}
        <div className="flex flex-col md:flex-row items-center justify-between mt-16">
          {/* Biography Image on the Left */}
          <div className="md:w-1/2 flex justify-center mb-6 md:mb-0">
            <Image
              src={hospitalBiographyImage}
              alt="Hospital Biography"
              className="rounded-lg shadow-lg"
              width={500}
              height={300}
              objectFit="cover"
            />
          </div>

          {/* Biography Text on the Right */}
          <div className="md:w-1/2 text-left px-4">
            <h1 className="text-3xl font-bold text-blue-600 mb-4">Our Story</h1>
            <h3 className="text-xl font-semibold text-gray-800 mb-6">Who We Are</h3>

            <p className="text-gray-700 text-lg leading-relaxed mb-4">
              <span className="font-semibold text-blue-500">EverCare Medical Centre</span> has been a trusted provider of world-class healthcare for over two decades. From our humble beginnings, we have grown into a state-of-the-art facility known for innovation and excellence in patient care.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed mb-4">
              Our team of over <span className="font-semibold text-blue-600">200 dedicated professionals</span> ensures personalized, compassionate care tailored to the unique needs of every patient, blending expertise and empathy in every interaction.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed mb-4">
              We offer a full spectrum of healthcare services, including <span className="text-blue-500 font-medium">preventive care, specialized treatments,</span> and wellness programs designed to help you lead a healthier, fuller life.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed">
              At <span className="font-semibold text-blue-600">EverCare</span>, we believe in a holistic approach to health and well-being, putting our patients at the center of everything we do.
            </p>
          </div>
        </div>

        {/* Departments Section */}
<div className="mt-28">
  <h2 className="text-3xl font-bold text-blue-600 mb-8 text-center">Our Departments</h2>
  <div className="flex flex-wrap justify-center md:justify-between">
    {departments.map((dept, index) => (
      <div key={index} className="flex flex-col items-center mb-4 w-full sm:w-1/2 md:w-1/4 lg:w-1/4">
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
    </div>
  );
}
