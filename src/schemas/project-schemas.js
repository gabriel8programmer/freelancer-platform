// services/schemas/projects-schema.js
import { z } from 'zod'

export const ProjectFiltersSchema = z.object({
  search: z.string().optional(),
  category: z.enum([
    'Desenvolvimento Web',
    'Design UI/UX', 
    'Marketing Digital',
    'Redação',
    'Tradução',
    'Consultoria',
    'Outro'
  ]).optional(),
  skills: z.string().optional(),
  page: z.number().int().positive().default(1),
  limit: z.number().int().positive().default(10),
  status: z.enum(['open', 'in_progress', 'completed', 'cancelled']).default('open')
})

export const CreateProjectSchema = z.object({
  title: z.string().min(1, 'Título é obrigatório'),
  description: z.string().min(1, 'Descrição é obrigatória'),
  budget: z.object({
    min: z.number().min(0, 'Orçamento mínimo deve ser um número positivo'),
    max: z.number().min(0, 'Orçamento máximo deve ser um número positivo'),
    currency: z.string().default('BRL')
  }),
  category: z.enum([
    'Desenvolvimento Web',
    'Design UI/UX',
    'Marketing Digital',
    'Redação',
    'Tradução',
    'Consultoria',
    'Outro'
  ]),
  timeline: z.string().min(1, 'Prazo é obrigatório'),
  skills: z.array(z.string()).min(1, 'Pelo menos uma habilidade é obrigatória')
})

export const SubmitProposalSchema = z.object({
  proposal: z.string().min(1, 'Proposta é obrigatória'),
  bid: z.number().min(0, 'Lance deve ser um número positivo'),
  timeline: z.string().min(1, 'Prazo é obrigatório')
})

export const UpdateProjectSchema = z.object({
  title: z.string().min(1, 'Título não pode estar vazio').optional(),
  description: z.string().min(1, 'Descrição não pode estar vazia').optional(),
  budget: z.object({
    min: z.number().min(0, 'Orçamento mínimo deve ser um número positivo'),
    max: z.number().min(0, 'Orçamento máximo deve ser um número positivo'),
    currency: z.string().default('BRL')
  }).optional(),
  category: z.enum([
    'Desenvolvimento Web',
    'Design UI/UX',
    'Marketing Digital',
    'Redação',
    'Tradução',
    'Consultoria',
    'Outro'
  ]).optional(),
  timeline: z.string().min(1, 'Prazo é obrigatório').optional(),
  skills: z.array(z.string()).min(1, 'Pelo menos uma habilidade é obrigatória').optional(),
  status: z.enum(['open', 'in_progress', 'completed', 'cancelled']).optional()
})

export const AssignProjectSchema = z.object({
  freelancerId: z.string().min(1, 'ID do freelancer é obrigatório'),
  proposalId: z.string().min(1, 'ID da proposta é obrigatório')
})

export const ProjectIdSchema = z.string().min(1, 'ID do projeto é obrigatório')