const Product = require('../models/Product')

const getAllProducts = async (req,res)=>{
    const {featured,company,name,sort,fields,numericFilters} = req.query 
    const queryObject = {}

    if(featured) queryObject.featured =  featured==='true'?true:false;
    if(company) queryObject.company = company 
    if(name) queryObject.name = name 

    if(numericFilters){
        const operatorMap = {
            '>':'$gt',
            '<':'$lt',
            '=':'$eq',
            '<=':'$lte',
            '>=':'$gte',
        }

        const regEx = /\b(<|>|<=|>=|=)\b/g
        let filters = numericFilters.replace(regEx,(match)=>`-${operatorMap[match]}-`)
        const options = ['price','rating']
        filters.split(',').forEach(element => {
            let [field,operator,value] = element.split('-')
            if(options.includes(field)){
                queryObject[field] = {[operator]:Number(value)}
            }
        });
    }

    let result = Product.find(queryObject)

    if(sort){
        const newList = sort.split(',').join(' ')
        result = result.sort(newList)
    }else{
        result = result.sort('createdAt')
    }

    if(fields){
        const fieldList = fields.split(',').join(' ')
        result = result.select(fieldList)
    }

    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page-1)*limit 
    result = result.skip(skip).limit(limit)

    const products = await result;
    res.status(200).json({nHabits:products.length,products})
}

module.exports = {
    getAllProducts
}