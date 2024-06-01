import Head from 'next/head';
import Link from 'next/link';
import BehanceImage from '@/assets/behance.png';
import Image from 'next/image';

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

      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm">
        <div className="container flex h-16 items-center justify-between px-4 md:px-8">
          <Link href="#">
            <span className="flex items-center gap-2">
              <OrigamiIcon className="h-6 w-6 text-gray-900" />
              <span className="text-lg font-semibold text-gray-900">
                Bento+
              </span>
            </span>
          </Link>
          <nav className="hidden items-center gap-4 md:flex">
            <Link href="#">
              <span className="text-sm font-medium text-gray-700 hover:text-gray-900">
                Explore
              </span>
            </Link>
            <Link href="#">
              <span className="text-sm font-medium text-gray-700 hover:text-gray-900">
                Pricing
              </span>
            </Link>
            <Link href="#">
              <span className="text-sm font-medium text-gray-700 hover:text-gray-900">
                About Us
              </span>
            </Link>
            <Link href="#">
              <span className="text-sm font-medium text-gray-700 hover:text-gray-900">
                Contact
              </span>
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            <Link href="/signup">
              <span className="inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50">
                Get Started
              </span>
            </Link>
            <MenuIcon className="md:hidden h-6 w-6" />
          </div>
        </div>
      </header>

      <main>
        <section className="w-full bg-gradient-to-b from-[#F9FAFB] to-white py-12 md:py-20 lg:py-24">
          <div className="container grid items-center gap-8 px-4 md:px-8 lg:grid-cols-2 lg:gap-12">
            <div className="space-y-6">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900">
                Elevate Your Online Presence with Bento+
              </h1>
              <p className="max-w-[600px] text-base sm:text-lg text-gray-700 md:text-xl">
                Bento+ is a powerful link-in-bio platform that helps you
                showcase your best self online. With enhanced customization,
                multimedia support, and professional branding, you can increase
                engagement by up to 60%.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Link href="#">
                  <span className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-6 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50">
                    Get Started
                  </span>
                </Link>
                <Link href="#">
                  <span className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 bg-white px-6 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50">
                    Learn More
                  </span>
                </Link>
              </div>
            </div>
            <div className="flex justify-center">
              <Image
                alt="Bento+ Hero Image"
                className="max-w-full rounded-lg"
                height={500}
                src={BehanceImage}
                style={{
                  aspectRatio: '4/3',
                  objectFit: 'cover',
                }}
                width={750}
              />
            </div>
          </div>
        </section>

        <section
          className="w-full bg-white py-12 md:py-20 lg:py-24"
          id="features">
          <div className="container grid items-center gap-8 px-4 md:px-8 lg:grid-cols-2 lg:gap-12">
            <div className="flex justify-center">
              <Image
                alt="Bento+ Features Image"
                className="max-w-full rounded-lg"
                height={500}
                src={BehanceImage}
                style={{
                  aspectRatio: '4/3',
                  objectFit: 'cover',
                }}
                width={750}
              />
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
                Unlock Your Full Potential
              </h2>
              <p className="max-w-[600px] text-base sm:text-lg text-gray-700 md:text-xl">
                Bento+'s advanced features empower you to create a professional
                and engaging online presence. Showcase your best work, connect
                with your audience, and drive up to 60% more engagement.
              </p>
              <div className="grid gap-4">
                <div className="flex items-start gap-4">
                  <UsersIcon className="h-6 w-6 flex-shrink-0 text-gray-900" />
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
                  <VideoIcon className="h-6 w-6 flex-shrink-0 text-gray-900" />
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
                  <BadgeIcon className="h-6 w-6 flex-shrink-0 text-gray-900" />
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
          className="w-full bg-gradient-to-b from-[#F9FAFB] to-white py-12 md:py-20 lg:py-24"
          id="showcase">
          <div className="container grid items-center gap-8 px-4 md:px-8 lg:grid-cols-2 lg:gap-12">
            <div className="space-y-6">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
                Elevate Your Online Presence
              </h2>
              <p className="max-w-[600px] text-base sm:text-lg text-gray-700 md:text-xl">
                Bento+ makes it easy to share your links and showcase your best
                self online. With our powerful platform, you can increase
                engagement by up to 60% and make a lasting impression.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Link href="#">
                  <span className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-6 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50">
                    Get Started
                  </span>
                </Link>
                <Link href="#">
                  <span className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 bg-white px-6 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50">
                    Learn More
                  </span>
                </Link>
              </div>
            </div>
            <div className="flex justify-center">
              <Image
                alt="Bento+ Showcase Image"
                className="max-w-full rounded-lg"
                height={500}
                src={BehanceImage}
                style={{
                  aspectRatio: '4/3',
                  objectFit: 'cover',
                }}
                width={750}
              />
            </div>
          </div>
        </section>

        <section
          className="w-full bg-white py-12 md:py-20 lg:py-24"
          id="testimonials">
          <div className="container grid items-center gap-8 px-4 md:px-8 lg:grid-cols-2 lg:gap-12">
            <div className="space-y-6">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
                What Our Users Are Saying
              </h2>
              <p className="max-w-[600px] text-base sm:text-lg text-gray-700 md:text-xl">
                Bento+ has helped thousands of users elevate their online
                presence. Here's what they have to say about us:
              </p>
              <div className="grid gap-8 mt-8">
                <div className="bg-gray-100 rounded-lg p-6 space-y-4 shadow-lg">
                  <p className="text-lg text-gray-900">
                    "Bento+ has completely transformed how I showcase my work
                    online. It's professional, sleek, and incredibly easy to
                    use."
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
            <div className="flex justify-center">
              <Image
                alt="Bento+ Testimonials Image"
                className="max-w-full rounded-lg"
                height={500}
                src={BehanceImage}
                style={{
                  aspectRatio: '4/3',
                  objectFit: 'cover',
                }}
                width={750}
              />
            </div>
          </div>
        </section>

        <section
          className="w-full bg-gradient-to-b from-[#F9FAFB] to-white py-12 md:py-20 lg:py-24"
          id="cta">
          <div className="container flex flex-col items-center justify-center gap-6 px-4 md:px-8">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
              Ready to Elevate Your Online Presence?
            </h2>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link href="#">
                <span className="inline-flex h-12 items-center justify-center rounded-md bg-gray-900 px-8 text-lg font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50">
                  Get Started
                </span>
              </Link>
              <Link href="#">
                <span className="inline-flex h-12 items-center justify-center rounded-md border border-gray-200 bg-white px-8 text-lg font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50">
                  Learn More
                </span>
              </Link>
            </div>
          </div>
        </section>

        <footer className="w-full bg-gray-900 py-12">
          <div className="container flex flex-col items-center justify-center gap-6 px-4 md:px-8">
            <div className="flex items-center gap-4">
              <OrigamiIcon className="h-8 w-8 text-gray-50" />
              <span className="text-lg font-semibold text-gray-50">Bento+</span>
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
