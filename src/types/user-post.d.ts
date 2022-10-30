interface iPost {
	post: string;
	type: string;
}

class Post implements iPost {
	post: string;
	type: 'Post';
}

class PostExpense extends Post {
	override type: 'Expense';
	value: number;
}

class PostObjective extends Post {
	override type: 'Objective';
}

type UserPost = Post | PostExpense | PostObjective;

export default UserPost;
