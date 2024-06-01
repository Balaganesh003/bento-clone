/* eslint-disable react/no-unescaped-entities */

import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

import coffee from '@/assets/coffee.svg';
import dribble from '@/assets/dribble.svg';
import github from '@/assets/github.svg';
import linkedin from '@/assets/linkedin.svg';
import twitter from '@/assets/twitter.svg';
import youtube from '@/assets/youtube.svg';
import instagram from '@/assets/instagram.svg';

export default function LandingPage() {
  return (
    <div>
      <Head>
        <title>Bento - Elevate Your Online Presence</title>
        <meta
          name="description"
          content="Bento - Showcase your profile with custom links"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="">
        <section className=" max-w-7xl animate-fade-in w-full bg-gradient-to-b from-[#F9FAFB] to-white py-12 md:py-20">
          <div className=" container mx-auto flex flex-col items-center gap-8 px-4 md:px-8 justify-center">
            <span className="flex flex-col items-center gap-2">
              <OrigamiIcon className="h-8 w-8 text-gray-900" />
              <span className="text-lg font-semibold text-gray-900">Bento</span>
            </span>
            <div className="space-y-6 text-center">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 z-10">
                Elevate Your Online Presence
              </h1>
              <p className="max-w-[600px] mx-auto text-base sm:text-lg text-gray-700 md:text-xl">
                Bento+ is a powerful link-in-bio platform that helps you
                showcase your best self online. With enhanced customization,
                multimedia support, and professional branding, you can increase
                engagement by up to 60%.
              </p>
              <div className="flex flex-col gap-4 xs:flex-row justify-center">
                <Link
                  href={'/signup'}
                  class="relative inline-block p-px font-semibold leading-6 text-white no-underline bg-gray-900 shadow-2xl cursor-pointer group rounded-xl shadow-zinc-900">
                  <div class="relative z-10 flex items-center px-6 py-3 space-x-2 rounded-xl bg-gray-950/50 ring-1 ring-white/10 justify-center ">
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
                  <span class="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-gray-400/90 to-slate-400/20 transition-opacity duration-500 group-hover:opacity-40"></span>
                </Link>
              </div>
            </div>
          </div>
          <div className="animate-fade-in">
            <Image
              className="z-0  animate-float text-6xl absolute top-5 left-[8rem]"
              src={coffee}
              alt="Coffee"
            />
            <Image
              className="z-0  animate-float text-5xl absolute top-[10rem] left-5"
              src={dribble}
              alt="Dribble"
            />
            <Image
              className=" z-0  animate-float text-4xl absolute top-[13rem] left-[12rem]"
              src={github}
              alt="GitHub"
            />
            <Image
              className="z-0  animate-float text-4xl absolute bottom-[5rem] left-[9rem]"
              src={linkedin}
              alt="LinkedIn"
            />
            <Image
              className="z-0  animate-float text-5xl absolute bottom-[11rem] left-[20rem]"
              src={twitter}
              alt="Twitter"
            />
            <Image
              className="z-0  animate-float text-4xl absolute bottom-[11rem] right-[20rem]"
              src={youtube}
              alt="YouTube"
            />
            <Image
              className="z-0 animate-float text-6xl absolute bottom-[5rem] right-[9rem]"
              src={instagram}
              alt="Instagram"
            />
            <Image
              className="z-0  animate-float text-4xl absolute top-[13rem] right-[12rem]"
              src={coffee}
              alt="Coffee"
            />
            <Image
              className="z-0  animate-float text-5xl absolute top-[10rem] right-5"
              src={github}
              alt="GitHub"
            />
            <Image
              className="z-0  animate-float text-6xl absolute top-5 right-[8rem]"
              src={dribble}
              alt="Dribble"
            />
          </div>
        </section>

        <section
          className=" max-w-7xl w-full bg-white py-12 md:py-20 lg:py-24"
          id="features">
          <div className="container mx-auto flex items-center gap-8 px-4 md:px-8">
            <div className="space-y-6">
              <div className="flex flex-col items-center space-y-6 text-center">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
                  Unlock Your Full Potential
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pt-6">
                <div className="flex items-start gap-4">
                  <UsersIcon
                    className="h-6 w-6 flex-shrink-0 text-gray-900"
                    aria-label="Customizable Profiles Icon"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Customizable Profiles
                    </h3>
                    <p className="text-gray-700">
                      Personalize your Bento+ profile with your own branding,
                      colors, and layout to make it truly your own.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <VideoIcon
                    className="h-6 w-6 flex-shrink-0 text-gray-900"
                    aria-label="Multimedia Support Icon"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Multimedia Support
                    </h3>
                    <p className="text-gray-700">
                      Showcase your work, talents, and personality with a
                      variety of multimedia options, including images, videos,
                      and more.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <BadgeIcon
                    className="h-6 w-6 flex-shrink-0 text-gray-900"
                    aria-label="Professional Branding Icon"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Professional Branding
                    </h3>
                    <p className="text-gray-700">
                      Elevate your online presence with Bento+'s professional
                      branding tools, helping you make a lasting impression.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          className="  max-w-7xl w-full bg-white py-12 md:py-20 lg:py-24"
          id="testimonials">
          <div className="container mx-auto flex flex-col items-center gap-8 px-4 md:px-8">
            <div className="space-y-6 text-center">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
                What Our Users Are Saying
              </h2>
              <p className="max-w-[600px] mx-auto text-base sm:text-lg text-gray-700 md:text-xl">
                Bento+ has helped thousands of users elevate their online
                presence. Here's what they have to say about us:
              </p>
            </div>
            <div className="grid gap-8 mt-8 md:grid-cols-2">
              <div className="bg-gray-100 rounded-lg p-6 space-y-4 shadow-lg">
                <p className="text-lg text-gray-900">
                  "Bento+ has completely transformed how I showcase my work
                  online. It's professional, sleek, and incredibly easy to use."
                </p>
                <p className="text-gray-700">- Amanda Smith, Photographer</p>
              </div>
              <div className="bg-gray-100 rounded-lg p-6 space-y-4 shadow-lg">
                <p className="text-lg text-gray-900">
                  "I've seen a 50% increase in engagement since using Bento+.
                  It's the perfect tool for anyone serious about their online
                  presence."
                </p>
                <p className="text-gray-700">- John Doe, Content Creator</p>
              </div>
            </div>
          </div>
        </section>

        <section
          className="  max-w-7xl w-full bg-gradient-to-b from-[#F9FAFB] to-white py-12 md:py-20 lg:py-24"
          id="cta">
          <div className="container mx-auto flex flex-col items-center justify-center gap-6 px-4 md:px-8">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gray-900 text-center">
              Ready to Elevate Your Online Presence?
            </h2>
            <div className="flex flex-col gap-4 mt-3 xs:flex-row justify-center">
              <Link
                href={'/signup'}
                class="relative inline-block p-px font-semibold leading-6 text-white no-underline bg-gray-900 shadow-2xl cursor-pointer group rounded-xl shadow-zinc-900">
                <div class="relative z-10 flex items-center px-6 py-3 space-x-2 rounded-xl bg-gray-950/50 ring-1 ring-white/10 justify-center ">
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
                <span class="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-gray-400/90 to-slate-400/20 transition-opacity duration-500 group-hover:opacity-40"></span>
              </Link>
            </div>
          </div>
        </section>

        <footer className=" w-full bg-gray-900 py-12">
          <div className=" max-w-7xl container mx-auto flex flex-col items-center justify-center gap-6 px-4 md:px-8">
            <div className="flex items-center gap-4">
              <OrigamiIcon
                className="h-8 w-8 text-gray-50"
                aria-label="Bento+ logo"
              />
              <span className="text-lg font-semibold text-gray-50">Bento</span>
            </div>
            <p className="text-lg text-gray-200 text-center max-w-[600px]">
              Bento+ is a powerful platform to showcase your best self online.
              Connect with your audience and elevate your online presence today.
            </p>
            <div className="flex gap-6 mt-6">
              <Link href="#">
                <span className="text-gray-300 hover:text-gray-200 transition-colors">
                  Privacy Policy
                </span>
              </Link>
              <Link href="#">
                <span className="text-gray-300 hover:text-gray-200 transition-colors">
                  Terms of Service
                </span>
              </Link>
              <Link href="#">
                <span className="text-gray-300 hover:text-gray-200 transition-colors">
                  Cookie Policy
                </span>
              </Link>
            </div>
            <p className="text-gray-300 mt-6">
              &copy; 2024 Bento+. All rights reserved.
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}

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
