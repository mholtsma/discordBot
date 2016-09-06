const Discord = require('discord.js');
var bot = new Discord.Client();
var token = "MjE5MDAyMDUzNDU0NzI1MTIw.CqLZHg.t7_m5Ir3RbJuuzhEb1Vbuy-eE0Q";
bot.loginWithToken(token);

bot.on("ready", function () {
    console.log("Ready to begin! Serving in " + bot.channels.length + " channels");
});

var warnList = {};

bot.on("message", function(message) {
    var msg = message.content.toLowerCase();
    if(!msg.includes("@")){
        if(msg === "ping") {
            bot.reply(message, "pong");
        }
        if(msg.includes("gore")||msg.includes("g o r e")){
            bot.reply(message, "Rule: No Gore");
            warn(message);
        }
        if(msg === "uptime"){
             var time = msToTime(bot.uptime);
             bot.reply(message,"The bot has been live for: " + time);
        }
    }
});

bot.on("voiceJoin", function(voiceJoin, user, voiceChannel) {
    if(bot.servers.get("name", "Nixon was never caught") != null){
        var channel = bot.servers.get("name", "Nixon was never caught").channels.get("name", "general");
    }
    bot.sendTTSMessage(channel,"Badoop welcome to the channel " + user );
    console.log(user.username + " Connected");
    console.log(voiceJoin);
});

bot.on("presence", function(presence, user) {
   if(bot.servers.get("name", "Nixon was never caught") != null){
        var channel = bot.servers.get("name", "Nixon was never caught").channels.get("name", "general");
        bot.sendMessage(channel, user + " is " + user.status);
    }
 

});

function msToTime(uptime){
    var milli = parseInt(uptime%1000);
    var seconds = parseInt((uptime/1000)%60);
    var minutes = parseInt((uptime/60000)%60);
    var hours = parseInt((uptime/(1000*60*60))%24);
    return hours + ":" + minutes + ":" + seconds + ":" + milli;
}

function warn(message){
    if(warnList[message.author] != null){
        var warnNum = warnList[message.author];
        ++warnNum;
        warnList[message.author] = warnNum;
        bot.reply(message, "This is warning " + warnNum);
    } else {
        warnList[message.author] = 1;
        bot.reply(message, "This is your first warning");
    }
}

//bot.loginWithToken("token");
// If you still need to login with email and password, use mybot.login("email", "password");

