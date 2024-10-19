'use client'

import React, { useState } from 'react'
import { transcribeAudio } from '../actions'
import TranscriptDisplay from './TranscriptDisplay'
import { Mic, Upload, Loader2 } from 'lucide-react'

export default function AudioTranscriptionForm() {
  const [transcript, setTranscript] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [fileName, setFileName] = useState<string | null>(null)

  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true)
    setError(null)
    try {
      const result = await transcribeAudio(formData)
      setTranscript(result)
    } catch (err) {
      setError('An error occurred while transcribing the audio.')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    setFileName(file ? file.name : null)
  }

  return (
    <div className="p-6">
      <form action={handleSubmit} className="space-y-4">
        <div className="flex items-center justify-center w-full">
          <label htmlFor="audioFile" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="w-10 h-10 mb-3 text-gray-400" />
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">MP3, WAV, or M4A (MAX. 10MB)</p>
            </div>
            <input
              id="audioFile"
              type="file"
              name="audioFile"
              accept="audio/*"
              className="hidden"
              onChange={handleFileChange}
              required
            />
          </label>
        </div>
        {fileName && (
          <p className="text-sm text-gray-500 text-center">
            Selected file: {fileName}
          </p>
        )}
        <div className="flex justify-center">
          <button
            type="submit"
            className="flex items-center justify-center px-6 py-3 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                Transcribing...
              </>
            ) : (
              <>
                <Mic className="-ml-1 mr-3 h-5 w-5" />
                Transcribe Audio
              </>
            )}
          </button>
        </div>
      </form>
      {error && (
        <div className="mt-4 p-4 bg-red-100 border-l-4 border-red-500 text-red-700">
          <p>{error}</p>
        </div>
      )}
      {transcript && <TranscriptDisplay transcript={transcript} />}
    </div>
  )
}