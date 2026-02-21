'use client';
import { IoMdShare } from 'react-icons/io';
import { CiEdit} from 'react-icons/ci';
import { toast } from 'sonner';
import Link from 'next/link';
export function BotonesFormulario({url, linkEdit}: Readonly<{url:string, linkEdit:string}>) {

    const copiarTexto = async () => {
      if (url) {
        await navigator.clipboard.writeText(url);
      } else {
        toast.info('Este negocio no tiene pagina web');
      }
      toast.success('Pagina web del nogico copiada');
    };
  return (
    <div className="flex items-center gap-2 ml-auto">
      <button
        onClick={() => copiarTexto()}
        className="size-10 flex items-center justify-center rounded-lg border border-leaf/20 text-leaf hover:bg-leaf/5"
      >
        <IoMdShare size={23} />
      </button>
      <Link
        href={linkEdit}
        className="size-10 flex items-center justify-center rounded-lg border border-leaf/20 text-leaf hover:bg-leaf/5">
        <CiEdit size={23} />
      </Link>
    </div>
  );
}
