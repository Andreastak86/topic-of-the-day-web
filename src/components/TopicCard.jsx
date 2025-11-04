// components/TopicCard.jsx
import Link from "next/link"

export default function TopicCard({ topic }) {
  const href = `/topic/${topic.slug.current}`
  const date = topic.date ? new Date(topic.date) : null

  return (
    <Link
      href={href}
      className="group relative block overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      {topic.cover?.url ? (
        <div className="aspect-[16/10] overflow-hidden bg-neutral-100">
          <img
            src={topic.cover.url}
            alt={topic.cover.alt || topic.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            loading="lazy"
          />
        </div>
      ) : (
        <div className="aspect-[16/10] bg-neutral-100" />
      )}

      <div className="p-4">
        <h2 className="text-lg font-semibold leading-snug line-clamp-2">
          {topic.title}
        </h2>

        <div className="mt-1 text-sm text-neutral-600">
          {date ? date.toLocaleDateString() : "Udatert"}
        </div>

        {topic.tags?.length ? (
          <div className="mt-3 flex flex-wrap gap-2">
            {topic.tags.slice(0, 4).map((t, i) => (
              <span
                key={i}
                className="rounded-full border px-2 py-0.5 text-xs text-neutral-700"
              >
                #{t}
              </span>
            ))}
            {topic.tags.length > 4 && (
              <span className="text-xs text-neutral-500">
                +{topic.tags.length - 4}
              </span>
            )}
          </div>
        ) : null}
      </div>

      {/* Subtil highlight på hover */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl ring-0 ring-neutral-200 transition group-hover:ring-2" />
    </Link>
  )
}
