"use client";
import Image from 'next/image';
import doctorImage from '../../images/doctorImage.png';
import hospitalBiographyImage from '../../images/hospitalBiography.jpeg';
import Link from 'next/link';

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
              <span className="text-green-600">Your Trusted Healthcare Provider</span>
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
            <h1 className="text-3xl font-bold text-blue-600 mb-4">Our Biography</h1>
            <h3 className="text-xl font-semibold text-green-600 mb-6">Who We Are</h3>

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

        {/* Services Section */}
        <div className="flex flex-col items-center justify-center mt-16">
          <h1 className="text-3xl font-bold text-blue-600 mb-6">Our Healthcare Services</h1>
          
          <div className="md:w-3/4 grid grid-cols-1 md:grid-cols-2 gap-8 text-center">
            {/* Service 1 */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-green-600 mb-4">Primary Care</h2>
              <p className="text-gray-700 leading-relaxed">
                Comprehensive primary care services focused on maintaining your health with preventive checkups, diagnosis, and personalized treatment plans.
              </p>
            </div>

            {/* Service 2 */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-green-600 mb-4">Specialized Treatments</h2>
              <p className="text-gray-700 leading-relaxed">
                From cardiology to oncology, our specialists provide advanced treatments for a wide range of complex medical conditions, ensuring you receive the best care possible.
              </p>
            </div>

            {/* Service 3 */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-green-600 mb-4">Surgical Procedures</h2>
              <p className="text-gray-700 leading-relaxed">
                Our state-of-the-art surgical department offers a full range of inpatient and outpatient procedures, with a focus on safety and successful outcomes.
              </p>
            </div>

            {/* Service 4 */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-green-600 mb-4">Wellness Programs</h2>
              <p className="text-gray-700 leading-relaxed">
                We offer holistic wellness programs that include fitness plans, dietary consultations, and stress management, promoting a balanced and healthy lifestyle.
              </p>
            </div>
          </div>
        </div>

        {/* Login and Signup Section */}
        <div className="flex flex-col items-center justify-center mt-16">
          <h2 className="text-3xl font-bold text-blue-600 mb-4">Join Us Today</h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            Already have an account? <span className="font-semibold text-blue-600">Log in</span> or create a new account to access our services and stay updated.
          </p>

          <div className="flex space-x-4">

          <Link href="/login" className="bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-500 transition duration-300">LogIn</Link>
          <Link href="/signup" className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-500 transition duration-300">signUp</Link>
          </div>
        </div>
      </div>  
    </div>
  );
}
