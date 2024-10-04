"use client"
import Image from 'next/image';
import doctorImage from '../../images/doctorImage.png';
import hospitalBiographyImage from '../../images/hospitalBiography.jpeg';

export default function Home() {
  return (
    <div className="bg-blue-50 min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          
          {/* Text Section */}
          <div className="md:w-1/2 text-left mb-6 md:mb-0">
            <h1 className="text-4xl font-bold text-blue-600 mb-10">
              Welcome to <br /> EverCare Medical Centre <br />
               <span className='text-green-600' >Your Trusted Healthcare Provider</span>
            </h1>
            <p className="text-gray-700 text-lg leading-relaxed ">
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

   
      </div>
    </div>
  );
}
