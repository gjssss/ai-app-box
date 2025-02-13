'use client'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Button } from '~/components/ui/button'

export default function Page() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  async function createGame() {
    setLoading(true)
    const res = await fetch('/api/turtle-soup/create', {
      method: 'POST',
    })
    const { id } = await res.json()
    setLoading(false)
    router.push(`/turtle-soup/${id}`)
  }

  return (
    <>
      <div>
        <div className="flex items-center justify-between">
          <h3 className="text-[1.5rem]">海龟汤</h3>
          {
            loading
              ? (
                  <Button disabled>
                    <Loader2 className="animate-spin" />
                    创建游戏中
                  </Button>
                )
              : <Button onClick={createGame}>新游戏</Button>
          }
        </div>
      </div>
    </>
  )
}
