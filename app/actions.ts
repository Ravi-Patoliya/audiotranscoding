'use server'

import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

export async function transcribeAudio(formData: FormData): Promise<string> {
    if (!process.env.GEMINI_API_KEY) {
        throw new Error('GEMINI_API_KEY is not set in the environment variables');
    }

    const file = formData.get('audioFile') as File | null
    if (!file) {
        throw new Error('No file uploaded')
    }

    const arrayBuffer = await file.arrayBuffer()
    const base64Audio = Buffer.from(arrayBuffer).toString('base64')

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' })

    try {
        const result = await model.generateContent([
            'Transcribe the following audio file:',
            {
                inlineData: {
                    mimeType: file.type,
                    data: base64Audio
                }
            }
        ])

        const response = await result.response
        return response.text()
    } catch (error) {
        console.error('Error in transcription:', error)
        throw new Error('Failed to transcribe audio')
    }
}