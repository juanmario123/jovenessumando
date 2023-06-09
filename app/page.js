'use client'
import Image from 'next/image'
import styles from './page.module.css'
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
        if (key === 'name' || key === 'logo' || key === 'candidato' || key === 'lider') return false
        return key
    }).filter((key) => key).sort((a, b) => a.localeCompare(b))

    const Buttons = socialNetworks.map((name) => (
        <>
            <Link href={selectedMunicipio[name] || '#'} target={"_blank"}
                  className={styles.boton + ' ' + styles[name]}>
                <img src={'/' + name + '.png'} alt={name}/>
                <span>Síguenos en {name.charAt(0).toUpperCase() + name.slice(1)}</span>
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
                                    <Image className={styles.imagen} src={selectedMunicipio.logo} unoptimized priority alt="Jovenes Sumando" height="150" width="300"/>
                                    <span className={styles.spanResponsable}>{selectedMunicipio.candidato}</span>
                                    <span className={styles.spanNombramiento}> Coordinador municipal de SUMA</span>

                                    <span className={styles.spanResponsable}>{selectedMunicipio.lider}</span>
                                    <span className={styles.spanNombramiento}> Líder municipal de Jóvenes Sumando</span>
                                    {Buttons}
                                    <button onClick={resetHandler}></button>
                                </>
                            )
                            :
                            <>
                                <Image className={styles.imagen} src="/JS.webp" alt="Jovenes Sumando" unoptimized priority height="150" width="300"/>
                                <span className={styles.spanResponsable}> Samuel Terán Herrera</span>
                                <span className={styles.spanNombramiento}> Líder Juvenil Estatal</span>
                                <Link href={'https://www.facebook.com/profile.php?id=100090333447814'} target={"_blank"}
                                      className={styles.boton + ' ' + styles.facebook}>
                                    <img src={'/facebook.png'} alt="facebook"/>
                                    <span>Síguenos en Facebook</span>
                                </Link>
                                <Link href={'https://www.instagram.com/jovenes.sumandoslp/'} target={"_blank"}
                                      className={styles.boton + ' ' + styles.instagram}>
                                    <img src={'/instagram.png'} alt="instagram"/>
                                    <span>Síguenos en Instagram</span>
                                </Link>
                                {/*<Link href={'#'} target={"_blank"}
                                      className={styles.boton + ' ' + styles.tiktok}>
                                    <img src={'/tiktok.png'} alt="tiktok"/>
                                    <span>Síguenos en Tiktok</span>
                                </Link>*/}
                            </>
                        }
                        <h3 className={styles.h3}>Municipios</h3>
                        <select className={styles.selectMunicipio} onChange={onSelect} ref={select}>
                            <option value="0">Seleccione un municipio</option>
                            {municipios.sort((a, b) => a.name.localeCompare(b.name)).map((municipio) => (
                                <option key={municipio.name} value={municipio.name}>{municipio.name}</option>
                            ))}
                        </select>
                        <img className={styles.contador} src="https://counter2.optistats.ovh/private/contadorvisitasgratis.php?c=byhmxdm4bz6p263319eygy3q74wyzlh3" title="contador de visitas" alt="contador de visitas"/>
                        
                    </div>
                </main>
            </div>
        </div>
    )
}
