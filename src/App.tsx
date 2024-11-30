import Navbar from "./components/Navbar"
import Posts from "./components/Posts"

const App = () => {


  return (
    <>
      <div className="space-y-5">
        <Navbar />
        <div className="xl:mx-36 mx-8">
          <Posts />
        </div>
      </div>
    </>
  )
}

export default App
