import express from "express";
import { ObraSocial } from "./obrassociales.js";
const app = express();
// Esto es un middleware que formaa el req.body para poder ser utilizado pero no entendi bien por que es necesario
app.use(express.json());
const obrassociales = [
    new ObraSocial('iapos', 'a02b91bc-3769-4221-beb1-d7a3aeba7dad'),
];
app.get('/api/obrassociales', (req, res) => {
    res.json({ data: obrassociales });
});
/*
DUDA
usando el siguiente codigo tambien me respondia a la peticion con id
app.use('/api/obrassociales',(req,res)=>{
    res.json(obrassociales)

*/
app.get('/api/obrassociales/:id', (req, res) => {
    const obras = obrassociales.find((obras) => obras.id === req.params.id);
    if (!obras) {
        return res.status(404).send({ message: 'Obra Social not found' });
    }
    res.json({ data: obras });
});
app.post('/api/obrassociales', (req, res) => {
    const { name } = req.body;
    const obrasocial = new ObraSocial(name);
    obrassociales.push(obrasocial);
    return res.status(201).send({ message: 'Obra Social created', data: obrasocial });
});
app.put('/api/obrassociales/:id', (req, res) => {
    const obrasocialIdx = obrassociales.findIndex((obra) => obra.id === req.params.id);
    if (obrasocialIdx === -1) {
        return res.status(404).send({ message: 'Obra Social not found' });
    }
    const input = {
        name: req.body.name
    };
    obrassociales[obrasocialIdx] = { ...obrassociales[obrasocialIdx], ...input };
    res.status(200).send({ message: 'Character updated succesfully', data: obrassociales[obrasocialIdx] });
});
app.listen(3000, () => {
    console.log("Server runing on http://localhost:3000/");
});
//# sourceMappingURL=index.js.map