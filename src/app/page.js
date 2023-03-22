"use client";
import Head from "next/head";
import {BsFillMoonStarsFill, BsTextCenter} from 'react-icons/bs'
import {
  AiFillMail,
  AiFillLinkedin,
  AiFillPhone,
} from "react-icons/ai";
import Logo from "../../public/logo.png";
import HTML from "../../public/html.png";
import CSS from "../../public/css.png";
import PHP from "../../public/php.png";
import Python from "../../public/python.png";
import JS from "../../public/js.png";
import ReactJS from "../../public/react.png";
import Catia from "../../public/catia.png";
import ThreeD from "../../public/3dexp.png";
import SW from "../../public/sw1.png";
import ZS from "../../public/zs.png";
import Inventor from "../../public/inventor.png";
import Office from "../../public/office1.png";
import PS from "../../public/ps.png";
import AI from "../../public/ai.png";
import Image from "next/image";
import deved from '../../public/me.png';
import React, { useEffect, useState, useRef } from "react";
import 'flowbite';

export default function Home() {
  const [darkMode, setDarkMode] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [homeOpen, setHomeOpen] = useState(true);
  const [edOpen, setEdOpen] = useState(false);
  const [expOpen, setExpOpen] = useState(false);
  const [contOpen, setContOpen] = useState(false);
  const [ac0, setAc0] = useState(true);
  const [ac1, setAc1] = useState(false);
  const [ac2, setAc2] = useState(false);
  const [ac3, setAc3] = useState(false);
  const [ac4, setAc4] = useState(false);
  const [ac5, setAc5] = useState(false);
  const [ac6, setAc6] = useState(false);
  const [ac7, setAc7] = useState(false);
  const [ac8, setAc8] = useState(false);
  const [ac9, setAc9] = useState(false);

  let menuRef = useRef();

  useEffect(() => {
    let handler = (event) =>{
      if (!menuRef.current.contains(event.target)){
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  async function handleOnSubmit(e) {
    e.preventDefault();
    const formData = {}
    Array.from(e.currentTarget.elements).forEach(field => {
      if ( !field.name ) return;
      formData[field.name] = field.value;
    });
    fetch('/api/mail', {
      method: 'post',
      body: JSON.stringify(formData)
    });

    console.log(formData);

    window.alert("Your message was sent!");
  }

  return (
    <div className={darkMode ? "dark" : ""}>
      <main className="bg-white text-black dark:bg-gray-900">
        
        <header ref={menuRef} className="xl:px-40 bg-white xs:px-2 sm:px-4 py-2.5 dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
          <div className="max-w-8xl xl:center">
            <div className="flex-wrap">
              <div className="lg:container flex items-center justify-between w-full px-3 py-3 mx-auto max-w-8xl md:px-4">
                <div className="flex items-center">

                <button onClick={() => setIsOpen(!isOpen)} className="md:hidden inline-flex items-center p-2 mr-2 text-sm text-gray-500 rounded-lg hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700">
                  <span className="sr-only">Open main menu</span>
                  <svg id="toggleSidebarMobileHamburger" className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
                </button>

                <div className="flex items-center justify-between">
                  <a href="/" onClick={() => setHomeOpen(true) & setEdOpen(false) & setExpOpen(false) & setContOpen(false)} className="flex">
                    <Image src={Logo} className="h-8 w-8 mr-3" alt="HY13dev Logo"/>
                    <span className="self-center text-2xl font-semibold whitespace-nowrap pr-5 sm:pr-2.5 dark:text-white">HY13dev</span>
                  </a>
                </div>
                <div id="docsearch" className="ml-6"></div>
                
                </div>
                <div className="flex md:order-2">
                  <a href="mailto:ylyamartchenko@gmail.com" target="_blank" rel="noreferrer" data-tooltip-target="tooltip-mail" className="hidden sm:inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 mr-1" >
                    <AiFillMail className="w-6 h-6" aria-hidden="true"/>
                    <span className="sr-only">Send an E-mail</span>
                  </a>
                  <div id="tooltip-mail" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip">
                      Send an E-mail
                      <div className="tooltip-arrow" data-popper-arrow></div>
                  </div>
                  <a href="https://www.linkedin.com/in/ylya-martchenko-214a64184" target="_blank" rel="noreferrer" data-tooltip-target="tooltip-linkedin" className="hidden sm:inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 mr-1" >
                    <AiFillLinkedin className="w-6 h-6" aria-hidden="true"/>
                    <span className="sr-only">View on LinkedIn</span>
                  </a>
                  <div id="tooltip-linkedin" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip">
                      View on LinkedIn
                      <div className="tooltip-arrow" data-popper-arrow></div>
                  </div>
                  <a href="https://github.com/HoodieYlya13" target="_blank" rel="noreferrer" data-tooltip-target="tooltip-github" className="hidden sm:inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 mr-1" >
                    <svg className="w-5 h-5 mt-0.5" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="github" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512"><path fill="currentColor" d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"></path></svg>
                    <span className="sr-only">View on Github</span>
                  </a>
                  <div id="tooltip-github" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip">
                      View on Github
                      <div className="tooltip-arrow" data-popper-arrow></div>
                  </div>
                  <button onClick={() => setDarkMode(!darkMode)} id="theme-toggle" data-tooltip-target="tooltip-toggle" type="button" className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5">
                    <BsFillMoonStarsFill className="cursor-pointer text-2xl dark:text-gray-400"/>
                    <svg aria-hidden="true" id="theme-toggle-dark-icon" className="hidden w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path></svg>
                    <svg aria-hidden="true" id="theme-toggle-light-icon" className="hidden w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" fillRule="evenodd" clipRule="evenodd"></path></svg>
                    <span className="sr-only">Toggle dark mode</span>
                  </button>
                  <div id="tooltip-toggle" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip">
                      
                    Toggle dark mode
                      
                    <div className="tooltip-arrow" data-popper-arrow>
                    </div>
                    
                  </div>
                  <a href="./Resume_Ylya_Martchenko.pdf" target="_blank" rel="noreferrer"data-tooltip-target="tooltip-resume" className="inline-flex items-center text-white bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 focus:ring-2 focus:ring-orange-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center ml-3">
                    Resume
                    <span className="sr-only">View my resume</span>
                  </a>
                  <div id="tooltip-resume" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip">
                      View my resume
                      <div className="tooltip-arrow" data-popper-arrow></div>
                  </div>
                </div>
                <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1">
                    
                  <ul className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                    {homeOpen && <div>  
                      <li>
                        <a href="/" className="block py-2 pl-3 pr-4 text-orange-600 md:p-0 md:hover:bg-transparent md:hover:text-orange-500" aria-current="page">Home</a>
                      </li>
                    </div>
                    }
                    {!homeOpen && <div>  
                      <li>
                        <a onClick={() => setHomeOpen(true) & setEdOpen(false) & setExpOpen(false) & setContOpen(false)} href="/" className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-orange-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700" aria-current="page">Home</a>
                      </li>
                    </div>
                    }
                    {edOpen && <div> 
                      <li>
                        <a href="#Education" className="block py-2 pl-3 pr-4 text-orange-600 md:p-0 md:hover:bg-transparent md:hover:text-orange-500">Education</a>
                      </li>
                    </div>
                    }
                    {!edOpen && <div> 
                      <li>
                        <a onClick={() => setHomeOpen(false) & setEdOpen(true) & setExpOpen(false) & setContOpen(false)} href="#Education" className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-orange-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Education</a>
                      </li>
                    </div>
                    }
                    {expOpen && <div> 
                      <li>
                        <a href="#Experience" className="block py-2 pl-3 pr-4 text-orange-600 md:p-0 md:hover:bg-transparent md:hover:text-orange-500">Experience</a>
                      </li>
                    </div>
                    }
                    {!expOpen && <div> 
                      <li>
                        <a onClick={() => setHomeOpen(false) & setEdOpen(false) & setExpOpen(true) & setContOpen(false)} href="#Experience" className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-orange-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Experience</a>
                      </li>
                    </div>
                    }
                    {contOpen && <div> 
                    <li>
                      <a href="#Contact" className="block py-2 pl-3 pr-4 text-orange-600 md:p-0 md:hover:bg-transparent md:hover:text-orange-500">Contact</a>
                    </li>
                    </div>
                    }
                    {!contOpen && <div> 
                    <li>
                      <a onClick={() => setHomeOpen(false) & setEdOpen(false) & setExpOpen(false) & setContOpen(true)} href="#Contact" className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-orange-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Contact</a>
                    </li>
                    </div>
                    }
                  </ul>               
                
                </div>
                  
              </div>

              {isOpen && <div className="items-center justify-between w-full px-2.5 md:hidden" id="sidebar">
                  
                <ul className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">

                  {homeOpen && <div>
                    <li>
                      <a href="/" onClick={() => setIsOpen(!isOpen)} className="block py-2 pl-3 pr-4 rounded bg-orange-600 text-white" aria-current="page">Home</a>
                      <span className="sr-only">Close main menu</span>                    
                    </li>
                  </div>
                  }
                  {!homeOpen && <div>
                    <li>
                      <a href="/" onClick={() => setIsOpen(!isOpen) & setHomeOpen(true) & setEdOpen(false) & setExpOpen(false) & setContOpen(false)} className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-orange-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700" aria-current="page">Home</a>
                      <span className="sr-only">Close main menu</span>                    
                    </li>
                  </div>
                  }
                  {edOpen && <div>
                    <li>
                      <a href="#Education" onClick={() => setIsOpen(!isOpen)} className="block py-2 pl-3 pr-4 rounded bg-orange-600 text-white">
                        Education
                        <span className="sr-only">Close main menu</span>
                      </a>
                    </li>
                  </div>
                  }
                  {!edOpen && <div>
                    <li>
                      <a href="#Education" onClick={() => setIsOpen(!isOpen) & setHomeOpen(false) & setEdOpen(true) & setExpOpen(false) & setContOpen(false)} className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-orange-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                        Education
                        <span className="sr-only">Close main menu</span>
                      </a>
                    </li>
                  </div>
                  }
                  {expOpen && <div>
                    <li>
                      <a href="#Experience" onClick={() => setIsOpen(!isOpen)} className="block py-2 pl-3 pr-4 rounded bg-orange-600 text-white">Experience</a>
                    </li>
                  </div>
                  }
                  {!expOpen && <div>
                    <li>
                      <a href="#Experience" onClick={() => setIsOpen(!isOpen) & setHomeOpen(false) & setEdOpen(false) & setExpOpen(true) & setContOpen(false)} className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-orange-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Experience</a>
                    </li>
                  </div>
                  }
                  {contOpen && <div>
                    <li>
                      <a href="#Contact" onClick={() => setIsOpen(!isOpen)} className="block py-2 pl-3 pr-4 rounded bg-orange-600 text-white">Contact</a>
                      <span className="sr-only">Close main menu</span>
                    </li>
                  </div>
                  }
                  {!contOpen && <div>
                    <li>
                      <a href="#Contact" onClick={() => setIsOpen(!isOpen) & setHomeOpen(false) & setEdOpen(false) & setExpOpen(false) & setContOpen(true)} className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-orange-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Contact</a>
                      <span className="sr-only">Close main menu</span>
                    </li>
                  </div>
                  }
                </ul>               
              
              </div>}
            
            </div>

          </div>

        </header>
        
        <section className="min-h-screen pb-10 px-10 md:px-20 xl:px-40">

          <div className="text-center py-10">
            <h2 className="px-5 xs:px-10 text-5xl pt-20 pb-10 text-orange-600 font-medium md:text-6xl md:pt-32 md:pb-20">
              Ylya Martchenko
            </h2>
            <h3 className="px-10 text-2xl py-2 md:text-3xl dark:text-gray-100">Full stack developer</h3>
            <p className="px-10 text-md py-5 leading-8 text-gray-800 md:text-xl max-w-lg mx-auto dark:text-gray-300">
              I am a 21-year-old student looking for a work-linked training in computer science cooperating with an engineering school. <br/>
              Join me down below and let's get started!
            </p>
          </div>
          <div className="text-5xl flex justify-center gap-16 py-3 text-orange-500">

            <a href="mailto:ylyamartchenko@gmail.com" target="_blank" rel="noreferrer" data-tooltip-target="tooltip-mail-2" className="hover:text-orange-600">
              <AiFillMail aria-hidden="true"/>
              <span className="sr-only">Send an E-mail</span>
            </a>

            <div id="tooltip-mail-2" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip">
                Send an E-mail
                <div className="tooltip-arrow" data-popper-arrow></div>
            </div>

            <a href="https://www.linkedin.com/in/ylya-martchenko-214a64184" target="_blank" rel="noreferrer" data-tooltip-target="tooltip-linkedin-2" className="hover:text-orange-600">
              <AiFillLinkedin aria-hidden="true"/>
              <span className="sr-only">View on LinkedIn</span>
            </a>

            <div id="tooltip-linkedin-2" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip">
                View on LinkedIn
                <div className="tooltip-arrow" data-popper-arrow></div>
            </div>

            <a href="https://github.com/HoodieYlya13" target="_blank" rel="noreferrer" data-tooltip-target="tooltip-github-2" className="hover:text-orange-600">
              <svg className="w-12 h-12" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="github" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512"><path fill="currentColor" d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"></path></svg>
              <span className="sr-only">View on Github</span>
            </a>

            <div id="tooltip-github-2" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip">
                View on Github
                <div className="tooltip-arrow" data-popper-arrow></div>
            </div>
          </div>

          <div className="relative mx-auto bg-gradient-to-b from-orange-600 rounded-full w-80 h-80 mt-20 overflow-hidden md:h-96 md:w-96">
            <div className="mt-3 md:mt-3.5">
              <Image src={deved} cover/>
            </div>
          </div>

        </section>

        <section className="bg-gray-50 dark:bg-gray-800 py-10 px-10 md:px-20 xl:px-40 scroll-mt-20 md:scroll-mt-24" id="Education">

        <h3 className="text-3xl pb-10 max-w-4xl mx-auto dark:text-gray-100">Education</h3>

        <ol className="relative border-l max-w-3xl mx-auto border-gray-200 dark:border-gray-700">                  
            <li className="mb-10 ml-4">
                <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">2019 - 2021</time>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">PeiP (Polytech engineering schools course)</h3>
                <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">Polytech Nancy | Vandœuvre-lès-Nancy</p>
            </li>
            <li className="mb-10 ml-4">
                <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">2021 - 2022</time>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">BTEC Higher National Diploma in Physics Measures</h3>
                <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">U.I.T. Department of Measures | Metz</p>
            </li>
            <li className="mb-10 ml-4">
                <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">2022 - 2023</time>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Diploma of Higher Education in Engineering Science</h3>
                <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">F.R.U. Mathematics, computer science, mechanics | Metz</p>
            </li>
            <li className="ml-4">
                <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">2023</time>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">HarvardX CS50x</h3>
                <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">Harvard University | Online courses</p>
            </li>
        </ol>

        </section>
        
        <section className="py-10 px-10 md:px-20 xl:px-40 scroll-mt-20 md:scroll-mt-24" id="Experience">

          <h3 className="text-3xl py-1 max-w-4xl mx-auto dark:text-gray-100">Experience</h3>

          <div className="max-w-6xl mx-auto space-y-4 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-4 sm:space-y-0 mt-12">

            {ac0 && <div className="block sm:hidden px-8 py-12 text-center bg-white rounded-xl shadow-sm dark:bg-gray-800 hover:shadow-lg dark:hover:shadow-lg-light">
                
                <p className="text-left dark:text-gray-100">2015</p>

                <h3 className="text-lg font-medium pt-8 pb-2 dark:text-gray-100">
                  Basketball playground project
                </h3>

                <p className="py-2 dark:text-gray-300">
                  Metz City Hall
                </p>

                <button onClick={() => setAc0(!ac0)} type="button" className="bg-white dark:bg-inherit flex items-center justify-between w-full py-5 font-medium text-left border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
                  <span className="text-orange-600">What I did</span>
                  <svg data-accordion-icon className="w-6 h-6 shrink-0 rotate-180 dark:text-gray-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                </button>

                <div className="block">
                  <div className="py-5 font-light border-b border-gray-200 dark:border-gray-700">
                    <p className="mb-2 text-gray-500 dark:text-gray-400">
                      Main character in the project of building a basketball court in my neighborhood, at only <span className="text-orange-600">14 years old</span>.
                      My friends and I had presented our dream court to the elected representatives of our city.
                    </p>
                    <p className="text-gray-500 dark:text-gray-400">
                      We proposed a PowerPoint presentation and our 3D model with the estimate cost that companies gave us.
                      The total cost of the project was around <span className=" text-orange-600">€100,000</span> which was partially covered (35%) thanks to a partnership with GRDF.
                    </p>
                  </div>
                </div>

              </div>
            }

            {!ac0 && <div className="block sm:hidden px-8 py-12 text-center bg-white rounded-xl shadow-sm dark:bg-gray-800 hover:shadow-lg dark:hover:shadow-lg-light">
                
                <p className="text-left dark:text-gray-100">2015</p>

                  <h3 className="text-lg font-medium pt-8 pb-2 dark:text-gray-100">
                    Basketball playground project
                  </h3>

                <p className="py-2 dark:text-gray-300">
                  Metz City Hall
                </p>

                <button onClick={() => setAc0(!ac0)} type="button" className="bg-white dark:bg-inherit flex items-center justify-between w-full py-5 font-medium text-left border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
                  <span className="text-orange-600">What I did</span>
                  <svg data-accordion-icon className="w-6 h-6 shrink-0 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                </button>

              </div>
            }

            {ac1 && <div className="sm:block hidden px-8 py-12 text-center bg-white rounded-xl shadow-sm dark:bg-gray-800 hover:shadow-lg dark:hover:shadow-lg-light">
                
                <p className="text-left dark:text-gray-100">2015</p>

                <h3 className="text-lg font-medium pt-8 pb-2 dark:text-gray-100">
                  Basketball playground project
                </h3>

                <p className="py-2 dark:text-gray-300">
                  Metz City Hall
                </p>

                <button onClick={() => setAc1(!ac1)} type="button" className="bg-white dark:bg-inherit flex items-center justify-between w-full py-5 font-medium text-left border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
                  <span className="text-orange-600">What I did</span>
                  <svg data-accordion-icon className="w-6 h-6 shrink-0 rotate-180 dark:text-gray-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                </button>

                <div className="block">
                  <div className="py-5 font-light border-b border-gray-200 dark:border-gray-700">
                    <p className="mb-2 text-gray-500 dark:text-gray-400">
                      Main character in the project of building a basketball court in my neighborhood, at only <span className="text-orange-600">14 years old</span>.
                      My friends and I had presented our dream court to the elected representatives of our city.
                    </p>
                    <p className="text-gray-500 dark:text-gray-400">
                      We proposed a PowerPoint presentation and our 3D model with the estimate cost that companies gave us.
                      The total cost of the project was around <span className=" text-orange-600">€100,000</span> which was partially covered (35%) thanks to a partnership with GRDF.
                    </p>
                  </div>
                </div>

              </div>
            }

            {!ac1 && <div className="sm:block hidden px-8 py-12 text-center bg-white rounded-xl shadow-sm dark:bg-gray-800 hover:shadow-lg dark:hover:shadow-lg-light">
                
                <p className="text-left dark:text-gray-100">2015</p>

                  <h3 className="text-lg font-medium pt-8 pb-2 dark:text-gray-300">
                    Basketball playground project
                  </h3>

                <p className="py-2 dark:text-gray-300">
                  Metz City Hall
                </p>

                <button onClick={() => setAc1(!ac1)} type="button" className="bg-white dark:bg-inherit flex items-center justify-between w-full py-5 font-medium text-left border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
                  <span className="text-orange-600">What I did</span>
                  <svg data-accordion-icon className="w-6 h-6 shrink-0 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                </button>

              </div>
            }

            {ac2 && <div className="block px-8 py-12 text-center bg-white rounded-xl shadow-sm dark:bg-gray-800 hover:shadow-lg dark:hover:shadow-lg-light">
                
                <p className="text-left dark:text-gray-100">Nov. 2015 - Dec. 2015</p>
                <h3 className="text-lg font-medium pt-8 pb-2 dark:text-gray-100">
                  Internship
                </h3>
                <p className="py-2 dark:text-gray-300">
                  Metz City Hall : Citizenship service and participatory democracy
                </p>

                  <button onClick={() => setAc2(!ac2)} type="button" className="bg-white dark:bg-inherit flex items-center justify-between w-full py-5 font-medium text-left border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
                    <span className="text-orange-600">What I did</span>
                    <svg data-accordion-icon className="w-6 h-6 shrink-0 rotate-180 dark:text-gray-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                  </button>

                  <div className="py-5 font-light border-b border-gray-200 dark:border-gray-700">
                    <p className="mb-2 text-gray-500 dark:text-gray-400">
                      Our basketball project directly led me to an inspiring internship with the team that turned our dream court into reality.
                    </p>
                    <p className="text-gray-500 dark:text-gray-400">
                      There, I participated in important meetings such as <span className=" text-orange-600">"participatory budget plan"</span> which implied setting up budgets for citizens' projects up to <span className=" text-orange-600">€1,000,000</span>.
                      Moreover, I even organized meetings with citizens that had potential projects for our city.
                    </p>
                  </div>

                </div>
              }

              {!ac2 && <div className="block px-8 py-12 text-center bg-white rounded-xl shadow-sm dark:bg-gray-800 hover:shadow-lg dark:hover:shadow-lg-light">
                
                  <p className="text-left dark:text-gray-100">Nov. 2015 - Dec. 2015</p>
                  <h3 className="text-lg font-medium pt-8 pb-2 dark:text-gray-100">
                    Internship
                  </h3>
                  <p className="py-2 dark:text-gray-300">
                    Metz City Hall : Citizenship service and participatory democracy
                  </p>

                  <button onClick={() => setAc2(!ac2)} type="button" className="bg-white dark:bg-inherit flex items-center justify-between w-full py-5 font-medium text-left border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
                    <span className="text-orange-600">What I did</span>
                    <svg data-accordion-icon className="w-6 h-6 shrink-0 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                  </button>

                </div>
              }

              {ac3 && <div className="block px-8 py-12 text-center bg-white rounded-xl shadow-sm dark:bg-gray-800 hover:shadow-lg dark:hover:shadow-lg-light">
                
                  <p className="text-left dark:text-gray-100">May 2017 - Oct. 2021</p>
                  <h3 className="text-lg font-medium pt-8 pb-2 dark:text-gray-100">
                    Sport Junior Association President
                  </h3>
                  <p className="py-2 dark:text-gray-300">
                    Junior Association 2PB
                  </p>
                  <button onClick={() => setAc3(!ac3)} type="button" className="bg-white dark:bg-inherit flex items-center justify-between w-full py-5 font-medium text-left border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
                    <span className="text-orange-600">What I did</span>
                    <svg data-accordion-icon className="w-6 h-6 shrink-0 rotate-180 dark:text-gray-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                  </button>
                  <div className="block">
                    <div className="py-5 font-light border-b border-gray-200 dark:border-gray-700">
                      <p className="mb-2 text-gray-500 dark:text-gray-400">
                        After the building of our basketball court, we wanted to <span className=" text-orange-600">organize some major basketball events</span> such as tournaments or holiday courses.
                        Our main goal was to gather the most people and generations no matter their basketball level.
                      </p>
                      <p className="text-gray-500 dark:text-gray-400">
                        We inspired many players and saw lots of them improve.
                        Unfortunately, we encountered Covid-19 and at the same time we all went to differents colleges so we decided not to turn our Junior Association into an Association.
                      </p>
                    </div>
                  </div>
                  
                </div>
              }

              {!ac3 && <div className="block px-8 py-12 text-center bg-white rounded-xl shadow-sm dark:bg-gray-800 hover:shadow-lg dark:hover:shadow-lg-light">
                
                  <p className="text-left dark:text-gray-100">May 2017 - Oct. 2021</p>
                  <h3 className="text-lg font-medium pt-8 pb-2 dark:text-gray-100">
                    Sport Junior Association President
                  </h3>
                  <p className="py-2 dark:text-gray-300">
                    Junior Association 2PB
                  </p>
                  <button onClick={() => setAc3(!ac3)} type="button" className="bg-white dark:bg-inherit flex items-center justify-between w-full py-5 font-medium text-left border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
                    <span className="text-orange-600">What I did</span>
                    <svg data-accordion-icon className="w-6 h-6 shrink-0 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                  </button>
                  
                </div>
              }

              {ac4 && <div className="block px-8 py-12 text-center bg-white rounded-xl shadow-sm dark:bg-gray-800 hover:shadow-lg dark:hover:shadow-lg-light">
                
                  <p className="text-left dark:text-gray-100">Jun. 2019 – Jun. 2021</p>
                  <h3 className="text-lg font-medium pt-8 pb-2 dark:text-gray-100">
                    Neighborhood representative on the M.Y.C.
                  </h3>
                  <p className="py-2 dark:text-gray-300">
                    Metz City Hall: Metz Youth Council (M.Y.C.)
                  </p>
                  <button onClick={() => setAc4(!ac4)} type="button" className="bg-white dark:bg-inherit flex items-center justify-between w-full py-5 font-medium text-left border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
                    <span className="text-orange-600">What I did</span>
                    <svg data-accordion-icon className="w-6 h-6 shrink-0 rotate-180 dark:text-gray-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                  </button>
                  <div className="block">
                    <div className="py-5 font-light border-b border-gray-200 dark:border-gray-700">
                      <p className="mb-2 text-gray-500 dark:text-gray-400">
                        My last civic mission was to bring out, collect and take into account the words of young people in Metz's politics.
                        The M.Y.C. served for young people to express their <span className=" text-orange-600">ideas</span>, <span className=" text-orange-600">needs</span>, <span className=" text-orange-600">hopes</span> and <span className=" text-orange-600">proposals</span> to elected officials.
                      </p>
                      <p className="text-gray-500 dark:text-gray-400">
                        We promoted Messins' emancipation, encouraged their commitment, animated their critical and initiative spirit, to train them in citizenship and knowledge of the institutions.
                      </p>
                    </div>
                  </div>
                  
                </div>
              }

              {!ac4 && <div className="block px-8 py-12 text-center bg-white rounded-xl shadow-sm dark:bg-gray-800 hover:shadow-lg dark:hover:shadow-lg-light">
                
                  <p className="text-left dark:text-gray-100">Jun. 2019 – Jun. 2021</p>
                  <h3 className="text-lg font-medium pt-8 pb-2 dark:text-gray-100">
                    Neighborhood representative on the M.Y.C.
                  </h3>
                  <p className="py-2 dark:text-gray-300">
                    Metz City Hall: Metz Youth Council (M.Y.C.)
                  </p>
                  <button onClick={() => setAc4(!ac4)} type="button" className="bg-white dark:bg-inherit flex items-center justify-between w-full py-5 font-medium text-left border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
                    <span className="text-orange-600">What I did</span>
                    <svg data-accordion-icon className="w-6 h-6 shrink-0 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                  </button>
                  
                </div>
              }

              {ac5 && <div className="block px-8 py-12 text-center bg-white rounded-xl shadow-sm dark:bg-gray-800 hover:shadow-lg dark:hover:shadow-lg-light">
                
                  <p className="text-left dark:text-gray-100">Jun. 2020 – Mar. 2022</p>
                  <h3 className="text-lg font-medium pt-8 pb-2 dark:text-gray-100">
                    Food delivery by car
                  </h3>
                  <p className="py-2 dark:text-gray-300">
                    UberEats & Deliveroo | Metz, France
                  </p>
                  <button onClick={() => setAc5(!ac5)} type="button" className="bg-white dark:bg-inherit flex items-center justify-between w-full py-5 font-medium text-left border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
                    <span className="text-orange-600">What I did</span>
                    <svg data-accordion-icon className="w-6 h-6 shrink-0 rotate-180 dark:text-gray-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                  </button>
                  <div className="block">
                    <div className="py-5 font-light border-b border-gray-200 dark:border-gray-700">
                      <p className="mb-2 text-gray-500 dark:text-gray-400">
                          I delivered more than <span className=" text-orange-600">5,000</span> food packages during the Covid-19 period, especially during lockdowns.
                      </p>
                      <p className="text-gray-500 dark:text-gray-400">
                          By the way, I had a high satisfaction rate of <span className=" text-orange-600">98%</span>.
                      </p>
                    </div>
                  </div>
                  
                </div>
              }

              {!ac5 && <div className="block px-8 py-12 text-center bg-white rounded-xl shadow-sm dark:bg-gray-800 hover:shadow-lg dark:hover:shadow-lg-light">
                
                  <p className="text-left dark:text-gray-100">Jun. 2020 – Mar. 2022</p>
                  <h3 className="text-lg font-medium pt-8 pb-2 dark:text-gray-100">
                    Food delivery by car
                  </h3>
                  <p className="py-2 dark:text-gray-300">
                    UberEats & Deliveroo | Metz, France
                  </p>
                  <button onClick={() => setAc5(!ac5)} type="button" className="bg-white dark:bg-inherit flex items-center justify-between w-full py-5 font-medium text-left border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
                    <span className="text-orange-600">What I did</span>
                    <svg data-accordion-icon className="w-6 h-6 shrink-0 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                  </button>
                  
                </div>
              }

              {ac6 && <div className="block px-8 py-12 text-center bg-white rounded-xl shadow-sm dark:bg-gray-800 hover:shadow-lg dark:hover:shadow-lg-light">
                
                  <p className="text-left dark:text-gray-100">Jan. 2022 – Feb. 2022</p>
                  <h3 className="text-lg font-medium pt-8 pb-2 dark:text-gray-100">
                    2 websites
                  </h3>
                  <p className="py-2 dark:text-gray-300">
                    E-commerce
                  </p>
                  <button onClick={() => setAc6(!ac6)} type="button" className="bg-white dark:bg-inherit flex items-center justify-between w-full py-5 font-medium text-left border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
                    <span className="text-orange-600">What I did</span>
                    <svg data-accordion-icon className="w-6 h-6 shrink-0 rotate-180 dark:text-gray-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                  </button>
                  <div className="block">
                    <div className="py-5 font-light border-b border-gray-200 dark:border-gray-700">
                      <p className="mb-2 text-gray-500 dark:text-gray-400">
                        I have created 2 e-commerce websites where I dropshipped some AliExpress products.
                        Indeed, I used Shopify to <span className=" text-orange-600">automate</span> my websites but I deeply modified the source codes to get different web designs instead of simply using free templates.
                      </p>
                      <p className="text-gray-500 dark:text-gray-400">
                        Even though I started generated little revenue I stopped my businesses because I found them <span className=" text-orange-600">non-ethical</span>.
                        Today, I cannot stand those dropshipping websites as I can instantly recognize them.
                      </p>
                    </div>
                  </div>
                  
                </div>
              }

              {!ac6 && <div className="block px-8 py-12 text-center bg-white rounded-xl shadow-sm dark:bg-gray-800 hover:shadow-lg dark:hover:shadow-lg-light">
                
                  <p className="text-left dark:text-gray-100">Jan. 2022 – Feb. 2022</p>
                  <h3 className="text-lg font-medium pt-8 pb-2 dark:text-gray-100">
                    2 websites
                  </h3>
                  <p className="py-2 dark:text-gray-300">
                    E-commerce
                  </p>
                  <button onClick={() => setAc6(!ac6)} type="button" className="bg-white dark:bg-inherit flex items-center justify-between w-full py-5 font-medium text-left border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
                    <span className="text-orange-600">What I did</span>
                    <svg data-accordion-icon className="w-6 h-6 shrink-0 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                  </button>
                  
                </div>
              }

              {ac7 && <div className="block px-8 py-12 text-center bg-white rounded-xl shadow-sm dark:bg-gray-800 hover:shadow-lg dark:hover:shadow-lg-light">
                
                  <p className="text-left dark:text-gray-100">Apr. 2022 – Jun. 2022</p>
                  <h3 className="text-lg font-medium pt-8 pb-2 dark:text-gray-100">
                    Metrology technician
                  </h3>
                  <p className="py-2 dark:text-gray-300">
                    Trescal | Florange, France
                  </p>
                  <button onClick={() => setAc7(!ac7)} type="button" className="bg-white dark:bg-inherit flex items-center justify-between w-full py-5 font-medium text-left border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
                    <span className="text-orange-600">What I did</span>
                    <svg data-accordion-icon className="w-6 h-6 shrink-0 rotate-180 dark:text-gray-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                  </button>
                  <div className="block">
                    <div className="py-5 font-light border-b border-gray-200 dark:border-gray-700">
                      <p className="mb-2 text-gray-500 dark:text-gray-400">
                        I worked for the <span className=" text-orange-600">global leader</span> in calibration.
                        My job consisted to verify and calibrate measurement instruments.
                      </p>
                      <p className="text-gray-500 dark:text-gray-400">
                        It was truly a <span className=" text-orange-600">versatile experience</span> as I learned to work in many fields such as "Force", "Torque", "Temperature", "Pressure" and "Dimensional".
                      </p>
                    </div>
                  </div>
                  
                </div>
              }

              {!ac7 && <div className="block px-8 py-12 text-center bg-white rounded-xl shadow-sm dark:bg-gray-800 hover:shadow-lg dark:hover:shadow-lg-light">
                
                  <p className="text-left dark:text-gray-100">Apr. 2022 – Jun. 2022</p>
                  <h3 className="text-lg font-medium pt-8 pb-2 dark:text-gray-100">
                    Metrology technician
                  </h3>
                  <p className="py-2 dark:text-gray-300">
                    Trescal | Florange, France
                  </p>
                  <button onClick={() => setAc7(!ac7)} type="button" className="bg-white dark:bg-inherit flex items-center justify-between w-full py-5 font-medium text-left border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
                    <span className="text-orange-600">What I did</span>
                    <svg data-accordion-icon className="w-6 h-6 shrink-0 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                  </button>
                  
                </div>
              }

              {ac8 && <div className="block px-8 py-12 text-center bg-white rounded-xl shadow-sm dark:bg-gray-800 hover:shadow-lg dark:hover:shadow-lg-light">
                
                  <p className="text-left dark:text-gray-100">Jun. 2022 – Jul. 2022</p>
                  <h3 className="text-lg font-medium pt-8 pb-2 dark:text-gray-100">
                    Bottle labeling
                  </h3>
                  <p className="py-2 dark:text-gray-300">
                    Schumacher-Knepper | Schengen, Luxembourg
                  </p>
                  <button onClick={() => setAc8(!ac8)} type="button" className="bg-white dark:bg-inherit flex items-center justify-between w-full py-5 font-medium text-left border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
                    <span className="text-orange-600">What I did</span>
                    <svg data-accordion-icon className="w-6 h-6 shrink-0 rotate-180 dark:text-gray-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                  </button>
                  <div className="block">
                    <div className="py-5 font-light border-b border-gray-200 dark:border-gray-700">
                      <p className="mb-2 text-gray-500 dark:text-gray-400">
                        This was not the funniest job but I learned to work <span className=" text-orange-600">fast</span> and <span className=" text-orange-600">efficiently</span>.
                      </p>
                      <p className="text-gray-500 dark:text-gray-400">
                        I can be proud as I did not break any bottle during this period.
                      </p>
                    </div>
                  </div>
                  
                </div>
              }

              {!ac8 && <div className="block px-8 py-12 text-center bg-white rounded-xl shadow-sm dark:bg-gray-800 hover:shadow-lg dark:hover:shadow-lg-light">
                
                  <p className="text-left dark:text-gray-100">Jun. 2022 – Jul. 2022</p>
                  <h3 className="text-lg font-medium pt-8 pb-2 dark:text-gray-100">
                    Bottle labeling
                  </h3>
                  <p className="py-2 dark:text-gray-300">
                    Schumacher-Knepper | Schengen, Luxembourg
                  </p>
                  <button onClick={() => setAc8(!ac8)} type="button" className="bg-white dark:bg-inherit flex items-center justify-between w-full py-5 font-medium text-left border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
                    <span className="text-orange-600">What I did</span>
                    <svg data-accordion-icon className="w-6 h-6 shrink-0 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                  </button>
                  
                </div>
              }

              {ac9 && <div className="block px-8 py-12 text-center bg-white rounded-xl shadow-sm dark:bg-gray-800 hover:shadow-lg dark:hover:shadow-lg-light">
                
                  <p className="text-left dark:text-gray-100">Jul. 2022 – Aug. 2022</p>
                  <h3 className="text-lg font-medium pt-8 pb-2 dark:text-gray-100">
                    Drywaller
                  </h3>
                  <p className="py-2 dark:text-gray-300">
                    Plaqui'Lux | Luxembourg
                  </p>
                  <button onClick={() => setAc9(!ac9)} type="button" className="bg-white dark:bg-inherit flex items-center justify-between w-full py-5 font-medium text-left border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
                    <span className="text-orange-600">What I did</span>
                    <svg data-accordion-icon className="w-6 h-6 shrink-0 rotate-180 dark:text-gray-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                  </button>
                  <div className="block">
                    <div className="py-5 font-light border-b border-gray-200 dark:border-gray-700">
                      <p className="mb-2 text-gray-500 dark:text-gray-400">
                        This was by far the <span className=" text-orange-600">hardest</span> job I have done.
                        Indeed, it was quite physical as I cut and hang panels of wallboard.
                      </p>
                      <p className="text-gray-500 dark:text-gray-400">
                        By the way, I am glad I worked with the most precise person I have seen (besides my dad).
                      </p>
                    </div>
                  </div>
                              
                </div>
              }

              {!ac9 && <div className="block px-8 py-12 text-center bg-white rounded-xl shadow-sm dark:bg-gray-800 hover:shadow-lg dark:hover:shadow-lg-light">
                
                  <p className="text-left dark:text-gray-100">Jul. 2022 – Aug. 2022</p>
                  <h3 className="text-lg font-medium pt-8 pb-2 dark:text-gray-100">
                    Drywaller
                  </h3>
                  <p className="py-2 dark:text-gray-300">
                    Plaqui'Lux | Luxembourg
                  </p>
                  <button onClick={() => setAc9(!ac9)} type="button" className="bg-white dark:bg-inherit flex items-center justify-between w-full py-5 font-medium text-left border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
                    <span className="text-orange-600">What I did</span>
                    <svg data-accordion-icon className="w-6 h-6 shrink-0 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                  </button>
                              
                </div>
              }

          </div>

        </section>

        <section className="bg-gray-50 dark:bg-gray-800 py-10 px-10 md:px-20 xl:px-40">

          <h3 className="text-3xl max-w-4xl mx-auto py-1 mb-10 dark:text-gray-100">Skills</h3>
            <div className="max-w-6xl mx-auto space-y-4 grid sm:grid-cols-2 sl:grid-cols-3 lg:grid-cols-4 sm:gap-4 sm:space-y-0 md:mt-12">

              <a className="block px-8 py-12 text-center bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-700 dark:border-gray-600">
                <Image src={HTML} className="center" height={48}/>
                <h4 className="font-semibold text-xl text-gray-900 dark:text-white mt-3.5">HTML5</h4>
              </a>

              <a className="block px-8 py-12 text-center bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-700 dark:border-gray-600">
                <Image src={CSS} className="center" height={48}/>
                <h4 className="font-semibold text-xl text-gray-900 dark:text-white mt-3.5">CSS3</h4>
              </a>

              <a className="block px-8 py-12 text-center bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-700 dark:border-gray-600">
                <Image src={PHP} className="center" height={48}/>
                <h4 className="font-semibold text-xl text-gray-900 dark:text-white mt-3.5">PHP</h4>
              </a>

              <a className="block px-8 py-12 text-center bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-700 dark:border-gray-600">
                <Image src={Python} className="center" height={48}/>
                <h4 className="font-semibold text-xl text-gray-900 dark:text-white mt-3.5">Python 3</h4>
              </a>

              <a className="block px-8 py-12 text-center bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-700 dark:border-gray-600">
                <Image src={JS} className="center" height={48}/>
                <h4 className="font-semibold text-xl text-gray-900 dark:text-white mt-3.5">JavaScript</h4>
              </a>

              <a className="block px-8 py-12 text-center bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-700 dark:border-gray-600">
                <Image src={ReactJS} className="center" height={48}/>
                <h4 className="font-semibold text-xl text-gray-900 dark:text-white mt-3.5">React JS</h4>
              </a>

              <a className="block px-8 py-12 text-center bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-700 dark:border-gray-600">
                <Image src={Catia} className="center" height={48}/>
                <h4 className="font-semibold text-xl text-gray-900 dark:text-white mt-3.5">Catia</h4>
              </a>

              <a className="block px-8 py-12 text-center bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-700 dark:border-gray-600">
                <Image src={ThreeD} className="center" height={48}/>
                <h4 className="font-semibold text-xl text-gray-900 dark:text-white mt-3.5">3DEXPERIENCE</h4>
              </a>

              <a className="block px-8 py-12 text-center bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-700 dark:border-gray-600">
                <Image src={SW} className="center" height={48}/>
                <h4 className="font-semibold text-xl text-gray-900 dark:text-white mt-3.5">SolidWorks</h4>
              </a>

              <a className="block px-8 py-12 text-center bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-700 dark:border-gray-600">
                <Image src={ZS} className="center" height={48}/>
                <h4 className="font-semibold text-xl text-gray-900 dark:text-white mt-3.5">Z-SUITE</h4>
              </a>

              <a className="block px-8 py-12 text-center bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-700 dark:border-gray-600">
                <Image src={Inventor} className="center" height={48}/>
                <h4 className="font-semibold text-xl text-gray-900 dark:text-white mt-3.5">Autodesk Inventor</h4>
              </a>

              <a className="block px-8 py-12 text-center bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-700 dark:border-gray-600">
                <Image src={Office} className="center" height={48}/>
                <h4 className="font-semibold text-xl text-gray-900 dark:text-white mt-3.5">Microsoft Office Pack</h4>
              </a>

              <a className="block px-8 py-12 text-center bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-700 dark:border-gray-600">
                <Image src={PS} className="center" height={48}/>
                <h4 className="font-semibold text-xl text-gray-900 dark:text-white mt-3.5">Photoshop</h4>
              </a>

              <a className="block px-8 py-12 text-center bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-700 dark:border-gray-600">
                <Image src={AI} className="center" height={48}/>
                <h4 className="font-semibold text-xl text-gray-900 dark:text-white mt-3.5">Illustrator</h4>
              </a>
              
            </div>

        </section>

        <section className="py-10 px-10 md:px-20 xl:px-40">

          <h3 className="text-3xl max-w-4xl mx-auto py-1 mb-10 dark:text-gray-100">Languages</h3>
          
          <div className="max-w-2xl mx-auto">
            <div className="mb-1 text-base dark:text-white">French</div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
              <div className="bg-orange-600 h-2.5 rounded-full" style={{float : 'left', paddingRight : '100%'}}></div>
            </div>
            <div className="mb-1 mt-5 text-base dark:text-white">Russian (mother tongue)</div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
              <div className="bg-orange-600 h-2.5 rounded-full" style={{float : 'left', paddingRight : '90%'}}></div>
            </div>
            <div className="mb-1 mt-5 text-base dark:text-white">English (TOEIC : 840)</div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
              <div className="bg-orange-600 h-2.5 rounded-full" style={{float : 'left', paddingRight : '75%'}}></div>
            </div>
          </div>

        </section>

        <section className="bg-gray-50 dark:bg-gray-800 py-10 px-10 md:px-20 xl:px-40 scroll-mt-20 md:scroll-mt-24" id="Contact">

          <h3 className="text-3xl pb-10 max-w-4xl mx-auto dark:text-gray-100">Contact</h3>

          <form method="post" onSubmit={handleOnSubmit} className="max-w-3xl mx-auto">
            <div className="grid gap-6 mb-6 md:grid-cols-2">
              <div>
                <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First name</label>
                <input type="text" name="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500" placeholder="Levy" required />
              </div>
              <div>
                <label htmlFor="last_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last name</label>
                <input type="text" name="last_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500" placeholder="Tate" required />
              </div>
            </div>
          


            <div className="mb-6 max-w-3xl mx-auto">
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your e-mail</label>
                <input type="email" name="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500" placeholder="email@example.com" required />
            </div>

            <label htmlFor="message" className="block mb-2 max-w-3xl mx-auto text-sm font-medium text-gray-900 dark:text-white">Your message</label>
            <textarea name="message" rows="4" className="block p-2.5 mb-6 w-full max-w-3xl mx-auto text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500" placeholder="Write your message here..." required />

            <div className="center">          
              <button className="text-white bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 focus:ring-4 focus:outline-none focus:ring-orange-400 font-medium rounded-lg text-base px-6 py-3.5 text-center dark:focus:ring-orange-800">Submit your message</button>
            </div>
            
          </form>

        </section>

        <footer className="pt-10 pb-6 lg:pb-8 bg-white dark:bg-gray-900">
            <div className="lg:container lg:px-5 xl:px-40 mdl:flex mdl:justify-between mx-auto max-w-8xl px-2 sm:px-6 md:px-8 pl-6">
                <div className="mb-10 mdl:mb-0">
                  
                    <a href="/" onClick={() => setHomeOpen(true) & setEdOpen(false) & setExpOpen(false) & setContOpen(false)} className="flex items-center">
                        <Image src={Logo} className="h-8 w-8 mr-3" alt="HY13dev Logo" />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">HY13dev</span>
                    </a>
                </div>
                <div className="grid xs:grid-cols-2 gap-8 sm:gap-6 mdl:grid-cols-3">
                    <div className="hidden mdl:contents"><h2></h2></div>
                    
                    <div className="order-2 xs:order-1 mdl:order-2">
                        <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Follow me</h2>
                        <ul className="text-gray-600 dark:text-gray-400">
                            <li className="mb-4">
                                <a href="https://github.com/HoodieYlya13" target="_blank" rel="noreferrer" className="hover:underline ">Github</a>
                            </li>
                            <li>
                                <a href="https://www.linkedin.com/in/ylya-martchenko-214a64184" target="_blank" rel="noreferrer" className="hover:underline">LinkedIn</a>
                            </li>
                        </ul>
                    </div>
                    <div className="order-1 xs:order-2 mdl:order-3">
                        <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Contact</h2>
                        <ul className="text-gray-600 dark:text-gray-400">
                            <li className="mb-4">
                                <a href="mailto:ylyamartchenko@gmail.com" target="_blank" rel="noreferrer" className="flex hover:underline">
                                  <AiFillMail className="mt-1 mr-1"/>
                                  ylyamartchenko@gmail.com
                                </a>
                            </li>
                            <li>
                                <a href="tel:+33699723879" className="flex hover:underline">
                                  <AiFillPhone className="mt-1 mr-1"/>
                                  +33 6 99 72 35 79
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
            <div className="sm:flex sm:items-center sm:justify-between lg:container xl:px-40 max-w-8xl mx-auto pl-6 px-2 sm:px-6">
                <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© {new Date().getFullYear()} <a href="/" onClick={() => setHomeOpen(true) & setEdOpen(false) & setExpOpen(false) & setContOpen(false)} className="hover:underline">HY13dev™</a>. All Rights Reserved.
                </span>
                <div className="flex mt-4 space-x-6 sm:justify-center sm:mt-0">
                    <a href="mailto:ylyamartchenko@gmail.com" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                        <AiFillMail className="w-5 h-5"/>
                        <span className="sr-only">Mail address</span>
                    </a>
                    <a href="https://www.linkedin.com/in/ylya-martchenko-214a64184" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                        <AiFillLinkedin className="w-5 h-5"/>
                        <span className="sr-only">LinkedIn page</span>
                    </a>
                    <a href="https://github.com/HoodieYlya13" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
                        <span className="sr-only">GitHub account</span>
                    </a>
                    {/* <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 640 512" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="discord" role="img" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M524.531,69.836a1.5,1.5,0,0,0-.764-.7A485.065,485.065,0,0,0,404.081,32.03a1.816,1.816,0,0,0-1.923.91,337.461,337.461,0,0,0-14.9,30.6,447.848,447.848,0,0,0-134.426,0,309.541,309.541,0,0,0-15.135-30.6,1.89,1.89,0,0,0-1.924-.91A483.689,483.689,0,0,0,116.085,69.137a1.712,1.712,0,0,0-.788.676C39.068,183.651,18.186,294.69,28.43,404.354a2.016,2.016,0,0,0,.765,1.375A487.666,487.666,0,0,0,176.02,479.918a1.9,1.9,0,0,0,2.063-.676A348.2,348.2,0,0,0,208.12,430.4a1.86,1.86,0,0,0-1.019-2.588,321.173,321.173,0,0,1-45.868-21.853,1.885,1.885,0,0,1-.185-3.126c3.082-2.309,6.166-4.711,9.109-7.137a1.819,1.819,0,0,1,1.9-.256c96.229,43.917,200.41,43.917,295.5,0a1.812,1.812,0,0,1,1.924.233c2.944,2.426,6.027,4.851,9.132,7.16a1.884,1.884,0,0,1-.162,3.126,301.407,301.407,0,0,1-45.89,21.83,1.875,1.875,0,0,0-1,2.611,391.055,391.055,0,0,0,30.014,48.815,1.864,1.864,0,0,0,2.063.7A486.048,486.048,0,0,0,610.7,405.729a1.882,1.882,0,0,0,.765-1.352C623.729,277.594,590.933,167.465,524.531,69.836ZM222.491,337.58c-28.972,0-52.844-26.587-52.844-59.239S193.056,219.1,222.491,219.1c29.665,0,53.306,26.82,52.843,59.239C275.334,310.993,251.924,337.58,222.491,337.58Zm195.38,0c-28.971,0-52.843-26.587-52.843-59.239S388.437,219.1,417.871,219.1c29.667,0,53.307,26.82,52.844,59.239C470.715,310.993,447.538,337.58,417.871,337.58Z">
                          </path>
                        </svg>
                        <span className="sr-only">Discord account</span>
                    </a> */}
                    <a href="tel:+33699723879" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                        <AiFillPhone className="w-5 h-5"/>
                        <span className="sr-only">Mail address</span>
                    </a>
                </div>
            </div>
        </footer>
      </main>
    </div>
  )
}
