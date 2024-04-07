'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { registerWithCredentials } from '@/lib/actions';
import { Mulish } from 'next/font/google';
import { HiAtSymbol } from "react-icons/hi";
import { FaKey } from "react-icons/fa";
import Link from 'next/link';

const mulish = Mulish({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})


export default function LoginForm() {
  const [errorMessage, dispatch] = useFormState(registerWithCredentials, undefined);

  return (
    <form action={dispatch} className="space-y-3 h-screen flex-1 mt-20">
      <div className="flex-1 rounded-lg bg-gray-50 shadow-lg px-12 pb-4 pt-8 max-w-fit mx-auto">
        <h1 className={`${mulish.className} mb-3 text-2xl text-gray-600`}>
          Register your account
        </h1>
        <div className="w-full">
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email address"
                required
              />
              <HiAtSymbol className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="password1"
            >
              Password
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="password1"
                type="password"
                name="password1"
                placeholder="Enter password"
                required
                minLength={6}
              />
              <FaKey className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="password2"
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="password2"
                type="password"
                name="password2"
                placeholder="Enter password again"
                required
                minLength={6}
              />
              <FaKey className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
        <RegisterButton />
        {errorMessage && (
          <div
            className="flex h-8 items-end justify-center space-x-1"
            aria-live="polite"
            aria-atomic="true"
          >
            <p className="text-sm text-red-500">{errorMessage}</p>
          </div>
        )}
        <div className="mt-4 text-center">
          <Link href="/login" className="text-gray-500 hover:underline text-sm">
            Already registered? Login here
          </Link>
        </div>
      </div>
    </form>
  );
}

function RegisterButton() {
  const { pending } = useFormStatus();

  return (
    <button className="mt-6 w-full p-2 rounded-md text-white bg-blue-500" aria-disabled={pending}>
      Register
    </button>
  );
}