"use server"

import { revalidatePath } from "next/cache"
import { connectToDB    } from "../mongoose"

import User   from "../models/user.models"
import Thread from "../models/thread.model"

interface Params {
  text: string,
  author: string,
  communityId: string | null,
  path: string,
}

export async function createThread(
    { 
        text, 
        author, 
        communityId,
        path 
    } : Params
) {
  try {
    connectToDB()

    try {
        const createdThread = await Thread.create ({
          text,
          author,
          community: null, // Assign communityId if provided, or leave it null for personal account
        })
        console.log ("thread created successfully")

        try {
            // Update User model
            await User.findByIdAndUpdate(author, {
                $push: { threads: createdThread._id },
            })
            console.log (`user updated successfully`)
        } catch (error: any) {
            console.log (`failed to update user ${error.message}`)
        }
    } catch (error: any) {
        console.log (`failed to create thread ${error.message}`)
    }
    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Failed to create user/thread: ${error.message}`);
  }
}