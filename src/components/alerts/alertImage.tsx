'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface AlertImageProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  title: string;
  descripcion: string;
  funcion: () => void;
}

export function AlertImage({
  open,
  setOpen,
  title,
  descripcion,
  funcion,
}: Readonly<AlertImageProps>) {
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="dark:bg-zinc-900">
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{descripcion}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={funcion}>Continuar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
