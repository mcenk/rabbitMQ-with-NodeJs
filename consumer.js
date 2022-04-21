const amqp = require('amqplib')
const data = require('./data.json');
const qName= process.argv[2] || "jobsQueue";

connect_rabbitmq();

async function connect_rabbitmq(){

try {
        const connection= await amqp.connect("amqp://localhost:5672");
        const channel= await connection.createChannel();
        const assertionchannel = await channel.assertQueue(qName);
        console.log("mesaj bekleniyor")

        
        channel.consume(qName, (message) => {
            
            const idInfo= JSON.parse(message.content.toString());
            const user= data.find(i => i.id == idInfo.description)
            if(user){
                console.log("kayit tamamlandi:", user)
                channel.ack(message)
            }
        })
  
    } catch (error) {
        console.log("Error", error)
}


}