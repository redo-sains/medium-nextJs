import { url } from 'inspector'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Header from '../components/Header'
import { sanityClient, urlFor } from "../sanity"
import { Post } from '../typing'

interface Props {
  posts: [Post];
}

const Home: NextPage<Props> = ({ posts }: Props) => {

  return (
    <div className="max-w-7xl mx-auto">
      <Head>
        <title>Medium 2.0</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <div className="flex justify-between items-center bg-yellow-400 border-y border-black py-10 lg:py-0">

        <div className="px-10 space-y-5">
          <h1 className="text-6xl max-w-xl font-serif">
            <span className="underline decoration-black decoration-4">Medium</span>{" "}
            is a place to write, read, and connect
          </h1>
          <h2>
            It's easy and free to post your thinking on any topic and connect with millions of readers.
          </h2>
        </div>

        <img className="hidden md:inline-flex h-32 lg:h-full" src="https://accountabilitylab.org/wp-content/uploads/2020/03/Medium-logo.png" alt="" />

      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 p-2 md:p-6">
        {posts.map(data =>
          <Link key={data._id} href={`/post/${data.slug.current}`}>
            <div className="group border rounded-lg cursor-pointer overflow-hidden">
              <img className="h-60 w-full object-cover group-hover:scale-105 transition-transform duration-200 ease-in-out" src={urlFor(data.mainImage).url()!} alt="" />
              <div className="flex justify-between p-5 bg-white">
                <div>
                  <p className="text-lg font-bold">{data.title}</p>
                  <p className="text-xs " >{data.description} by {data.author.name}</p>
                </div>
                <img className="h-12 w-12 rounded-full" src={urlFor(data.author.image).url()!} alt="" />
              </div>
            </div>
          </Link>)}
      </div>
    </div>
  )
}

export async function getServerSideProps() {
  const query = `*[_type == "post"]{
    _id,
    title,
    slug,
    author ->{
    name,
    image
  },
  description,
  mainImage,
  slug
  }`;

  const posts = await sanityClient.fetch(query)

  return {
    props: {
      posts,
    }
  }
}

export default Home
