import { handleUpload } from '@vercel/blob/client';

export async function POST(request: Request) {
  const body = await request.json();

  const jsonResponse = await handleUpload({
    body,
    request,
    onBeforeGenerateToken: async () => {
      return {
        allowedContentTypes: ['application/pdf'],
        maximumSizeInBytes: 10 * 1024 * 1024,
      };
    },
  });

  return Response.json(jsonResponse);
}
