import express from 'express'
import cors from 'cors'
import { prisma } from './lib/prisma.ts'

const app = express()
app.use(cors())
app.use(express.json())

const PORT = 3000

app.get('/treinos', async (req, res) => {
  try {
    const getTreinos = await prisma.treino.findMany({
      include: {
        exercicios: {
          include: {
            exercicio: true
          }
        }
      }
    })

    res.status(200).json(getTreinos)
  } catch (error) {
    res.status(400).json("Erro ao buscar treinos")
  }
})

app.get('/exercicios', async (req, res) => {
  try {
    const getExercicios = await prisma.exercicio.findMany()

    res.status(200).json(getExercicios)
  } catch (error) {
    res.status(400).json("Erro ao buscar exercícios")
  }
})

app.get('/treinos/:id/exercicios', async (req, res) => {
  const { id } = req.params

  try {
    const getExerciciosETreino = await prisma.treinoExercicio.findMany({
      where: {
        treinoId: Number(id)
      },
      include: {
        exercicio: true
      }
    })

    res.status(200).json(getExerciciosETreino)
  } catch (error) {
    res.status(400).json("Erro ao buscar exercícios do treino")
  }
})

app.post('/treinos', async (req, res) => {
  const { nome, objetivo } = req.body

  try {
    const postTreino = await prisma.treino.create({
      data: {
        nome,
        objetivo
      }
    })

    res.status(201).json(postTreino)
  } catch (error) {
    res.status(400).json("Erro ao criar treino")
  }
})

app.post('/treinos/vincular', async (req, res) => {
  const { treinoId, exercicioId } = req.body

  try {
    const vincularExercicio = await prisma.treinoExercicio.create({
      data: {
        treinoId,
        exercicioId
      }
    })

    res.status(201).json(vincularExercicio)
  } catch (error) {
    res.status(400).json("Erro ao vincular exercício ao treino")
  }
})

app.post('/exercicios', async (req, res) => {
  const { nome, grupoMuscular } = req.body

  try {
    const postExercicio = await prisma.exercicio.create({
      data: {
        nome,
        grupoMuscular
      }
    })

    res.status(201).json(postExercicio)
  } catch (error) {
    res.status(400).json("Erro ao criar exercício")
  }
})

app.put('/treinos/:id', async (req, res) => {
  const { id } = req.params
  const { nome, objetivo } = req.body

  try {
    const updateTreino = await prisma.treino.update({
      where: {
        id: Number(id)
      },
      data: {
        nome,
        objetivo
      }
    })

    res.status(200).json(updateTreino)
  } catch (error) {
    res.status(400).json("Erro ao atualizar treino")
  }
})

app.delete('/treinos/:id/exercicios/:exercicioId', async (req, res) => {
  const { id, exercicioId } = req.params

  try {
    const deleteVinculo = await prisma.treinoExercicio.delete({
      where: {
        treinoId_exercicioId: {
          treinoId: Number(id),
          exercicioId: Number(exercicioId)
        }
      }
    })

    res.status(200).json(deleteVinculo)
  } catch (error) {
    res.status(400).json("Erro ao deletar vínculo entre treino e exercício")
  }
})

app.delete('/treinos/:id', async (req, res) => {
  const { id } = req.params

  try {
    const deleteTreino = await prisma.treino.delete({
      where: {
        id: Number(id)
      }
    })

    res.status(200).json(deleteTreino)
  } catch (error) {
    res.status(400).json("Erro ao deletar treino")
  }
})

app.listen(PORT, () => {
  console.log(`Server rodando na porta: ${PORT}`)
})