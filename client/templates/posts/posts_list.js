//模拟数据库

// var postsDate=[
// {
// 	title:'Introducing Telescope',
// 	url:'http://www.baidu.com/'
// },
// {
// 	title:'Meteor',
// 	url:"http://www.meteor.com/"
// },
// {
// 	title:'The Meteor Book',
// 	url:'http://themeteorbook.com'
// }];
//helpers posisList methord

Template.postsList.helpers({
	// posts:function(){
	// 	return Posts.find();
	// }
	posts:function(){
		return Posts.find({},{sort:{submitted:-1}});
	}
});

Meteor.startup(function(){
	Tracker.autorun(function(){
		console.log('Three are'+Posts.find().count()+'posts');
	});
});


