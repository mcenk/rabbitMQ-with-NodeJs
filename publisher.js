const amqp = require('amqplib')

const message={
    description: "Sinyal yolluyom aliyon mu?"
}

connect_rabbitmq();

async function connect_rabbitmq(){

try {
        const connection= await amqp.connect("amqp://localhost:5672");
        const channel= await connection.createChannel();
        const assertionchannel = await channel.assertQueue("jobsQueue");
        channel.sendToQueue("jobsQueue", Buffer.from(JSON.stringify(message)))
        console.log("Gonderilen Mesaj: " , message)
    } catch (error) {
        console.log("Error", error)
}


}