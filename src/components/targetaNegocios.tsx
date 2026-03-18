import prisma from '@/lib/prisma';

export async function TargetaNegocios() {
  const negocios = await prisma.dir_verde.findMany();
  return (
    <div className="bg-card border border-border rounded-2xl p-5 flex items-center gap-4">
      <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke="currentColor"
          className="w-6 h-6 text-primary"
          strokeWidth={1.5}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 12l8.954-8.955a1.126 1.126 0 011.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
          />
        </svg>
      </div>
      <div>
        <p className="text-muted-foreground text-sm font-medium">Total Negocios</p>
        <h3 className="text-2xl font-bold text-card-foreground">{negocios.length}</h3>
      </div>
    </div>
  );
}
