import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { object, string, TypeOf } from 'zod';
import Footer from '../../components/Footer';
const signInUserSchema = object({
  password: string().min(1, 'Password is required'),
});

type SignInUserInput = TypeOf<typeof signInUserSchema>;

function Signin() {
  const Router = useRouter();
  const [registerError, setRegisterError] = useState(null);
  const [phone, setPhone] = useState<string>('');
  const [region, setRegion] = useState<string>('');
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<SignInUserInput>({ resolver: zodResolver(signInUserSchema) });
  async function onSubmit(values: SignInUserInput) {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/v1/user/login`,
        {
          ...values,
          phone,
          region,
        },
        { withCredentials: true }
      );
      Router.push('/');
    } catch (error: any) {
      console.log(error);
      setRegisterError(error.response?.data?.message || error.message);
    }
  }

  const phoneNumberHandle = (value: any, e: any) => {
    setPhone(value.split(e.dialCode)[1]);
    setRegion(e.countryCode);
  };
  return (
    <div className="min-h-screen h-screen bg-base flex">
      <div className="bg-white m-auto h-[98%] w-[70%] md:w-[50%] lg:w-[40%] rounded-lg p-5">
        <p className="text-center font-semibold text-[25px] font-logo">
          Sign In!
        </p>
        <div className="pl-[10%] lg:pl-[25%]">
          <Image
            src="/images/signin.jpg"
            alt="E Staduim"
            width={300}
            height={300}
          />
        </div>
        <div className="w-full m-auto mt-10 lg:px-20">
          <p className="text-red-500">{registerError}</p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label className="input-label">Phone Number</label>
              <PhoneInput
                country={'kh'}
                onChange={phoneNumberHandle}
                inputStyle={{ width: '100%' }}
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Password
              </label>
              <input
                className={`input-box focus:outline-none focus:shadow-outline`}
                type="password"
                placeholder="******************"
                {...register('password')}
              />
              <p className="text-red-500 text-xs italic">
                {errors.password?.message}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <button
                className={`${
                  isSubmitting
                    ? 'disabled'
                    : 'focus:outline-none focus:shadow-outline'
                } bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded`}
                type="submit"
              >
                {isSubmitting ? 'Submitting' : 'Sign In'}
              </button>
              <div className="flex gap-2">
                <p className="text-sm">Not yet have an account? </p>
                <Link href="/auth/signup">
                  <p className="font-bold text-sm text-blue-500 hover:text-blue-800 cursor-pointer">
                    Sign Up
                  </p>
                </Link>
              </div>
            </div>
          </form>
          <div style={{ height: '160px' }}></div>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default Signin;
