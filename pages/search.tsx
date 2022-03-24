import { Layout } from "../components/layouts"
import { MainSearch } from "../components/search/MainSearch"

export const searchPage = () => {
  return (
    
    <Layout title='Task search' >
    <div className="main-container">
     <MainSearch />
   </div>
</Layout>
    
  )
}
export default searchPage
