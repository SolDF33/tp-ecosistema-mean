import express from 'express';
import cors from 'cors';
import { MongoClient } from 'mongodb';

const app = express();
app.use(cors());
app.use(express.json());

// ToDo 1: URI de conexión local a tu MongoDB (la que usa Compass)
const uri = "mongodb://localhost:27017"; 
const client = new MongoClient(uri);

app.get('/api/reporte-ventas', async (req, res) => {
    try {
        await client.connect();
        
        // ToDo 2: Conectar a la base de datos y colección del TP
        const database = client.db("local_hardware"); 
        const ventas = database.collection("ventas"); 

        // ToDo 3: Tu Pipeline exportado desde Compass (Las 5 etapas)
        const pipeline = [
            {
                $match: { "precio": { $gt: 0 } }
            },
            {
                $project: {
                    "categoria": 1,
                    "cantidad": 1,
                    "recaudacionVenta": { $multiply: ["$precio", "$cantidad"] }
                }
            },
            {
                $group: {
                    "_id": "$categoria",
                    "totalRecaudado": { $sum: "$recaudacionVenta" },
                    "cantidadItems": { $sum: "$cantidad" },
                    "ventaPromedio": { $avg: "$recaudacionVenta" }
                }
            },
            {
                $match: { "totalRecaudado": { $gt: 315 } }
            },
            {
                $sort: { "totalRecaudado": -1 }
            }
        ];

        // Ejecutamos la agregación nativa en MongoDB
        const data = await ventas.aggregate(pipeline).toArray();

        // Pequeño mapeo para que el HTML de Angular encuentre el promedio sin romperse
        const reporte = data.map(item => ({
            ...item,
            ticketPromedio: item.ventaPromedio
        }));

        res.status(200).json(reporte);
        
    } catch (error) {
        console.error("Error en la base de datos:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    } finally {
        await client.close();
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor de Datos activo en http://localhost:${PORT}`);
});