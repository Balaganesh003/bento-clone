import React, { useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useInView } from 'react-intersection-observer';

import coffee from '@/assets/coffee.svg';
import dribble from '@/assets/dribble.svg';
import github from '@/assets/github.svg';
import linkedin from '@/assets/linkedin.svg';
import twitter from '@/assets/twitter.svg';
import youtube from '@/assets/youtube.svg';
import instagram from '@/assets/instagram.svg';

gsap.registerPlugin(ScrollTrigger);

export default function LandingPage() {
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const testimonialsRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    const hero = heroRef.current;
    const features = featuresRef.current;
    const testimonials = testimonialsRef.current;
    const cta = ctaRef.current;

    gsap.fromTo(
      hero.querySelector('h1'),
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, delay: 0.5 }
    );

    gsap.fromTo(
      hero.querySelector('p'),
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, delay: 0.8 }
    );

    gsap.fromTo(
      hero.querySelector('a'),
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, delay: 1.1 }
    );

    gsap.fromTo(
      features.querySelectorAll('.feature-card'),
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: features,
          start: 'top 80%',
        },
      }
    );

    gsap.fromTo(
      testimonials.querySelectorAll('.testimonial-card'),
      { opacity: 0, scale: 0.9 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: testimonials,
          start: 'top 80%',
        },
      }
    );

    gsap.fromTo(
      cta.querySelector('h2'),
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: cta,
          start: 'top 80%',
        },
      }
    );

    gsap.fromTo(
      cta.querySelector('a'),
      { opacity: 0, scale: 0.9 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        delay: 0.2,
        scrollTrigger: {
          trigger: cta,
          start: 'top 80%',
        },
      }
    );
  }, []);

  return (
    <div className="overflow-x-hidden">
      <Head>
        <title>Bento - Elevate Your Online Presence</title>
        <meta
          name="description"
          content="Bento - Showcase your profile with custom links"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="max-w-[1280px] mx-auto">
        <HeroSection ref={heroRef} />
        <FeaturesSection ref={featuresRef} />
        <TestimonialsSection ref={testimonialsRef} />
        <CTASection ref={ctaRef} />
        <Footer />
      </main>
    </div>
  );
}

const HeroSection = React.forwardRef((props, ref) => {
  return (
    <section
      ref={ref}
      className="relative w-full bg-gradient-to-b from-[#F9FAFB] to-white py-20 md:py-32 overflow-hidden">
      <div className="container mx-auto flex flex-col items-center gap-8 px-4 md:px-8 justify-center">
        <span className="flex flex-col items-center gap-2">
          <OrigamiIcon className="h-12 w-12 text-gray-900" />
          <span className="text-2xl font-semibold text-gray-900">Bento</span>
        </span>
        <div className="space-y-6 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 z-10">
            Elevate Your <span className="text-blue-600">Online Presence</span>
          </h1>
          <p className="max-w-[600px] mx-auto text-lg sm:text-xl text-gray-700 md:text-2xl">
            Bento+ is a powerful link-in-bio platform that helps you showcase
            your best self online. Increase engagement by up to 60%.
          </p>
          <div className="flex flex-col gap-4 xs:flex-row justify-center">
            <Link
              href={'/signup'}
              class="relative inline-block p-px font-semibold leading-6 text-white no-underline bg-blue-600 shadow-2xl cursor-pointer group rounded-xl shadow-blue-900">
              <div class="relative z-10 flex items-center px-6 py-3 space-x-2 rounded-xl bg-blue-600 justify-center ">
                <span className="">Create your Bento</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                  data-slot="icon"
                  class="w-6 h-6">
                  <path
                    fill-rule="evenodd"
                    d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                    clip-rule="evenodd"></path>
                </svg>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <FloatingIcons />
    </section>
  );
});

const FeaturesSection = React.forwardRef((props, ref) => {
  const features = [
    {
      icon: UsersIcon,
      title: 'Customizable Profiles',
      description:
        'Personalize your Bento+ profile with your own branding, colors, and layout to make it truly your own.',
    },
    {
      icon: VideoIcon,
      title: 'Multimedia Support',
      description:
        'Showcase your work, talents, and personality with a variety of multimedia options, including images, videos, and more.',
    },
    {
      icon: BadgeIcon,
      title: 'Professional Branding',
      description:
        "Elevate your online presence with Bento+'s professional branding tools, helping you make a lasting impression.",
    },
  ];

  return (
    <section ref={ref} className="w-full bg-white py-20 md:py-32" id="features">
      <div className="container mx-auto px-4 md:px-8">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gray-900 text-center mb-16">
          Unlock Your Full Potential
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="feature-card flex flex-col items-center text-center p-8 bg-gray-50 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105">
              <feature.icon
                className="h-16 w-16 text-blue-600 mb-6"
                aria-label={`${feature.title} Icon`}
              />
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-700 text-lg">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

const TestimonialsSection = React.forwardRef((props, ref) => {
  const testimonials = [
    {
      quote:
        "Bento+ has completely transformed how I showcase my work online. It's professional, sleek, and incredibly easy to use.",
      author: 'Amanda Smith',
      role: 'Photographer',
      avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
    },
    {
      quote:
        "I've seen a 50% increase in engagement since using Bento+. It's the perfect tool for anyone serious about their online presence.",
      author: 'John Doe',
      role: 'Content Creator',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
  ];

  return (
    <section
      ref={ref}
      className="w-full bg-gray-100 py-20 md:py-32"
      id="testimonials">
      <div className="container mx-auto px-4 md:px-8">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gray-900 text-center mb-16">
          What Our Users Are Saying
        </h2>
        <div className="grid gap-12 md:grid-cols-2">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="testimonial-card bg-white rounded-2xl p-8 space-y-6 shadow-lg">
              <p className="text-xl text-gray-700 italic">
                "{testimonial.quote}"
              </p>
              <div className="flex items-center space-x-4">
                <Image
                  src={testimonial.avatar}
                  alt={testimonial.author}
                  width={60}
                  height={60}
                  className="rounded-full"
                />
                <div>
                  <p className="text-lg font-semibold text-gray-900">
                    {testimonial.author}
                  </p>
                  <p className="text-gray-600">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

const CTASection = React.forwardRef((props, ref) => {
  return (
    <section
      ref={ref}
      className="w-full bg-gradient-to-b from-blue-600 to-blue-800 py-20 md:py-32"
      id="cta">
      <div className="container mx-auto flex flex-col items-center justify-center gap-8 px-4 md:px-8">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white text-center">
          Ready to Elevate Your Online Presence?
        </h2>
        <Link
          href={'/signup'}
          className="inline-block px-8 py-4 font-semibold text-lg leading-6 text-blue-600 bg-white rounded-full shadow-lg cursor-pointer transition-all duration-300 hover:bg-gray-100 hover:shadow-xl hover:scale-105">
          Create your Bento
        </Link>
      </div>
    </section>
  );
});

function Footer() {
  return (
    <footer className="w-full bg-gray-900 py-12">
      <div className="container mx-auto flex flex-col items-center justify-center gap-6 px-4 md:px-8">
        <div className="flex items-center gap-4">
          <OrigamiIcon
            className="h-8 w-8 text-white"
            aria-label="Bento+ logo"
          />
          <span className="text-xl font-semibold text-white">Bento</span>
        </div>
        <p className="text-lg text-gray-300 text-center max-w-[600px]">
          Bento+ is a powerful platform to showcase your best self online.
          Connect with your audience and elevate your online presence today.
        </p>
        <div className="flex flex-wrap justify-center gap-6 mt-6">
          <Link
            href="#"
            className="text-gray-300 hover:text-white transition-colors">
            Privacy Policy
          </Link>
          <Link
            href="#"
            className="text-gray-300 hover:text-white transition-colors">
            Terms of Service
          </Link>
          <Link
            href="#"
            className="text-gray-300 hover:text-white transition-colors">
            Cookie Policy
          </Link>
        </div>
        <p className="text-gray-400 mt-6">
          &copy; 2024 Bento+. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

function FloatingIcons() {
  const icons = [
    { src: coffee, alt: 'Coffee', className: 'top-5 left-[8%]' },
    { src: dribble, alt: 'Dribble', className: 'top-[10%] left-[2%]' },
    { src: github, alt: 'GitHub', className: 'top-[20%] left-[15%]' },
    { src: linkedin, alt: 'LinkedIn', className: 'bottom-[10%] left-[5%]' },
    { src: twitter, alt: 'Twitter', className: 'bottom-[20%] left-[20%]' },
    { src: youtube, alt: 'YouTube', className: 'bottom-[20%] right-[20%]' },
    { src: instagram, alt: 'Instagram', className: 'bottom-[10%] right-[5%]' },
    { src: coffee, alt: 'Coffee', className: 'top-[20%] right-[15%]' },
    { src: github, alt: 'GitHub', className: 'top-[10%] right-[2%]' },
    { src: dribble, alt: 'Dribble', className: 'top-5 right-[8%]' },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {icons.map((icon, index) => (
        <Image
          key={index}
          className={`absolute w-8 h-8 md:w-12 md:h-12 animate-float  ${icon.className}`}
          src={icon.src}
          alt={icon.alt}
        />
      ))}
    </div>
  );
}

// Include the icon components (BadgeIcon, MenuIcon, OrigamiIcon, UsersIcon, VideoIcon) here...

function BadgeIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
    </svg>
  );
}

function MenuIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}

function OrigamiIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M12 12V4a1 1 0 0 1 1-1h6.297a1 1 0 0 1 .651 1.759l-4.696 4.025" />
      <path d="m12 21-7.414-7.414A2 2 0 0 1 4 12.172V6.415a1.002 1.002 0 0 1 1.707-.707L20 20.009" />
      <path d="m12.214 3.381 8.414 14.966a1 1 0 0 1-.167 1.199l-1.168 1.163a1 1 0 0 1-.706.291H6.351a1 1 0 0 1-.625-.219L3.25 18.8a1 1 0 0 1 .631-1.781l4.165.027" />
    </svg>
  );
}

function UsersIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function VideoIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5" />
      <rect x="2" y="6" width="14" height="12" rx="2" />
    </svg>
  );
}
