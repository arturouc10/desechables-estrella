import { NextResponse } from 'next/server';
import cloudinary from '../../../lib/cloudinary';

export async function POST(request) {
  try {
    const data = await request.formData();
    const file = data.get('file');

    if (!file) {
      return NextResponse.json({ error: "No se proporcionó ningún archivo" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Promesa para manejar upload_stream
    const uploadResponse = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder: 'desechables-estrella-products' },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(buffer);
    });

    return NextResponse.json({ url: uploadResponse.secure_url }, { status: 200 });
  } catch (error) {
    console.error("Error subiendo imagen:", error);
    return NextResponse.json({ error: "Error subiendo imagen a Cloudinary" }, { status: 500 });
  }
}
