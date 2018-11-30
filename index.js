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


    if(msg.startsWith(prefix + "check")){
        let author = message.member;
        let role = message.guild.roles.find('name', "Nieve");
            
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

    if(msg.startsWith(prefix + "eventjoin")){
        let author = message.member;
        let role = message.guild.roles.find('name', "Nieve");
        if (author.roles.has(role.id)){
            message.reply({embed:{
                color: 0x00cc99,
                description: "¡Ya estas participando!"
            }});
            return;
        }else{

            try {
                message.member.addRole(role.id)
                message.reply ({embed:{
                    color: 0x0cc99,
                    description: "¡Ahora estas participando en el evento! Para ver tus regalos escribe `+regalos`"
                }})
            } 
            
            catch (e) {
                console.log("Un usuario intento unirse y falló")
            }

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

    if(msg.startsWith (prefix + "regalos")){
        let target = message.mentions.users.first() || message.author;

    con.query(`SELECT * FROM xp WHERE id = '${target.id}'`, (err, rows) => {
        if(err) throw err;

        if(!rows[0]) return message.channel.send({embed:{
            color: 0x0cc99,
            description:"¡0 regalos! Vaya, parece que hay alguien perdedor aquí."}});

        let xp = rows[0].xp;
        message.channel.send ({embed:{
            color: 0x0cc99,
            description: "Tienes " + (xp) + " regalos."}});
    })
    }
    


})




// discord login
client.login(process.env.BOT_TOKEN);
