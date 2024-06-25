const database = require('../models')

class MateriaController {
    // static async pegaTodasAsMaterias(req, res) {
    //     try {
    //         const todasAsMaterias = await database.Materias.findAll()
    //         return res.status(200).json(todasAsMaterias)
    //     } catch (error) {
    //         return res.status(500).json(error.message)
    //     }
    // }

    // static async pegaUmaMateria(req, res) {
    //     const { id } = req.params
    //     try {
    //         const umaMateria = await database.Materias.findOne({ where: { id: Number(id) } })
    //         return res.status(200).json(umaMateria)
    //     } catch (error) {
    //         return res.status(200).json(error.message)
    //     }
    // }
    // static async criaUmaMateria(req, res) {
    //     const novaMateria = req.body
    //     try {
    //         const novaMateriaCriado = await database.Materias.create(novaMateria)
    //         return res.status(200).json(novaMateriaCriado)
    //     } catch (error) {
    //         return res.status(500).json(error.message)
    //     }
    // }

    // static async atualizaUmaMateria(req, res) {
    //     const novaInfo = req.body
    //     const { id } = req.params
    //     try {
    //         await database.Materias.update(novaInfo, { where: { id: Number(id) } })
    //         const MateriaAtualizado = await database.Materias.findOne({ where: { id: Number(id) } })
    //         return res.status(200).json(MateriaAtualizado)
    //     } catch (error) {
    //         return res.status(500).json(error.message)

    //     }
    // }

    // static async deletaMateria(req, res) {
    //     const { id } = req.params
    //     try {
    //         await database.Materias.destroy({ where: { id: Number(id) } })
    //         return res.status(200).json({ mensagem: `id: ${id} deletado` })
    //     } catch (error) {
    //         return res.status(500).json(error.message)
    //     }
    // }


    // funções para materias, atividades e alternativas juntas dentro um loop

    static async criaMateriaAtividadesAlternativas(req, res) {
        const materiaData = req.body;

        try {
            const novaMateria = await database.Materias.create({
                nome: materiaData.nome,
                youtube_url: materiaData.youtube_url,
                curso_id: materiaData.curso_id,
            });

            for (const aulaData of materiaData.aulas) {
                const novaAula = await database.aulas.create({
                    nome: aulaData.nome,
                    youtubeUrl: aulaData.youtubeUrl,
                    materia_id: novaMateria.id,
                });

                for (const atividadeData of aulaData.atividades) {
                    const novaAtividade = await database.Atividades.create({
                        pergunta: atividadeData.pergunta,
                        aula_id: novaAula.id,
                    });

                    for (const alternativaData of atividadeData.alternativas) {
                        await database.Alternativas.create({
                            texto: alternativaData.texto,
                            atividade_id: novaAtividade.id,
                            alternativaCorreta: alternativaData.alternativaCorreta,
                        });
                    }
                }
            }

            return res.status(201).json({ message: 'Materia, Aulas, Atividades e Alternativas criadas com sucesso!' });
        } catch (error) {
            console.error('Erro ao criar Materia, Aulas, Atividades e Alternativas:', error);
            return res.status(500).json({ error: 'Ocorreu um erro ao criar Materia, Aulas, Atividades e Alternativas.' });
        }
    }


    static async atualizaMateriaComAtividadesEAlternativas(req, res) {
        const materiaData = req.body;
        const materiaId = req.params.id;
      
        try {
          const materia = await database.Materias.findByPk(materiaId);
      
          await materia.update({
            nome: materiaData.nome,
            youtube_url: materiaData.youtube_url,
            curso_id: materiaData.curso_id,
          });
      
          for (const aulaData of materiaData.aulas) {
            const aula = await database.Aulas.findByPk(aulaData.id);
      
            await aula.update({
              nome: aulaData.nome,
              youtubeUrl: aulaData.youtubeUrl,
              materia_id: materia.id,
            });
      
            for (const atividadeData of aulaData.atividades) {
              const atividade = await database.Atividades.findByPk(atividadeData.id);
      
              await atividade.update({
                pergunta: atividadeData.pergunta,
                aula_id: aula.id,
              });
      
              for (const alternativaData of atividadeData.alternativas) {
                const alternativa = await database.Alternativas.findByPk(alternativaData.id);
      
                await alternativa.update({
                  texto: alternativaData.texto,
                  alternativaCorreta: alternativaData.alternativaCorreta,
                });
              }
            }
          }
      
          return res.status(200).json({ mensagem: `Materia ${materiaId} foi editada` });
        } catch (error) {
          console.error('Erro ao editar Materia, Aulas, Atividades e Alternativas:', error);
          return res.status(500).json({ error: 'Ocorreu um erro ao editar Materia, Aulas, Atividades e Alternativas.' });
        }
      }
      


    static async pegaTodasMateriasComAtividadesEAlternativas(req, res) {
        try {
            const todasAsMaterias = await database.Materias.findAll({
                include: [
                    {
                        model: database.aulas,
                        include: [
                            {
                                model: database.Atividades,
                                include: [
                                    {
                                        model: database.Alternativas
                                    }
                                ]
                            }
                        ]
                    }
                ]
            });
            res.status(200).json(todasAsMaterias)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async pegaUmaMateriasComAtividadesEAlternativas(req, res) {
        const materiaId = req.params.id
        try {
            const umaMateria = await database.Materias.findOne({
                where: { id: Number(materiaId) },
                include: [
                    {
                        model: database.aulas,
                        include: [
                            {
                                model: database.Atividades,
                                include: [
                                    {
                                        model: database.Alternativas
                                    }
                                ]
                            }
                        ]
                    }
                ]
            });
            return res.status(200).json(umaMateria)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async deletaMateriasComAtividadesEAlternativas(req, res) {
        const materiaId = req.params.id
        try {
            const materia = await database.Materias.findByPk(materiaId)
            await materia.destroy();
            return res.status(200).json({ mensagem: `materia, id: ${materiaId} foi deletado` })
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }



    //http://localhost:3200/materias/:materiaId/atividades/:atividadeId

    //     static async pegaUmaAtividade(req, res) {
    //         const { materiaId, atividadeId } = req.params
    //         try {
    //             const umaAtividade = await database.Atividades.findOne({
    //                 where: {
    //                     id: Number(atividadeId),
    //                     materia_id: Number(materiaId)
    //                 }
    //             })
    //             return res.status(200).json(umaAtividade)
    //         } catch (error) {
    //             return res.status(500).json(error.message)
    //         }
    //     }
    //     static async criarAtividade(req, res) {
    //         const { materiaId } = req.params
    //         const novaAtividade = { ...req.body, materiaId: Number(materiaId) }
    //         try {
    //             const novaAtividadeCriada = await database.Atividades.create(novaAtividade)
    //             return res.status(200).json(novaAtividadeCriada)

    //         } catch (error) {
    //             return res.status(500).json(error.message)
    //         }
    //     }


    //     static async criandoTudo(req, res) {

    //     }

    //     static async pegaTodasAtividades(req, res) {
    //         const { materiaId } = req.params
    //         try {
    //             const materia = await database.Materias.findOne({ where: { id: Number(materiaId) } })
    //             const atividades = await materia.getAtividades()
    //             return res.status(200).json(atividades)
    //         } catch (error) {
    //             return res.status(500).json(error.message)
    //         }
    //     }

    //     static async pegaTodasAlternativas(req, res) {
    //         const { materiaId, atividadeId } = req.params
    //         try {
    //             const materia = await database.Materias.findOne({ where: { id: Number(materiaId) } })
    //             const atividades = await materia.getAtividades({ where: { id: Number(atividadeId) } })
    //             const alternativas = await materia.atividades.getAtividades()
    //             return res.status(200).json(alternativas)
    //         } catch (error) {
    //             return res.status(500).json(error.message)
    //         }
    //     }
}

module.exports = MateriaController