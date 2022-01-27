import { gql, useQuery } from '@apollo/client'
import ErrorMessage from './ErrorMessage'

export const ALL_MISSIONS_TITLE_QUERY = gql`
  query {
    missions {
      id
      title
    }
  }
`
export const ALL_MISSIONS_QUERY = gql`
  query {
    missions {
      id
      title
      content {
        document
      }
      startDate
      endDate
    }
  }
`

export default function PostList() {
  const { loading, error, data } = useQuery(ALL_MISSIONS_QUERY)

  if (error) return <ErrorMessage message="Error loading posts." />
  if (loading) return <div>Loading</div>

  const { missions } = data

  return (
    <section>
      <ul>
        {missions.map((mission, index) => (
          <li key={mission.id}>
            <div>
              <span>{index + 1}. </span>
              <a href={mission.url}>{mission.title}</a>
            </div>
          </li>
        ))}
      </ul>
      <style jsx>{`
        section {
          padding-bottom: 20px;
        }
        li {
          display: block;
          margin-bottom: 10px;
        }
        div {
          align-items: center;
          display: flex;
        }
        a {
          font-size: 14px;
          margin-right: 10px;
          text-decoration: none;
          padding-bottom: 0;
          border: 0;
        }
        span {
          font-size: 14px;
          margin-right: 5px;
        }
        ul {
          margin: 0;
          padding: 0;
        }
        button:before {
          align-self: center;
          border-style: solid;
          border-width: 6px 4px 0 4px;
          border-color: #ffffff transparent transparent transparent;
          content: '';
          height: 0;
          margin-right: 5px;
          width: 0;
        }
      `}</style>
    </section>
  )
}
