const database = require('../models')

const AdminService = require('../services/adminService')

const adminService = new AdminService()

class AdminController {

    static async cadastrar(req, res) {
        const {username, password, email} = req.body
        try {
            const usuario = await adminService.cadastrar({username, password, email})
            res.status(201).send(usuario)
        } catch (error) {
            res.status(400).send({message: error.message})
        }
    }

    static async pegaTodosOsAdmins(req, res) {
        try {
          const todosOsAdmins = await database.Admins.findAll()
        //   req.session.todosOsAdmins = todosOsAdmins; // Armazena os admins na sessão
          return res.status(200).json(todosOsAdmins);
        } catch (error) {
          return res.status(500).json(error.message);
        }
      }
      

      static async pegaUmAdmin(req, res) {
        const { id } = req.params;
        try {
          const umAdmin = await database.Admins.findOne({ where: { id: Number(id) } });
          // const todosOsAdmins = req.session.todosOsAdmins; 
          return res.status(200).json({ umAdmin });
        } catch (error) {
          return res.status(500).json(error.message);
        }
      }

      
    static async criaUmAdmin(req,res) {
        const novoAdmin = req.body
        try {
            const novoAdminCriado = await database.Admins.create(novoAdmin)
            return res.status(200).json(novoAdminCriado)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async atualizaUmAdmin (req, res) {
        const novaInfo = req.body
        const { id } = req.params
        try {
            await database.Admins.update(novaInfo, {where: {id: Number(id)}})
            const adminAtualizado = await database.Admins.findOne({where: {id: Number(id)}})
            return res.status(200).json(adminAtualizado)
        } catch (error) {
            return res.status(500).json(error.message)
            
        }
    }

    static async deletaAdmin(req, res) {
        const { id } = req.params
        try {
            await database.Admins.destroy({where: {id: Number(id)}})
            return res.status(200).json({mensagem: `Administrador, id: ${id} foi deletado`})
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    
}

module.exports = AdminController