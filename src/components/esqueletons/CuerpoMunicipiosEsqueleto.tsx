import { Skeleton } from '../ui/skeleton';

export function CuerpoMunicipiosEsqueleto() {
  return (
    <>
      <tr>
        <td className="px-6 py-4">
          <Skeleton className="rounded-2xl h-5 w-41 " />
        </td>
        <td className="px-6 py-4">
          <Skeleton className="rounded-2xl h-6 w-54.5 " />
        </td>
        <td className="px-6 py-4">
          <Skeleton className="rounded-2xl h-6 w-36 " />
        </td>
        <td className="px-6 py-4">
          <Skeleton className="rounded-2xl h-6 w-50.25 " />
        </td>
      </tr>
      <tr>
        <td className="px-6 py-4">
          <Skeleton className="rounded-2xl h-5 w-41 " />
        </td>
        <td className="px-6 py-4">
          <Skeleton className="rounded-2xl h-6 w-54.5 " />
        </td>
        <td className="px-6 py-4">
          <Skeleton className="rounded-2xl h-6 w-36 " />
        </td>
        <td className="px-6 py-4">
          <Skeleton className="rounded-2xl h-6 w-50.25 " />
        </td>
      </tr>
    </>
  );
}
