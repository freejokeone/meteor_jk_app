import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
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

