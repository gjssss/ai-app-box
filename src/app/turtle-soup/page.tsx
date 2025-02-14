'use client'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button } from '~/components/ui/button'
import { useToast } from '~/hooks/use-toast'

export default function Page() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
  const [list, setList] = useState<any[]>([])

  useEffect(() => {
    async function getData() {
      const res = await fetch('/api/turtle-soup/list')
      const { list } = await res.json()
      setList(list)
    }
    getData()
  }, [])

  async function createGame() {
    setLoading(true)
    try {
      const res = await fetch('/api/turtle-soup/create', {
        method: 'POST',
      })
      const { id } = await res.json()
      router.push(`/turtle-soup/${id}`)
    }
    catch {
      toast({
        title: '失败',
        description: '服务器繁忙',
      })
    }
    finally {
      setLoading(false)
    }
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
        <div className="mt-4">
          {
            list.map(item => (
              <div
                key={item.id}
                className="border rounded p-2 mt-2 cursor-pointer"
                onClick={() => {
                  router.push(`/turtle-soup/${item.id}`)
                }}
              >
                <h4>{item.title}</h4>
              </div>
            ))
          }
        </div>
      </div>
    </>
  )
}
