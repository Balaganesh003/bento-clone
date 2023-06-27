import Image from 'next/image';
import { Inter } from 'next/font/google';
import ResizingContainer from '@/components/ResizingContainer';

const inter = Inter({
  subsets: ['latin'],
});

export default function Home() {
  return (
    <main className={` ${inter.className} p-[4rem] flex`}>
      <div className="flex-1 mr-[5rem] h-fit">
        <h1>Balaganesh</h1>
      </div>
      <div className=" w-[820px]">
        <div className="flex flex-wrap max-w-[100%] gap-[40px]">
          <ResizingContainer />

          <div className="w-[175px] h-[175px]  bg-red-400"></div>

          <div className="w-[175px] h-[175px]  bg-yellow-400"></div>

          <div className="bg-blue-900 text-white min-w-[100%] h-[65px]"></div>
          <div className="bg-blue-900 text-white ">
            <div className="min-w-[175px] min-h-[175px] w-full h-full bg-indigo-400"></div>
          </div>
        </div>
      </div>
    </main>
  );
}
