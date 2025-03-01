import { openai } from '@ai-sdk/openai';
import { generateText } from 'ai';
import { NextResponse } from 'next/server';

export const config = { runtime: 'edge' };

export async function POST(req: Request) {
  try {
    const { text, usage, providerMetadata } = await generateText({
      model: openai('gpt-3.5-turbo-instruct'),
      prompt:
        "Generate three engaging, open-ended questions for an anonymous social messaging platform. Each question should be separated by '||'. Focus on universal themes encouraging friendly interaction. Example format: 'What’s a hobby you’ve recently started?||If you could have dinner with any historical figure, who would it be?||What’s a simple thing that makes you happy?'.",
      maxTokens: 400,
      providerOptions: {
        openai: {
          reasoningEffort: 'low',
        },
      },
    });

    return NextResponse.json({
      success: true,
      questions: text,
      usage,
      reasoningTokens: providerMetadata?.openai?.reasoningTokens,
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
