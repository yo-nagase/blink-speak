import { Box, Button } from "@mui/material"
import { useGetPokemonByNameQuery } from "../services/pokemon"
import { useGetDemoByNameQuery, useAddNewDemoMutation } from "../services/demo"



export default function Pokemon() {
  // Using a query hook automatically fetches data and returns query values
  const { data, error, isLoading } = useGetDemoByNameQuery('bulbasaur')
  const [addNewPost, { isLoading: secondIsLoading, data: secondData }] = useAddNewDemoMutation()
  const canSave = ["xxx"].every(Boolean) && !secondIsLoading

  const handleClick = async () => {
    if (canSave) {

      await addNewPost({ str: "xxx", id: "xccccc" }).unwrap().catch((error) => console.log("🚨エラー：", error))

    } else {
      console.log("cant save")
    }


  }
  // Individual hooks are also accessible under the generated endpoints:
  // const { data, error, isLoading } = pokemonApi.endpoints.getPokemonByName.useQuery('bulbasaur')
  console.log(data)
  return (
    <>
      <Box sx={{ minHeight: "150px" }}>
        {error ? (
          <>Oh no, there was an error</>
        ) : isLoading ? (
          <>Loading...</>
        ) : data ? (
          <>
            <h3>{data.message}</h3>
          </>
        ) : null}
      </Box>
      <Box sx={{ minHeight: "150px" }}>
        eeee
        <Button onClick={handleClick}  >Post</Button>
        {secondIsLoading ? (
          <>📮Saving...</>
        ) : addNewPost ? (
          <>
            <h3>{JSON.stringify(secondData)}</h3>
          </>
        ) : null}
      </Box>
    </>
  )
}