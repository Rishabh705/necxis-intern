'use server'

import { signIn, signOut } from "./auth";
import connect from "./db";
import User from "@/Models/Users";
import Post from "@/Models/Posts";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import bcrypt from 'bcryptjs'
import { AuthError } from 'next-auth';
import { redirect } from 'next/navigation'
import { auth } from "./auth";
import { revalidatePath } from "next/cache";
import cloudinary from "./cloudinary";

export async function loginWithCredentials(prevState, formData) {
    try {
        await signIn('credentials', formData)
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid credentials.';
                default:
                    return 'Something went wrong.';
            }
        }
        throw error;
    }
}

export async function registerWithCredentials(prevState, formData) {
    const email = formData.get('email')
    const password = formData.get('password1')

    try {
        //find if user exists
        await connect()
        const user = await User.findOne({ email: email })

        //if user exists, return error
        if (user) {
            return "Email already exists"
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        
        //if user does not exist, create user
        const newUser = new User({ email: email, password: hashedPassword })
        
        //save user
        await newUser.save()
        console.log(newUser)


    } catch (err) {
        console.log(err.message)
        return err.message
    }
    redirect('/login')
}
  
export async function logout() {
    await signOut();
}

//for feeds as they are public
export async function getPosts() {
    try {
        await connect()

        const posts = await Post.find()

        revalidatePath('/')

        return {
            success: true,
            msg: "Posts fetched successfully!",
            posts: posts,
            quantity: posts.length
        }

    } catch (err) {
        return {
            success: false,
            msg: "Something went wrong!"
        }
    }
}

export async function post(prevState, formData) {
    try {
        await connect()

        const { user } = await auth()

        const newPostData = {
            caption: formData.get('caption'),
            author: user.email
        };
        const image = formData.get('image');

        if (image.name !== 'undefined') {
            const arrayBuffer = await image.arrayBuffer();
            const buffer = new Uint8Array(arrayBuffer);
            const uploadResult = (await new Promise((resolve, reject) => {
                cloudinary.uploader
                    .upload_stream({}, function (err, result) {
                        if (err) {
                            reject(err); 
                            return;
                        }
                        resolve(result);
                    })
                    .end(buffer);
            }));
            newPostData.image = uploadResult.secure_url;
        }

        const newPost = new Post(newPostData);

        await newPost.save()
        revalidatePath('/')

        return {
            success: true,
            msg: "Post created successfully!"
        }

    } catch (err) {
        console.log(err.message);
        return {
            success: false,
            msg: "Something went wrong!"
        }
    }
}

export const like = async (postId) => {
    try {
        await connect()

        const post = await Post.findById(postId);

        // Check if the post exists
        if (!post) {
            return {
                success: false,
                msg: "Post not found!"
            };
        }

        // Increment likes by 1 in the post
        post.likes += 1;
        await post.save();

        // Find the user by email and update the favoritePosts array
        const { user } = await auth()

        const loggedUser = await User.findOneAndUpdate({ email: user.email }, { $push: { favoritePosts: postId } }, { new: true });

        if (!loggedUser) {
            return {
                success: false,
                msg: "User not found!"
            };
        }

        return {
            success: true,
            msg: "Post liked successfully!"
        };
    } catch (err) {
        console.error(err.message);
        return {
            success: false,
            msg: "Something went wrong!"
        };
    }
};


export const unlike = async (postId) => {
    try {
        await connect()

        const post = await Post.findById(postId)

        //decrement likes by 1 in public feed
        post.likes -= 1

        await post.save()

        const { user } = await auth()

        await User.findOneAndUpdate({ email: user.email }, { $pull: { favoritePosts: postId } });

        return {
            success: true,
            msg: "Post unliked successfully!"
        }
    } catch (err) {
        console.log(err.message);
        return {
            success: false,
            msg: "Something went wrong!"
        }
    }
}

export const getLikedPosts = async () => {
    try {
        await connect()

        const { user } = await auth();

        const loggedUser = await User.findOne({ email: user.email });

        return {
            success: true,
            msg: "Results fetched successfully!",
            likedPosts: loggedUser.favoritePosts
        }
    } catch (err) {
        console.log(err.message);
        return {
            success: false,
            msg: "Something went wrong!",
            likedPosts: []
        }
    }
}

export const postComment = async (postId, formData) => {
    try {
        await connect();

        const { user } = await auth();

        // Find the user by email and update the comments array
        await User.findOneAndUpdate(
            { email: user.email },
            { $push: { comments: { post: postId, comment: formData.get('comment') } } },
            { new: true }
        );


        // Add the comment to the post
        await Post.findByIdAndUpdate(
            postId,
            { $push: { comments: { author: user.email, comment: formData.get('comment') } } },
            { new: true }
        );
        revalidatePath('/')

        return {
            success: true,
            msg: "Comment posted successfully!"
        };
    }
    catch (err) {
        console.error('Error posting comment:', err);
        return {
            success: false,
            msg: "Something went wrong!"
        };
    }
}

export const getCommentOnPost = async (postId) => {
    try {
        await connect();

        // Add the comment to the post
        console.log(postId);
        const post = await Post.findById(postId);
        return {
            success: true,
            msg: "Comments fetched successfully!",
            comments: post.comments
        };
    }
    catch (err) {
        console.error('Error fetching comment:', err);
        return {
            success: false,
            msg: "Something went wrong!",
            comments: []
        };
    }
}
