const redis from 'redis';

const redisURL = process.env.REDIS_URL;

if(!redisURL){
    console.log("please provide redis url , redis url is missing in env variable");
    process.exit(1);
}

const redisClient=redis.createClient({
    url:redisURL,
    socket:{
        tls:true,
    },
});

// Redis event listeners
redisClient.on("connect", () => console.log("🚀 Redis Connected Successfully!"));
redisClient.on("error", (err) => console.error("❌ Redis Connection Error:", err));
redisClient.on("reconnecting", () => console.log("🔄 Redis Reconnecting..."));



(async()=>{
    try{
        await redisClient.connect();
        console.log("connection estabilished with redis");
    }
    catch(err){
        console.log("got problem when estabilishing connection , ",err);
    }
})();


module.exports = redisClient;






