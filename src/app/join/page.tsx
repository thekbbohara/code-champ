import { Suspense } from "react"
import JoinArena, { Loading } from "."

const JoinPage = () => {
  return <Suspense fallback={<Loading />}>
    <JoinArena />
  </Suspense>
}
export default JoinPage
