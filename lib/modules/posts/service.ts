import { IPost } from './model';
import posts from './schema';

export default class PostService {
    
    public async createPost(post_params: IPost): Promise<IPost> {
        try {
            const session = new posts(post_params);
            return await session.save();
        } catch (error) {
            throw error;
        }
    }

    public async filterPost(query: any): Promise<IPost | null> {
        try {
            return await posts.findOne(query);
        } catch (error) {
            throw error;
        }
    }
    public async filterPosts(userId: any): Promise<IPost[] | null> {
        try {
            const query = { author: userId };
            return await posts.find(query);
        } catch (error) {
            throw error;
        }
    }

    public async getAll(): Promise<IPost[] | null> {
        // Find the user document and populate the 'posts' field
        return await posts.find();
}
public async updatePost(post_params: IPost): Promise<void> {
    try {
        const query = { _id: post_params._id };
        await posts.findOneAndUpdate(query, post_params);
    } catch (error) {
        throw error;
    }
}

    public async deletePost(_id: string): Promise<{ deletedCount: number }> {
        try {
            const query = { _id: _id };
            return await posts.deleteOne(query);
        } catch (error) {
            throw error;
        }
    }
}