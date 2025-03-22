const redisClient = require('../config/redisClient');

const CACHE_TTL = 300; 
const RATE_LIMIT_WINDOW = 60; 
const MAX_REQUESTS = 5; 


const setCache=async(key,val)=>{  
try{
    await redisClient.setEx(key,CACHE_TTL,JSON.stringify(value));
}catch(err){
    console.log(`got error while setting cache for ${key} `,err);
}}

const getCache=async(key)=>{
    try{
        const cachedData = await  JSON.parse(redisClient.get(key));
        if(cachedData){
            return cachedData;
        }
        return null;
    }catch(err){
        console.log(`got error while getting cache value for ${key} `,err)
        return null;
    }
}

const cacheMonthlyDownloads = async(req,res,next) => {
 try{
    let total_downloads=await getCache('monthlyDownloads');
    if(total_downloads){
        return res.status(200).json({
            total_downloads: total_downloads
        })
    }
    next();
 }catch(err){
    console.error(err);
 }

}





module.exports ={
    cacheMonthlyDownloads,
    getCache,
}


