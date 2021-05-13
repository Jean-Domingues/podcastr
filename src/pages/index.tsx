import { GetStaticProps } from 'next'
import { api } from '../services/api'

type Episode = {
  id: string;
  title: string;
  members: string;
}


type HomeProps = {
  episodes: [Episode];
}


export default function Home(props: HomeProps) {
  return (
    <div>
      <h2>{props.episodes.map(episode => <h2>{episode.title}</h2>)}</h2>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const { data: episodes } = await api('episodes', {
    params: {
      _limit: 12, 
      _sort: 'published_at',
      _order: 'desc'
    }
  })


  return {
    props: {
      episodes,
    },
    revalidate: 900,
  }
}