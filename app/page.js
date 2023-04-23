'use client'
import Image from 'next/image'
import styles from './page.module.css'
import imagen from '../public/JS.png'
import Head from "next/head";
import Link from "next/link";
import {useState, useEffect, useRef} from "react";

export default function Home() {
    const [municipios, setMunicipios] = useState([])
    const [selectedMunicipio, setSelectedMunicipio] = useState(false)
    const select = useRef(null)
    useEffect(() => {
        fetch('/municipios.json').then((response) => response.json()).then((data) => {
            setMunicipios(data)
        })
    }, [])
    const onSelect = (e) => {
        if (e.target.value === '0') {
            setSelectedMunicipio(false)
            return
        }
        const municipio = municipios.find((municipio) => municipio.name === e.target.value)
        setSelectedMunicipio(municipio)
    }

    const resetHandler = (e) => {
        e.preventDefault()
        setSelectedMunicipio(false)
        select.current.value = '0'
    }

    const socialNetworks = Object.keys(selectedMunicipio).map((key) => {
        if (key === 'name' || key === 'logo') return false
        return key
    }).filter((key) => key)

    const Buttons = socialNetworks.map((name) => (
        <>
            <Link href={selectedMunicipio[name] || '#'} target={"_blank"}
                  className={styles.boton + ' ' + styles[name]}>
                <img src={'/' + name + '.png'} alt={name}/>
                <span>Siguenos en {name.charAt(0).toUpperCase() + name.slice(1)}</span>
            </Link>
        </>
    ))

    return (
        <div className={styles.container}>
            <div>
                <main className={styles.main}>
                    <div className={styles.loginContainer}>
                        {selectedMunicipio ? (
                                <>
                                    <Image className={styles.imagen} src={selectedMunicipio.logo}/>
                                    {Buttons}
                                    <button onClick={resetHandler}>back</button>
                                </>
                            )
                            :
                            <>
                                <h3 className={styles.h3}>no hay nada</h3>
                            </>
                        }
                        <h3 className={styles.h3}>Municipios</h3>
                        <select className={styles.selectMunicipio} onChange={onSelect} ref={select}>
                            <option value="0">Seleccione un municipio</option>
                            {municipios.map((municipio) => (
                                <option key={municipio.name} value={municipio.name}>{municipio.name}</option>
                            ))}
                        </select>
                    </div>
                </main>
            </div>
        </div>


    )
}
