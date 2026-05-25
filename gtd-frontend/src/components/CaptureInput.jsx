import React, { useState } from 'react';
import axios from 'axios';

export default function CaptureInput() {
    const [notes, setNotes] = useState('');
    const [statusMessage, setStatusMessage] = useState('');

    const handleProcessNotes = async () => {
        const lines = notes.split('\n');
        const tasks = lines
            .map(line => ({ content: line.trim() }))
            .filter(task => task.content.length > 0);

        if (tasks.length === 0) {
            setStatusMessage('Sua lista de tarefas está vazio.');
            return;
        }

        setStatusMessage('Processando e enviando...');

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/v1/tasks/batch', { tasks }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });

            if (response.status === 201) {
                setStatusMessage('Tarefas processadas e salvas no banco!');
                setNotes('');
            }
        } catch (error) {
            console.error(error);
            setStatusMessage('Erro na conexão com o servidor.');
        }
    };

    return (
        <div style={{ width: '100%' }}>
            <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Descarregue seus pensamentos aqui..."
                style={{
                    width: '100%',
                    height: '350px',
                    padding: '20px',
                    fontSize: '18px',
                    lineHeight: '1.6',
                    fontFamily: 'Sans serif',
                    border: 'none',
                    backgroundColor: '#fff',
                    color: '#222',
                    resize: 'none',
                    outline: 'none',
                }}
            />

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '20px' }}>
                <span style={{ fontSize: '14px', color: '#888' }}>
                    {statusMessage}
                </span>
                
                <button 
                    onClick={handleProcessNotes}
                    style={{
                        padding: '12px 28px',
                        backgroundColor: '#000',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '15px',
                        fontWeight: '500',
                        transition: 'opacity 0.2s'
                    }}
                    onMouseEnter={(e) => e.target.style.opacity = '0.8'}
                    onMouseLeave={(e) => e.target.style.opacity = '1'}
                >
                    Processar
                </button>
            </div>
        </div>
    );
}