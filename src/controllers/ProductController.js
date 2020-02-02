//retorna dados do BD

const mongoose = require('mongoose');

const Product = mongoose.model('Product');

module.exports = {
    //Listagem
    async index(req, res){
        const { page = 1 } = req.query;
        const product = await Product.paginate( {}, { page, limit: 10 });
        
        return res.json(product)
    
    },
    
    //Detalhe
    async show(req, res){
        const product = await Product.findById(req.params.id);

        return res.json(product);
    },

    //criação
    async store(req, res){
        const product = await Product.create(req.body);

        return res.json(product)
    }, 

    //atualizar
    async update(req, res){
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, 
            { new: true }); //permite retornar o dado atualizado
        
        return res.json(product);
    },

    //remover
    async destroy(req, res){
        await Product.findByIdAndRemove(req.params.id);

        res.send();
    }

}