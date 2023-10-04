

import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

// import ThreadCard from "@/components/cards/ThreadCard";
// import Pagination from "@/components/shared/Pagination";

import { fetchPosts } from "@/lib/actions/thread.actions";
// import { fetchUser } from "@/lib/actions/user.actions";

async function Home (
  {searchParams}: 
  {
    searchParams: { [key: string]: string | undefined }
  }
) {
  const user = await currentUser();
  
  try {
    console.log ("before fetch")
    const result = await fetchPosts (1, 30)
    console.log (`after fetch: ${result?.posts}`)
    
    return (
      <>
        <h1 className='head-text text-left'>Home</h1>
  
        <section className='mt-9 flex flex-col gap-10'>
          {result?.posts.length === 0 ? (
            <p className='no-result'>No threads found</p>
          ) : (
            <>
              {result?.posts.map((post) => {
                return (
                  <p>{post.text}</p>
                )
              })}
            </>
          )}
        </section>
  
        {/* <Pagination
          path='/'
          pageNumber={searchParams?.page ? +searchParams.page : 1}
          isNext={result.isNext}
        /> */}
      </>
    )
  } catch (error: any) {
      console.log (`fetching unsuccessful! ${error}`)
  }
  // console.log (result)

  // if (!user) return null;

  // const userInfo = await fetchUser(user.id);
  // if (!userInfo?.onboarded) redirect("/onboarding");

  // const result = await fetchPosts(
  //   searchParams.page ? +searchParams.page : 1,
  //   30
  // );

}

export default Home;