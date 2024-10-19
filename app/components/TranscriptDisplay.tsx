import React from 'react'

interface TranscriptDisplayProps {
  transcript: string
}

const TranscriptDisplay: React.FC<TranscriptDisplayProps> = ({ transcript }) => {
  return (
    <div className="mt-4">
      <h2 className="text-xl font-semibold mb-2">Transcript:</h2>
      <div className="bg-gray-100 p-4 rounded-lg whitespace-pre-wrap">{transcript}</div>
    </div>
  )
}

export default TranscriptDisplay