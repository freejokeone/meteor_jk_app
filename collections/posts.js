Posts=new Mongo.Collection('posts');

// Posts.allow({
// 	insert:function(userId,doc){
// 		//只允许登录的用户添加有帖子
// 		return !!userId;
// 	}
// })

//安全检查
Meteor.methods({
	postInster:function(postAttributes){
		check(Meteor.userId(),String);
		check(postAttributes,{
			title:String,
			url:String
		});
		var errors = validatePost(postAttributes);
		if (errors.title || errors.url)
			throw new Meteor.Error('invalid-post', "你必须为你的帖子填写标题和 URL");
		var postWithSameLink = Posts.findOne({url: postAttributes.url});
		if (postWithSameLink) {
			return {
			postExists: true,
			_id: postWithSameLink._id
			}
		}
		var user = Meteor.user();
		var post = _.extend(postAttributes, {
				userId: user._id,
				author: user.username,
				submitted: new Date()
			});
		var postId = Posts.insert(post);
			return {
				_id: postId
			};
	}
});
//allow client user to edit
Posts.allow({
	update:function(userId,post){
		return ownerDocument(userId,post);
	},
	remove:function(userId,post){
		return ownerDocument(userId,post)
	}
});

//limit client user to edie some content
Posts.deny({
	update:function(userId,post,fieldNames,modifier){
		//only edit those section
		var errors=validatePost(modifier.$set);
		// return errors.title||errors.url;
		// return (_.without(fieldNames,'url','title').length>0);
	}
})

validatePost=function(post){
	var errors={};
	if(!post.title){
		errors.title="请填写标题";
	}
	if(!post.url){
		error.url="请填写URL";
	}
	return errors;
}




