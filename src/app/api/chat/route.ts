import { Ollama } from 'ollama';
import { NextResponse } from 'next/server';

const ollama = new Ollama({ host: 'http://localhost:11434' });

export async function POST(request: Request) {
  try {
    const messages = await request.text();

    const response = await ollama.chat({
      model: 'gemma3:1b',
      messages: [
        {content: messages, role: 'user'}
      ],
      stream: false, // Petición normal
    });

    console.log(response);

    return NextResponse.json(response);

  } catch (error) {
    console.error('Error en la API de Ollama:', error);
    return NextResponse.json(
      { error: 'Error al procesar la solicitud' },
      { status: 500 }
    );
  }
}