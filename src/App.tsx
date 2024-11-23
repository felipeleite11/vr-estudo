import { useEffect, useRef } from 'react'

import './App.css'

const xr = (navigator as any).xr

function App() {
	const canvasRef = useRef<HTMLCanvasElement | null>(null)

	useEffect(() => {
		if (xr) {
			console.log("WebXR suportado!")
		} else {
			console.log("WebXR não é suportado neste navegador/dispositivo.")
		}
	}, [])

	async function requestARSession() {
		try {
			const session = await xr.requestSession('immersive-vr')

			const gl = canvasRef.current?.getContext('webgl', { xrCompatible: true })
			
			session.updateRenderState({ baseLayer: new XRWebGLLayer(session, gl) })

			const referenceSpace = session.requestReferenceSpace('local')

			session.requestAnimationFrame((time, frame) => onXRFrame(time, frame, session, referenceSpace, gl))
		} catch (err) {
			console.error("Erro ao iniciar a sessão de VR", err)
		}
	}

	return (
		<div>
			<button
				onClick={requestARSession}
			>
				Criar sessão AR
			</button>

			<canvas ref={canvasRef}></canvas>
		</div>
	)
}

export default App
