import { AiFillGithub, AiOutlineGoogle } from "react-icons/ai";

export function SignupBtn() {
  return (
    <button
      type="button"
      className="text-white bg-indigo-500 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-white dark:hover:text-indigo-500 mr-2 mb-2 border-2 dark:hover:border-indigo-500/75"
    >
      Sign up for Free
    </button>
  );
}

export function SigninBtn() {
  return (
    <button
      type="button"
      className="text-white bg-indigo-500 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-white dark:hover:text-indigo-500 mr-2 mb-2 border-2 dark:hover:border-indigo-500/75"
    >
      Sign In
    </button>
  );
}

export function GitSignin() {
  return (
    <button
      type="button"
      className="text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 border-2 dark:hover:border-indigo-500/75 mr-2 mb-2"
    >
      <AiFillGithub width={10} height={10} className="mr-3 text-lg" />
      Sign in with Github
    </button>
  );
}

export function GoogleSignin() {
  return (
    <button
      type="button"
      className="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2 border-2 dark:hover:border-indigo-500 "
    >
      <AiOutlineGoogle width={10} height={10} className="mr-3 text-lg" />
      Sign in with Google
    </button>
  );
}
