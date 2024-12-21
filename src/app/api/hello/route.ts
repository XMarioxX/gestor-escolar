import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  return NextResponse.json({ nombre: 'El chico del apartamento 512' });
}