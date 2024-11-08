'use client';

import Image from 'next/image';
import {
    FaEnvelope,
    FaPhone,
    FaFacebookF,
    FaInstagram,
    FaTiktok,
    FaLinkedinIn,
} from 'react-icons/fa6';

const Footer = () => {
    return (
        <footer className="w-full text-ginaWhite bg-ginaBlue flex py-10 px-8 justify-center items-center">
            <div className="flex flex-col items-center sm:items-end">
                <div className="max-w-screen-2xl border-b border-b-ginaWhite flex justify-between items-center sm:items-start flex-col sm:flex-row pb-4">
                    <div className="w-2/5 lg:w-1/4 flex items-center sm:items-start justify-center mr-0 my-12 sm:mr-8 sm:my-0">
                        <Image
                            src="/images/gina/logo-white.png"
                            alt="Gina Experiences Logo"
                            quality={100}
                            width={400}
                            height={400}
                            className="w-full h-auto"
                        />
                    </div>
                    <div className="flex flex-col space-x-0 space-y-8 lg:space-y-0 lg:space-x-12 lg:flex-row">
                        <div className="flex flex-col items-center sm:items-start">
                            <span className="text-3xl font-bold">COMPANY</span>
                            <button>About us</button>
                            <button>Join us us</button>
                        </div>
                        <div className="flex flex-col items-center sm:items-start">
                            <span className="text-3xl font-bold">HELP</span>
                            <button>Sevices</button>
                            <button>FAQ</button>
                        </div>
                        <div className="flex flex-col items-center sm:items-start">
                            <span className="text-3xl font-bold">LEGAL</span>
                            <button className="text-left">
                                Terms & Conditions
                            </button>
                            <button>Privacy Policy</button>
                        </div>
                        <div className="flex flex-col items-center sm:items-start w-72">
                            <span className="text-3xl font-bold">
                                CONTACT US
                            </span>
                            <span className="flex items-center gap-2">
                                <FaEnvelope size={15} />
                                ginatravel.ph@gmail.com
                            </span>
                            <span className="flex items-center gap-2">
                                <FaPhone size={15} />
                                +63 917 108 6757
                            </span>
                            <div className="flex space-x-4 my-10">
                                <button className="bg-ginaWhite w-10 h-10 p-3 text-ginaBlue rounded-full flex items-center justify-center">
                                    <FaFacebookF size={20} />
                                </button>
                                <button className="bg-ginaWhite w-10 h-10 p-2 text-ginaBlue rounded-full flex items-center justify-center">
                                    <FaInstagram size={25} />
                                </button>
                                <button className="bg-ginaWhite w-10 h-10 p-3 text-ginaBlue rounded-full flex items-center justify-center">
                                    <FaTiktok size={30} />
                                </button>
                                <button className="bg-ginaWhite w-10 h-10 p-3 text-ginaBlue rounded-full flex items-center justify-center">
                                    <FaLinkedinIn size={30} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-between w-72 pt-2">
                    <button>FAQ</button>
                    <button>Privacy</button>
                    <button>Terms & Conditions</button>
                </div>
            </div>
        </footer>
    );
};
export default Footer;
