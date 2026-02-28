import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Trash2Icon } from 'lucide-react';

interface AlertImageProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  title: string;
  descripcion: string;
  funcion: () => void;
}

export function AlertDelate({
  open,
  setOpen,
  title,
  descripcion,
  funcion,
}: Readonly<AlertImageProps>) {
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent size="sm" className="dark:bg-zinc-900">
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
            <Trash2Icon />
          </AlertDialogMedia>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{descripcion}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel variant="outline">Cancelar</AlertDialogCancel>
          <AlertDialogAction variant="destructive" onClick={funcion}>
            Eliminar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
