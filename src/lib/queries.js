import groq from 'groq'

// Topics for a given month (date is optional)
export const topicsByMonth = groq`
*[_type == "topic" && defined(date) && dateTime(date) >= dateTime($start) && dateTime(date) < dateTime($end)]
| order(date asc){
  _id, title, slug, date, level, tags, cover{
    alt, "url": asset->url
  }
}
`

export const latestTopics = groq`
*[_type == "topic"]|order(coalesce(date, _createdAt) desc)[0...12]{
  _id, title, slug, date, level, tags, cover{
    alt, "url": asset->url
  }, excerpt
}
`

export const topicBySlug = groq`
*[_type == "topic" && slug.current == $slug][0]{
  _id, title, slug, date, level, tags, cover{
    alt, "url": asset->url
  },
  excerpt,
  body,
  "instructors": instructors[]->{
    _id, name, role, avatar{ alt, "url": asset->url }
  },
  resources[]{title, url}
}
`
