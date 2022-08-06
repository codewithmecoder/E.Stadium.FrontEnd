import Image from 'next/image';
import Link from 'next/link';
import Footer from './Footer';

function LandingPage() {
  return (
    <div className="bg-white m-auto h-[98%] w-[70%] md:w-[50%] lg:w-[40%] rounded-lg p-5">
      <div className="pl-[10%] lg:pl-[25%]">
        <Image
          src="/images/signup-logo.jpg"
          alt="E Staduim"
          width={300}
          height={200}
        />
      </div>
      <p className="text-center font-semibold text-[35px]">
        <span className="font-welcome">Welcome to</span> <br />
        <span className="font-logo">E Stadium</span>
      </p>

      <div className="px-10 pt-16 ">
        <p className="font-mono text-center font-semibold">
          The quick way to book a futsal or football stadium.
        </p>
      </div>
      <div className="w-[60%] m-auto mt-10">
        <Link href="/auth/signin">
          <p className="btn btn-blue w-full btn-font-fira text-center cursor-pointer">
            Sign In
          </p>
        </Link>
        <Link href="/auth/signup">
          <p className="btn btn-blue w-full btn-font-fira mt-6 text-center cursor-pointer">
            Sign Up
          </p>
        </Link>
      </div>
      <Footer />
    </div>
  );
}

export default LandingPage;
