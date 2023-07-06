var  faceHelper = function(skip,limit){
    return{
        $facet:{
            list:[
                {
                    $skip: Number(skip) < 0 ? 0 : Number(skip)|| 0,

                },
                {
                    $limit : Number(limit) < 0 ? 10 : Number(limit) || 60

                },

            ],
            totalRecords:[
                {
                    $count:'count',
                },
            ],
        },
    }
}
var faceHelper1 = function(skip,limit){
    return{
        $facet:{
            list:[
            

            ],
            totalRecords:[
                {
                    $count:'count',
                },
            ],
        },
    }
}
var searchHelper = function (searchFiled, fields){
    let orArr =[];
    fields.forEach((element)=>{
        orArr.push({[element]:{$regex:new RegExp(searchFiled,'i')}})
    })
    return {$match:{$or:orArr}}
}
var sortHelper =function(columnName,orderBy){
    return{
        $sort:{ [columnName ?columnName :'_id']: orderBy === 'asc'?1:-1}
    }
}
module.exports ={
sortHelper,
searchHelper,
faceHelper,
faceHelper1,

}