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


//评论集合
Comments=new Mongo.Collection('comments');
//Fixed data
if(Posts.find().count()===0){
	var now=new Date().getTime();
	//create two user
	var tomId=Meteor.users.insert({
		profile:{name:'Tom Coleman'}
	});
	var tom=Meteor.users.findOne(tomId);
	var sachaId=Meteor.users.insert({
		profile:{name:'Admine'}
	});
	var sacha=Meteor.users.findOne(sachaId);
	var telescopeld=Posts.insert({
		title:"Introducing Telescope",
		userId:sacha._id,
		author:sacha.profile.name,
		url:"http://sachagreif.com/introducing-telescope/",
		submitted:new Date(now-7*3600*1000)
	});

	Comments.insert({
		postId:telescopeld,
		userId:tom._id,
		author:tom.profile.name,
		submitted:new Date(now-3*3600*1000),
		body:'Interesting project Sacha,can I get involved?'
	});

	Comments.insert({
		postId:telescopeld,
		userId:sacha._id,
		author:sacha.profile.name,
		submitted:new Date(now-3*3600*1000),
		body:'You sure can Tom!'
	});

	Posts.insert({
		title:"Meteor",
		userId:tom._id,
		author:tom.profile.name,
		url:'http://meteor.com',
		submitted:new Date(now-10*3600*1000)
	});
	Posts.insert({
		title:'The Meteor Book',
		userId:tom._id,
		author:tom.profile.name,
		url:'http://meteor.com',
		submitted:new Date(now-12*3600*1000)
	});
}

Meteor.methods({
	commentInsert: function(commentAttributes) {
		check(this.userId, String);
		check(commentAttributes, {
		postId: String,
		body: String
	});
	var user = Meteor.user();
	var post = Posts.findOne(commentAttributes.postId);
	if (!post)
		throw new Meteor.Error('invalid-comment', 'You must comment on a post');
		comment = _.extend(commentAttributes, {
			userId: user._id,
			author: user.username,
			submitted: new Date()
		});
	return Comments.insert(comment);
	}
});




