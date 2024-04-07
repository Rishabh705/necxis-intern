import Cards from "@/components/Cards";
import Create from "@/components/Create";
import SearchBox from "@/components/SearchBox";
import { getPosts } from "@/lib/actions";
import { getLikedPosts } from "@/lib/actions";
import { auth } from "@/lib/auth";


export default async function Home() {

  const res = getPosts()
  const getSession = auth()
  const [results, session] = await Promise.all([res, getSession]) //parallel fetching

  const data = session?.user ? (await getLikedPosts()) : {likedPosts: []}
  
  return (
    <main className="md:m-2 py-4 px-3 md:px-6 flex-1 flex-col bg-slate-200 rounded-3xl">
      <div className="flex justify-between">
        <SearchBox />

        {session?.user && <Create />}

      </div>
      <section>
        <div className="max-w-6xl m-auto pt-10 px-3">
          <h2 className='text-2xl font-medium dark:text-black'>Feed</h2>
          <div className="mt-4 gap-3 columns-1 sm:columns-2 lg:columns-4 rounded-lg h-full">
            {
              results.quantity > 0 ?
                results.posts.map((post) => {

                  const isFav = data?.likedPosts.includes(post._id.toString())

                  return (
                    <Cards
                      key={post._id}
                      id={post._id.toString()}
                      isFav={isFav}
                      post={post}
                      user={session?.user}
                    />
                  )
                })
                :
                <h2>No Feeds right now</h2>
            }
          </div>
        </div>
      </section>
    </main>
  );
}
