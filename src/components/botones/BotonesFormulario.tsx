'use client';
import { IoMdShare } from 'react-icons/io';
import { CiEdit} from 'react-icons/ci';
import { toast } from 'sonner';

export function BotonesFormulario({url}: Readonly<{url:string}>) {

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
      <button className="size-10 flex items-center justify-center rounded-lg border border-leaf/20 text-leaf hover:bg-leaf/5">
        <CiEdit size={23} />
      </button>
    </div>
  );
}
