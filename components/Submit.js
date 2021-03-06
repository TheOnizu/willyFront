import { useState } from "react";
import { gql, useMutation, useQuery } from '@apollo/client'
import { ALL_MISSIONS_QUERY } from './PostList'

const CREATE_CANDIDATE_MUTATION = gql`
  mutation createCandidat(
    $name: String,
    $lastName: String,
    $cv: FileFieldInput,
    $availableFrom: DateTime,
    $availableTo: DateTime,
    $postuleTo: MissionRelateToOneForCreateInput
  ) {
    createCandidat(data: {
        name: $name,
        lastName: $lastName,
        cv: $cv,
        availableFrom: $availableFrom,
        availableTo: $availableTo,
        postuleTo: $postuleTo
      }
    ) {
      name
      lastName
    }
  }
`

export default function Submit() {
  const [file, setFile] = useState(null)
  const [createCandidat, { loading }] = useMutation(CREATE_CANDIDATE_MUTATION)
  const { data: { missions } } = useQuery(ALL_MISSIONS_QUERY)

  const handleSubmit = async (event) => {
    event.preventDefault()
    const form = event.target
    const formData = new window.FormData(form)
    const name = formData.get('name')
    const lastName = formData.get('lastName')
    const availableFrom = new Date(formData.get('availableFrom')).toISOString()
    const availableTo = new Date(formData.get('availableTo')).toISOString()
    form.reset()

    createCandidat({
      variables: {
        name,
        lastName,
        availableFrom,
        availableTo,
        cv: {
          upload: file,
        },
        postuleTo: {
          connect: { id: formData.get('mission') }
        }
      }
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Submit</h1>
      <input placeholder="name" name="name" type="text" required />
      <input placeholder="lastName" name="lastName" type="text" required />
      <input placeholder="cv" name="cv" type="file" required onChange={(event) => {
        setFile(event.target.files[0])
      }} />
      <input placeholder="debut de disponibilite" name="availableFrom" type="date" required />
      <input placeholder="fin de disponibilite" name="availableTo" type="date" required />
      <select name="mission" id="cars" onChange={(event) => {
        console.dir(event.target)
      }}>
        {missions.length && missions.map((mission) => (<option key={mission.id} value={mission.id}>{mission.title}</option>))}
      </select>
      <button type="submit" disabled={loading}>
        Submit
      </button>
      <style jsx>{`
        form {
          border-bottom: 1px solid #ececec;
          padding-bottom: 20px;
          margin-bottom: 20px;
        }
        h1 {
          font-size: 20px;
        }
        input {
          display: block;
          margin-bottom: 10px;
        }
      `}</style>
    </form>
  )
}
