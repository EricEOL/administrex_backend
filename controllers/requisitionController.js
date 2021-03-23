const Requisition = require('../models/Requisition');
const { requisitionValidate } = require('./validate');

const requisitionController = {
    all: async function (req, res) {

        const requisitions = await Requisition.find();

        if (!requisitions) {
            return res.status(404).send('Nenhuma requisição foi encontrada');
        }

        res.json(requisitions);
    },
    oneRequisition: async function (req, res) {

        try {
            console.log(req.params.id);

            const requisition = await Requisition.findOne({ _id: params });
        } catch (error) {
            console.log(error);
        }

        if (!requisition) {
            return res.status(404).send('Esse processo não foi encontrado');
        }

        res.json(requisition);
    },
    register: async function (req, res) {

        if (req.user.perfil !== 'Fisc') {
            res.status(401).send('Seu perfil não possui permissão para realizar registros de novas requisições');
            return;
        };

        const { error } = requisitionValidate(req.body);
        if (error) return res.status(400).send(error.message);

        const requisition = new Requisition({
            number: req.body.number,
            section: req.body.section,
            type: req.body.type,
            responsible: req.body.responsible,
            object: req.body.object,
            value: req.body.value
        });

        try {
            await requisition.save();
            res.send(`Requisição incluída com sucesso`);
        } catch (error) {
            res.status(400).send("Não foi possível incluir essa requisição");
        }
    },
    updateLocale: async function (req, res) {
        if (req.user.perfil === 'Salc') {
            try {
                await Requisition.updateOne(
                    { _id: req.body.id }, { $set: { locale: 'Salc' } }
                );

                res.status(200).send('Processo recebido na Salc')
            } catch (error) {
                return res.status(404).send('Não foi possível realizar o recebimento deste processo');
            }
        };
        if (req.user.perfil === 'Tesouraria') {
            try {
                await Requisition.updateOne(
                    { _id: req.body.id }, { $set: { locale: 'Tesouraria' } }
                );

                res.status(200).send('Processo recebido na Tesouraria')
            } catch (error) {
                return res.status(404).send('Não foi possível realizar o recebimento deste processo');
            }
        };
        if (req.user.perfil === 'Supdoc') {
            try {
                await Requisition.updateOne(
                    { _id: req.body.id }, { $set: { supdoc: 'Sim' } }
                );

                res.status(200).send('Processo recebido no Suporte Documental')
            } catch (error) {
                return res.status(404).send('Não foi possível realizar o recebimento deste processo');
            }
        };
    },
    updateEmpenho: async function (req, res) {
        if (req.user.perfil !== 'Salc') {
            res.status(401).send('Seu perfil não possui permissão para inserir Nota de Empenho');
            return;
        }

        try {
            await Requisition.updateOne(
                { _id: req.body.id }, { $set: { noempenho: req.body.empenho, internalplane: req.body.pi, status: "Empenhado" } }
            );
            res.status(200).send('Empenho e plano interno inseridos')
        } catch (error) {
            return res.status(404).send('Não foi possível realizar essa operação');
        }

    },
    updateLiquidPayment: async function (req, res) {
        if(req.user.perfil !== 'Tesouraria') {
            res.status(401).send('Seu perfil não possui permissão para inserir Nota de Liquidação ou Pagamento');
            return;
        }

        if(req.body.option === 'liquid') {
            try {
                await Requisition.updateOne(
                    { _id: req.body.id }, { $set: { noliquid: req.body.ns, status: "Liquidado" } }
                );
                res.status(200).send('Liquidação inserida')
            } catch (error) {
                return res.status(404).send('Não foi possível realizar essa operação');
            }
        }
        if(req.body.option === 'payment') {
            try {
                await Requisition.updateOne(
                    { _id: req.body.id }, { $set: { nopayment: req.body.ns, status: "Pago" } }
                );
                res.status(200).send('Pagamento inserido')
            } catch (error) {
                return res.status(404).send('Não foi possível realizar essa operação');
            }
        }
    },
}

module.exports = requisitionController;