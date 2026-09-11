import { useEffect, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'

const monthFormatter = new Intl.DateTimeFormat('en', { month: 'short' })

function monthLabels(days) {
  const labels = []
  let previous = ''
  days.forEach((day, index) => {
    if (index % 7) return
    const label = monthFormatter.format(new Date(`${day.date}T00:00:00Z`))
    labels.push(label === previous ? '' : label)
    previous = label
  })
  return labels
}

function ActivityCard({ title, tone, activity, pending }) {
  const days = activity?.days || []
  return <section className={`activity-card activity-${tone}`}>
    <header><span><i />{title}</span>{activity && <a href={activity.url} target="_blank" rel="noreferrer">{activity.username}<ArrowUpRight size={13} /></a>}</header>
    <div className="activity-body">
      {pending && <p className="activity-status">Loading activity…</p>}
      {!pending && !activity && <p className="activity-status">Activity is temporarily unavailable.</p>}
      {!pending && activity && <>
        <div className="activity-summary">{tone === 'github' ? <span>Public contribution history</span> : <span>{activity.totalSolved} problems solved · {activity.activeDays} active days</span>}</div>
        <div className="activity-scroll" role="img" aria-label={`${title} calendar for ${activity.username}`}>
          <div className="activity-months">{monthLabels(days).map((month, index) => <span key={`${month}-${index}`}>{month}</span>)}</div>
          <div className="activity-chart"><div className="activity-weekdays"><span>Mon</span><span>Wed</span><span>Fri</span></div><div className="activity-grid">{days.map(day => <i key={day.date} data-level={day.level} title={`${day.date}${day.count === undefined ? '' : `: ${day.count} submissions`}`} />)}</div></div>
        </div>
        <div className="activity-legend"><span>Less</span>{[0,1,2,3,4].map(level => <i key={level} data-level={level} />)}<span>More</span></div>
      </>}
    </div>
  </section>
}

export default function ActivityCalendars() {
  const [data, setData] = useState(null)
  const [pending, setPending] = useState(true)
  useEffect(() => {
    const controller = new AbortController()
    fetch('/api/activity', { signal: controller.signal })
      .then(response => response.ok ? response.json() : Promise.reject(new Error('Activity unavailable')))
      .then(setData)
      .catch(error => { if (error.name !== 'AbortError') setData({}) })
      .finally(() => setPending(false))
    return () => controller.abort()
  }, [])
  return <div className="activity-section"><ActivityCard title="GitHub Contributions" tone="github" activity={data?.github} pending={pending} /><ActivityCard title="LeetCode Activity" tone="leetcode" activity={data?.leetcode} pending={pending} /></div>
}
