import { Skeleton } from '../ui/skeleton';
export function CuerpoMunicipiosEsqueleto() {
  return (
    <div className="bg-card border border-border rounded-2xl p-5">
      <div className="flex items-start gap-4">
        <Skeleton className="w-12 h-12 rounded-xl" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-5 w-3/4" />
          <div className="flex gap-2">
            <Skeleton className="h-6 w-16 rounded-full" />
            <Skeleton className="h-6 w-20 rounded-full" />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
        <Skeleton className="h-4 w-12" />
        <Skeleton className="h-8 w-8 rounded-lg" />
      </div>
    </div>
  );
}
