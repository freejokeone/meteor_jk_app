import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
  // Tracker.autorun(function(){
  // 	console.log('Three are'+Posts.find().count()+'posts');
  // })
});

if(Posts.find().count()===0){
	Posts.insert({
		title:"aidadka",
		url:'http://www.cumt.com'
	});
	Posts.insert({
		title:"free",
		url:'http://www.baidu.com/'
	});
	Posts.insert({
		title:"admine",
		url:'http://www.sogo.com'
	});
}

Meteor.publish('posts',function(){
	return Posts.find();
});

// Posts.find().observe({
// 	added:function(post){
// 		//when 'added' callback fires,add HTML element
// 		$('ul').append('<li id="'+post._id+'">+post.title+</li>');
// 	},
// 	//when 'changed' callback fires.modify HTML element's text
// 	changed:function(post){
// 		$('ul li#'+post._id).text(post.title);
// 	},
// 	//when 'removed' callback fires,remoive HTML element
// 	removed:function(post){
// 		$('ul li#'+post._id).remove();
// 	}
// });

