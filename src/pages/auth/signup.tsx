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

const createUserSchema = object({
  firstName: string().min(1, 'First name is required'),
  lastName: string().min(1, 'Last name is required'),
  gender: string().min(1, 'gender is required'),
  dob: string().min(1, 'Birth Of Date is required'),
  password: string()
    .min(6, 'Password too short - should be 6 chars minimum')
    .min(1, 'Password is required'),
  passwordConfirmation: string().min(1, 'Password Confirmation is required'),
}).refine((data: any) => data.password === data.passwordConfirmation, {
  message: 'Passwords do not match',
  path: ['passwordConfirmation'],
});

type CreateUserInput = TypeOf<typeof createUserSchema>;

function Signup() {
  const router = useRouter();
  const [registerError, setRegisterError] = useState(null);
  const [numberError, setNumberError] = useState(null);
  const [phone, setPhone] = useState<string>('');
  const [region, setRegion] = useState<string>('');
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<CreateUserInput>({ resolver: zodResolver(createUserSchema) });
  async function onSubmit(values: CreateUserInput) {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT_V1}/v1/user`,
        {
          ...values,
          phone,
          region,
        }
      );
      router.push('/');
    } catch (error: any) {
      console.log(error);
      if (error.response?.data?.code === 'invalid_phone')
        setNumberError(error.response?.data?.message);
      else setRegisterError(error.message);
    }
  }

  const phoneNumberHandle = (value: any, e: any) => {
    setPhone(value.split(e.dialCode)[1]);
    setRegion(e.countryCode);
  };

  return (
    <div className="min-h-screen h-screen bg-[#b3b3b3d6] flex">
      <div className="bg-white m-auto h-[98%] w-[70%] md:w-[50%] lg:w-[40%] rounded-lg py-2 px-5">
        <p className="text-center font-semibold text-[25px] font-logo">
          Sign Up!
        </p>
        <div className="pl-[10%] lg:pl-[25%]">
          <Image
            src="/images/signup-logo.jpg"
            alt="E Staduim"
            width={300}
            height={200}
          />
        </div>
        <p className="text-red-500">{registerError}</p>
        <div className="w-full m-auto lg:px-20">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label className="input-label">First Name</label>
              <input
                className={`input-box focus:outline-none focus:shadow-outline`}
                type="text"
                placeholder="First name"
                {...register('firstName')}
              />
              <p className="text-red-500 text-xs italic">
                {errors.firstName?.message}
              </p>
            </div>
            <div className="mb-4">
              <label className="input-label">Last Name</label>
              <input
                className={`input-box focus:outline-none focus:shadow-outline`}
                type="text"
                placeholder="Last name"
                {...register('lastName')}
              />
              <p className="text-red-500 text-xs italic">
                {errors.lastName?.message}
              </p>
            </div>
            <div className="mb-4">
              <label className="input-label">Gender</label>
              <div className="flex items-center justify-between mb-4 gap-4">
                <div className="flex items-center">
                  <input
                    {...register('gender')}
                    id="Male"
                    type="radio"
                    value="Male"
                    name="gender"
                    className="input-radio"
                  />
                  <label htmlFor="Male" className="radio-label">
                    Male
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    {...register('gender')}
                    id="female"
                    type="radio"
                    value="Female"
                    name="gender"
                    className="input-radio outline-none border-none"
                    onChange={() => {}}
                  />
                  <label htmlFor="female" className="radio-label">
                    Female
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    {...register('gender')}
                    defaultChecked
                    id="other"
                    type="radio"
                    value="Other"
                    name="gender"
                    className="input-radio"
                    onChange={() => {}}
                  />
                  <label htmlFor="other" className="radio-label">
                    Other
                  </label>
                </div>
              </div>
              <p className="text-red-500 text-xs italic">
                {errors.gender?.message}
              </p>
            </div>
            <div className="mb-4">
              <label className="input-label">Birth Of Date</label>
              <input
                className={`input-box focus:outline-none focus:shadow-outline`}
                type="date"
                {...register('dob')}
              />
              <p className="text-red-500 text-xs italic">
                {errors.dob?.message}
              </p>
            </div>
            <div className="mb-4">
              <label className="input-label">Phone Number</label>
              <PhoneInput
                country={'kh'}
                onChange={phoneNumberHandle}
                inputStyle={{ width: '100%' }}
              />
              <p className="text-red-500 text-xs italic">{numberError}</p>
            </div>
            <div className="mb-6">
              <label className="input-label">Password</label>
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
            <div className="mb-6">
              <label className="input-label">Confirm Password</label>
              <input
                className={`input-box focus:outline-none focus:shadow-outline`}
                type="password"
                placeholder="******************"
                {...register('passwordConfirmation')}
              />
              <p className="text-red-500 text-xs italic">
                {errors.passwordConfirmation?.message}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <button className="btn btn-blue" type="submit">
                Sign Up
              </button>
              <div className="flex gap-2">
                <p className="text-sm">Already have an account? </p>
                <Link href="/auth/signin">
                  <p className="font-bold text-sm text-blue-500 hover:text-blue-800 cursor-pointer">
                    Sign In
                  </p>
                </Link>
              </div>
            </div>
          </form>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default Signup;
