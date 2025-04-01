const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const mensagens = [
  { id: 1, texto: 'Adoro programar com React!' },
  { id: 2, texto: '#foodforlife' },
  { id: 3, texto: 'Bom dia!' }
];

app.get('/mensagens', (req, res) => {
  res.json(mensagens);
}); 

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

app.post('/mensagens', (req, res) => {
    const novaMensagem = req.body.texto;
    console.log('Nova mensagem recebida:', novaMensagem);
  
    mensagens.push({ id: mensagens.length + 1, texto: novaMensagem });
    res.status(201).json({ mensagem: 'Mensagem adicionada com sucesso' });
  }); 