import { client } from '@/lib/sanity.client'
import { topicBySlug } from '@/lib/queries'
import { PortableText } from '@portabletext/react'
import Image from 'next/image'

export const revalidate = 60

export default async function TopicPage({ params }) {
  const { slug } = await params
  const data = await client.fetch(topicBySlug, { slug })
  if (!data) return <main className="p-6">Topic ikke funnet.</main>

  return (
    <main className="mx-auto max-w-3xl p-6">
      <h1 className="text-3xl font-bold">{data.title}</h1>
      {data.date && <div className="opacity-70 mt-1">{new Date(data.date).toLocaleString('no-NO')}</div>}
      {data.cover?.url && <Image src={data.cover.url} alt={data.cover.alt || data.title} width={1200} height={600} className="my-6 w-full rounded-xl" />}

      {data.excerpt && <p className="text-lg mb-4">{data.excerpt}</p>}

      <article className="prose max-w-none">
        <PortableText value={data.body} />
      </article>

      {data.instructors?.length ? (
        <section className="mt-10">
          <h2 className="text-xl font-semibold mb-3">Instruktører</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {data.instructors.map(x => (
              <li key={x._id} className="border rounded-xl p-3 flex items-center gap-3">
                {x.avatar?.url && <Image src={x.avatar.url} alt={x.name} width={48} height={48} className="w-12 h-12 rounded-full object-cover" />}
                <div>
                  <div className="font-medium">{x.name}</div>
                  <div className="text-sm opacity-70">{x.role}</div>
                </div>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {data.resources?.length ? (
        <section className="mt-10">
          <h2 className="text-xl font-semibold mb-3">Ressurser</h2>
          <ul className="list-disc ml-5">
            {data.resources.map((r, i) => (
              <li key={i}><a className="underline" href={r.url} target="_blank" rel="noreferrer">{r.title}</a></li>
            ))}
          </ul>
        </section>
      ) : null}
    </main>
  )
}
