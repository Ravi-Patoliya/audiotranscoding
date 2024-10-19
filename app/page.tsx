import AudioTranscriptionForm from './components/AudioTranscriptionForm'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-8">
          Audio Transcription App
        </h1>
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <AudioTranscriptionForm />
        </div>
      </div>
    </main>
  )
}