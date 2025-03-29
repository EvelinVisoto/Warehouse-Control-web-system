const {request, response} = require("express");
//const nodemailer = require('nodemailer');
const Banco = require("../model/Banco");
const ControleProfessor = require("../control/ControleProfessor")
module.exports = function(app){

    app.post("/login", async(request, response)=>{
        
        console.log("logou");

        const controleProfessor = new ControleProfessor();
        controleProfessor.logar(request,response);
    });

    app.post("/professores",async (request,response)=>{
        console.log(":)))");

        const controleProfessor = new ControleProfessor();
        controleProfessor.cadastrarProfessor(request,response);

    });

    //perguntar dessa parte

    app.get("/professores/:registro",async (request,response)=>{
        console.log(":)");

        const controleProfessor = new ControleProfessor();
        controleProfessor.LerProfessor(request,response);

    });

    app.get('/professores', (req, res) => {
        const sql = 'SELECT registro, nome FROM professor';  // Consulta SQL para buscar professores
        Banco.getConexao().query(sql, (err, results) => {
            if (err) {
                return res.status(500).json({ status: false, message: 'Erro ao buscar professores', error: err });
            }
            res.json({ status: true, dados: results });  // Retorna os dados em formato JSON
        });
    });

    app.put("/professores/:registro",async (request,response)=>{
       console.log("atualizou")

       const controleProfessor = new ControleProfessor();

       controleProfessor.AtualizarProfessor(request,response);

    });



    app.delete("/professores/:registro",async (request,response)=>{
        console.log("deletado")
 
        const controleProfessor = new ControleProfessor();
 
        controleProfessor.ExcluirProfessor(request,response);
 
     });

    /*app.post('/recuperar-senha', async (req, res) => {
        const { email } = req.body;
    
        const sql = 'SELECT * FROM professor WHERE email = ?'; // Ajuste o campo conforme necessário
        Banco.getConexao().query(sql, [email], async (err, results) => {
            if (err) {
                return res.status(500).json({ status: false, msg: 'Erro ao buscar professor', error: err });
            }
    
            if (results.length === 0) {
                return res.status(404).json({ status: false, msg: 'E-mail não encontrado.' });
            }
    
            // Configuração do Nodemailer
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'tip.unionu@gmail.com',
                    pass: 'Almoxarifado@2024'
                }
            });
    
            // Criação do link de recuperação
            const recoveryLink = `http://localhost:3000/redefinir-senha?email=${encodeURIComponent(email)}`;
    
            const mailOptions = {
                from: 'tip.unionu@gmail.com',
                to: email,
                subject: 'Recuperação de Senha',
                text: `Clique no link para recuperar sua senha: ${recoveryLink}`
            };
    
            // Envio do e-mail
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return res.status(500).json({ status: false, msg: 'Erro ao enviar e-mail.' });
                }
                return res.status(200).json({ status: true, msg: 'Link de recuperação enviado para o seu e-mail.' });
            });
        });
    });
    
    // Endpoint para redefinir a senha
    app.get('/redefinir-senha', (req, res) => {
        const email = req.query.email;
    
        res.send(`
            <h1>Redefinir Senha</h1>
            <form action="/atualizar-senha" method="POST">
                <input type="hidden" name="email" value="${email}">
                <label for="novaSenha">Nova Senha:</label>
                <input type="password" name="novaSenha" required>
                <button type="submit">Atualizar Senha</button>
            </form>
        `);
    });
    
    // Endpoint para atualizar a senha
    app.post('/atualizar-senha', (req, res) => {
        const { email, novaSenha } = req.body;
    
        const sql = 'UPDATE professor SET senha = ? WHERE email = ?'; // Ajuste o campo conforme necessário
        Banco.getConexao().query(sql, [novaSenha, email], (err, results) => {
            if (err) {
                return res.status(500).json({ status: false, msg: 'Erro ao atualizar a senha.', error: err });
            }
            return res.json({ status: true, msg: 'Senha atualizada com sucesso!' });
        });
    });
    
    
*/







}

/*
{
	"_registro_prof" : "0007",
    "_nome_prof" : "james",
    "_telefone_prof" : 215646546465,
    "_usuario_adm_prof" : true,
    "_senha_prof": "seguro"
}
    */