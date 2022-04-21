const amqp = require('amqplib')
const data = require('./data.json');
const qName= process.argv[2] || "jobsQueue";


const message={
    description: "Sinyal yolluyom aliyon mu?"
}

connect_rabbitmq();

async function connect_rabbitmq(){

try {
        const connection= await amqp.connect("amqp://localhost:5672");
        const channel= await connection.createChannel();
        const assertionchannel = await channel.assertQueue(qName);

        data.forEach(element => {
            message.description= element.id;
            channel.sendToQueue(qName, Buffer.from(JSON.stringify(message)));
            console.log("Gonderilen deger: " , element.id) 
        });
        



        //  setInterval(()=>{
        //     message.description= new Date().getTime();
        //     channel.sendToQueue("jobsQueue", Buffer.from(JSON.stringify(message)))

        //  },1000);
        console.log("Gonderilen Mesaj: " , message)
    } catch (error) {
        console.log("Error", error)
}


}