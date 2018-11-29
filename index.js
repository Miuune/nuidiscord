const Discord = require("discord.js");
const Client = new Discord.Client();
const mysql = require("mysql");
const prefix = "+";
const ownerID = "myid";

// bot funcionando

Client.on('ready', ()=>{
    console.log("Funcionando.");
});

//
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "A*s*U*k*A118",
    database: "sadb"
});

con.connect(err => {
    if(err) throw err;
    console.log("Connected to database!");
});

function generateXp() {
    let min = 20;
    let max = 30;

    return Math.floor(Math.random() * (max - min + 1)) + min;
}

Client.on('message', (message)=>{
    // variable
    let msg = message.content.toLowerCase();
    let sender = message.author;

    // return
    if(!message.content.startsWith(prefix)) return;
    if(message.author.bot) return;


    // commands

    if(msg === prefix + "hola"){
        message.channel.send("¡Hola! " + message.author + " soy Nui.");

    }

    if(msg === prefix + "ping"){
        message.channel.send("Pong!");

    }

    if(msg.startsWith(prefix + "help")){
        message.channel.send("¡Revisa mi MD!");
        message.author.send({embed:{
            color: 0x00cc99,
            description: "h e l p m e"
        }});
    }


    if(msg.startsWith(prefix + "evento")){
        let author = message.member;
        let role = message.guild.roles.find('name', "event");
        if(author.roles.has(role.id)){
            message.reply({embed:{
                color: 0x00cc99,
                description: "¡Estas participando!"
            }});
            return;
        }else{
            message.reply({embed:{
                color: 0x00cc99,
                description: "¡No estas participando!"
            }});
            return;
        }

    }

    // level system
    con.query(`SELECT * FROM xp WHERE id ='${message.author.id}'`, (err, rows) => {
        if (err) throw err;
        
        let sql;

        if(rows.length < 1) {
            sql = `INSERT INTO xp (id, xp) VALUES ('${message.author.id}', ${generateXp()})`
        } else {
            let xp = rows[0].xp;
            sql = `UPDATE xp SET xp = ${xp + generateXp()} WHERE id = '${message.author.id}'`;
        }

        con.query(sql);

    })

    //
    xp.find({serverID: message.guild.id}).sort([['xp', 'descending']]).exec(err, res){
        if(err) throw err;

        .setTitle("Event Leaderboard")
        //
    }

    if(msg.startsWith (prefix + "xp")){
        let target = message.mentions.users.first() || message.author;

    con.query(`SELECT * FROM xp WHERE id = '${target.id}'`, (err, rows) => {
        if(err) throw err;

        if(!rows[0]) return message.channel.send("¡0 XP! Vaya, parece que hay alguien perdedor aquí.");

        let xp = rows[0].xp;
        message.channel.send ("Tienes " + (xp) + " xp.");
    })
    }
    


})




// discord login
Client.login("NTE2MDA5NjAyODAyOTA5MTk5.DtvoJw.1zqyE40dqHk_FIlzWWMYoUrChP8");