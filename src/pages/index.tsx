export default function Home(props) {
  return (
    <div>
      <h2>{JSON.stringify(props.episodes)}</h2>
    </div>
  )
}

export async function getStaticProps(){
  const response = await fetch('http://localHost:3333/episodes')
  const episodes = await response.json()

  return {
    props: {
      episodes,
    },
    revalidate: 900,
  }
}