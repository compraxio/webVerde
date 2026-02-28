'use client';

import { useAuthStore } from '@/store/AuthStore';
import { MdOutlineLockOpen, MdOutlineVisibility, MdOutlineVisibilityOff } from 'react-icons/md';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { IoMdArrowRoundForward } from 'react-icons/io';
import { authSchema, Input } from '@/schemas/authSchema';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function Page() {
  const router = useRouter();
  const [vercontrasena, setVercontrasena] = useState<boolean>(false);
  const login = useAuthStore((state) => state.login);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Input>({
    resolver: zodResolver(authSchema),
  });

  const onSubmit: SubmitHandler<Input> = async (data) => {
      const result = await login(data.password);
      if (result.success) {
        toast.success(result.message);
        router.push('/');
      } else {
        toast.error(result.message);
      }

  };

  return (
    <div className="relative flex h-full items-center justify-center overflow-hidden mt-5 rounded-2xl">
      <main className="relative z-10 w-full max-w-md px-6">
        <div className="hidden md:flex md:flex-col md:items-center mb-8 md:gap-4">
          <div className="flex items-center justify-center p-3 bg-primary/10 rounded-xl">
            <div className="size-10 text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 48 48"><path fill="currentColor" fillRule="evenodd" d="M24 .757 47.243 24 24 47.243.757 24zm-3 35V12.243L9.243 24z" clipRule="evenodd"/></svg>
            </div>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Negocios Verdes
          </h1>
        </div>

        <div className="bg-white dark:bg-slate-900/50 backdrop-blur-sm border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl overflow-hidden">
          <div
            className="h-40 w-full bg-cover bg-center"
            data-alt="Abstract green leaves in soft sunlight"
            style={{
              backgroundImage:
                'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBfQna3AiTPGGps9Oqmu8cbNE3IHh-LyGqbnfW1Hg6Tb8VJMvOXxeTL_EMxzmReXF1pFUNoG0oUuK1m3sb8z7VOv1B_MEse-knjOLvHiO3VSCeN0MVrPmGAwkpDi1qFT9VF-R3KoNPModR4ozdYWd_FoZ6WuXQU7WT3vYEZc7Xl7Qk57mdnLXCgewWCa6w9e6yA77_-gNXZtrMOdnDIOZRqcYree-JTV2eALJeRfwne3_v1HeYbZgTwnuakHmoRJXeeihhxpEDkcgLm")',
            }}
          >
            <div className="w-full h-full bg-linear-0-to-t from-black/60 to-transparent flex items-end p-6">
              <div className="flex items-center gap-2 text-white">
                <span className=" text-primary">
                  <MdOutlineLockOpen size={25} />
                </span>
                <span className="text-sm font-medium">Área Segura</span>
              </div>
            </div>
          </div>
          <div className="p-8">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Acceso de Administrador
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                Ingrese la contraseña para continuar
              </p>
            </div>
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-2">
                <label
                  className="text-sm font-medium text-slate-700 dark:text-slate-300"
                  htmlFor="password"
                >
                  Contraseña
                </label>
                <div className="relative flex items-center">
                  <input
                    className="w-full h-12 px-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all dark:text-white placeholder-slate-400"
                    id="password"
                    placeholder="Incerta la contrasena"
                    type={vercontrasena ? 'text' : 'password'}
                    {...register('password')}
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                  )}
                  <button
                    className="absolute right-3 text-slate-400 hover:text-primary transition-colors"
                    type="button"
                    onClick={() => setVercontrasena(!vercontrasena)}
                  >
                    <span>
                      {vercontrasena ? (
                        <MdOutlineVisibilityOff size={20} />
                      ) : (
                        <MdOutlineVisibility size={20} />
                      )}
                    </span>
                  </button>
                </div>
              </div>
              <button
                className="w-full h-12 bg-primary hover:bg-primary/90 text-slate-950 font-bold rounded-lg transition-colors flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
                type="submit"
              >
                <span>Verificar</span>
                <IoMdArrowRoundForward />
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
