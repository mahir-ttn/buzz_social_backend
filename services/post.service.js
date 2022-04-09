let post = require('../models/post.model');

module.exports.updatePost = async (id, pic_url, caption) => {
  try {
    // let newpost = newpost.  
    await post({
      posted_by: id,
      post_url: pic_url,
      post_caption : caption
    }).save();

    return { status: 200 };
  } catch (error) {
    return { status: 400, message: error.message };

  }
};
module.exports.getPost = async (ids) => {
  try {
    // let newpost = newpost.  
   return await post.find({
    posted_by: {
        $in: ids
      }
    }).populate({
      path: "posted_by"
    });    
  } catch (error) {
    return { status: 400, message: error.message };

  }
};


module.exports.inclike = async (id,user_id) => {
  try {
    const mypost =await post.findById(id)
    mypost.like.includes(user_id)?
    mypost.like.pull(user_id):
    mypost.like.push(user_id)
    await mypost.save();
  
  return {status:200}
  }catch(error) {
    console.log(error);
  }
}

module.exports.dislike = async (id,user_id) => {
  try {
    const mypost =await post.findById(id)
    mypost.dislike.includes(user_id)?
    mypost.dislike.pull(user_id):
    mypost.dislike.push(user_id)
    await mypost.save();
  
  return {status:200}
  }catch(error) {
    console.log(error);
  }
}

module.exports.comment = async (id,message,user_id,picture_url) => {
  try {
    const mypost =await post.findById(id)
    mypost.comment.push({user_id,message,picture_url})
    await mypost.save();


  
  return {status:200}
  }catch(error) {
    console.log(error);
  }
}
module.exports.report = async (id,user_id) => {
  try {
    // console.log(id);
    // console.log(user_id);
    const mypost =await post.findById(id)
    mypost.report.push(user_id)
    await mypost.save();

  
  return {status:200}
  }catch(error) {
    console.log(error);
  }
}
