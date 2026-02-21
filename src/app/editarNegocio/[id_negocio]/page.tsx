'use client'

import { useParams } from "next/navigation";

export default function ActualizarNegocio() {
    const params = useParams();
    const id_negocio = Number(params.id_negocio)
    return <h1>{ id_negocio}</h1>
}
