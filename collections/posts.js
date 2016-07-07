Posts=new Mongo.Collection('posts');

Posts.allow({
	insert:function(userId,doc){
		//只允许登录的用户添加有帖子
		return !!userId;
	}
})

