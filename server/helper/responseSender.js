const sendResponse =(res,statusCode,data ={})=>{
    res.status(statusCode);
    res.json(data);

}
module.exports = sendResponse