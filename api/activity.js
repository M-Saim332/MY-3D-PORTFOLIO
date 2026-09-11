const GITHUB_USER = 'M-Saim332'
const LEETCODE_USER = 'de2Q2p1HeQ'

const sendJson = (response, status, body) => {
  response.status(status)
  response.setHeader('Content-Type', 'application/json; charset=utf-8')
  response.setHeader('Cache-Control', 's-maxage=1800, stale-while-revalidate=86400')
  response.end(JSON.stringify(body))
}

function contributionRange(calendar = {}) {
  const today = new Date()
  today.setUTCHours(0, 0, 0, 0)
  const start = new Date(today)
  start.setUTCDate(start.getUTCDate() - 364 - start.getUTCDay())
  const days = []
  for (const cursor = new Date(start); cursor <= today; cursor.setUTCDate(cursor.getUTCDate() + 1)) {
    const date = cursor.toISOString().slice(0, 10)
    const count = Number(calendar[Math.floor(cursor.getTime() / 1000)] || 0)
    days.push({ date, count, level: count ? Math.min(4, Math.ceil(Math.log2(count + 1))) : 0 })
  }
  return days
}

async function githubActivity() {
  const response = await fetch(`https://github.com/users/${GITHUB_USER}/contributions`, { headers: { Accept: 'text/html', 'User-Agent': 'msaim-portfolio' } })
  if (!response.ok) throw new Error(`GitHub returned ${response.status}`)
  const html = await response.text()
  const days = [...html.matchAll(/<td[^>]*data-date="([^"]+)"[^>]*data-level="(\d)"[^>]*>/g)]
    .map(([, date, level]) => ({ date, level: Number(level) }))
    .sort((a, b) => a.date.localeCompare(b.date))
  if (!days.length) throw new Error('GitHub calendar was empty')
  return { username: GITHUB_USER, url: `https://github.com/${GITHUB_USER}`, days }
}

async function leetcodeActivity() {
  const query = `query userCalendar($username: String!) {
    matchedUser(username: $username) {
      userCalendar { totalActiveDays submissionCalendar }
      submitStatsGlobal { acSubmissionNum { difficulty count } }
    }
  }`
  const response = await fetch('https://leetcode.com/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Referer: 'https://leetcode.com/', 'User-Agent': 'msaim-portfolio' },
    body: JSON.stringify({ query, variables: { username: LEETCODE_USER } }),
  })
  if (!response.ok) throw new Error(`LeetCode returned ${response.status}`)
  const payload = await response.json()
  const user = payload?.data?.matchedUser
  if (!user) throw new Error('LeetCode user was not found')
  const calendar = JSON.parse(user.userCalendar?.submissionCalendar || '{}')
  const totalSolved = user.submitStatsGlobal?.acSubmissionNum?.find(item => item.difficulty === 'All')?.count || 0
  return { username: LEETCODE_USER, url: `https://leetcode.com/u/${LEETCODE_USER}/`, totalSolved, activeDays: user.userCalendar?.totalActiveDays || 0, days: contributionRange(calendar) }
}

export default async function handler(request, response) {
  if (request.method !== 'GET') return sendJson(response, 405, { error: 'Method not allowed' })
  const [github, leetcode] = await Promise.allSettled([githubActivity(), leetcodeActivity()])
  const body = { github: github.status === 'fulfilled' ? github.value : null, leetcode: leetcode.status === 'fulfilled' ? leetcode.value : null }
  if (!body.github && !body.leetcode) return sendJson(response, 502, { ...body, error: 'Activity services unavailable' })
  return sendJson(response, 200, body)
}
