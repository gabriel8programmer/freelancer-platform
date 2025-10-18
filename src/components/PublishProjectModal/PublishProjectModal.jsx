// components/PublishProjectModal/PublishProjectModal.jsx
import React, { useState } from 'react'
import Modal from '../Modal/Modal'
import Button from '../Button/Button'
import styles from './PublishProjectModal.module.css'

const PublishProjectModal = ({ isOpen, onClose, onSubmit }) => {
	const [formData, setFormData] = useState({
		title: '',
		description: '',
		budget: '',
		skills: '',
		timeline: '',
		category: '',
	})

	const [loading, setLoading] = useState(false)

	const categories = [
		'Desenvolvimento Web',
		'Design UI/UX',
		'Marketing Digital',
		'Redação',
		'Tradução',
		'Consultoria',
		'Outro',
	]

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		})
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		setLoading(true)

		try {
			await onSubmit(formData)
			// Reset do formulário após sucesso
			setFormData({
				title: '',
				description: '',
				budget: '',
				skills: '',
				timeline: '',
				category: '',
			})
			onClose()
		} catch (error) {
			console.error('Erro ao publicar projeto:', error)
		} finally {
			setLoading(false)
		}
	}

	const handleClose = () => {
		// Reset form on close
		setFormData({
			title: '',
			description: '',
			budget: '',
			skills: '',
			timeline: '',
			category: '',
		})
		onClose()
	}

	return (
		<Modal isOpen={isOpen} onClose={handleClose} title='Publicar Novo Projeto' size='large'>
			<div className={styles.publishProjectModal}>
				<div className={styles.modalDescription}>
					<p>Descreva seu projeto para encontrar o freelancer perfeito</p>
				</div>

				<form className={styles.projectForm} onSubmit={handleSubmit}>
					<div className={styles.formSection}>
						<h3 className={styles.sectionTitle}>
							<i className='fas fa-info-circle'></i>
							Informações Básicas
						</h3>

						<div className={styles.formGroup}>
							<label htmlFor='title' className={styles.label}>
								Título do Projeto *
							</label>
							<input
								type='text'
								id='title'
								name='title'
								value={formData.title}
								onChange={handleChange}
								placeholder='Ex: Desenvolvimento de Site E-commerce'
								required
								className={styles.input}
							/>
						</div>

						<div className={styles.formGroup}>
							<label htmlFor='category' className={styles.label}>
								Categoria *
							</label>
							<select
								id='category'
								name='category'
								value={formData.category}
								onChange={handleChange}
								required
								className={styles.select}
							>
								<option value=''>Selecione uma categoria</option>
								{categories.map((cat) => (
									<option key={cat} value={cat}>
										{cat}
									</option>
								))}
							</select>
						</div>

						<div className={styles.formGroup}>
							<label htmlFor='description' className={styles.label}>
								Descrição Detalhada *
							</label>
							<textarea
								id='description'
								name='description'
								value={formData.description}
								onChange={handleChange}
								placeholder='Descreva seu projeto em detalhes: objetivos, requisitos, expectativas...'
								rows='6'
								required
								className={styles.textarea}
							></textarea>
						</div>
					</div>

					<div className={styles.formSection}>
						<h3 className={styles.sectionTitle}>
							<i className='fas fa-cogs'></i>
							Detalhes do Projeto
						</h3>

						<div className={styles.formRow}>
							<div className={styles.formGroup}>
								<label htmlFor='budget' className={styles.label}>
									Orçamento (R$) *
								</label>
								<input
									type='text'
									id='budget'
									name='budget'
									value={formData.budget}
									onChange={handleChange}
									placeholder='Ex: R$ 2.000 - R$ 3.500'
									required
									className={styles.input}
								/>
							</div>

							<div className={styles.formGroup}>
								<label htmlFor='timeline' className={styles.label}>
									Prazo Estimado *
								</label>
								<input
									type='text'
									id='timeline'
									name='timeline'
									value={formData.timeline}
									onChange={handleChange}
									placeholder='Ex: 2-3 semanas'
									required
									className={styles.input}
								/>
							</div>
						</div>

						<div className={styles.formGroup}>
							<label htmlFor='skills' className={styles.label}>
								Habilidades Necessárias *
							</label>
							<input
								type='text'
								id='skills'
								name='skills'
								value={formData.skills}
								onChange={handleChange}
								placeholder='Ex: React, JavaScript, CSS, Design Responsivo'
								required
								className={styles.input}
							/>
							<span className={styles.helperText}>Separe as habilidades por vírgula</span>
						</div>
					</div>

					<div className={styles.formActions}>
						<Button type='button' variant='outline' onClick={handleClose} disabled={loading}>
							<i className='fas fa-times'></i>
							Cancelar
						</Button>
						<Button
							type='submit'
							variant='primary'
							loading={loading}
							disabled={!formData.title || !formData.description || !formData.category}
						>
							<i className='fas fa-paper-plane'></i>
							Publicar Projeto
						</Button>
					</div>
				</form>
			</div>
		</Modal>
	)
}

export default PublishProjectModal
