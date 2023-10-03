"use server";

import { FilterQuery, SortOrder } from "mongoose";
import { revalidatePath } from "next/cache";

// import Community from "../models/community.model";
// import Thread from "../models/thread.model";
import User from "../models/user.models";

import { connectToDB } from "../mongoose";

interface Params {
  userId:   string
  username: string
  name:     string
  bio:      string
  image:    string
  path:     string
}

export async function updateUser ({
  userId,
  bio,
  name,
  path,
  username,
  image,
}: Params): Promise<void> {
    try {
        try {
            console.log("Before connecting to the database");
            connectToDB();
            console.log("After connecting to the database");
        
            // The rest of your code for fetching the user
          } catch (error: any) {
            throw new Error(`Failed to connect to db: ${error.message}`);
          }
    
        await User.findOneAndUpdate(
          { id: userId },
          {
            username: username.toLowerCase(),
            name,
            bio,
            image,
            onboarded: true,
          },
          { upsert: true }
        );
    
        if (path === "/profile/edit") {
          revalidatePath(path);
        }
      } catch (error: any) {
        throw new Error(`Failed to create/update user: ${error.message}`);
      } 
}

export async function fetchUser (userId: string) {
  try {
    connectToDB()

    return await 
      User.findOne({ id: userId })
      // .populate(
      //   {  
      //     path: 'communities',
      //     model: Community
      //   }
      // )
    
  } catch (error) {
      console.log ("failed to fetch user", {error}) 
  }
}