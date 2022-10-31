class Post {
	text: string;
	type: 'Post';
}

class PostExpense extends Post {
	override type: 'Expense';

	plan: string;
	cost: number;
}

class PostObjective extends Post {
	override type: 'Objective';

	done: boolean;
	more: string;
}

type UserPost = Post | PostExpense | PostObjective;

export default UserPost;
