// page needs to know the following:
// which user iis currently creating the thread?

import { currentUser } from "@clerk/nextjs"
import { fetchUser } from "@/lib/actions/user.actions"
import { redirect } from "next/navigation"
import PostThread from "@/components/shared/forms/PostThread"

async function Page () {
    const user = await currentUser()

    if (!user) return null

    const userInfo = await fetchUser(user.id)   // TODO: define user action fetchUser

    // once user's been fetched...
    if (!userInfo?.onboarded) {
        console.log("User needs to be onboarded first")
        redirect ('/onboarding')
    }
    else {
        console.log ("user is already onboarded")
    }

    return (
        <>
            <h1 className="head-text"> Create Thread </h1> 
            <PostThread userId={userInfo.id}/>
        </>
    )
    
    
}

export default Page