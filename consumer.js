const amqp = require('amqplib')

connect_rabbitmq();

async function connect_rabbitmq(){

try {
        const connection= await amqp.connect("amqp://localhost:5672");
        const channel= await connection.createChannel();
        const assertionchannel = await channel.assertQueue("jobsQueue");

        channel.consume("jobsQueue", (message) => {
            console.log("Gelen Mesaj:" , message.content.toString())
            channel.ack(message)
            // reddedilme durumunda nack kullanilabilir
            // bilgilendirme yapildi

        })
  
    } catch (error) {
        console.log("Error", error)
}


}