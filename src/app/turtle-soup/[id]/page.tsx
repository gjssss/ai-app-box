'use client'
import { useEffect, useState } from 'react'
import Chat from '~/components/turtle-soup/chat'

export default function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const [story, setStory] = useState<{
    title: string
    story: string
  }>()
  const [id, setID] = useState<string>()

  useEffect(() => {
    async function fetchData() {
      const id = (await params).id
      const url = new URL('/api/turtle-soup/get', window.location.origin)
      url.searchParams.append('id', id)
      const res = await fetch(url, {
        method: 'GET',
      })
      const { story } = await res.json()
      setStory(story)
      setID(id)
    }
    fetchData()
  }, [params])
  if (!story || !id)
    return <div>Loading...</div>
  return (
    <div>
      <h1 className="text-[1.5rem] font-bold">{story.title}</h1>
      <p>{story.story}</p>
      <Chat id={id} />
    </div>
  )
}
