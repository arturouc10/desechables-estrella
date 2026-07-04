import { NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';
import { verifySession } from '@/lib/session';

export async function POST(request: Request) {
  // 🔒 Verify authentication
  const session = await verifySession();
  if (!session) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  try {
    const data = await request.formData();
    const file = data.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: "No se proporcionó ningún archivo" }, { status: 400 });
    }

    // Security: Validate File Type
    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: "Solo se permiten imágenes (JPEG, PNG, WEBP, etc.)" }, { status: 400 });
    }

    // Security: Validate File Size (Max 5MB)
    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: "La imagen excede el límite de 5MB" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Promise wrapper for upload_stream
    const uploadResponse = await new Promise<{ secure_url: string }>((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder: 'desechables-estrella-products' },
        (error, result) => {
          if (error) reject(error);
          else resolve(result as { secure_url: string });
        }
      ).end(buffer);
    });

    return NextResponse.json({ url: uploadResponse.secure_url }, { status: 200 });
  } catch (error) {
    console.error("Error subiendo imagen:", error);
    return NextResponse.json({ error: "Error subiendo imagen a Cloudinary" }, { status: 500 });
  }
}
