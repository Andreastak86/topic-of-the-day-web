import { client } from "@/lib/sanity.client"
import { topicsByMonth, latestTopics } from "@/lib/queries"
import { format, startOfMonth, endOfMonth } from "date-fns"
import TopicCard from "@/components/TopicCard"

export const revalidate = 60

export default async function Home() {
  const now = new Date()
  const start = startOfMonth(now).toISOString()
  const end = endOfMonth(now).toISOString()

  let topics = await client.fetch(topicsByMonth, { start, end })
  if (!topics?.length) topics = await client.fetch(latestTopics)

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <header className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Dagens Topic</h1>
        <p className="mt-1 text-neutral-600">
          {format(now, "MMMM yyyy")} – kuratert kunnskap, én dag av gangen.
        </p>
      </header>

      {topics?.length ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {topics.map((t) => (
            <TopicCard key={t._id} topic={t} />
          ))}
        </div>
      ) : (
        <EmptyState />
      )}
    </main>
  )
}

function EmptyState() {
  return (
    <div className="rounded-2xl border bg-white p-10 text-center text-neutral-600">
      Ingen topics enda for denne perioden. Publisér i Sanity – eller fjern
      månedfilteret.
    </div>
  )
}
