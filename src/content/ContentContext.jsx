import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { credentials as fallbackCredentials, profile as fallbackProfile, projects as fallbackProjects } from '../data'

const ContentContext = createContext({ profile: fallbackProfile, projects: fallbackProjects, credentials: fallbackCredentials, cmsConnected: false })
const projectId = import.meta.env.VITE_SANITY_PROJECT_ID
const dataset = import.meta.env.VITE_SANITY_DATASET || 'production'

const query = `{
  "profile": *[_type == "profile"][0]{firstName,lastName,name,headline,intro,about,quote,location,timezone,email,github,linkedin,leetcode,domain,"frontPhoto":frontPhoto.asset->url,"backPhoto":backPhoto.asset->url},
  "projects": *[_type == "project"] | order(order asc){"id":coalesce(number,"01"),title,category,description,stack,color,"image":image.asset->url,liveUrl,sourceUrl,featured},
  "credentials": *[_type == "credential"] | order(order asc){"number":coalesce(number,"01"),title,issuer,year,description,tags,"image":image.asset->url,verifyUrl}
}`

export function ContentProvider({ children }) {
  const [remote, setRemote] = useState(null)

  useEffect(() => {
    if (!projectId) return
    const controller = new AbortController()
    const url = `https://${projectId}.api.sanity.io/v2025-02-19/data/query/${dataset}?query=${encodeURIComponent(query)}`
    fetch(url, { signal: controller.signal })
      .then((response) => response.ok ? response.json() : Promise.reject(new Error('CMS unavailable')))
      .then(({ result }) => setRemote(result))
      .catch((error) => { if (error.name !== 'AbortError') console.warn('Using local portfolio content:', error.message) })
    return () => controller.abort()
  }, [])

  const value = useMemo(() => ({
    profile: { ...fallbackProfile, ...(remote?.profile || {}) },
    projects: remote?.projects?.length ? remote.projects : fallbackProjects,
    credentials: remote?.credentials?.length ? remote.credentials : fallbackCredentials,
    cmsConnected: Boolean(remote),
  }), [remote])

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>
}

export const usePortfolioContent = () => useContext(ContentContext)
