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
		submitted:new Date(now-3*36000*1000),
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
		submitted:new Date(now-10*3600*1000),
	});



}