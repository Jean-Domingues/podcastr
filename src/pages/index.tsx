import { GetStaticProps } from 'next'
import { format, parseISO } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { api } from '../services/api'

type Episode = {
  id: string;
  title: string;
  members: string;
  publishedAt: string;
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
  const { data } = await api('episodes', {
    params: {
      _limit: 12, 
      _sort: 'published_at',
      _order: 'desc'
    }
  })

  const episodes = data.map( episode => {
    return {
      id: episode.id,
      title: episode.title,
      thumbnail: episode.thumbnail,
      members: episode.members,
      publishedAt: format(parseISO(episode.published_at), 'd MMM yy', {locale: ptBR }),
      duration: Number(episode.file.duration),
      description: episode.description,
      url: episode.file.url
    }
  })


  return {
    props: {
      episodes,
    },
    revalidate: 900,
  }
}