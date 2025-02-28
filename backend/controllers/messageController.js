const AsyncHandler = require("express-async-handler");

const sendMessage = AsyncHandler(async(req,res)=>{
    const {content,chatId} = req.body;

    if(!content || ! chatId){
     console.log("Invalid data passed in to request");
     return res.sendStatus(400);
    }

    var newMessage = {
      sender:req.user._id,
      content:content,
      chat:chatId,
    };

    try {
      
      var message = await MessageChannel.create(newMessage);

      message=await message.populate("sender","name pic");
      message = await message.populate("chat");
      message = await User.populate(message,{
        path: "chat.users",
        select:"name pic email "
      });

      res.json(message);
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
});



const allMessages = AsyncHandler(async(req,res)=>{
  try {
    const messages = await MessageChannel.find({chat:req.params.chatId}).populate("sender","name pic email").populate("chat");

    res.json(messages);

  } catch (error) {
    res.status(400);
    throw new Error(error.message); 
  }
})


module.exports = {sendMessage,allMessages};