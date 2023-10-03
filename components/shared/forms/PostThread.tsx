"use client";

import { useForm } from "react-hook-form"

import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"


import { usePathname, useRouter } from "next/navigation"
// import { updateThread } from "@/lib/actions/user.actions" // TODO: define and use updateThread

import { ThreadValidation } from "@/lib/validations/thread";

interface Props {
  user: {
    id:       string;
    objectId: string;
    username: string;
    name:     string;
    bio:      string;
    image:    string;
  };
  btnTitle: string;
}

function PostThread (
    {userId}: {userId: string}
    ){

        const router = useRouter()
        const pathname = usePathname()
      
        const form = useForm ({
          resolver: zodResolver(ThreadValidation),
          defaultValues: {
            thread: '',
            accountId: userId
          },
        })
        
        const onSubmit = async () => {
            console.log("Thread Submitted")
            await createThread()    // TODO: define createThread() in actions/thread.actions.ts
        }
        
        return (
            <Form {...form}>
                <form
                    className='mt-10 flex flex-col justify-start gap-10'
                    onSubmit={form.handleSubmit(onSubmit)}
                >
                    <FormField
                        control={form.control}
                        name='thread'
                        render={({ field }) => (
                            <FormItem className='flex w-full flex-col gap-3'>
                            <FormLabel className='text-base-semibold text-light-2'>
                                Content
                            </FormLabel>
                            <FormControl className="no-focus border boder-dark-4 bg-dark-3 text-light-1">
                                <Textarea
                                    rows={15}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button 
                        type="submit"
                        className="bg-primary-500"
                    >
                        Post Thread
                    </Button>

                </form>
            </Form>
        )
}

export default PostThread;