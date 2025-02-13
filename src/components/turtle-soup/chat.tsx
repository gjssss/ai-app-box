'use client'

import { useChat } from '@ai-sdk/react'

export default function Chat({
  id,
}: {
  id: string
}) {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: '/api/turtle-soup/chat',
    streamProtocol: 'data',
    id,
  })
  return (
    <div className="flex flex-col w-full py-2 stretch">
      {messages.map(m => (
        <div key={m.id} className="whitespace-pre-wrap">
          {m.role === 'user' ? 'User: ' : 'AI: '}
          {m.content}
        </div>
      ))}

      <form onSubmit={handleSubmit}>
        <input
          className="fixed dark:bg-zinc-900 bottom-0 w-[720px] p-2 mb-8 border border-zinc-300 dark:border-zinc-800 rounded shadow-xl"
          value={input}
          placeholder="Say something..."
          onChange={handleInputChange}
        />
      </form>
    </div>
  )
}
