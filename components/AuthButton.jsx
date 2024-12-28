'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import { Loader, LogOut, Github } from 'lucide-react';

export default function AuthButton() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <button disabled className="px-4 py-2 rounded-full bg-slate-500 text-white">
        <Loader className="w-5 h-5 animate-spin" />
      </button>
    );
  }

  if (session) {
    return (
      <div className="flex items-center gap-2 sm:gap-4">
        <img
          src={session.user?.image}
          alt={session.user?.name}
          className="w-8 h-8 rounded-full border-2 border-red-500"
        />
        {/* Hide name on mobile, show on sm and up */}
        <span className="hidden sm:inline text-white">{session.user?.name}</span>
        <button
          onClick={() => signOut()}
          className="p-2 sm:px-4 sm:py-2 rounded-full bg-slate-500 hover:bg-slate-700 text-white flex items-center gap-2 transition-colors duration-300 transform hover:scale-105"
          title="Sign Out"
        >
          <LogOut className="w-5 h-5" />
          {/* Hide text on mobile, show on sm and up */}
          <span className="hidden sm:inline">Sign Out</span>
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => signIn('github')}
      className="p-2 sm:px-4 sm:py-2 rounded-full bg-slate-500 hover:bg-slate-700 text-white flex items-center gap-2 transition-colors duration-300 transform hover:scale-105"
      title="Sign In with GitHub"
    >
      <Github className="w-5 h-5" />
      <span className="hidden sm:inline">Sign In with GitHub</span>
    </button>
  );
}