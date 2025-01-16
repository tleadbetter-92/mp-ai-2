import PublicChat from '@/components/public-chat'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="w-full max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Ask Your MP</h1>
        <PublicChat />
      </div>
    </main>
  )
}

