// components/ProposalModal/ProposalModal.jsx
import React, { useState } from 'react';
import Modal from '../Modal/Modal';
import Button from '../Button/Button';
import styles from './ProposalModal.module.css';

const ProposalModal = ({ 
  isOpen, 
  onClose, 
  project,
  onSubmit 
}) => {
  const [formData, setFormData] = useState({
    coverLetter: '',
    proposedAmount: '',
    timeline: '',
    attachments: []
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await onSubmit({
        ...formData,
        projectId: project.id,
        proposedAmount: formData.proposedAmount ? parseFloat(formData.proposedAmount) : null
      });
      onClose();
    } catch (error) {
      console.error('Erro ao enviar proposta:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData(prev => ({
      ...prev,
      attachments: [...prev.attachments, ...files]
    }));
  };

  const removeAttachment = (index) => {
    setFormData(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index)
    }));
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Enviar Proposta"
      size="medium"
    >
      <div className={styles.proposalModal}>
        <div className={styles.projectInfo}>
          <h3 className={styles.projectTitle}>{project?.title}</h3>
          <p className={styles.projectClient}>
            Cliente: {typeof project?.client === 'object' ? project.client.name : project?.client}
          </p>
          {project?.budget && (
            <p className={styles.projectBudget}>
              Orçamento: R$ {project.budget.min?.toLocaleString()} - R$ {project.budget.max?.toLocaleString()}
            </p>
          )}
        </div>

        <form onSubmit={handleSubmit} className={styles.proposalForm}>
          {/* Carta de Apresentação */}
          <div className={styles.formGroup}>
            <label htmlFor="coverLetter" className={styles.label}>
              Carta de Apresentação *
            </label>
            <textarea
              id="coverLetter"
              value={formData.coverLetter}
              onChange={(e) => handleInputChange('coverLetter', e.target.value)}
              placeholder="Explique por que você é a pessoa ideal para este projeto, suas experiências relevantes e como você pode ajudar o cliente..."
              rows={6}
              required
              className={styles.textarea}
            />
            <span className={styles.helperText}>
              Mínimo de 200 caracteres
            </span>
          </div>

          {/* Valor Proposto */}
          <div className={styles.formGroup}>
            <label htmlFor="proposedAmount" className={styles.label}>
              Valor Proposto (R$)
            </label>
            <input
              type="number"
              id="proposedAmount"
              value={formData.proposedAmount}
              onChange={(e) => handleInputChange('proposedAmount', e.target.value)}
              placeholder="Ex: 1500.00"
              min="0"
              step="0.01"
              className={styles.input}
            />
            <span className={styles.helperText}>
              Deixe em branco se preferir discutir o valor posteriormente
            </span>
          </div>

          {/* Prazo de Entrega */}
          <div className={styles.formGroup}>
            <label htmlFor="timeline" className={styles.label}>
              Prazo de Entrega
            </label>
            <input
              type="text"
              id="timeline"
              value={formData.timeline}
              onChange={(e) => handleInputChange('timeline', e.target.value)}
              placeholder="Ex: 2 semanas, 30 dias, etc."
              className={styles.input}
            />
          </div>

          {/* Anexos */}
          <div className={styles.formGroup}>
            <label className={styles.label}>
              Anexos
            </label>
            <div className={styles.fileUpload}>
              <input
                type="file"
                id="attachments"
                onChange={handleFileChange}
                multiple
                className={styles.fileInput}
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              />
              <label htmlFor="attachments" className={styles.fileLabel}>
                <i className="fas fa-paperclip"></i>
                Adicionar Arquivos
              </label>
              <span className={styles.fileHelper}>
                PDF, Word ou imagens (máx. 10MB cada)
              </span>
            </div>

            {/* Lista de arquivos anexados */}
            {formData.attachments.length > 0 && (
              <div className={styles.attachmentsList}>
                {formData.attachments.map((file, index) => (
                  <div key={index} className={styles.attachmentItem}>
                    <i className="fas fa-file"></i>
                    <span className={styles.fileName}>{file.name}</span>
                    <span className={styles.fileSize}>
                      ({(file.size / 1024 / 1024).toFixed(2)} MB)
                    </span>
                    <button
                      type="button"
                      onClick={() => removeAttachment(index)}
                      className={styles.removeAttachment}
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Ações do Formulário */}
          <div className={styles.formActions}>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={loading}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="primary"
              loading={loading}
              disabled={!formData.coverLetter.trim() || formData.coverLetter.length < 200}
            >
              <i className="fas fa-paper-plane"></i>
              Enviar Proposta
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default ProposalModal;