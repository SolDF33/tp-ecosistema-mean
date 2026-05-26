# UPC -Capilla del Monte
**Materia:** Base de Datos III  
**Alumna:** Sol De Francesco  

---

# Trabajo Práctico: Ecosistema MEAN & Aggregation Framework

Este proyecto consiste en una aplicación web Full Stack que integra el ecosistema **MEAN** (MongoDB, Express, Angular y Node.js) para procesar, filtrar y visualizar datos de ventas de hardware en tiempo real.

> 📝 **Nota para la cátedra:** Adjunto en la entrega de la plataforma el documento de Word con las capturas de pantalla del paso a paso y el detalle visual de cada uno de los *Stages* realizados en MongoDB Compass.

---

## 🚀 Estructura del Proyecto

El repositorio está dividido en dos componentes principales:

* **📁 /backend:** Servidor desarrollado en **Node.js** con **Express**. Se conecta de manera local a MongoDB mediante el driver nativo (`mongodb`), expone una API REST en el puerto `3000` y ejecuta un pipeline de agregación optimizado.
* **📁 /frontend:** Aplicación cliente desarrollada en **Angular** utilizando arquitectura moderna basada en **Signals** y estilos con **Bootstrap**. Consume los datos procesados por el backend y los presenta en un dashboard analítico interactivo.

---

## 🛠️ Tecnologías Utilizadas

* **Base de Datos:** MongoDB & MongoDB Compass (Aggregation Framework)
* **Backend:** Node.js, Express, CORS
* **Frontend:** Angular, Componentes Standalone, Signals, HttpClient
* **Gestor de Paquetes:** pnpm
* **Diseño:** Bootstrap

---

## 📈 Pipeline de Agregación (Fase 1)

Los datos presentados en el Dashboard fueron calculados y filtrados en tiempo real mediante las siguientes 5 etapas en MongoDB:
1. `$match`: Filtra registros con precio mayor a 0.
2. `$project`: Calcula la recaudación por venta (`precio * cantidad`).
3. `$group`: Agrupa por categoría y calcula el total recaudado, unidades vendidas y el ticket promedio.
4. `$match`: Filtra categorías con recaudación total superior a $315.
5. `$sort`: Ordena los resultados de manera descendente según la recaudación.
