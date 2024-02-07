'use client'

import dynamic from 'next/dynamic'
import '@tldraw/tldraw/tldraw.css'
import { TldrawLogo } from './components/TldrawLogo'
import { uiOverridesMenu } from './overrides/uioverridesmenu'

const Tldraw = dynamic(async () => (await import('@tldraw/tldraw')).Tldraw, {
	ssr: false,
})

const uiOverrides = [uiOverridesMenu]

export default function App() {
	return (
		<div className="editor">
			<Tldraw persistenceKey="changeme" overrides={uiOverrides}>
				<TldrawLogo />
			</Tldraw>
		</div>
	)
}
